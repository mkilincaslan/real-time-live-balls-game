app.controller('gameController', ['$scope',  ($scope) => {

    const socket = io.connect("http://localhost:3000");
    $scope.messages = [];
    $scope.players = {};
    $scope.foods = {};

    function scroolMoving(){
        setTimeout(() => {
            const element = document.getElementById('chat-area');
            element.scrollTop = element.scrollHeight;   
        });
    }

    socket.on('nicknameControl', data => {
        if(!data.nickname || data.nickname == ''){
            if(data.rejected){
                let nickname = prompt(data.rejected);
                while(!nickname || nickname == ''){
                    nickname = prompt(data.rejected);
                }

                if(nickname){
                    socket.emit('newUser', { nickname });
                }else{
                    return false;
                }
            }else{
                let nickname = prompt('Please Enter Nickname');
                while(!nickname || nickname == ''){
                    nickname = prompt('Please Enter Nickname');
                }

                if(nickname){
                    socket.emit('newUser', { nickname });
                }else{
                    return false;
                }
            }
        }else{
            nickname = data.nickname;
            socket.emit('newUser', { nickname });
        }
    });
    socket.on('newUser', data => {
        const messageData = {
            type: {
                code: 0, //server or user
                message: 1 //joined or leaved
            },
            nickname: data.nickname
        };

        $scope.messages.push(messageData);
        $scope.players[data.id] = data;
        $scope.$apply();
    });
    socket.on('userDisconnected', user =>{
        const messageData = {
            type: {
                code: 0, //server or user
                message: 0 //joined or leaved
            },
            nickname: user.nickname
        };

        $scope.messages.push(messageData);
        delete $scope.players[user.id];
        $scope.$apply();
    });
    socket.on('createFood', foods => {
        $scope.foods = foods;
        $scope.$apply();
    });
    socket.on('initPlayers', players => {
        $scope.players = players;
        $scope.$apply();
    });
    socket.on('animate', data => {
        $('#' + data.socketId).animate({ 'left': data.x + 'px', 'top': data.y + 'px'}, 400, () => {
            animate = false;
        });
    });
    socket.on('newMessage', data => {
        $scope.messages.push(data);
        $scope.$apply();
        scroolMoving();
    });

    let animate = false;
    $scope.onClickPlayer = $event => {
        if(!animate){
            let x = $event.offsetX;
            let y = $event.offsetY;

            socket.emit('animate', {x, y});

            animate = true;
            $('#' + socket.id).animate({ 'left': x + 'px', 'top': y + 'px'}, () => {
                animate = false;
            });

        }
    };
    $scope.newMessage = () => {
        let message = $scope.message;
        const messageData = {
            type: {
                code: 1 // server or user message
            },
            nickname: $scope.players[socket.id].nickname,
            text: message
        };

        $scope.messages.push(messageData);
        $scope.message = '';

        socket.emit('newMessage', messageData);

        scroolMoving();
    };
}]);