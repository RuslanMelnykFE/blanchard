const toggleHeaderPopup = ({ selectorBtnShow, selectorBntHide, headerModifier }) => {
  const header = document.querySelector('.js-header');
  const btnBurger = document.querySelector(selectorBtnShow);
  const btnHideNavList = document.querySelector(selectorBntHide);

  btnBurger.addEventListener('click', () => header.classList.add(headerModifier));
  btnHideNavList.addEventListener('click', () => header.classList.remove(headerModifier));
};

export default toggleHeaderPopup;
