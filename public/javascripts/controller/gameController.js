app.controller('gameController', ['$scope', 'indexFactory',  ($scope, indexFactory) => {

    indexFactory.connectSocket('http://localhost:3000', {
        reconnectionAttempts: 3,
        reconnectionDelay: 600
    })
        .then(socket => {
            console.log('Successfull connection - ', socket);
        })
        .catch(error => {
           console.log(error);
        });
}]);