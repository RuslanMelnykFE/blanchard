import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js';

const initHeroSlider = () => {
  new Swiper('.js-hero-slider', {
    slidesPerView: 1,
    speed: 800,
    loop: true,
    allowTouchMove: false,
    autoplay: {
      delay: 20000,
    },
  });
};

export default initHeroSlider;
