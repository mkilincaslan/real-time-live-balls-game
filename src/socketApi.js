const socketio              = require('socket.io')
    , shortid               = require('shortid')
    , socketAuthorization   = require('../helpers/socketAuthorization')
    , io                    = socketio();

const socketApi = {}, users = {};
socketApi.io = io;

/**
 * Socket Authorization
 */
io.use(socketAuthorization);

/**
 * Users model
 */
const User = require('../models/Users');

/**
 * Helpers
 */
const randomColor       = require('../helpers/randomColor')
    , randomLocation    = require('../helpers/randomLocation');

io.on('connection', socket => {

    let activeUser = {};
    const defaultData = {
        id: socket.id,
        position: {
            x: 0,
            y: 0
        },
        color: randomColor()
    };

    User.findOne({
        googleId: socket.request.user.googleId
    }, 
    (err, user) => {
        if(err) throw err;
        activeUser = user;

        const userData = {...activeUser._doc, ...defaultData};
        users[socket.id] = userData;
        socket.broadcast.emit('newUser', userData);
        socket.emit('initPlayers', users);
        if(!user.nickname || user.nickname == '')
            socket.emit('nicknameControl', user);
    });

    socket.on('newUser', data => {

        User.findOne({
            nickname: userData.nickname
        }, 
        (err, user) => {
            if(err) throw err;
            if(user && user.googleId != socket.request.user.googleId){
                // nickname rejected
                activeUser['rejected'] = 'This name was previously taken by another user!';
                socket.emit('nicknameControl', activeUser);
            }else if(!user){
                User.update({googleId: socket.request.user.googleId}, {nickname: userData.nickname}, {multi:true, new:true})
                    .then(done => {
                        if(!done)
                            return true;
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        });

        const userData = Object.assign(data, defaultData);
        users[socket.id] = userData;
        socket.broadcast.emit('newUser', users[socket.id]);
        socket.emit('initPlayers', users);
    });
    socket.on('animate', data => {
        users[socket.id].position.x = data.x;
        users[socket.id].position.y = data.y;

        socket.broadcast.emit('animate', {
            socketId: socket.id,
            x: data.x,
            y: data.y
        });
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', users[socket.id]);
        delete users[socket.id];
    });
    socket.emit('createFood', createFood());

    function createFood(){
        let foods = {}
        for(let i = 0; i < 25; i++){
            let newFood = {
                id: shortid.generate(),
                position: {
                    x: randomLocation().x,
                    y: randomLocation().y
                },
                color: randomColor()
            };
            foods[newFood.id] = newFood;
        }
        return foods;
    }
});

module.exports = socketApi;