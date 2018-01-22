
angular.module('app').component('popupMeal', {
    templateUrl: 'components/popup-meal-rossiya/popup-meal-rossiya.html',
    controller: ['utils', PopupMealController],
    controllerAs: 'vm',
    bindings: {
        mealMenu: '=menu',
        passenger: '=passenger',
        flight: '=flight',
        setPassengerFlightMeal: '=handler',
        subgroups: '=subgroups',
        mealImagesPath: '=path'
    }
});

function PopupMealController(utils) {

    var vm = this;
    vm.close = jQuery.fancybox.close;
    vm.mealMenuSubgroupMobileChange = mealMenuSubgroupMobileChange;
    vm.mealMenuSubgroup = false;
    vm.mealMenuSubgroupMobile = 'false';
    vm.subgroupItems = utils.createOptionsForUiSelect(vm.subgroups, 'all');

    function mealMenuSubgroupMobileChange() {
        if (vm.mealMenuSubgroupMobile === false) {
            vm.mealMenuSubgroup = false;
        } else {
            vm.mealMenuSubgroup = vm.mealMenuSubgroupMobile * 1;
        }
    }

}
