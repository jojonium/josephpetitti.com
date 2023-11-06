/* (C) 2019-2023 Joseph Petitti | https://josephpetitti.com/license.txt */

window.onload = () => {
  let cfg = "/assets/particle-cfg.json";

  // Use snow config in December, January, and February
  const utcMonth = new Date().getUTCMonth();
  if (utcMonth <= 1 || utcMonth === 11) {
    cfg = "/assets/snow-cfg.json";
  }

  particlesJS.load("particles-js", cfg);
};
if (typeof fadein === "function") fadein();
