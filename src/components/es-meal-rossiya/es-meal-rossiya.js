angular.module('app').component('esMealRossiya', {
    templateUrl: 'components/es-meal-rossiya/es-meal-rossiya.html',
    controller: ['$scope', '$element','backend', 'utils', MealRossiyaController],
    controllerAs: 'vm',
    bindings: {
        service: '=service',
        locked: '=locked'
    }
});

function MealRossiyaController($scope, $element, backend, utils) {

    var vm = this,
        passengersTableContainer = $element.find('div.passengersTableContainer');

    vm.switchService = switchService;
    vm.selectFlightPassenger = selectFlightPassenger;
    vm.selectFirstAvailablePassengerFlight = selectFirstAvailablePassengerFlight;
    vm.setPassengerFlightMeal = setPassengerFlightMeal;
    vm.removePassengerFlightMeal = removePassengerFlightMeal;
    vm.getSelectedPassengerFlightMeal = getSelectedPassengerFlightMeal;
    vm.scrollToStart = scrollToStart;
    vm.scrollToEnd = scrollToEnd;
    vm.checkAllChoose = checkAllChoose;
    vm.hasAlias = backend.hasAlias;
    vm.getAvailablePassengersCount = utils.getAvailablePassengersCount;
    vm.checkServiceRemovalProhibited = backend.checkServiceRemovalProhibited;

    vm.canScrollRight = true;
    vm.canScrollLeft = false;

    vm.selectedFlight = 0;
    vm.selectedPassenger = 0;

    if (backend.getParam('site.externalStorageBaseUrl')) {
        vm.mealImagesPath = backend.getParam('site.externalStorageBaseUrl') + '/img/content/meal';
    } else {
        vm.mealImagesPath = './themes/websky/assets/static/img/content/meal';
    }

    backend.addOrderInfoListener(function (orderInfo) {
        vm.orderInfo = orderInfo;
    }, false, true);

    $scope.$watch('vm.service', function () {
        if (vm.mealMenu) {
            updateMealMenu();
        }
    });

    passengersTableContainer.on('scroll', mobileTableScrollHandler);

    if (vm.service.active) {
        updateMealMenu();
    }

    function switchService() {
        if (!vm.locked && !backend.checkServiceRemovalProhibited('meal')) {
            vm.service.active = !vm.service.active;
            if (vm.service.active) {
                selectFirstAvailablePassengerFlight();
            } else {
                backend.removeExtraService({
                    code: 'meal'
                });
            }
        }
    }

    function selectFlightPassenger(flightNum, passengerNum) {
        vm.selectedFlight = flightNum;
        vm.selectedPassenger = passengerNum;
        updateMealMenu();
    }

    function selectFirstAvailablePassengerFlight() {
        vm.selectedFlight = getFirstAvailableFlightNum();
        vm.selectedPassenger = getFirstAvailablePassengerNum(vm.selectedFlight);
        updateMealMenu();
    }

    function updateMealMenu() {
        vm.mealMenu = vm.service.itemsByPassengerSegments[vm.selectedPassenger][vm.selectedFlight];
        vm.mealMenuSubgroup = false;
    }

    function setPassengerFlightMeal(subgroupNum, mealItem) {
        var selectedPassengerFlightMeal = getSelectedPassengerFlightMeal(vm.selectedPassenger, vm.selectedFlight),
            newMealParams = {
                code: 'meal',
                passenger_id: vm.orderInfo.passengers[vm.selectedPassenger].id,
                segment_id: vm.orderInfo.plainFlights[vm.selectedFlight].id,
                subgroup: vm.service.subgroups[subgroupNum],
                service_type: mealItem.serviceType,
                rfisc: mealItem.rfisc
            };
        if (!vm.locked) {
            if (
                selectedPassengerFlightMeal &&
                !backend.checkServiceRemovalProhibited('meal', vm.selectedPassenger, vm.selectedFlight)
            ) {
                backend.removeExtraService({
                    code: 'meal',
                    passenger_id: vm.orderInfo.passengers[vm.selectedPassenger].id,
                    segment_id: vm.orderInfo.plainFlights[vm.selectedFlight].id,
                    service_type: selectedPassengerFlightMeal.serviceType,
                    rfisc: selectedPassengerFlightMeal.rfisc
                }, true).then(function () {
                    backend.modifyExtraService(newMealParams);
                });
            } else {
                backend.modifyExtraService(newMealParams);
            }
        }
    }

    function removePassengerFlightMeal(passengerNum, flightNum) {
        if (!vm.locked && !backend.checkServiceRemovalProhibited('meal', passengerNum, flightNum)) {
            backend.removeExtraService({
                code: 'meal',
                passenger_id: vm.orderInfo.passengers[passengerNum].id,
                segment_id: vm.orderInfo.plainFlights[flightNum].id
            });
        }
    }

    function getSelectedPassengerFlightMeal(passengerNum, flightNum) {
        var result,
            passengerSegmentServices,
            passengerSegmentMeal;
        if (vm.orderInfo.editableExtraServicesByPassengers) {
            if (vm.orderInfo.editableExtraServicesByPassengers[passengerNum]) {
                /* jshint maxlen: 150 */
                passengerSegmentServices = vm.orderInfo.editableExtraServicesByPassengers[passengerNum].passengerSegmentServices[flightNum];
                if (passengerSegmentServices) {
                    passengerSegmentMeal = _.findWhere(passengerSegmentServices, { code: 'meal' });
                    if (passengerSegmentMeal) {
                        result = passengerSegmentMeal.serviceItem;
                    }
                }
            }
        }
        return result;
    }

    function scrollToStart() {
        passengersTableContainer.scrollTo(0);
    }

    function scrollToEnd() {
        passengersTableContainer.scrollTo(passengersTableContainer[0].scrollWidth);
    }

    function mobileTableScrollHandler() {
        var scrollLeft = passengersTableContainer[0].scrollLeft,
            scrollWidth = passengersTableContainer[0].scrollWidth,
            clientWidth = passengersTableContainer[0].clientWidth,
            scrollRight = scrollWidth - clientWidth - scrollLeft;
        vm.canScrollRight = (scrollRight !== 0);
        vm.canScrollLeft = (scrollLeft !== 0);
        $scope.$apply();
    }

    function getFirstAvailableFlightNum() {
        var i;
        for (i = 0; i < vm.orderInfo.plainFlights.length; i++) {
            if (vm.service.availableBySegments[i]) {
                return i;
            }
        }
        return -1;
    }

    function getFirstAvailablePassengerNum(flightNum) {
        var i;
        if (vm.service.availableByPassengerSegments) {
            for (i = 0; i < vm.orderInfo.passengers.length; i++) {
                if (vm.service.availableByPassengerSegments[i][flightNum]) {
                    return i;
                }
            }
        }
        return -1;
    }

    function checkAllChoose() {
      // vm.orderInfo.passengers пассажиры
      // vm.orderInfo.plainFlights рейсы
      // vm.service.availableByPassengerSegments
      // vm.orderInfo.editableExtraServicesByPassengers
      // здесть храняться купленные или выбранные услуги, все даже seat
      // getSelectedPassengerFlightMeal(passengerNum, flightNum) он ципляет только если выбрана еда и возвращает объект
      // В это количество доступных рейсов где можно купить что-то и это количество должно совпадать с trueChoose
      var trueFlight = 0;
      // В этой перемнной храниться количество выбранных блюд
      var trueChoose = 0;

      for (var i = 0; i < vm.service.availableByPassengerSegments.length; i++) {
        for (var j = 0; j < vm.service.availableByPassengerSegments[i].length; j++) {
          if(vm.service.availableByPassengerSegments[i][j]) {
            trueFlight++;
          }
        }
      }

      for (var i = 0; i < vm.orderInfo.plainFlights.length; i++) {
        for (var j = 0; j < vm.orderInfo.passengers.length; j++) {
          if (getSelectedPassengerFlightMeal(j, i)) {
            trueChoose++;
          }
        }
      }

      return trueChoose == trueFlight;

    }

}
