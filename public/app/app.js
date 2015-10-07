angular.module('app', ['ngResource']);

angular.module('app').controller('testCtrl', function ($scope, $resource) {
    $scope.nodes = $resource('/api/node').query();
});
