const Bill  = require('./bill_model')
const axios = require('axios');
const { createBillPDF } = require("./generateBillPDF");

const createBill = async (req, res) => {

    const order = req.body

    if (!order) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body',
        })
    }

    let newBill={
        username: "",
        article: [],
        total_price: 0,
        delivery_address: "",
        contact_email: "",
    };

    let shouldUpdateItemQuantityArray=[];

    //get the user's data
    const userData = await axios.get(`http://localhost:8001/api/user/${order.user_id}`)

    //get all items data,
    const allItemsData = await axios.get(`http://localhost:8002/api/items`)

    //get the article array
    const  articleArray = order.article.map(orderArticleItem=>{

        const selectedItem = allItemsData.data.data.filter(item=>orderArticleItem.item_id === item._id)

        shouldUpdateItemQuantityArray.push(
            {
                item_id: orderArticleItem.item_id,
                updatedQuantity: selectedItem[0].quantity-orderArticleItem.quantity,
            }
        )

        return (
            {
                item_name: selectedItem[0].item_name,
                single_price: selectedItem[0].price,
                quantity: orderArticleItem.quantity,
                article_price: orderArticleItem.quantity * selectedItem[0].price,
                currency: selectedItem[0].currency,
            }
        )

    })

    //collect each article price in an array, then get the sum price using the reduce method
    const priceArray = articleArray.map(item=>item.article_price)
    const totalPrice = priceArray.reduce((accumulator, currentValue) => accumulator + currentValue)

    newBill.username = userData.data.data.username;
    newBill.article = articleArray;
    newBill.total_price = totalPrice;
    newBill.contact_email = userData.data.data.email;
    newBill.delivery_address = userData.data.data.address;

    const bill = new Bill(newBill)

    if (!bill) {
        return res.status(400).json({ success: false, error: "failed" })
    }

    //reduce the quantity number of the ordered items, using patch method
    shouldUpdateItemQuantityArray.map(item=>{
        return patchItemQuantity(item.item_id, item.updatedQuantity)
    })


    bill
        .save()
        .then((response) => {

            //if bill created successful, then generate bill PDF
            createBillPDF(response, `./billPDFs/bill_${response._id}.pdf`);

            return res.status(201).json({
                success: true,
                message: response,
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'bill created failed!',
            })
        })

}


const patchItemQuantity = async (itemId, updatedQuantity) =>{
     await axios.patch(`http://localhost:8002/api/item/${itemId}`, {quantity: updatedQuantity});
}


const getBillById = async (req, res) => {

    await Bill.findOne({_id: req.params._id }, (err, bill) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!bill) {
            return res
                .status(404)
                .json({ success: false, error: `bill not found` })
        }

        return res.status(200).json({ data: bill })

    }).catch(err => console.log(err))

}


module.exports = {
    createBill,
    getBillById,
}
