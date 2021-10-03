const initSubnavSrollbar = () => {
  const subnavs = document.querySelectorAll('[data-simplebar="subnav"]');

  [...subnavs].forEach((subnav) =>(new SimpleBar(subnav, { autoHide: false })));
};

export default initSubnavSrollbar;
