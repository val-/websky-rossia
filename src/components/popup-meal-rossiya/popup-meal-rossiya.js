
angular.module('app').component('popupMealRossiya', {
    templateUrl: 'components/popup-meal-rossiya/popup-meal-rossiya.html',
    controller: ['utils', '$timeout', '$scope', PopupMealRossiyaController],
    controllerAs: 'vm',
    bindings: {
        mealMenu: '=menu',
        passenger: '=passenger',
        currentPassengerIndex: '=',
        currentFlightIndex: '=',
        passengers: '=passengers',
        flight: '=flight',
        setPassengerFlightMeal: '=handler',
        clearPassengerFlightMeal: '&remove',
        subgroups: '=subgroups',
        mealImagesPath: '=path',
        service: '=',
        selectFlightPassenger: '=select'
    }
});

function PopupMealRossiyaController(utils, $timeout, $scope) {

    var vm = this;
    vm.close = jQuery.fancybox.close;
    vm.mealMenuSubgroupMobileChange = mealMenuSubgroupMobileChange;
    vm.mealMenuSubgroup = false;
    vm.mealMenuSubgroupMobile = 'false';
    vm.subgroupItems = utils.createOptionsForUiSelect(vm.subgroups, 'all'); 
    vm.switchNext = switchNext;
    vm.switchPrev = switchPrev;

    vm.availablePassengers = vm.passengers.filter(function (passenger, index) {
        return (
            vm.service.availableByPassengerSegments[index] &&
            vm.service.availableByPassengerSegments[index][vm.currentFlightIndex]
        );
    });

    updateNextPrevState();
	
	$scope.$watch('vm.currentPassengerIndex', function () {
        updateNextPrevState();
    });

    function mealMenuSubgroupMobileChange() {
        if (vm.mealMenuSubgroupMobile === false) {
            vm.mealMenuSubgroup = false;
        } else {
            vm.mealMenuSubgroup = vm.mealMenuSubgroupMobile * 1;
        }
    }

    function updateNextPrevState() {
		for (var i=0; i<vm.availablePassengers.length; i++) {
            if (i === vm.currentPassengerIndex) {
                vm.nextPassenger = vm.availablePassengers[i + 1] || false;
                vm.prevPassenger = vm.availablePassengers[i - 1] || false;
            }
        }
    }

    function switchNext() {
        for (var i=0; i<vm.availablePassengers.length; i++) {
            if (i === vm.currentPassengerIndex) {
                if (vm.availablePassengers[i + 1]) {
                    vm.selectFlightPassenger(vm.currentFlightIndex, i + 1);
                    // Нужно дождаться применения нового currentPassengerIndex в родительском скопе
                    $timeout(updateNextPrevState);
                }
            }
        }
    }

    function switchPrev() {
        for (var i=0; i<vm.availablePassengers.length; i++) {
            if (i === vm.currentPassengerIndex) {
				if (vm.availablePassengers[i - 1]) {
                    vm.selectFlightPassenger(vm.currentFlightIndex, i - 1);
                    // Нужно дождаться применения нового currentPassengerIndex в родительском скопе
                    $timeout(updateNextPrevState);
                }
            }
        }
    }

}
