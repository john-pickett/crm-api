const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Contact } = require('./models/Contact');
const { Connection } = require('./models/Connection');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
});

  app.listen(port, () => {
    console.log(`Server started up at ${port}`);
});

app.get('/', (req, res) => {
    console.log('/ get');
    res.send('server running');
});

app.get('/contacts', (req, res) => {
    let missingBirthdays = []
    Contact.find().then((contacts) => {
        contacts.forEach((item) => {
            if (!item.birthday) {
                missingBirthdays.push(item);
            }
            
        })
        res.send({contacts, missingBirthdays});
    });
}, (e) => {
    res.status(400).send(e);
});

app.post('/contact', (req, res) => {
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        spouseName: req.body.spouseName,
        children: req.body.children,
        birthday: req.body.birthday,
        spouseBirthday: req.body.spouseBirthday,
        howWeMet: req.body.howWeMet,
        notes: req.body.notes,
        customerStatus: req.body.customerStatus,
        purchaseHistory: req.body.purchaseHistory
    });

    contact.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.put('/contact/:id', (req, res) => {
    // edit contact here
    const id = req.params.id;
    const contact = req.body.contact;

    Contact.findOneAndUpdate({_id: id}, {contact: contact}, {new: true}),then((doc) => res.send(doc))

});
/*
app.put('/tasks/edit/:id', (req, res) => {
    let id = req.params.id;
    let inprogress = req.body.inprogress;
    let completed = req.body.completed;

    Task.findOneAndUpdate( {_id: id}, { inprogress: inprogress, completed: completed}, { new: true } ).then((doc) => {
        res.send(doc)
        console.log('edit task successful')
    });
});
*/

// Connection is for a meeting/conversation with a Contact
app.post('/connection', (req, res) => {
    // const contact = req.body._id
    // contact.find().then(())
})