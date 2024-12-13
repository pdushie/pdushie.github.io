// Slider script
//Documentation: https://swiperjs.com/element
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
const swiper = new Swiper('.slider-wrapper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disabledOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //Responsive breakPoints
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});