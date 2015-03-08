angular.module("roomi").controller("IndexController", ['$scope', '$meteor','accountService', function($scope, $meteor,accountService){
	$scope.status = "Do Not Disturb";
	$scope.home = "2";
	$scope.bills = 1;
	console.log($scope.home);

    accountService.then(function(data){
        $scope.userData = data;
        console.log($scope.userData);
        $scope.signedIn = true;
        console.log($scope.signedIn);
    },function(err){
        console.log(err);
        $scope.signedIn = false;
        console.log($scope.signedIn);
    });
}]);

