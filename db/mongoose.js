const mongoose = require('mongoose');

mongoose.promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/CRM', { useNewUrlParser: true }).then( () => {
    if (process.env.MONGODB_URI) {
        console.log(`Connected to MongoDB successfully at ${process.env.MONGODB_URI}`);
    } else {
        console.log('Connected to MongoDB at localhost');
    }
    
}, (err) => {
    console.log(`Error: ${err}`);
});


module.exports = {mongoose};