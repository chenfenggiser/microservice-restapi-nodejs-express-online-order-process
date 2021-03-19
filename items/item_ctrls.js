const Item  = require('./item_model')

const createItem = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body',
        })
    }

    const item = new Item(body)

    if (!item) {
        return res.status(400).json({ success: false, error: "failed" })
    }

    item
        .save()
        .then(() => {

            return res.status(201).json({
                success: true,
                id: item._id,
                message: 'item created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Item not created!',
            })
        })
}


const patchItem = async (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const updateObject = body

    await Item.updateOne({_id: req.params._id }, {$set: updateObject}).then((err, item) => {

        console.log(item)

        if (err.nModified === 0) {
            return res.status(404).json({
                err: err,
                success: false,
                message: 'Item not found!',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Item updated!',
        })

    }).catch(error => {
            return res.status(404).json({
                error,
                message: 'Item update failed!',
            })
        })
}


const deleteItem = async (req, res) => {

    await Item.findOneAndDelete({ _id: req.params._id }, (err, item) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `item not found` })
        }

        return res.status(200).json({ success: true, info: "item deleted" })
    }).catch(err => console.log(err))
}

const getItemById = async (req, res) => {

    await Item.findOne({_id: req.params._id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `item not found` })
        }
        return res.status(200).json({ data: item })
    }).catch(err => console.log(err))
}

const getItems = async (req, res) => {

    await Item.find({}, (err, items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!items.length) {
            return res
                .status(404)
                .json({ success: false, error: `items not found` })
        }
        return res.status(200).json({ data: items })
    }).catch(err => console.log(err))
}

module.exports = {
    createItem,
    patchItem,
    deleteItem,
    getItemById,
    getItems
}
