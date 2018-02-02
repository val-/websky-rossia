
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
		for (var i=0; i<vm.passengers.length; i++) {
            if (i === vm.currentPassengerIndex) {
				vm.nextPassenger = false;
				vm.prevPassenger = false;
				vm.nextPassengerIndex = false;
				vm.prevPassengerIndex = false;
				for (var j=i+1; j<vm.passengers.length; j++) {
					if (
						vm.service.availableByPassengerSegments[j] &&
						vm.service.availableByPassengerSegments[j][vm.currentFlightIndex]
					) {
						vm.nextPassenger = vm.passengers[j];
						vm.nextPassengerIndex = j;
					}
				}
				for (var j=i-1; j>-1; j--) {
					if (
						vm.service.availableByPassengerSegments[j] &&
						vm.service.availableByPassengerSegments[j][vm.currentFlightIndex]
					) {
						vm.prevPassenger = vm.passengers[j];
						vm.prevPassengerIndex = j;
					}
				}
            }
        }
    }

    function switchNext() {
        for (var i=0; i<vm.passengers.length; i++) {
            if (i === vm.currentPassengerIndex) {
                for (var j=i+1; j<vm.passengers.length; j++) {
					if (
						vm.service.availableByPassengerSegments[j] &&
						vm.service.availableByPassengerSegments[j][vm.currentFlightIndex]
					) {
						vm.selectFlightPassenger(vm.currentFlightIndex, j);
						// Нужно дождаться применения нового currentPassengerIndex в родительском скопе
						$timeout(updateNextPrevState);
					}
				}
            }
        }
    }

    function switchPrev() {
        for (var i=0; i<vm.passengers.length; i++) {
            if (i === vm.currentPassengerIndex) {
				for (var j=i-1; j>-1; j--) {
					if (
						vm.service.availableByPassengerSegments[j] &&
						vm.service.availableByPassengerSegments[j][vm.currentFlightIndex]
					) {
						vm.selectFlightPassenger(vm.currentFlightIndex, j);
						// Нужно дождаться применения нового currentPassengerIndex в родительском скопе
						$timeout(updateNextPrevState);
					}
				}
            }
        }
    }

}
