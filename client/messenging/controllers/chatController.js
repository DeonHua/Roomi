angular.module("roomi").controller("ChatController", ['$scope', '$meteor', '$rootScope',
    function($scope, $meteor, $rootScope){
    $rootScope.currentUserPromise.then(function(user){
        console.log(user);
    });

    $scope.messages = $meteor.collection(function() {
      return Conversation.find({_id:$scope.user.group.conversationId}, {
        sort : $scope.getReactively('sort')
      });
    });
    //subscribe to conversations
    $meteor.autorun($scope, function() {
      $meteor.subscribe('Conversation', {
        limit: 10
        //skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
       // sort: $scope.getReactively('sort')
      });
//    , $scope.getReactively('search')).then(function() {
//        $scope.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
//      });
    });
    //method called when the user says something
    $scope.say = function(message){
      $meteor.call('say', message).then(
        function(data){
          console.log('success responding', data);
        },
        function(err){
          console.log('failed', err);
        }
      );
    };
}]);
