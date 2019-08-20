const mongoose = require('mongoose')
const Schema = mongoose.Schema

const connectionSchema = Schema({
    connection_dt: {
        type: String,
        required: true
    },
	contact: { type: Schema.Types.ObjectId, ref: 'Contact' }
})

/*
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
*/

const Connection = mongoose.model('Connection', connectionSchema);
module.exports = { Connection };