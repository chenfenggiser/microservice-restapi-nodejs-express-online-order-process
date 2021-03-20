const fs = require("fs");
const PDFDocument = require("pdfkit");

function createBillPDF(bill, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateCustomerInformation(doc, bill);
    generateInvoiceTable(doc, bill);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateCustomerInformation(doc, bill) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Bill", 50, 80);

    generateHr(doc, 105);

    const customerInformationTop = 120;

    doc
        .fontSize(10)
        .text("User Name:", 50, customerInformationTop)
        .font("Helvetica")
        .text(bill.username, 150, customerInformationTop)
        .font("Helvetica")
        .text("Ordered Date:", 50, customerInformationTop + 20)
        .text(formatDate(bill.createdAt), 150, customerInformationTop + 20)
        .text("Total price:", 50, customerInformationTop + 40)
        .text(formatCurrency(bill.total_price), 150, customerInformationTop + 40
        )

        .font("Helvetica")
        .text("Email:", 300, customerInformationTop)
        .text(bill.contact_email, 400, customerInformationTop)
        .text("Delivery Address:" , 300, customerInformationTop + 20)
        .text(bill.delivery_address, 400, customerInformationTop + 20)
        .moveDown();

    generateHr(doc, 182);
}

function generateInvoiceTable(doc, bill) {
    let i;
    const invoiceTableTop = 250;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item Name",
        "Unit Cost",
        "Quantity",
        "Line Total",
        "Currency"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < bill.article.length; i++) {

        const item = bill.article[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.item_name,
            item.single_price,
            item.quantity,
            item.article_price,
            item.currency
        );

        generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30+5;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Total price: ",
        "",
        formatCurrency(bill.total_price)
    );

}


function generateTableRow(
    doc,
    y,
    item,
    unitCost,
    quantity,
    lineTotal,
    currency,
) {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(unitCost, 150, y)
        .text(quantity, 280, y, { width: 90, align: "right" })
        .text(lineTotal, 370, y, { width: 90, align: "right" })
        .text(currency, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(euro) {
    return "€" + euro;
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    createBillPDF
};
