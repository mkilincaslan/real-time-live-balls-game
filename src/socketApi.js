const socketio = require('socket.io');
const socketAuthorization = require('../helpers/socketAuthorization');
const io = socketio();

const socketApi = {};
socketApi.io = io;

/**
 * Socket Authorization
 */
io.use(socketAuthorization);

/**
 * User model
 */
const User = require('../models/Users');

const users = [];

io.on('connection', socket => {
    User.findOne({
        googleId: socket.request.user.googleId
    }, 
    (err, user) => {
        if(err) throw err;
        socket.emit('nicknameControl', user);
    });

    socket.on('newUser', data => {
        const defaultData = {
            id: socket.id,
            position: {
                x: 50,
                y: 50
            }
        };
        
        const userData = Object.assign(data, defaultData);
        users.push(userData);
        console.log(users)

        User.update({googleId: socket.request.user.googleId}, {nickname: userData.nickname}, {multi:true,new:true})
            .then(done => {
                if(!done)
                    res.redirect('/');
            })
            .catch(err => {
                throw err;
            });
    });
});

module.exports = socketApi;