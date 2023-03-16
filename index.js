const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contact');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

// Uncomment the following line to use body-parser middleware
// const bodyparser = require("body-parser")

app.use(express.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
    const { name, phone, mail, desc } = req.body;

    const newContact = new contact({
        name,
        phone,
        mail,
        desc
    });

    newContact.save()
        .then(() => {
            res.send("Form submitted successfully");
        })
        .catch(() => {
            res.status(400).send("Unable to submit form");
        });
});

app.use(express.static('public'));

app.listen(port, () => console.log(`Server running on port ${port}`));
