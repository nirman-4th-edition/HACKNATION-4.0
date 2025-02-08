'use strict';

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav__item');
const navLinks = document.querySelector('.nav__links');
const navLinksMobile = document.querySelector('.nav__links-mobile');
const navHeight = header.getBoundingClientRect().height;
const allSections = document.querySelectorAll('.section');
const images = document.querySelectorAll('img[data-src]');
const btnHeader = document.querySelector('.btn--header');
const section1 = document.querySelector('#section--1');
const navLogo = document.querySelector('.nav__logo');
const btnScrollUp = document.querySelector('.btn--scroll');
const modalForm = document.querySelector('.modal__form');
const modalContact = document.querySelector('.modal__contact');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const btnOpenModalForm = document.querySelectorAll('.btn--show-modal');
const btnOpenModalContact = document.querySelector('.btn--show-modal-contact');
const overlays = document.querySelectorAll('.overlay');
const hidden = document.querySelector('.hidden');
const tabs = document.querySelectorAll('.values__tab');
const tabsContent = document.querySelectorAll('.values__content');
const tabsContainer = document.querySelector('.values__tab-container');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const footerLinks = document.querySelector('.footer__nav');
const openNav = document.querySelector('.nav__mobile--open');
const closeNav = document.querySelector('.nav__mobile--close');
const navMobile = document.querySelector('.nav__mobile');

// Page Navigation / Scrolling (Button) / Sticky Navigation

// Navigation - mobile
const activeNav = () => {
  navMobile.classList.toggle('nav__mobile--active');
};

openNav.addEventListener('click', () => {
  activeNav();
  closeNav.style.display = 'block';
  openNav.style.display = 'none';
  btnScrollUp.style.display = 'none';
});

closeNav.addEventListener('click', () => {
  activeNav();
  openNav.style.display = 'block';
  closeNav.style.display = 'none';
});

//Event delegation
navLinks.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const linkId = e.target.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

navLinksMobile.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const linkId = e.target.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({
      behavior: 'smooth',
    });
    activeNav();
    openNav.style.display = 'block';
    closeNav.style.display = 'none';
  }
});

footerLinks.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('footer__link')) {
    const linkId = e.target.getAttribute('href');
    if (linkId === '') return;
    document.querySelector(linkId).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Sticky navigation
const stickyNavigation = entries => {
  const [entry] = entries; // same as entries[0]
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: '-1px',
});

headerObserver.observe(header);

// Button scroll
btnHeader.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Logo scroll
navLogo.addEventListener('click', e => {
  header.scrollIntoView({ behavior: 'smooth' });
});

// Mobile view  page navigatioin
window.addEventListener('scroll', () => {
  if (navMobile.classList.contains('nav__mobile--active')) {
    btnScrollUp.style.display = 'none';
  } else {
    if (document.documentElement.scrollTop > 200) {
      btnScrollUp.style.display = 'block';
    } else {
      btnScrollUp.style.display = 'none';
    }
  }
});

// Menu - link accent

navLinks.addEventListener('click', e => {
  const current = document.querySelector('.current');
  current.classList.remove('current');
  e.target.parentNode.classList.add('current');
});

// Button - scroll up

btnScrollUp.addEventListener('click', e => {
  header.scrollIntoView({ behavior: 'smooth' });
  const current = document.querySelector('.current');
  current.classList.remove('current');
  e.target.parentNode.classList.add('current');
});

// Reveal Sections

const revalSections = (entries, observer) => {
  const [entry] = entries;
  const section = entry.target;

  if (entry.isIntersecting) {
    section.classList.remove('section--hidden');
    observer.unobserve(section);
  }
};

const sectionObserver = new IntersectionObserver(revalSections, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images

const lazyLoading = (entries, observer) => {
  const [entry] = entries;
  const img = entry.target;

  if (entry.isIntersecting) {
    img.src = img.dataset.src;
    img.classList.remove('lazy-img');
    observer.unobserve(img);
  }
};

const imgObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

images.forEach(img => imgObserver.observe(img));

// Modal Window

const openModal = target => {
  target.classList.remove('hidden');
  overlays.forEach(o => o.classList.remove('hidden'));
  closeNav.style.display = 'none';
  openNav.style.display = 'none';
  btnScrollUp.style.display = 'none';
};

const closeModal = target => {
  target.classList.add('hidden');
  openNav.style.display = 'block';
  btnScrollUp.style.display = 'block';
  overlays.forEach(o => o.classList.add('hidden'));
};

btnOpenModalForm.forEach(btn =>
  btn.addEventListener('click', () => {
    openModal(modalForm);
  })
);

btnOpenModalContact.addEventListener('click', () => {
  openModal(modalContact);
});

btnCloseModal.forEach(btn =>
  btn.addEventListener('click', () => {
    closeModal(modalForm);
    closeModal(modalContact);
  })
);

overlays.forEach(o =>
  o.addEventListener('click', () => {
    closeModal(modalForm);
    closeModal(modalContact);
  })
);

// Tabbed component

tabsContainer.addEventListener('click', e => {
  const clickedTab = e.target.closest('.values__tab');

  if (clickedTab) {
    tabs.forEach(tab => tab.classList.remove('values__tab--active'));
    tabsContent.forEach(tabContent =>
      tabContent.classList.remove('values__content--active')
    );

    clickedTab.classList.add('values__tab--active');

    document
      .querySelector(`.values__content--${clickedTab.dataset.tab}`)
      .classList.add('values__content--active');
  }
});

// Slider

let currentSlide = 0;
const maxSlide = slides.length - 1;

const switchSlide = slide => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

switchSlide(0);

const next = () => {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else currentSlide++;

  switchSlide(currentSlide);
};

const prev = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else currentSlide--;

  switchSlide(currentSlide);
};

btnRight.addEventListener('click', next);
btnLeft.addEventListener('click', prev);


