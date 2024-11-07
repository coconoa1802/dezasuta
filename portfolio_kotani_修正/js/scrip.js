$(function () {
  $(".hamburger").click(function () {
    $(".header-nav-sp").fadeToggle();
  });

  const $menu = $(".header-nav-sp");
  $(window).on("resize", function () {
    if ($(window).width() > 767 && $menu.is(":visible")) {
      // $menu.fadeOut();
      $menu.hide();
    }
  });
});

$(window).on('scroll', function() {
  $('section').each(function() {
      const sectionTop = $(this).offset().top;
      const scrollPos = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scrollPos + windowHeight > sectionTop + 100) { // 少し余裕を持たせる
          $(this).addClass('visible');
      }
  });
});

// スライダー
$(function () {
  $(".slider").slick({
    autoplaySpeed: 2000,
    autoplay: true,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: "10%",
    arrows: false,
    responsive: [{
      breakpoint: 767,
      settings: {
      slidesToShow: 1
      }
  }]
  });
});

// カテゴリー分け（フィルター機能）
$(function () {
  $('.works_contents_item').fadeIn().addClass('is-visible');
  updateOddEvenStyling();

  $('.custom-select-trigger').on('click', function () {
    $(this).closest('.custom-select').toggleClass('open');
  });

  $('.custom-option').on('click', function () {
    var selectedCategory = $(this).attr('data-value');
    $(this).closest('.custom-select').find('.custom-select-trigger span').text($(this).text());
    $(this).closest('.custom-options').find('.custom-option').removeClass('selected');
    $(this).addClass('selected');
    $(this).closest('.custom-select').removeClass('open');

    $('.works_contents_item').stop(true, true).fadeOut(300).promise().done(function() {
      if (selectedCategory === 'all') {
        $('.works_contents_item').addClass('is-visible').fadeIn(300);
      } else {
        $('.works_contents_item').removeClass('is-visible');
        $('.works_contents_item[data-item="' + selectedCategory + '"]').addClass('is-visible').fadeIn(300);
      }
      updateOddEvenStyling();
    });
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.custom-select').length) {
      $('.custom-select').removeClass('open');
    }
  });

  function updateOddEvenStyling() {
    const visibleItems = $('.works_contents_item.is-visible');
    const container = $('.works_flex');

    visibleItems.removeClass('odd-item even-item');
    container.removeClass('single-item');

    if (visibleItems.length === 1) {
      container.addClass('single-item');
    }

    visibleItems.each(function (index) {
      if (index % 2 === 0) {
        $(this).addClass('odd-item');
      } else {
        $(this).addClass('even-item');
      }
    });
  }
});

$(function () {
  $(".send-box").on("click", function () {
    var form = document.getElementById("myForm");
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://docs.google.com/forms/d/e/1FAIpQLSdab3YWObUTlVFvBTsXF0JybZeUWapyQN0ZeC8_lH-1JuwHLA/formResponse", 
      true
    );
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(formData);

    xhr.onload = function () {
      if (xhr.status === 200) {
        window.location.href = "./thanks.html";
      } else {
        alert("必須項目の入力をお願いいたします。");
      }
    };
  });
});

$(document).ready(function() {
  $('.more').on('click', function() {
    window.location.href = './profile.html';
  });

  $('.more-work').on('click', function() {
    window.location.href = './work.html';
  });
});

//SVGアニメーションの描画
var stroke;
stroke = new Vivus('mask', {//アニメーションをするIDの指定
    start:'manual',//自動再生をせずスタートをマニュアルに
    type: 'delayed',// アニメーションのタイプを設定
    duration: 150,//アニメーションの時間設定。数字が小さくなるほど速い
    forceRender: false,//パスが更新された場合に再レンダリングさせない
    animTimingFunction:Vivus.EASE,//動きの加速減速設定
}
);
// $(window).on('load',function(){
//     stroke.play();//SVGアニメーションの実行
//     $("#splash").delay(2500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェイドアウト
// 	  $("#splash_logo").delay(2500).fadeOut('slow');//ロゴを1.5秒（1500ms）待機してからフェイドアウト
// });



//同じ日付で2回目以降ならローディング画面非表示の設定
$(window).on('load',function(){

var myD = new Date();//日付データを取得
var myYear = String(myD.getFullYear());//年
var myMonth = String(myD.getMonth() + 1);//月
var myDate = String(myD.getDate());//日
var splash_text = $.cookie('accessdate'); //キーが入っていれば年月日を取得

if (splash_text != myYear + myMonth + myDate) {//cookieデータとアクセスした日付を比較↓
  stroke.play();//SVGアニメーションの実行
    $("#splash").delay(2500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェイドアウト
	  $("#splash_logo").delay(2500).fadeOut('slow');//ロゴを1.5秒（1500ms）待機してからフェイドアウト
  
  var myD = new Date();
  var myYear = String(myD.getFullYear());
  var myMonth = String(myD.getMonth() + 1);
  var myDate = String(myD.getDate());
  $.cookie('accessdate', myYear + myMonth + myDate); //accessdateキーで年月日を記録

}else {
    $("#splash").css("display", "none");//同日2回目のアクセスでローディング画面非表示
}  
});

