const dropdownNavbar = {
  navbarLinks: document.querySelectorAll('[aria-haspopup]'),
  subNavLinks: document.querySelectorAll('.subnav__link'),
  keys: {
    tab:    9,
    enter:  13,
    esc:    27,
    space:  32,
    left:   37,
    up:     38,
    right:  39,
    down:   40
  },
  currentNavbarLinkIdx: 0,
  subNavLinkIdx: 0,

  init() {
    this.disableSrollDocument();
    [...this.navbarLinks].forEach((navLink, idx) => this.appendEventNavLinks(navLink, idx));
    this.appendEventSubnavLinks();
    document.addEventListener('click', ({ target }) => {
      const isNavLink = target.hasAttribute('aria-haspopup') || target.classList.contains('.subnav__link');

      if (!isNavLink) {
        this.currentNavbarLinkIdx = 0;
        this.subNavLinkIdx = 0;
        this.removeAllActiveClass();
        return false;
      }
    })
  },

  disableSrollDocument() {
    document.addEventListener('keydown', (e) => {
      const { keyCode } = e;

      if (keyCode === this.keys.down ||  keyCode === this.keys.up) {
        e.preventDefault();
      }
    })
  },

  appendEventSubnavLinks() {
    [...this.subNavLinks].forEach((subnavNavLink) => {
      subnavNavLink.addEventListener('keydown', (e) => {
        const { target, keyCode } = e;
        const parent = target.closest('.subnav__list');

        switch (keyCode) {
          case this.keys.tab:
            if (e.shiftKey) {
              this.navbarLinks[this.currentNavbarLinkIdx].setAttribute('tabindex', '-1');
            }
            this.tabEventHandler(e.shiftKey);
            break;
          case this.keys.esc:
            this.gotoNavbarLinkIdx(this.currentNavbarLinkIdx);
            this.navbarLinks[this.currentNavbarLinkIdx].focus();
            break;
          case this.keys.down:
            this.gotoSubNavItem(parent, this.subNavLinkIdx + 1);
            break;
          case this.keys.up:
            this.gotoSubNavItem(parent, this.subNavLinkIdx - 1);
            break;
        }
      })
    })
  },

  tabEventHandler(shiftKey) {
    if (shiftKey) {
      this.gotoNavbarLinkIdx(this.currentNavbarLinkIdx - 1);
    } else {
      this.gotoNavbarLinkIdx(this.currentNavbarLinkIdx + 1);
    }
  },

  appendEventNavLinks(navLink, navLinkIdx) {
    const parentSelector = '.nav-list__item';
    const parent = navLink.closest(parentSelector);

    if (navLinkIdx === 0) {
      navLink.addEventListener('focus', () => this.currentNavbarLinkIdx = 0);
    };

    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;
      this.currentNavbarLinkIdx = navLinkIdx;
      this.subNavLinkIdx = 0;
      this.gotoSubNavItem(parent, this.subNavLinkIdx);
      this.dropdownSubnavEventHandler({ target, parent });
    });

    navLink.addEventListener('focus', (e) => {
      e.preventDefault();
      this.subNavLinkIdx = 0;
      this.removeAllActiveClass();
    });

    navLink.addEventListener('keydown', (e) => this.navLinkKeydownEvent(e, parent));
  },

  navLinkKeydownEvent(e, parent) {
    const { target, keyCode } = e;
    switch (keyCode) {
      case this.keys.tab:
				this.tabEventHandler(e.shiftKey);
				break;
      case this.keys.enter:
      case this.keys.down:
        target.click();
        this.gotoSubNavItem(parent.querySelector('.subnav__list'), 0);
        break;
      case this.keys.up:
        target.click();
        const subnav = parent.querySelector('.subnav__list');
        const subindex = subnav.querySelectorAll('.subnav__link').length - 1;
        this.gotoSubNavItem(subnav, subindex);
        break;
    }
  },

  dropdownSubnavEventHandler({ target, parent }) {
    const hasActiveClass = parent.classList.contains('nav-list__item_active');

      if (hasActiveClass) {
        parent.classList.remove('nav-list__item_active');
        target.setAttribute('aria-expanded', false);
        return false;
      }
      this.removeAllActiveClass();
      parent.classList.add('nav-list__item_active');
      target.setAttribute('aria-expanded', true);
  },

  removeAllActiveClass() {
    const navListItems = document.querySelectorAll('.navbar_position_bottom .nav-list__item');

    [...navListItems].forEach((navListItem) => {
      const navLink = navListItem.querySelector('[aria-haspopup]');

      navListItem.classList.remove('nav-list__item_active');
      navLink.setAttribute('aria-expanded', false);
      navLink.setAttribute('tabindex', 0)
    });
  },

  gotoNavbarLinkIdx(idx) {
    if (idx === this.navbarLinks.length) {
      this.currentNavbarLinkIdx = this.navbarLinks.length - 1;
      this.removeAllActiveClass();
      return false;
    }

    if (idx < 0) {
      this.currentNavbarLinkIdx = 0;
      this.removeAllActiveClass();
      return false;
    }

    this.currentNavbarLinkIdx = idx;
  },

  gotoSubNavItem(subnav, idx) {
    const subnavItems = subnav.querySelectorAll('.subnav__link');
    let currentIdx = idx;

    if (currentIdx === subnavItems.length) {
      currentIdx = 0;
    } else if (currentIdx < 0) {
      currentIdx = subnavItems.length - 1;
    }

    subnavItems[currentIdx].focus();
    this.subNavLinkIdx = currentIdx;
  },
};

export default dropdownNavbar;
