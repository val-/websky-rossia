angular.module('app').component('popupMealRossiya', {
	templateUrl: 'components/popup-meal-rossiya/popup-meal-rossiya.html',
	controller: ['utils', PopupMealRossiyaController],
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
		getPassengerFlightMeal: '=get',
		subgroups: '=subgroups',
		mealImagesPath: '=path',
		service: '=',
		selectFlightPassenger: '=select'
	}
});

function PopupMealRossiyaController(utils) {

	var vm = this;
	vm.close = jQuery.fancybox.close;
	vm.mealMenuSubgroupMobileChange = mealMenuSubgroupMobileChange;
	vm.mealMenuSubgroup = false;
	vm.mealMenuSubgroupMobile = 'false';
	vm.subgroupItems = utils.createOptionsForUiSelect(vm.subgroups, 'all');
	vm.switchNext = switchNext;
	vm.switchPrev = switchPrev;

	function mealMenuSubgroupMobileChange() {
		if (vm.mealMenuSubgroupMobile === false) {
			vm.mealMenuSubgroup = false;
		} else {
			vm.mealMenuSubgroup = vm.mealMenuSubgroupMobile * 1;
		}
	}
	
	function switchNext() {
		var successSwitch = false;
		for (var i = vm.currentPassengerIndex + 1; i < vm.passengers.length; i++) {
			if (
				vm.service.availableByPassengerSegments[i] &&
				vm.service.availableByPassengerSegments[i][vm.currentFlightIndex]
			) {
				vm.selectFlightPassenger(vm.currentFlightIndex, i);
				successSwitch = true;
				break;
			}
		}
		if (!successSwitch) {
			for (var j = 0; j < vm.passengers.length; j++) {
				if (
					vm.service.availableByPassengerSegments[j] &&
					vm.service.availableByPassengerSegments[j][vm.currentFlightIndex]
				) {
					vm.selectFlightPassenger(vm.currentFlightIndex, j);
					break;
				}
			}
		}
	}

	function switchPrev() {
		var successSwitch = false;
		for (var i = vm.currentPassengerIndex - 1; i > -1; i--) {
			if (
				vm.service.availableByPassengerSegments[i] &&
				vm.service.availableByPassengerSegments[i][vm.currentFlightIndex]
			) {
				vm.selectFlightPassenger(vm.currentFlightIndex, i);
				successSwitch = true;
				break;
			}
		}
		if (!successSwitch) {
			for (var j = vm.passengers.length - 1; j > -1; j--) {
				if (
					vm.service.availableByPassengerSegments[j] &&
					vm.service.availableByPassengerSegments[j][vm.currentFlightIndex]
				) {
					vm.selectFlightPassenger(vm.currentFlightIndex, j);
					break;
				}
			}
		}
	}

}
