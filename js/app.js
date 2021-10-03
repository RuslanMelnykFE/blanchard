import toggleHeaderPopup from './modules/popups.js'
import dropdownNavbar from './modules/dropdown.js';
import initSubnavSrollbar from './modules/customScrollbar.js';
import initHeroSlider from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  toggleHeaderPopup({
    selectorBtnShow: '.js-burger',
    selectorBntHide: '.js-btn-hide-navlist',
    headerModifier: 'header__open-navbar',
  });

  toggleHeaderPopup({
    selectorBtnShow: '.js-btn-show-search',
    selectorBntHide: '.js-btn-hide-search',
    headerModifier: 'header__open-search',
  });

  dropdownNavbar.init();
  initSubnavSrollbar();
  initHeroSlider();
})
