window.onload = (function() {
  // $('#main_section').pagepiling({
  //   anchors: ['home', 'what-we-offers', 'about-us', 'our-projects', 'our-clients', 'testimonials', 'our-team', 'contact-us', 'instagram'],
  //   sectionsColor: ['#020300', '#18191E', '#ffffff', '#18191e', '#ffffff', '#0139c4', '#ffffff', '#ffffff', '#18191E'],
  //   scrollingSpeed: 700,
  //   easing: 'easeInOutQuad',
  //   loopBottom: false,
  //   loopTop: false,
  //   css3: true,
  //   direction: 'vertical',
  //   verticalCentered: true,
  //   navigation: {
  //     'position': 'right',
  //     'tooltips': ['Home', 'What We Offers', 'About Us', 'Our Projects', 'Our Clients', 'Testimonials', 'Our Team', 'Contact Us', 'Instagram']
  //   }
  // });

  // full page scroll
  var myFullpage = new fullpage('#main_section', {
    anchors: ['home', 'what-we-offers', 'about-us', 'our-projects', 'our-clients', 'testimonials', 'our-team', 'contact-us', 'footer'],
    sectionsColor: ['#020300', '#18191E', '#ffffff', '#18191e', '#282828', '#0139c4', '#202020', '#1f222a', '#17181c'],
    scrollingSpeed: 800,
    scrollOverflow: true,
    controlArrows: false,
    easing: 'easeInOutQuad',
    loopBottom: false,
    loopTop: false,
    css3: true,
    direction: 'vertical',
    verticalCentered: true,
    navigation: {
      'position': 'right',
      'tooltips': ['Home', 'What We Offers', 'About Us', 'Our Projects', 'Our Clients', 'Testimonials', 'Our Team', 'Contact Us', 'Instagram']
    }
  });
  // full page scroll

  $('.owl-carousel').owlCarousel({
    // stagePadding: 200,
    loop: true,
    margin: 10,
    nav: false,
    items: 1,
    lazyLoad: true,
    nav: true,
    responsive: {
      0: {
        stagePadding: 60
      },
      600: {
        stagePadding: 100
      },
      1000: {
        stagePadding: 200
      },
      1200: {
        stagePadding: 250
      },
      1400: {
        stagePadding: 100
      },
      1600: {
        stagePadding: 100
      },
      1800: {
        stagePadding: 100
      }
    }
  })

  // menu section
  // console.clear();

  const app = (() => {
    let body;
    let menu;
    let menuItems;

    const init = () => {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-icon');
      menuItems = document.querySelectorAll('.nav__list-item');

      applyListeners();
    }

    const applyListeners = () => {
      menu.addEventListener('click', () => toggleClass(body, 'nav-active'));
    }

    const toggleClass = (element, stringClass) => {
      if (element.classList.contains(stringClass))
        element.classList.remove(stringClass);
      else
        element.classList.add(stringClass);
    }

    init();
  })();
  // menu section

  // Testimonials
  var swiper = new Swiper('.tm-slider', {
    spaceBetween: 30,
    effect: 'fade',
    // loop: true,
    // autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    // autoHeight: true,
    pagination: {
      el: '.tm-slider__pagination',
      clickable: true,
    }
  });
  // Testimonials

  // Our Projects
  var slidersContainer = document.querySelector('.sliders-container');
  // Initializing the numbers slider
  var msNumbers = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--numbers',
    range: [1, 4],
    rangeContent: function(i) {
      return '0' + i;
    },
    style: {
      transform: [{
        scale: [0.4, 1]
      }],
      opacity: [0, 1]
    },
    interactive: false
  });

  // Initializing the titles slider
  var titles = [
    'King of the Ring Fight',
    'Sound of Streets',
    'Urban Fashion',
    'Windy Sunset'
  ];
  var msTitles = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--titles',
    range: [0, 3],
    rangeContent: function(i) {
      return '<h3>' + titles[i] + '</h3>';
    },
    vertical: true,
    reverse: true,
    style: {
      opacity: [0, 1]
    },
    interactive: false
  });

  // Initializing the links slider
  var msLinks = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--links',
    range: [0, 3],
    rangeContent: function() {
      return '<a class="ms-slide__link">View Case</a>';
    },
    vertical: true,
    interactive: false
  });

  // Get pagination items
  var pagination = document.querySelector('.pagination');
  var paginationItems = [].slice.call(pagination.children);

  // Initializing the images slider
  var msImages = new MomentumSlider({
    // Element to append the slider
    el: slidersContainer,
    // CSS class to reference the slider
    cssClass: 'ms--images',
    // Generate the 4 slides required
    range: [0, 3],
    rangeContent: function() {
      return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
    },
    // Syncronize the other sliders
    sync: [msNumbers, msTitles, msLinks],
    // Styles to interpolate as we move the slider
    style: {
      '.ms-slide__image': {
        transform: [{
          scale: [1.5, 1]
        }]
      }
    },
    // Update pagination if slider change
    change: function(newIndex, oldIndex) {
      if (typeof oldIndex !== 'undefined') {
        paginationItems[oldIndex].classList.remove('pagination__item--active');
      }
      paginationItems[newIndex].classList.add('pagination__item--active');
    }
  });

  // Select corresponding slider item when a pagination button is clicked
  pagination.addEventListener('click', function(e) {
    if (e.target.matches('.pagination__button')) {
      var index = paginationItems.indexOf(e.target.parentNode);
      msImages.select(index);
    }
  });
  // Our Projects

  // Team
  var SliceSlider = {
    settings: {
      delta: 0,
      currentSlideIndex: 0,
      scrollThreshold: 40,
      slides: $('.slide'),
      numSlides: $('.slide').length,
      navPrev: $('.js-prev'),
      navNext: $('.js-next'),
    },
    init: function() {
      s = this.settings;
      this.bindEvents();
    },
    bindEvents: function() {
      // Scrollwheel & trackpad
      // s.slides.on({
      //   'DOMMouseScroll mousewheel': SliceSlider.handleScroll
      // });
      // On click prev
      s.navPrev.on({
        'click': SliceSlider.prevSlide
      });
      // On click next
      s.navNext.on({
        'click': SliceSlider.nextSlide
      });
      // On Arrow keys
      // $(document).keyup(function(e) {
      //   // Left or back arrows
      //   if ((e.which === 37) || (e.which === 38)) {
      //     SliceSlider.prevSlide();
      //   }
      //   // Down or right
      //   if ((e.which === 39) || (e.which === 40)) {
      //     SliceSlider.nextSlide();
      //   }
      // });
    },

    /**Interept scroll direction*/
    // handleScroll: function(e) {
    //   // Scrolling up
    //   if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
    //     s.delta--;
    //     if (Math.abs(s.delta) >= s.scrollThreshold) {
    //       SliceSlider.prevSlide();
    //     }
    //   }
    //   // Scrolling Down
    //   else {
    //     s.delta++;
    //
    //     if (s.delta >= s.scrollThreshold) {
    //       SliceSlider.nextSlide();
    //     }
    //   }
    //   // Prevent page from scrolling
    //   return false;
    // },

    /*** Show Slide */
    showSlide: function() {
      // reset
      s.delta = 0;
      // Bail if we're already sliding
      if ($('.team_slide').hasClass('is-sliding')) {
        return;
      }
      // Loop through our slides
      s.slides.each(function(i, slide) {
        // Toggle the is-active class to show slide
        $(slide).toggleClass('is-active', (i === s.currentSlideIndex));
        $(slide).toggleClass('is-prev', (i === s.currentSlideIndex - 1));
        $(slide).toggleClass('is-next', (i === s.currentSlideIndex + 1));
        // Add and remove is-sliding class
        $('.team_slide').addClass('is-sliding');
        setTimeout(function() {
          $('.team_slide').removeClass('is-sliding');
        }, 1000);
      });
    },

    /** Previous Slide */
    prevSlide: function() {
      // If on first slide, loop to last
      if (s.currentSlideIndex <= 0) {
        s.currentSlideIndex = s.numSlides;
      }
      s.currentSlideIndex--;

      SliceSlider.showSlide();
    },
    /** Next Slide*/
    nextSlide: function() {
      s.currentSlideIndex++;
      // If on last slide, loop to first
      if (s.currentSlideIndex >= s.numSlides) {
        s.currentSlideIndex = 0;
      }
      SliceSlider.showSlide();
    },
  };
  SliceSlider.init();

  // Team
});
document.querySelectorAll('.menu-icon').forEach(btn => {
  btn.addEventListener('click', e => {
    btn.classList.toggle('active');
  });
});
