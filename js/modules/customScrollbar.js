const initSubnavSrollbar = () => {
  const subnavs = document.querySelectorAll('[data-scrollbar="subnav"]');

  [...subnavs].forEach((subnav) => {
    new SimpleBar(subnav, { autoHide: false });

    const simplebarContentWrapper = subnav.querySelector('.simplebar-content-wrapper');

    simplebarContentWrapper.setAttribute('tabindex', '-1');
  });
};

export default initSubnavSrollbar;
