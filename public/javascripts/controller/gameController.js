app.controller('gameController', ['$scope',  ($scope) => {

    const socket = io.connect("http://localhost:3000");

    $scope.init = () => {
        socket.on('nicknameControl', data => {
            if(!data.nickname || data.nickname == ''){
                let nickname = prompt('Please Enter Nickname');

                if(nickname){
                    socket.emit('newUser', { nickname });
                }else{
                    return false;
                }
            }else{
                nickname = data.nickname;
                socket.emit('newUser', { nickname });
            }
        });
        
    };

}]);