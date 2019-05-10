const session = require('express-session')
    , MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/eat-me-sessions',
    collection: 'eat-me'
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

module.exports = store;