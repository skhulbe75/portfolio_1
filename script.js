const projects = document.querySelectorAll(".project");

const r = document.querySelector(":root");

function scrollHandler() {
  projects.forEach((project, idx) => {
    const projectTop = project.getBoundingClientRect().top;
    const rotate = dummy(projectTop, 800, 0, -15, 3);
    r.style.setProperty(`--rotate${idx}`, `${rotate}deg`);
  });
}
const dummy = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
window.addEventListener("scroll", scrollHandler);
