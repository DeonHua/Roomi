angular.module("roomi").controller("RegisterController", ['$scope', '$meteor', '$rootScope',
  function($scope, $meteor, $rootScope){

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = { name: 1 };
    $scope.orderProperty = '1';

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.parties = $meteor.collection(function() {
      return Parties.find({}, {
        sort : $scope.getReactively('sort')
      });
    });

    $scope.group = function(){
      $meteor.collection(function() {
          return Group.find({}, {
            sort : $scope.getReactively('sort')
          });
        });
    };

    $meteor.autorun($scope, function() {
      $meteor.subscribe('group', {
        limit: parseInt($scope.getReactively('perPage')),
        skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('search')).then(function() {
        $scope.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
      });
    });

    $scope.remove = function(party){
      $scope.parties.splice( $scope.parties.indexOf(party), 1 );
    };

    $scope.pageChanged = function(newPage) {
      $scope.page = newPage;
    };

    $scope.$watch('orderProperty', function(){
      if ($scope.orderProperty)
        $scope.sort = {name: parseInt($scope.orderProperty)};
    });

    $scope.getUserById = function(userId){
      return Meteor.users.findOne(userId);
    };

    $scope.creator = function(party){
      if (!party)
        return;
      var owner = $scope.getUserById(party.owner);
      if (!owner)
        return "nobody";

      if ($rootScope.currentUser)
        if ($rootScope.currentUser._id)
          if (owner._id === $rootScope.currentUser._id)
            return "me";

      return owner;
    };

    $scope.create_group = function(newGroup){
        console.log('adding', newGroup);
        $meteor.call('create_group', newGroup).then(
            function(data){
              console.log('success responding', data);
            },
            function(err){
              console.log('failed', err);
            }
        );
    };
    $scope.join_group = function(Id){
        console.log('adding', Id);
        $meteor.call('join_group', Id).then(
            function(data){
              console.log('success responding', data);
            },
            function(err){
              console.log('failed', err);
            }
        );
    };
}]);
