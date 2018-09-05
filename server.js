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
var bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "jade");

const port = process.env.PORT || 80;
app.use(bodyParser.urlencoded({ extended: false }));
var smtpTransport = nodemailer.createTransport(smtpTransport, {
  service: "Gmail",
  auth: {
    // enter your gmail account
    user: "GMAIL_USER",
    // enter your gmail password
    pass: "GMAIL_PASS"
  }
});
app.get("/send", function(req, res) {
  var mailOptions = {
    to: req.query.to,
    subject: "Contact Form Message",
    from: "Contact Form Request" + "<" + req.query.from + ">",
    html:
      "From: " +
      req.query.name +
      "<br>" +
      "User's email: " +
      req.query.user +
      "<br>" +
      "Message: " +
      req.query.text
  };

  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.log(err);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

app.use("/", index);
app.use("/contact", contact);
app.use("/job", job);
app.use("/video", video);
app.use("/product", product);
app.use("/object", object);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
