// スライダー
$(function () {
  $(".slider").slick({
    autoplaySpeed: 2000,
    autoplay: true,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: "10%",
    arrows: false
  });
});

// カテゴリー分け（フィルター機能）
$(function () {
  $('.custom-select-trigger').on('click', function () {
    $(this).closest('.custom-select').toggleClass('open');
  });

  $('.custom-option').on('click', function () {
    var selectedCategory = $(this).attr('data-value');
    $(this).closest('.custom-select').find('.custom-select-trigger span').text($(this).text());
    $(this).closest('.custom-options').find('.custom-option').removeClass('selected');
    $(this).addClass('selected');
    $(this).closest('.custom-select').removeClass('open');

    if (selectedCategory === 'all') {
      $('.works_contents_item').removeClass('is-visible').hide().fadeIn(300).addClass('is-visible');
    } else {
      $('.works_contents_item').removeClass('is-visible').hide();
      $('.works_contents_item[data-item="' + selectedCategory + '"]').fadeIn(300).addClass('is-visible');
    }
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.custom-select').length) {
      $('.custom-select').removeClass('open');
    }
  });
});


