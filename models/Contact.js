const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    spouseName: {
        type: String
    },
    children: {
        type: String
    },
    birthday: {
        type: String
    },
    spouseBirthday: {
        type: String
    },
    howWeMet: {
        type: String
    },
    notes: {
        type: String
    },
    customerStatus: {
        type: String
    },
    purchaseHistory: {
        type: String
    },
    connections: [{ type: Schema.Types.ObjectId, ref: 'Connection'}]
})

/*
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
*/

const Contact = mongoose.model('Contact', contactSchema)
module.exports = { Contact }