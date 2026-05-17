const cursorGlow = document.querySelector(".cursor-glow");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const profileCard = document.querySelector(".profile-card");

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
});

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("section[id]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navItems.forEach((item) => item.classList.remove("active"));
        link?.classList.add("active");
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

profileCard?.addEventListener("mousemove", (event) => {
  const rect = profileCard.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 12;
  const rotateX = ((y / rect.height) - 0.5) * -12;
  profileCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
});

profileCard?.addEventListener("mouseleave", () => {
  profileCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
});
