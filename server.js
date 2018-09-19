var express = require("express");
const app = express();
var path = require("path");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var index = require("./routes/home");
var contact = require("./routes/contact");
var job = require("./routes/job");
var video = require("./routes/video");
var product = require("./routes/product");
var object = require("./routes/object");
var send = require("./routes/send");
var bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "jade");

const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", index);
app.use("/contact", contact);
app.use("/job", job);
app.use("/video", video);
app.use("/product", product);
app.use("/object", object);
app.use("/send", send);

app.post("/send", (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    socketTimeout: 5000,
    logger: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "csimiracle@gmail.com", // generated ethereal user
      pass: "miracle2017" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <your@email.com>', // sender address
    to: ["ooocsi2012@gmail.com", ""], // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("send", { msg: "Email has been sent" });
  });
});

const sitemapOptions = {
  root: __dirname + "/public/",
  headers: {
    "Content-Type": "text/xml;charset=UTF-8"
  }
};

app.get("/sitemap.xml", (req, res) =>
  res.status(200).sendFile("sitemap.xml", sitemapOptions)
);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
