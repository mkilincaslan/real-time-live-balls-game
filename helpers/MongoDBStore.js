const session = require('express-session')
    , MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_SESSION_URL,
    collection: process.env.MONGODB_COLLECTION
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

module.exports = store;