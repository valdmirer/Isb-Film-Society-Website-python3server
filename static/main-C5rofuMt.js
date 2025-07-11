// Scroll Header
const el_header = document.getElementById('mainHeader');
let lastScroll = 0;
let disable_scroll = false;

// Past Events
const el_eventsWrapper = document.querySelector(".swiper-wrapper");
const el_nextButton = document.getElementById("abuttonright");
const el_events = document.querySelectorAll(".swiper-slide");
const el_prevButton = document.getElementById("abuttonleft");
let active_ = 0;

// Toggle Menu
const el_menu = document.getElementById("menuToggle");
const el_menuContainer = document.getElementById("menu");
const el_body = document.getElementById("body");
const el_menuNodes = el_menu.querySelectorAll(".a-nav-toggle__label");

window.addEventListener('scroll', function(e) {
    if (!disable_scroll) {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            console.log("lesgo")
            // At top of page - always show
            el_header.classList.add('t--header');
            el_header.classList.add('visible');
            return;
        }
        if (currentScroll > 20) {
            el_header.classList.remove('t--header');            
        }
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling DOWN and past 100px - hide
            // header.classList.add('t--header');
            el_header.classList.remove('visible');
        } else if (currentScroll < lastScroll) {
            // Scrolling UP - show
            el_header.classList.remove('t--header');
            el_header.classList.add('visible');
        }
        
        lastScroll = currentScroll;
    } else {
        e.preventDefault();
    }
});

el_menu.addEventListener('click', function() {
    el_menuContainer.classList.toggle("hide--menu");
    el_menuContainer.classList.toggle("v-enter-active");
    el_menuContainer.children[0].style.pointerEvents = "all";
    el_header.classList.add("t--header");
    el_body.classList.toggle("hide--overflow");

    el_menuNodes.forEach((el) => {
        el.classList.toggle("u-visually-hidden");
    });

    el_menu.classList.toggle("is-active");

    disable_scroll = !disable_scroll;
});

// 1. Set up the observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('iv-enter-active'); // Trigger animation/visibility
      entry.target.classList.add('iv-enter'); // Trigger animation/visibility
    }
  });
}, { 
  threshold: 0.1 // Trigger when 10% of element is visible
});

// 2. Target elements
document.querySelectorAll('.a-iv-fade-up').forEach(el => {
  observer.observe(el);
});

function isMobileUserAgent() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

let width = 0;
el_eventsWrapper.style.transition = `.7s`;

const colors = ["#CFF3E1", "#F0F3CF", "#F3CFD5", "#F3E2CF"];
el_nextButton.addEventListener("click", () => {
  if (active_ != el_events.length-1)
    if (!isMobileUserAgent)
      move_(368, 1);
    else
      move_(window.innerWidth, 1);

  if (active_ > 0)
    el_prevButton.classList.remove("a-nav-arrow--disabled");
  if (active_ == el_events.length - 1)
    el_nextButton.classList.add("a-nav-arrow--disabled");

  //if (active_ > 1) {
  //  el_nextButton.classList.remove("a-nav-arrow--disabled");
  //}
});
el_prevButton.addEventListener("click", () => {
  if (active_ != 0)
    if (!isMobileUserAgent)
      move_(-368, -1);
    else
      move_(-window.innerWidth, -1);
  if (active_ == 0)
    el_prevButton.classList.add("a-nav-arrow--disabled");
  if (active_ != el_events.length - 1)
    el_nextButton.classList.remove("a-nav-arrow--disabled");
});

function move_(m=368, b=1, c="-") {

  width += m;
  el_events[active_].classList.remove("swiper-slide-active");
  el_events[active_].classList.remove("swiper-slide-visible");

  active_ += b;

  document.getElementById("o--color-section").style.backgroundColor = colors[active_];

  el_events[active_].classList.remove("swiper-slide-next");
  el_events[active_].classList.add("swiper-slide-active");
  el_events[active_].classList.add("swiper-slide-visible");

  el_eventsWrapper.style.transform = `translate3d(${c}${width}px, 0px, 0px)`;
  
  //el_events[active_+b].classList.add("swiper-slide-visible");
  //el_events[active_+b].classList.add("swiper-slide-next");
}

window.addEventListener("load", () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    el_header.classList.remove("visible");
  }
});
