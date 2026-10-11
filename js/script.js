document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

const navLinks = mainNav.querySelectorAll("a");
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

const heroSlideshow = document.getElementById("hero-slideshow");
if (heroSlideshow) {
  const heroSlides = heroSlideshow.querySelectorAll(".hero-slide");
  let heroCurrent = 0;

  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[heroCurrent].classList.remove("active");
      heroCurrent = (heroCurrent + 1) % heroSlides.length;
      heroSlides[heroCurrent].classList.add("active");
    }, 4500);
  }
}

const slideshow = document.getElementById("about-slideshow");
if (slideshow) {
  const slides = slideshow.querySelectorAll(".slide");
  const dots = slideshow.querySelectorAll(".dot");
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }, 3500);
}

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsSection.querySelectorAll(".stat-number").forEach(animateCount);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(statsSection);
}
