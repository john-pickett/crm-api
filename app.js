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
    // console.log('/ get');
    res.send('server running');
});

app.get('/contacts', (req, res) => {
    console.log('getting contacts...');
    // let missingBirthdays = [];
    Contact.find().populate('connections').then((contacts) => {
        // contacts.forEach((item) => {
        //     if (!item.birthday) {
        //         missingBirthdays.push(item);
        //     }
            
        // })
        res.send({contacts});
    });
}, (e) => {
    res.status(400).send(e);
});

app.get('/contacts/:id', (req, res) => {
    const id = req.params.id;

    Contact.findById(id).then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/contact', (req, res) => {
    console.log('adding new contact to DB...')
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
    console.log('editing contact...');
    const id = req.params.id;

    // console.log('editing...' + id)
    Contact.findOneAndUpdate({_id: id}, {
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
        purchaseHistory: req.body.purchaseHistory,
        connections: req.body.connections
    },  
    {
        new: true
    }).then((doc) => {
        console.log('done editing...')
        res.send(doc)
    })

});

app.get('/connections', (req, res) => {
    Connection.find().populate('contact').then((connections) => {
        res.send({connections})
    }, e => res.status(400).send(e))
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
    console.log('adding new connection...');
    const connection = new Connection({
        connection_dt: 'Mon Aug 19 2019 18:36:23 GMT-0500 (Central Daylight Time)',
        contact: '5d338aff289ca16900a32ad8'
    });

    connection.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })

});

/*

console.log('adding new contact to DB...')
    const contact = new Contact({
        firstName: req.body.firstName,
    });

    contact.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
    */