const nodemailer = require("nodemailer");

const sendBillPDFByEmail = async (email, id) => {

    let transporter = nodemailer.createTransport({
        host: "smtps.****.de",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'your email username',
            pass: 'your email password'
        }
    });

    //send mail with the bill PDF to the user
    await transporter.sendMail({
        from: "sender email address", // sender address
        to: `${email}`, // the user's email
        subject: "Bill", // Subject line
        text: "Dear Customer,  \n" +
            "\n" +
            "Your order process is successful.\n" +
            "\n" +
            "Please find your billPDF attached.\n" +
            "\n" +
            "Best Regards,  \n" +
            "\n" +
            "",
        attachments: [
            {
                filename: 'Bill.pdf',
                path:  __dirname +`./billPDFs/bill_${id}.pdf`,
                contentType: 'application/pdf'
            }
        ]
    });


    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("The email has been sent!");
        }
    });

}


module.exports = {
    sendBillPDFByEmail
}
