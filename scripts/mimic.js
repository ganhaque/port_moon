// function isMobile() {
//   let match = window.matchMedia || window.matchMedia;
//   if (match) {
//     let mq = match("(pointer:coarse)");
//     return mq.matches;
//   }
//   return false;
// }
//
// let mobile = isMobile();
// let isSlow = mobile;
let isSlow = false;

if (!isSlow) {
  let flickering = setInterval(() => {
    if (isSlow || mirror) return clearInterval(flickering);
    let a = [];
    let t = "";
    let b = 0;
    for (let i = 0; i < 50; i++) a.push(+Math.min(Math.random() + 0.35).toFixed(2));
    for (let j = 0; j <= 50; j += 1) t += `${j}% { opacity: ${a[b++]?a[b]:1} }; `;
    document.getElementById("flickering-style").innerHTML = `
@keyframes flickering {
${t}
};
`;
  }, 300);
}


document.getElementById("switch").onclick = () => {
  switchOn = !switchOn;
  beep.play();
  if (switchOn) {
    document.getElementById("logo").className = "";
    letters.forEach(l => {
      if (fell && l.id === "logo-n") return;
      l.style.filter = "brightness(1) drop-shadow(0 0 0.75rem rgba(20, 220, 187, 0.35))";
    })
    document.getElementById("switch").src = "/images/electricity_on.png";
  } else {
    letters.forEach(l => {
      if (fell && l.id === "logo-n") return;
      l.style.filter = "brightness(0.2)";
    })
    document.getElementById("logo").className = "noanimation";
    document.getElementById("switch").src = "/images/electricity_off.png";
  }
}
