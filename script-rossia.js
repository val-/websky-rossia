
    $(function () {
        $('body').on('click', 'a.switch-lang-ru-js', function () {
            window.location.search = '?lang=ru';
            return false;
        });
        $('body').on('click', 'a.switch-lang-en-js', function () {
            window.location.search = '?lang=en';
            return false;
        });
    });


(function() {
    var footerHeight = 573,
        pushBlockPosition, footerBlockPosition;
    window.setInterval(checkStickedFooter, 200);

    function checkStickedFooter() {
        var newPushBlockOffset, newFooterBlockOffset, isPushChanged = false,
            isFooterChanged = false,
            stickedState = jQuery('footer.footer').hasClass('sticky-footer'),
            newStickedState;
        try {
            newPushBlockOffset = jQuery('div.push').offset().top;
            newFooterBlockOffset = jQuery('footer.footer').offset().top;
        } catch (err) {}
        if (newPushBlockOffset !== pushBlockPosition) {
            pushBlockPosition = newPushBlockOffset;
            isPushChanged = true;
        }
        if (newFooterBlockOffset !== footerBlockPosition) {
            footerBlockPosition = newFooterBlockOffset;
            isFooterChanged = true;
        }
        if (isPushChanged || isFooterChanged) {
            if (stickedState) {
                newStickedState = ((footerBlockPosition - pushBlockPosition) > 0);
            } else {
                newStickedState = ((footerBlockPosition - pushBlockPosition) > footerHeight);
            }
            if (newStickedState !== stickedState) {
                stickedState = newStickedState;
                jQuery('footer.footer').toggleClass('sticky-footer', stickedState);
            }
        }
    }
})();



function toggleAcceptCheckbox() {
    if (document.getElementById('conditions-agree').checked) {
        document.getElementById('search-order-form-btn').disabled = false;
        document.getElementById('search-order-form-btn').classList.remove('disabled');
    } else {
        document.getElementById('search-order-form-btn').disabled = true;
        document.getElementById('search-order-form-btn').classList.add('disabled');
    }
}
$(document).ready(function () {
    
    $(document).on("click", ".js-add-services", function () {
        window.scrollTo(0,0);
    });
    
    $(document).on('click', '.dropdown-button.active', function(){
        $(this).addClass('drop-active');
        $(this).parents('.item__i').find('.drop.active').removeClass('show_js');
    });
    
    $(document).on('click', '.dropdown-button.active.drop-active', function(){
        $(this).removeClass('drop-active');
        $(this).parents('.item__i').find('.drop.active').addClass('show_js');
    });
    
    $(document).on('click', '.dropdown-meal.active .hide-meal', function(){
       $(this).parent().addClass('meal-hide');
       $(this).parents('.item__i').find('.drop.active').removeClass('show_js');
    });
    
    $(document).on('click', '.dropdown-meal.active .open-meal', function(){
       $(this).parent().removeClass('meal-hide');
       $(this).parents('.item__i').find('.drop.active').addClass('show_js');
    });
    
    $(document).on("click", ".js-mob-icon_info", function() {
      if ($("span.infoBox_mobile").hasClass("infoBox_active")) {
        $("span.infoBox_mobile").removeClass("infoBox_active");
      } else {
        $("span.infoBox_mobile").addClass("infoBox_active");
      }
    });
    
    $(document).mouseup(function(e) { 
      var div = $("span.infoBox_mobile"); 
      if (!div.is(e.target) 
        &&
        div.has(e.target).length === 0) {
        $("span.infoBox_mobile").removeClass("infoBox_active");
      }
    });

    $(document).click( function(event){
        if( $(event.target).closest(".js-mob-icon_info").length || $(event.target).closest(".js-mob-infoBox").length ) 
            return;
        $(".js-mob-infoBox").css({"visibility": "hidden", "opacity": "0"});
        event.stopPropagation();
    });
    
    /*$("body").on("DOMNodeInserted", ".customScroll_js", function () {
        setTimeout(function () {
            if ($('.seatSelect .seat.active').length && $(".customScroll_js").length) {
                var pos = $('.seatSelect .seat.active')[0].offsetTop;
                $(".customScroll_js").mCustomScrollbar("scrollTo", pos, 1);
            }
            else if ($('.seatSelect .seat.selectedByOrderPassenger').length && $(".customScroll_js").length) {
                var pos = $('.seatSelect .seat.selectedByOrderPassenger')[0].offsetTop;
                $(".customScroll_js").mCustomScrollbar("scrollTo", pos, 1);
            }
        }, 1);
    });*/
    
    //meal
    $(document).on("click", ".btn-arrow_choose-none-meal", function() {
      $(this).css("display", "none");
      $('.btn_choose-none-meal').css("display", "block");
      $(this).parents('.item__i').find('.drop.active').removeClass('show_js');
    });
    
    $(document).on("click", ".btn_choose-none-meal", function() {
      $(this).css("display", "none");
      $('.btn-arrow_choose-none-meal').css("display", "block");
      $(this).parents('.item__i').find('.drop.active').addClass('show_js');
    });
    
    //seat
    $(document).on("click", ".btn-arrow_choose-none-seat", function() {
      $(this).css("display", "none");
      $('.btn_choose-none-seat').css("display", "block");
      $(this).parents('.item__i').find('.drop.active').removeClass('show_js');
    });
    
    $(document).on("click", ".btn_choose-none-seat", function() {
      $(this).css("display", "none");
      $('.btn-arrow_choose-none-seat').css("display", "block");
      $(this).parents('.item__i').find('.drop.active').addClass('show_js');
    });
    
    $(document).on("click", ".dropdown-meal .hide-meal", function() {
      $(this).parents('.item__i').find('.drop.active').removeClass('show_js');
    });
    
    $(document).on("click", ".dropdown-meal .open-meal", function() {
      $(this).parents('.item__i').find('.drop.active').addClass('show_js');
    });
    
    //
    $(document).on("click", ".checkoutServices__i .passengersTable .food .item", function() {
      $("#mCSB_1_container, #mCSB_1_dragger_vertical").css("top", "0px");
      console.log("1");
    });
    
    $(document).on("click", ".foodSorting ul li a", function() {
      $("#mCSB_1_container, #mCSB_1_dragger_vertical").css("top", "0px");
      console.log("2");
    });


});