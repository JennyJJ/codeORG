
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService) {
    $scope.cancelOrder = function() {
        OrderService.delete($scope.order, function() {
            $scope.order = null;
            UserService.refresh();
        });
    };

    $scope.validateExternalID = function() {
        return false;
    }

    $scope.saveChanges = function() {
        OrderService.save($scope.order, function(data) {
            $scope.order = data;
        });
    };

    $scope.user = UserService.get();
    $scope.order = $scope.user.CurrentOrderID != null ? OrderService.get({ id: $scope.user.CurrentOrderID }) : null;

	$scope.$watch('order.LineItems', function(newval){
		var newTotal = 0;
        if (!$scope.order) return newTotal;
		angular.forEach($scope.order.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.order.Subtotal = newTotal;
	}, true);
});