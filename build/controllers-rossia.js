!function e(r,s,n){function t(i,o){if(!s[i]){if(!r[i]){var l="function"==typeof require&&require;if(!o&&l)return l(i,!0);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var g=s[i]={exports:{}};r[i][0].call(g.exports,function(e){var s=r[i][1][e];return t(s?s:e)},g,g.exports,e,r,s,n)}return s[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)t(n[i]);return t}({1:[function(e,r,s){"use strict";function n(e,r,s,n){function t(){m.locked||s.checkServiceRemovalProhibited("meal")||(m.service.active=!m.service.active,m.service.active?i():s.removeExtraService({code:"meal"}))}function a(e,r){m.selectedFlight=e,m.selectedPassenger=r,o()}function i(){m.selectedFlight=v(),m.selectedPassenger=h(m.selectedFlight),o()}function o(){m.mealMenu=m.service.itemsByPassengerSegments[m.selectedPassenger][m.selectedFlight],m.mealMenuSubgroup=!1}function l(e,r){var n=g(m.selectedPassenger,m.selectedFlight),t={code:"meal",passenger_id:m.orderInfo.passengers[m.selectedPassenger].id,segment_id:m.orderInfo.plainFlights[m.selectedFlight].id,subgroup:m.service.subgroups[e],service_type:r.serviceType,rfisc:r.rfisc};m.locked||(n&&!s.checkServiceRemovalProhibited("meal",m.selectedPassenger,m.selectedFlight)?s.removeExtraService({code:"meal",passenger_id:m.orderInfo.passengers[m.selectedPassenger].id,segment_id:m.orderInfo.plainFlights[m.selectedFlight].id,service_type:n.serviceType,rfisc:n.rfisc},!0).then(function(){s.modifyExtraService(t)}):s.modifyExtraService(t))}function c(e,r){m.locked||s.checkServiceRemovalProhibited("meal",e,r)||s.removeExtraService({code:"meal",passenger_id:m.orderInfo.passengers[e].id,segment_id:m.orderInfo.plainFlights[r].id})}function g(e,r){var s,n,t;return m.orderInfo.editableExtraServicesByPassengers&&m.orderInfo.editableExtraServicesByPassengers[e]&&(n=m.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],n&&(t=_.findWhere(n,{code:"meal"}),t&&(s=t.serviceItem))),s}function u(){S.scrollTo(0)}function d(){S.scrollTo(S[0].scrollWidth)}function f(){var r=S[0].scrollLeft,s=S[0].scrollWidth,n=S[0].clientWidth,t=s-n-r;m.canScrollRight=0!==t,m.canScrollLeft=0!==r,e.$apply()}function v(){var e;for(e=0;e<m.orderInfo.plainFlights.length;e++)if(m.service.availableBySegments[e])return e;return-1}function h(e){var r;if(m.service.availableByPassengerSegments)for(r=0;r<m.orderInfo.passengers.length;r++)if(m.service.availableByPassengerSegments[r][e])return r;return-1}function p(){for(var e=0;e<m.orderInfo.plainFlights.length;e++)for(var r=0;r<m.orderInfo.passengers.length;r++)if(g(r,e))return!0;return!1}var m=this,S=r.find("div.passengersTableContainer");m.switchService=t,m.selectFlightPassenger=a,m.selectFirstAvailablePassengerFlight=i,m.setPassengerFlightMeal=l,m.removePassengerFlightMeal=c,m.getSelectedPassengerFlightMeal=g,m.scrollToStart=u,m.scrollToEnd=d,m.checkAllChoose=p,m.hasAlias=s.hasAlias,m.getAvailablePassengersCount=n.getAvailablePassengersCount,m.checkServiceRemovalProhibited=s.checkServiceRemovalProhibited,m.canScrollRight=!0,m.canScrollLeft=!1,m.selectedFlight=0,m.selectedPassenger=0,s.getParam("site.externalStorageBaseUrl")?m.mealImagesPath=s.getParam("site.externalStorageBaseUrl")+"/img/content/meal":m.mealImagesPath="./themes/websky/assets/static/img/content/meal",s.addOrderInfoListener(function(e){m.orderInfo=e},!1,!0),e.$watch("vm.service",function(){m.mealMenu&&o()}),S.on("scroll",f),m.service.active&&o()}angular.module("app").component("esMealRossiya",{templateUrl:"components/es-meal-rossiya/es-meal-rossiya.html",controller:["$scope","$element","backend","utils",n],controllerAs:"vm",bindings:{service:"=service",locked:"=locked"}})},{}],2:[function(e,r,s){"use strict";function n(e,r,s,n,t){function a(){F.locked||n.checkServiceRemovalProhibited("seat")||(F.service.active=!F.service.active,F.service.active?c():(F.modifyError=!1,n.removeExtraService({code:"seat"}).then(i,function(e){e.error&&(F.modifyError=e.error)})))}function i(){F.seatMap=!1,F.selectedFlight=-1,F.selectedPassenger=-1}function o(e){x=e?"0px":jQuery("#seatMapCont .mCSB_container").css("top")}function l(e,r){o(F.selectedFlight!==e),F.selectedFlight=e,F.selectedPassenger=r,g()}function c(){F.selectedFlight=f(),F.selectedPassenger=v(F.selectedFlight),g()}function g(){-1!==F.selectedPassenger&&-1!==F.selectedFlight&&(F.loadingSeatMap=!0,F.seatMapError=!1,n.seatMap(F.orderInfo.passengers[F.selectedPassenger].id,F.orderInfo.plainFlights[F.selectedFlight].id).then(function(e){F.seatMap=e,F.loadingSeatMap=!1,s(function(){jQuery("#seatMapCont .mCSB_container").css("top",x)})},function(e){F.seatMapError=e.error,F.loadingSeatMap=!1}))}function u(e,r,s){F.locked||e.available&&r&&(o(),F.modifyError=!1,n.modifyExtraService({code:"seat",passenger_id:F.orderInfo.passengers[F.selectedPassenger].id,segment_id:F.orderInfo.plainFlights[F.selectedFlight].id,value:s+e.number,subgroup:F.service.commonSubgroup,rfisc:e.rfisc||"",service_type:"F"}).then(g,function(e){e.error&&(F.modifyError=e.error)}))}function d(){F.sunInfoByFlights=[],F.orderInfo.plainFlights.forEach(function(e,r){n.sunInfo(e.origincity,e.departuredate,e.departuretime,e.destinationcity,e.arrivaldate,e.arrivaltime).then(function(e){F.sunInfoByFlights[r]=e})})}function f(){var e;for(e=0;e<F.orderInfo.plainFlights.length;e++)if(F.service.availableBySegments[e])return e;return-1}function v(e){var r;if(F.service.availableByPassengerSegments)for(r=0;r<F.orderInfo.passengers.length;r++)if(F.service.availableByPassengerSegments[r][e])return r;return-1}function h(){I.scrollTo(0)}function p(){I.scrollTo(I[0].scrollWidth)}function m(){var r=I[0].scrollLeft,s=I[0].scrollWidth,n=I[0].clientWidth,t=s-n-r;F.canScrollRight=0!==t,F.canScrollLeft=0!==r,e.$apply()}function S(e){var r=t.getAvailablePassengersCount(e);return r+F.orderInfo.passengers.filter(function(e){return!e.hasSeats}).length}function P(e,r){F.locked||n.checkServiceRemovalProhibited("seat",e,r)||(F.modifyError=!1,n.removeExtraService({code:"seat",passenger_id:F.orderInfo.passengers[e].id,segment_id:F.orderInfo.plainFlights[r].id}).then(function(){F.selectedFlight===r&&g()},function(e){e.error&&(F.modifyError=e.error)}))}function b(e,r){var s,n,t;return F.orderInfo.editableExtraServicesByPassengers&&F.orderInfo.editableExtraServicesByPassengers[e]&&(n=F.orderInfo.editableExtraServicesByPassengers[e].passengerSegmentServices[r],n&&(t=_.findWhere(n,{code:"seat"}),t&&(s=t.serviceItem))),s}function y(){for(var e=0;e<F.orderInfo.plainFlights.length;e++)for(var r=0;r<F.orderInfo.passengers.length;r++)if(b(r,e))return!0;return!1}var F=this,I=r.find("div.passengersTableContainer"),x="0px";F.switchService=a,F.selectFlightPassenger=l,F.selectFirstAvailablePassengerFlight=c,F.setPassengerFlightSeat=u,F.getSelectedPassengerFlightMeal=b,F.checkAllChoose=y,F.hasAlias=n.hasAlias,F.scrollToStart=h,F.scrollToEnd=p,F.getAvailablePassengersCount=t.getAvailablePassengersCount,F.getAvailablePassengersCountWrap=S,F.removePassengerFlightSeat=P,F.checkServiceRemovalProhibited=n.checkServiceRemovalProhibited,F.canScrollRight=!0,F.canScrollLeft=!1,n.addOrderInfoListener(function(e){F.orderInfo=e},!1,!0),d(),I.on("scroll",m),F.service.active&&c()}angular.module("app").component("esSeatRossiya",{templateUrl:"components/es-seat-rossiya/es-seat-rossiya.html",controller:["$scope","$element","$timeout","backend","utils",n],controllerAs:"vm",bindings:{service:"=service",locked:"=locked"}})},{}],3:[function(e,r,s){"use strict";function n(e,r){function s(){o.availablePassengers=o.passengers.filter(function(e,r){return o.service.availableByPassengerSegments[r]&&o.service.availableByPassengerSegments[r][o.currentFlightIndex]})}function n(){o.mealMenuSubgroupMobile===!1?o.mealMenuSubgroup=!1:o.mealMenuSubgroup=1*o.mealMenuSubgroupMobile}function t(){for(var e=!1,r=o.currentPassengerIndex+1;r<o.passengers.length;r++)if(o.service.availableByPassengerSegments[r]&&o.service.availableByPassengerSegments[r][o.currentFlightIndex]){o.selectFlightPassenger(o.currentFlightIndex,r),e=!0;break}if(!e)for(var s=0;s<o.passengers.length;s++)if(o.service.availableByPassengerSegments[s]&&o.service.availableByPassengerSegments[s][o.currentFlightIndex]){o.selectFlightPassenger(o.currentFlightIndex,s);break}}function a(){for(var e=!1,r=o.currentPassengerIndex-1;r>-1;r--)if(o.service.availableByPassengerSegments[r]&&o.service.availableByPassengerSegments[r][o.currentFlightIndex]){o.selectFlightPassenger(o.currentFlightIndex,r),e=!0;break}if(!e)for(var s=o.passengers.length-1;s>-1;s--)if(o.service.availableByPassengerSegments[s]&&o.service.availableByPassengerSegments[s][o.currentFlightIndex]){o.selectFlightPassenger(o.currentFlightIndex,s);break}}function i(e){var r=e.reduce(function(e,r){return e.concat(r)},[]);return o.mealMenuSubgroup===!1?r:e}var o=this;o.close=jQuery.fancybox.close,o.mealMenuSubgroupMobileChange=n,o.mealMenuSubgroup=!1,o.mealMenuSubgroupMobile="false",o.subgroupItems=e.createOptionsForUiSelect(o.subgroups,"all"),o.switchNext=t,o.switchPrev=a,o.arrayString=i,r.$watch("vm.currentFlightIndex",function(){s()})}angular.module("app").component("popupMealRossiya",{templateUrl:"components/popup-meal-rossiya/popup-meal-rossiya.html",controller:["utils","$scope",n],controllerAs:"vm",bindings:{mealMenu:"=menu",passenger:"=passenger",currentPassengerIndex:"=",currentFlightIndex:"=",passengers:"=passengers",flight:"=flight",setPassengerFlightMeal:"=handler",clearPassengerFlightMeal:"&remove",getPassengerFlightMeal:"=get",subgroups:"=subgroups",mealImagesPath:"=path",service:"=",selectFlightPassenger:"=select"}})},{}],4:[function(e,r,s){"use strict";console.log("app: ",angular.module("app")),e("./components/popup-meal-rossiya/popup-meal-rossiya"),e("./components/es-meal-rossiya/es-meal-rossiya"),e("./components/es-seat-rossiya/es-seat-rossiya")},{"./components/es-meal-rossiya/es-meal-rossiya":1,"./components/es-seat-rossiya/es-seat-rossiya":2,"./components/popup-meal-rossiya/popup-meal-rossiya":3}]},{},[4]);
//# sourceMappingURL=controllers-rossia.js.map
