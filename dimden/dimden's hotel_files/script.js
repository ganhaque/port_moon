let spoilers_ahead = "Easter egg spoilers ahead!!!!";

function isMobile() {
  let match = window.matchMedia || window.msMatchMedia;
  if (match) {
    let mq = match("(pointer:coarse)");
    return mq.matches;
  }
  return false;
}
let mobile = isMobile();
let isSlow = mobile;
if (!isSlow) {
  let before = Date.now(),
  now, fps = 0;
  let last25 = [];
  let i25 = 0;
  let fpsElement = document.getElementById("fps");
  requestAnimationFrame(function loop() {
    now = Date.now();
    fps = Math.round(1000 / (now - before));
    before = now;
    last25.push(fps);
    if (last25.length > 25) last25.shift();
    if (i25++ > 10) {
      i25 = 0;
      let cfps = Math.round(last25.reduce((a, b) => a + b, 0) / 25);
      if (!isFinite(cfps)) {
        fpsElement.innerText = '';
      } else {
        fpsElement.innerText = cfps;
      }
    }
    requestAnimationFrame(loop);
  });
  let perf = setInterval(() => {
    if (Math.round(last25.reduce((a, b) => a + b, 0) / 25) < 30) {
      clearInterval(perf);
      document.getElementById("debug").innerText = "Slow device, disabled effects";
      setTimeout(() => {
        document.getElementById("debug").innerText = "";
      }, 5000);
      isSlow = true;
      let root = document.querySelector(':root');
      root.style.setProperty('--body-text-shadow', 'none');
      root.style.setProperty('--green-text-shadow', 'none');
      root.style.setProperty('--firefox-body-shadow', 'none');
      root.style.setProperty('--firefox-green-shadow', 'none');
      root.style.setProperty('--letter-shadow', 'none');
      kelvin.classList.remove("kelvin-light");
    }
  }, 2500);
};
if (isSlow) {
  document.getElementById('cool-sites').style.display = "none";
}
let navlinks = Array.from(document.getElementsByClassName("navlink"));
setInterval(() => {
  if (mirror) return;
  let random = Math.floor(Math.random() * navlinks.length);
  navlinks[random].style.color = "#2c9080";
  setTimeout(() => {
    navlinks[random].style.color = "white";
  }, 500);
}, 2000);
let switchOn = true;
let beep = document.createElement("audio");
beep.src = "/sounds/beep.mp3";
beep.style.display = "none";
document.body.appendChild(beep);
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
let letters = Array.from(document.getElementsByClassName("letter"));
let d = document.getElementById("logo-d");
let n = document.getElementById("logo-n");
let hotel = document.getElementById("hotel");
let fell = false;
if (!isSlow) setInterval(() => {
  if (mirror) return;
  if (isSlow) return;
  let fn = () => {
    if (!switchOn) return;
    d.style.filter = 'brightness(0)';
    setTimeout(() => d.style.filter = 'brightness(0.9) drop-shadow(0 0 0.75rem rgba(20, 220, 187, 0.35))', 30);
  };
  let int = setInterval(fn, 60);
  setTimeout(() => clearInterval(int), 700 + Math.random() * 500)
}, 7000);
let c = 0,
c2 = false;
let r = 4;
n.addEventListener("click", () => {
  if (mirror) return;
  if (c2) return;
  n.style.transform = `rotate(${r++}deg)`;
  n.style.webkitTransform = `rotate(${r}deg)`;
  if (c++ > 5) {
    n.style.color = `rgba(100, 100, 100, 0.9)`;
    let i = 3;
    let f = 0;
    let f2 = true;
    let f3 = true;
    fell = true;
    n.style.filter = "brightness(0.2)";
    n.classList.add("noanimation");
    let int = setInterval(() => {
      if (i > window.screen.availWidth / 4) {
        clearInterval(int);
      };
      n.style.top = `${i+=f}px`;
      n.style.transform = `rotate(${r++}deg)`;
      c2 = true;
      if (f2) {
        if (f3) {
          f++;
          f3 = false
        } else f3 = true;
        f2 = false
      } else f2 = true;
    }, 5);
  }
});
let playing = false;
const relativeTimePeriods = [
  [31536000, 'year'],
  [2419200, 'month'],
[604800, 'week'],
  [86400, 'day'],
  [3600, 'hour'],
  [60, 'minute'],
  [1, 'second']
];

function relativeTime(date) {
  if (!(date instanceof Date)) date = new Date(date * 1000);
  const seconds = (new Date() - date) / 1000;
  for (let [secondsPer, name] of relativeTimePeriods) {
    if (seconds >= secondsPer) {
      const amount = Math.floor(seconds / secondsPer);
      return `${amount} ${name}${amount&&amount!==1?'s':''} ago`;
    }
  }
  return 'Just now';
}

function fetchListen() {
  fetch("https://dimden.dev/services/nowplaying").then(i => i.json()).then(i => {
    if (i['@attr'] && i['@attr'].nowplaying) {
      playing = true;
      document.getElementById("pulser").className = "blob";
      document.getElementById("currentlylistening").innerText = "Currently listening:";
      document.getElementById("status").innerText = "Online!";
      document.getElementById("status").style.color = "lime";
      document.getElementById("status").style.textShadow = "rgb(4 255 214 / 0%) 0px 0px 10px, rgb(0 255 236 / 17%) 0px 0px 20px, rgb(2 230 0 / 17%) 0px 0px 30px, rgb(0 230 178 / 0%) 0px 0px 40px, rgb(0 230 27 / 24%) 0px 0px 50px, rgb(0 230 178 / 0%) 0px 0px 60px, rgb(0 230 122 / 0%) 0px 0px 70px";
      document.getElementById("lastplayed").innerText = "";
    } else {
      playing = false;
      document.getElementById("pulser").className = "inblob";
      document.getElementById("currentlylistening").innerText = "Last song:";
      if (i.date && i.date.uts) document.getElementById("lastplayed").innerText = `Played ${relativeTime(new Date(+(i.date.uts+"000")))}`;
}
    if (i.url) document.getElementById("songlink").href = i.url;
    else document.getElementById("songlink").href = "#";
    if (i.image && i.image[0] && i.image[0]["#text"]) document.getElementById("albumcover").src = i.image[0]["#text"];
    else document.getElementById("albumcover").src = "/images/defaultmusic.jpg";
let songname = document.getElementById("songname");
    if (i.name) {
      songname.innerText = i.name;
      if (i.name.length > 11 && songname.tagName === "SPAN") songname.outerHTML = songname.outerHTML.replace(/<span(.*?)/g, "<marquee$1");
      if (i.name.length <= 11 && songname.tagName === "MARQUEE") songname.outerHTML = songname.outerHTML.replace(/<marquee(.*?)/g, "<span$1");
    } else {
      songname.innerText = "Undefined";
      if (songname.tagName === "MARQUEE") songname.outerHTML = songname.outerHTML.replace(/<marquee(.*?)/g, "<span$1");
    }
    if (i.artist) document.getElementById("artist").innerText = i.artist["#text"];
    else document.getElementById("artist").innerText = "Unknown";
  });
}
setTimeout(fetchListen, 25);
setInterval(fetchListen, 7525);

function checkStatus() {
  fetch("https://dimden.dev/services/slave/status/").then(i => {
  return i.json();
  }).then(i => {
      if (i.dimden === "online" || playing) {
        document.getElementById("status").innerText = "Online!";
        document.getElementById("status").style.color = "lime";
        document.getElementById("status").style.textShadow = "rgb(4 255 214 / 0%) 0px 0px 10px, rgb(0 255 236 / 17%) 0px 0px 20px, rgb(2 230 0 / 17%) 0px 0px 30px, rgb(0 230 178 / 0%) 0px 0px 40px, rgb(0 230 27 / 24%) 0px 0px 50px, rgb(0 230 178 / 0%) 0px 0px 60px, rgb(0 230 122 / 0%) 0px 0px 70px";
      } else {
        document.getElementById("status").innerText = "Offline!";
        document.getElementById("status").style.color = "red";
        document.getElementById("status").style.textShadow = "0 0 10px #04ffd518, 0 0 20px #00ffee13, 0 0 30px #e600002f, 0 0 40px #00e6b200, 0 0 50px #e600003d, 0 0 60px #e6000029, 0 0 70px #e6000057";
      }
      if (i.dimdendev === "online") {
        document.getElementById("dimdendev-status").innerText = " OK ";
        document.getElementById("dimdendev-status").className = "status-ok";
      } else {
document.getElementById("dimdendev-status").innerText = "FAIL";
        document.getElementById("dimdendev-status").className = "status-fail";
      }
      if (i.proxy === "online") {
        document.getElementById("proxy-status").innerText = " OK ";
        document.getElementById("proxy-status").className = "status-ok";
      } else {
        document.getElementById("proxy-status").innerText = "FAIL";
        document.getElementById("proxy-status").className = "status-fail";
      }
      if (i.utix === "online") {
        document.getElementById("utix-status").innerText = " OK ";
        document.getElementById("utix-status").className = "status-ok";
      } else {
        document.getElementById("utix-status").innerText = "FAIL";
        document.getElementById("utix-status").className = "status-fail";
      }
      if (i.frizwoods === "online") {
        document.getElementById("frizwoods-status").innerText = " OK ";
        document.getElementById("frizwoods-status").className = "status-ok";
      } else {
        document.getElementById("frizwoods-status").innerText = "FAIL";
        document.getElementById("frizwoods-status").className = "status-fail";
      }
      if (i.owopbot === "online") {
        document.getElementById("owopbot-status").innerText = " OK ";
        document.getElementById("owopbot-status").className = "status-ok";
      } else {
        document.getElementById("owopbot-status").innerText = "FAIL";
        document.getElementById("owopbot-status").className = "status-fail";
      }
      if (i.cnplt === "online") {
        document.getElementById("cnplt-status").innerText = " OK ";
        document.getElementById("cnplt-status").className = "status-ok";
      } else {
        document.getElementById("cnplt-status").innerText = "FAIL";
        document.getElementById("cnplt-status").className = "status-fail";
      }
      if (i.lune === "online") {
        document.getElementById("lune-status").innerText = " OK ";
        document.getElementById("lune-status").className = "status-ok";
      } else {
        document.getElementById("lune-status").innerText = "FAIL";
        document.getElementById("lune-status").className = "status-fail";
      }
      if (i.lune !== "online" || i.cnplt !== "online" || i.owopbot !== "online" || i.frizwoods !== "online" || i.utix !== "online" || i.proxy !== "online" || i.dimdendev !== "online") {
        document.getElementById("system-status").innerText = "NOT OK";
        document.getElementById("system-status").className = "status-fail";
      } else {
        document.getElementById("system-status").innerText = "OK";
document.getElementById("system-status").className = "status-ok";
      }
      document.getElementById("slave-status").innerText = " OK ";
      document.getElementById("slave-status").className = "status-ok";
    }).catch(e => {
      document.getElementById("slave-status").innerText = "FAIL";
      document.getElementById("slave-status").className = "status-fail";
    })
}
setTimeout(checkStatus, 25);
setInterval(checkStatus, 30025);
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
let startEqualizer = function(audio) {
  let ctx = new AudioContext();
  let analyser = ctx.createAnalyser();
  let audioSrc = ctx.createMediaElementSource(audio);
  audioSrc.connect(analyser);
  analyser.connect(ctx.destination);
  let canvas = document.getElementById('doom-canvas'),
  cwidth = canvas.width,
  cheight = canvas.height - 2,
  meterWidth = 10,
  capHeight = 2,
  capStyle = '#fff',
  meterNum = 800 / (10 + 2),
  capYPositionArray = [];
  ctx = canvas.getContext('2d'), gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(1, '#fff');
  gradient.addColorStop(0.8, '#ff0');
  gradient.addColorStop(0.55, '#f00');

  function renderFrame() {
    let array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    let step = Math.round(array.length / meterNum);
    ctx.clearRect(0, 0, cwidth, cheight);
    for (let i = 0; i < meterNum; i++) {
      let value = array[i * step];
      if (capYPositionArray.length < Math.round(meterNum)) {
        capYPositionArray.push(value);
      };
      ctx.fillStyle = capStyle;
      if (value < capYPositionArray[i]) {
        ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
      } else {
        ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
        capYPositionArray[i] = value;
};
      ctx.fillStyle = gradient;
      ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
    }
    requestAnimationFrame(renderFrame);
  }
  renderFrame();
};
let text = "";
let pon = false;
let doomPlaying = false;
if (!isSlow) document.onkeydown = e => {
  if (mirror) return;
  text += e.key.toLowerCase();
  if (text.length > 50) text = text.slice(1);
  if (text.endsWith("polybius")) {
    if (pon) return;
    pon = true;
    let letters = Array.from(document.getElementsByClassName("letter"));
    letters.forEach(l => {
      l.style.display = "none";
    });
    document.getElementById("wires").style.display = "none";
    document.getElementById("mewo").style.display = "none";
    document.getElementById("switch").style.display = "none";
    let img = document.createElement("img");
    img.src = "/polybius.webp";
    img.height = "80";
    document.getElementById("logo").appendChild(img);
    document.getElementById("copyright").innerText = "(c) 1981 SINNESLÖSCHEN INC."
  }
  else if (text.endsWith("lain")) {
    document.body.style.backgroundImage = "url(/images/lain.gif)";
    document.getElementById("bg").src = "/images/lain.gif";
  }
  else if (text.endsWith("sulfur") || text.endsWith("sulphur") || text.endsWith("brimstone")) {
    document.getElementById('brimstone').hidden = false;
  }
  else if (text.endsWith("doom")) {
    if (doomPlaying) return;
    doomPlaying = true;
    let doom = new Audio("/sounds/theonlythingtheyfearisyou.mp3");
    doom.play();
    startEqualizer(doom);
    doom.onplay = () => {
      setTimeout(() => {
        document.getElementById('dynamic-style').innerHTML = `
h2, a, .chat-name, #hotel {
transition: 0.3s;
color: red !important;
}
#bg {
filter: hue-rotate(145deg);
animation-name: redfade;
animation-duration: 3s;
animation-iteration-count: infinite;
}
#logo {
filter: hue-rotate(192deg);
transition: 0.3s;
}
#dimdengif {
transition: 0.3s;
filter: brightness(0.1) grayscale(1);
}
.moon-icon {
transition: 0.3s;
filter: hue-rotate(295deg);
}
#pre-ad, #projects-banner img, #pre-moon, #buttons-misc, #buttons-sites, #my-button {
transition: 0.3s;
filter: grayscale(1);
}
#pre-hit {
transition: 0.3s;
filter: hue-rotate(232deg);
}
@keyframes redfade {
0% { backdrop-filter: hue-rotate(145deg) }
50% { backdrop-filter: hue-rotate(145deg) brightness(0.4) }
100% { backdrop-filter: hue-rotate(145deg) }
}
#doom-canvas {
position: sticky !important;
margin-top: -1050px;
transition: 0.5s;
height: unset !important;
}
`;
      }, 9500);
    }
    stopRain();
  } else if (text.endsWith("gravity") && document.activeElement !== document.getElementById("message")) {
    let script = document.createElement("script");
    script.src = "/js/gravity.js";
    document.body.appendChild(script);
    stopRain();
  }
};
(function(document) {
  let width;
  let body = document.body;
  let container = document.createElement('span');
  container.innerHTML = Array(100).join('wi');
  container.style.cssText = ['position:absolute', 'width:auto', 'font-size:128px', 'left:-99999px'].join(' !important;');
  let getWidth = function(fontFamily) {
    container.style.fontFamily = fontFamily;
    body.appendChild(container);
    width = container.clientWidth;
    body.removeChild(container);
    return width;
  };
  let monoWidth = getWidth('monospace');
  let serifWidth = getWidth('serif');
  let sansWidth = getWidth('sans-serif');
  window.isFontAvailable = function(font) {
    return monoWidth !== getWidth(font + ',monospace') || sansWidth !== getWidth(font + ',sans-serif') || serifWidth !== getWidth(font + ',serif');
  };
})(document);
let fallbackFont = false;
setTimeout(() => {
  if (!isFontAvailable('MS UI Gothic')) {
    fallbackFont = true;
    document.body.style.fontFamily = "FallbackMSGothic, Tahoma";
  }
}, 10);
let kirby = document.getElementById("kirby");
kirby.onclick = () => {
  if (mirror) return;
  kirby.onclick = null;
  let audio = document.createElement("audio");
  audio.src = "/sounds/kirby.mp3";
  audio.style.display = "none";
  document.body.appendChild(audio);
  audio.play();
  let x = 0;
  let int = setInterval(() => {
    x += 2;
    if (x > 250) return clearInterval(int);
    let y = -(((x - 50) ** 2 - 1000) / 200);
    kirby.style.left = x + "px";
    kirby.style.top = y + "px";
  }, 10);
}
let hotline = false;
setInterval(() => {
  if (mirror) return;
  if (fallbackFont) {
    if (hotline) {
      document.getElementById("hotline-previous").innerText = "<-";
      document.getElementById("hotline-next").innerText = "->";
    } else {
      document.getElementById("hotline-previous").innerText = "<";
      document.getElementById("hotline-next").innerText = ">";
    }
  } else {
    if (hotline) {
      document.getElementById("hotline-previous").innerText = "<---";
      document.getElementById("hotline-next").innerText = "--->";
    } else {
      document.getElementById("hotline-previous").innerText = "<--";
      document.getElementById("hotline-next").innerText = "-->";
    }
  }
  hotline = !hotline;
}, 500);
if (!isSlow)
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
  document.getElementById("moon-iframe").height = "160";
}
let client, chatJoin = 0,
currentId = undefined;
let cursors = [];
let ignoreLocals = 0;
let newmsgsound = new Audio("/sounds/imrcv.mp3");
newmsgsound.volume = 0.25;
document.body.append(newmsgsound);
let cursorsDiv = document.getElementById('cursors');
setInterval(() => {
  for (let c of cursors) {
    if (Date.now() - c.lastMove > 60000) {
      if (!c.cursor.hidden) c.cursor.hidden = true;
    } else {
      if (c.cursor.hidden) c.cursor.hidden = false;
    }
  }
}, 1000);

function escapeHTML(unsafe) {
  return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "’");
}
if (localStorage.admin) {
  document.getElementById('message').maxLength = 99999;
}

function connectChat() {
  client = new WebSocket("wss://dimden.dev/services/chat/");
  client.binaryType = "arraybuffer";
  client.onmessage = msg => {
    if (typeof(msg.data) !== "string") {
      let data = new Int32Array(msg.data);
      let id = data[0];
      let x = data[1];
      let y = data[2];
      let h = data[3];
      x = Math.min(x, innerWidth - rectLeft - 50);
      y = Math.min(y, window.document.body.clientHeight - 100);
      if (id === currentId) return;
      let c = cursors.find(c => c.id === id);
      if (!c) {
        let cursor = document.createElement('img');
        cursor.src = '/images/cur.png';
        cursor.className = 'cursor';
        cursor.id = `cursor-${joinedId}`;
        cursorsDiv.append(cursor);
        c = {
          id,
          cursor,
          x,
          y,
          h
        }
        cursors.push(c);
      }
      c.x = x;
      c.y = y;
      c.h = h;
      c.lastMove = Date.now();
      let ratio = document.body.clientHeight / h;
      c.cursor.style.left = x + "px";
      c.cursor.style.top = y * ratio + "px";
      c.cursor.hidden = false;
      if (x === 0 && y === 0) c.cursor.hidden = true;
      else c.cursor.hidden = false;
      return;
    }
    if (msg.data.length === 0) return;
    if (msg.data.startsWith("Your ID: ")) {
      currentId = +msg.data.split(": ")[1];
      return;
    }
    if (msg.data.startsWith("Joined: ")) {
      let [joinedId, x, y, h] = msg.data.split(": ")[1].split(",").map(Number);
      if (joinedId === currentId) return;
      x = Math.min(x, innerWidth - rectLeft - 50);
      y = Math.min(y, window.document.body.clientHeight - 100);
      let cursor = document.createElement('img');
      cursor.src = '/images/cur.png';
      cursor.className = 'cursor';
      let ratio = document.body.clientHeight / h;
      cursor.style.left = x + "px";
      cursor.style.top = y * ratio + "px";
      cursor.hidden = true;
      if (x === 0 && y === 0) cursor.hidden = true;
      else cursor.hidden = false;
      cursor.id = `cursor-${joinedId}`;
      cursorsDiv.append(cursor);
      cursors.push({
        id: joinedId,
        cursor,
        x,
        y,
        h,
        lastMove: Date.now() - 61000
      });
      return;
    }
    if (msg.data.startsWith("Left: ")) {
      let leftId = +msg.data.split(": ")[1];
      if (leftId === currentId) return;
      let cursor = document.getElementById(`cursor-${leftId}`);
      if (cursor) {
        cursor.remove();
      }
      cursors = cursors.filter(c => c.id !== leftId);
      return;
    }
    let admin = msg.data.startsWith("!");
    let name = document.createElement("span");
    name.innerText = msg.data.split(">")[0] + "> ";
    name.className = "chat-name";
    if (admin) name.className = "chat-name chat-name-admin";
    if (msg.data.startsWith("<LOCAL>")) {
      if (ignoreLocals > Date.now() && !msg.data.includes("Disconnected")) return;
      name.className = "chat-name chat-name-local";
    } else {
      if (!isTabFocused || document.activeElement.id !== 'message') {
        if (Date.now() - chatJoin > 2500) newmsgsound.play();
      }
    }
    let text = document.createElement("span");
    text.innerHTML = admin ? msg.data.split(">").slice(1).join(">").split(" | ").slice(0, -1).join(" | ") : escapeHTML(msg.data.split(">").slice(1).join(">").split(" | ").slice(0, -1).join(" | "));
    text.innerHTML = text.innerHTML.replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank'>$1</a>");
    text.className = `chat-msg ${msg.data.startsWith("<LOCAL>")?"chat-msg-local":""}`;
    let date = document.createElement("span");
    let d = new Date(+msg.data.split(" | ").slice(-1));
    let rd = new Date();
    date.innerText = " " + (rd.getDate() === d.getDate() ? d.toLocaleTimeString() : d.toLocaleString());
    date.className = "chat-date";
    date.title = `${(new Date(+msg.data.split(" | ").slice(-1))).toLocaleTimeString([],{timeZone:'Europe/Kiev',hour12:false})} in Ukraine`;
    let messages = document.getElementById("messages");
    messages.append(name, text, date, document.createElement("br"));
    setTimeout(() => {
      if (messages.scrollHeight - messages.scrollTop < 300 || Date.now() - chatJoin < 5000) messages.scrollTop = messages.scrollHeight;
    })
  };
  client.onopen = () => {
    chatJoin = Date.now();
    setTimeout(() => {
      if (localStorage.admin) {
        client.send(JSON.stringify({
          operation: "admin",
          value: localStorage.admin
        }));
      }
      if (localStorage.nick) {
        client.send(JSON.stringify({
          operation: "nick",
          value: localStorage.nick
        }));
      }
    }, 100);
  }
  client.onclose = () => {
    currentId = undefined;
    let messages = document.getElementById("messages");
    messages.innerText = "";
    client.onmessage({
      data: `<LOCAL> Disconnected from chat. | ${Date.now()}`
    });
    setTimeout(connectChat, 1000);
    for (let c of cursors) {
      c.cursor.remove();
    }
    cursors = [];
  };
}
setInterval(() => {
  if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify({
    operation: "ping",
    value: Date.now().toString()
  }));
}, 1000);
connectChat();
document.getElementById("send").onclick = () => {
  let msg = document.getElementById("message").value;
  if (msg.startsWith("/nick ")) {
    localStorage.setItem("nick", msg.slice(6));
    client.send(JSON.stringify({
      operation: "nick",
      value: msg.slice(6)
    }));
  } else if (msg.startsWith("/admin ")) {
    localStorage.setItem("admin", msg.slice(7));
    client.send(JSON.stringify({
      operation: "admin",
      value: msg.slice(7)
    }));
  } else if (msg.startsWith("/ban ")) {
    client.send(JSON.stringify({
      operation: "ban",
      value: msg.slice(5)
    }));
  } else {
    if (msg.startsWith('/')) return;
    client.send(JSON.stringify({
      operation: "send",
      value: msg
    }));
  }
  document.getElementById("message").value = "";
};
document.getElementById("message").onkeydown = e => {
  if (e.key === "Enter") {
    document.getElementById("send").click();
  }
}

function getRects() {
  let b00 = document.getElementById('mainbox').getBoundingClientRect();
  let b01 = document.getElementById('linksdiv').getBoundingClientRect();
  window.rectLeft = b00.left;
  window.rectRight = b01.right;
  window.rectTop = b00.top;
  window.rectWidth = rectRight - rectLeft;
  window.rectHeight = document.body.clientHeight;
}
getRects();
window.addEventListener('resize', getRects, {
  passive: true
});
window.addEventListener('scroll', getRects, {
  passive: true
});
setInterval(getRects, 1000);
window.xPercent = 0;
window.yPercent = 0;
let lastSend = Date.now();
document.addEventListener('mousemove', e => {
  if (cursorHidden || mobile) return;
  let x = e.pageX - rectLeft;
  let y = e.pageY - rectTop - window.scrollY;
  if (Date.now() - lastSend > 25 && client.readyState === WebSocket.OPEN) {
    lastSend = Date.now();
    let ab = new Int16Array(3);
    ab[0] = x;
    ab[1] = y;
    ab[2] = document.body.clientHeight;
    client.send(ab);
  }
}, {
    passive: true
  });
let elementD = document.getElementById("logo-d");
let elementD0 = document.getElementById("logo-d0");
let elementN = document.getElementById("logo-n");
let buzz = document.createElement("audio");
buzz.id = "buzz";
buzz.src = "/sounds/ElectHum.mp3";
buzz.loop = true;
buzz.volume = 0;
buzz.style.display = "none";
document.body.append(buzz);
buzz.play().catch(e => {
  document.onclick = () => {
    document.getElementById("debug").innerText = "Sounds ON";
    setTimeout(() => {
      document.getElementById("debug").innerText = "";
    }, 2500);
    buzz.play();
    document.onclick = null;
  }
});

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function calculateDistance(elem, mouseX, mouseY, isLogo) {
  let offset = getOffset(elem);
  return Math.floor(Math.sqrt(Math.pow(mouseX - (offset.left + ((elem.width ? elem.width : 100) / 2)), 2) + Math.pow(mouseY - (offset.top + ((elem.height ? elem.height : 1) / 2)), 2)));
}
let lastVolumeEdit = Date.now();
if (!isSlow) document.addEventListener("mousemove", e => {
  if (lastVolumeEdit + 25 > Date.now()) return;
  lastVolumeEdit = Date.now();
  let mX = e.pageX;
  let mY = e.pageY;
  let distance1 = calculateDistance(elementD, mX, mY, true);
  let distance2 = calculateDistance(elementD0, mX, mY, true);
  let distance3 = calculateDistance(elementN, mX, mY, true);
  let distance4 = calculateDistance(hotel, mX, mY, true);
  if (Math.min(distance1, distance2, distance3, distance4) !== distance4 && !switchOn) {
    return buzz.volume = 0;
  }
  let volume = +((-Math.sqrt(50 * Math.min(distance1, distance2, fell ? 999999 : distance3, distance4)) + 100) / 100).toFixed(3);
  if (volume < 0) volume = 0;
  if (volume > 0.6) volume = 0.6;
  buzz.volume = volume;
});

function onVisibilityChange(callback) {
  let visible = true;
  if (!callback) {
    throw new Error('no callback given');
  }

  function focused() {
    if (!visible) {
      callback(visible = true);
    }
  }

  function unfocused() {
    if (visible) {
      callback(visible = false);
    }
  }
  if ('hidden' in document) {
    visible = !document.hidden;
    document.addEventListener('visibilitychange', function() {
      (document.hidden ? unfocused : focused)()
    });
  }
  if ('mozHidden' in document) {
    visible = !document.mozHidden;
    document.addEventListener('mozvisibilitychange', function() {
      (document.mozHidden ? unfocused : focused)()
    });
  }
  if ('webkitHidden' in document) {
    visible = !document.webkitHidden;
    document.addEventListener('webkitvisibilitychange', function() {
      (document.webkitHidden ? unfocused : focused)()
    });
  }
  if ('msHidden' in document) {
    visible = !document.msHidden;
    document.addEventListener('msvisibilitychange', function() {
      (document.msHidden ? unfocused : focused)()
    });
  }
  if ('onfocusin' in document) {
    document.onfocusin = focused;
    document.onfocusout = unfocused;
  }
  window.onpageshow = window.onfocus = focused;
  window.onpagehide = window.onblur = unfocused;
};
let isTabFocused = true;
onVisibilityChange(async function(visible) {
  isTabFocused = visible;
  if (!visible) {
    buzz.src = "";
    buzz.remove();
    if (bgm) bgm.volume = 0;
  } else {
    buzz = document.createElement("audio");
    buzz.src = "/sounds/ElectHum.mp3";
    buzz.loop = true;
    buzz.volume = 0;
    buzz.style.display = "none";
    try {
      await buzz.play()
    } catch (e) {}
    document.body.append(buzz);
    if (bgm) bgm.volume = 1;
    let rects = kelvin.getBoundingClientRect();
    localStorage.kelvinX = rects.x;
    localStorage.kelvinY = rects.y;
    kelvinBus.postMessage({
      x: rects.x,
      y: rects.y
    });
  }
});
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
let mewoSound;
if (localStorage.punishment) document.getElementById('mewo').src = '/images/mewo_cut.png';
document.getElementById('mewo').onclick = () => {
  if (localStorage.punishment) {
    return alert("Look what you've done.");
  }
  if (!mewoSound) mewoSound = new Audio('/sounds/mewo.mp3');
  mewoSound.play();
}
let miscButtons = document.getElementById("buttons-misc");
let siteButtons = document.getElementById("buttons-sites");
for (let i = 0; i <= 3; i++) {
  Array.from(miscButtons.children).forEach(e => {
    let newButton = e.cloneNode(true);
    miscButtons.appendChild(newButton);
  });
  Array.from(siteButtons.children).forEach(e => {
    let newButton = e.cloneNode(true);
    siteButtons.appendChild(newButton);
  });
}
let mirror = false;
let bgm;
let heartbeat = new Audio('/sounds/heartbeat.mp3');
document.getElementById('mute').onclick = () => {
  if (bgm.paused) {
    bgm.play();
    document.getElementById('mute').innerText = '[mute]';
  } else {
    bgm.pause();
    document.getElementById('mute').innerText = '[play]';
  }
}

document.getElementById('brimstone').onclick = () => {
  if (mirror) return;
  stopRain();
  mirror = true;
  bgm = new Audio('/sounds/YES.mp3');
  bgm.loop = true;
  let noise = new Audio('/sounds/snd_noise.mp3');
  heartbeat.play();
  document.getElementById('hidden-sulphur-1').id = 'hidden-sulphur-2';
  document.getElementById('sulphur').style.opacity = '0';
  document.getElementById('dynamic-style').innerHTML = `
* {
transition: 0.5s;
color: red !important;
}
`;
  setTimeout(() => {
    let red = setInterval(() => {
      document.getElementById('dynamic-style').innerHTML = ``;
      setTimeout(() => {
        document.getElementById('dynamic-style').innerHTML = `
* {
color: red !important;
}
`;
      }, 70);
    }, 120);
    setTimeout(() => clearInterval(red), 300);
    setTimeout(() => {
      document.getElementById('dynamic-style').innerHTML = `
* {
transition: 0;
}
body {
transition: 1s ease-in-out;
filter: grayscale(1);
}
`;
      setTimeout(() => {
        document.getElementById('dynamic-style').innerHTML = `
body {
transition: 3s ease-in-out;
filter: grayscale(0);
}
#container {
transition: transform 3s ease-in-out 0s;
transform: rotateY(180deg);
}
.box {
transition: filter 0s linear 1.5s;
filter: brightness(0.3);
}
div .chat-msg-local, div .chat-name {
transition: color 0s linear 1.5s;
color: transparent !important;
}
`;
        setTimeout(() => {
          document.getElementById('dynamic-style').innerHTML += `
* {
transition: color 0s linear 0s;
color: transparent !important;
}
`;
          let imgs = Array.from(document.getElementsByTagName('img'));
          imgs.forEach(img => {
            if (img.closest('#backside')) return;
            img.style.filter = 'brightness(0.1) grayscale(1)';
          });
          document.getElementById('pre-yw').style.filter = 'brightness(0)';
          document.getElementById('pre-banner').style.filter = 'brightness(0)';
          document.getElementById('pre-moon').style.filter = 'brightness(0)';
          document.getElementById('pre-hit').style.filter = 'brightness(0)';
          document.getElementById('buttons-misc').style.filter = 'brightness(0)';
          document.getElementById('buttons-sites').style.filter = 'brightness(0)';
          document.getElementById('dimdengif').style.filter = 'brightness(0)';
          document.getElementById('projects-banner').style.filter = 'brightness(0)';
          document.getElementById('mewo').style.display = 'none';
          document.getElementById('hotel').style.filter = 'brightness(0)';
          document.getElementById('message').style.filter = 'brightness(0)';
          for (let i in letters) {
            letters[i].style.filter = 'brightness(0.1) grayscale(1)';
          }
          document.getElementById('flickering-style').innerHTML = '';
          setTimeout(() => {
            noise.play();
            document.body.style.backgroundSize = '10000%';
            document.body.style.backgroundImage = 'url(/images/bg_glitch.gif)';
            document.getElementById('dynamic-style').innerHTML += `
footer span {
color: gray !important;
}
footer a {
color: #2c9080 !important;
}
#cool-sites {
color: #5a5a5a !important;
}
body {
transition: 0s;
filter: brightness(0);
}
`;
            setTimeout(() => {
              noise.play();
              document.body.style.backgroundSize = 'cover';
              document.getElementById("bg").remove();
              document.getElementById('dynamic-style').innerHTML = document.getElementById('dynamic-style').innerHTML.split('\n').slice(0, -5).join('\n');
              bgm.play();
              document.getElementById('backside').hidden = false;
              document.getElementById('backside').style.zIndex = 1;
            }, 400);
          }, 2500);
        }, 1500);
      }, 1000);
    }, 750);
  }, 2000);
}

let butlerClicks = 0;
document.getElementById('butler').onclick = () => {
  if (butlerClicks++ === 3 && !localStorage.punishment) {
    let blood = confirm("MEWO has been very, very bad. Do you want to punish her?");
    if (blood) {
      bgm.src = '/sounds/mewohasbeenveryverybad.mp3';
      bgm.play();
      localStorage.punishment = 1;
    }
  } else {
    alert('Waiting for something to happen?');
  }
}
let bannerDiv = document.getElementById('projects-banner');
let projects = [
  ["/images/banners/neocities.gif", "https://neocities.org/site/dimden"],
  ["/images/banners/discord.png", "https://discord.gg/yaqzbDBaAA"],
  ["/images/banners/oldtwitter.gif", "https://github.com/dimdenGD/OldTwitter"],
  ["/images/banners/utix.mp4", "https://utix.dev/"],
];
let bannerIndex = Math.floor(Math.random() * projects.length);
bannerDiv.children[0].hidden = bannerIndex !== 0;
for (let i in projects) {
  if (i == 0) continue;
  let p = projects[i];
  let a = document.createElement('a');
  a.href = p[1];
  a.target = '_blank';
  let media = document.createElement(p[0].endsWith('.mp4') ? 'video' : 'img');
  media.src = p[0];
  media.width = '650';
  media.height = '77';
  media.loading = 'lazy';
  if (p[0].endsWith('.mp4')) {
    media.loop = true;
    media.autoplay = true;
    media.muted = true;
  }
  if (+i !== bannerIndex) {
    a.hidden = true;
  }
  a.appendChild(media);
  bannerDiv.appendChild(a);
}

setInterval(() => {
  let a = bannerDiv.children[bannerIndex];
  a.hidden = true;
  let random = Math.floor(Math.random() * projects.length);
  while (random === bannerIndex) {
    random = Math.floor(Math.random() * projects.length);
  }
  bannerIndex = random;
  a = bannerDiv.children[bannerIndex];
  a.hidden = false;
}, 25000);
let hmc = document.getElementById('hidemycursor');
let cursorHidden = localStorage.cursorHidden === '1';
hmc.checked = cursorHidden;
hmc.addEventListener('change', () => {
  if (hmc.checked) {
    localStorage.cursorHidden = 1;
    cursorHidden = true;
    let ab = new Int16Array(3);
    ab[0] = 0;
    ab[1] = 0;
    ab[2] = document.body.clientHeight;
    client.send(ab);
  } else {
    localStorage.cursorHidden = 0;
    cursorHidden = false;
  }
});
fetch('https://kanji.dimden.dev/stats.json').then(r => r.json()).then(stats => {
  let se = document.getElementById('kanji-stats');
  se.innerHTML = `Kanji: ${stats.learned_kanji} • Vocab: ${stats.learned_vocab}`;
}).catch(e => {
    console.error(e);
  });
let moons = Array.from(document.getElementsByClassName('moon-icon'));
for (let i in moons) {
  let moon = moons[i];
  moon.onclick = () => {
    if (!moon.style.transform) {
      moon.style.transform = 'rotate(90deg)';
    } else {
      moon.style.transform = `rotate(${parseInt((moon.style.transform.split('(')[1].split('deg')[0]))+90}deg)`;
    }
  }
}
let kelvin = document.getElementById('kelvin');
let kelvinBus = new BroadcastChannel('kelvin');
if (isSlow) {
  kelvin.classList.remove("kelvin-light");
}
window.addEventListener('scroll', () => {
  let rects = kelvin.getBoundingClientRect();
  localStorage.kelvinX = rects.x;
  localStorage.kelvinY = rects.y;
  kelvinBus.postMessage({
    x: rects.x,
    y: rects.y
  });
}, {
    passive: true
  });

function detectAdblock(callback) {
  fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
    method: 'HEAD',
    mode: 'no-cors',
  }).then((response) => {
      callback(response.redirected)
    }).catch(() => {
      callback(true)
    })
}
if (!localStorage.okblock) detectAdblock(res => {
  if (res) {
    document.getElementById("blocknotice").hidden = false;
  }
})
document.getElementById('close-notice').addEventListener("click", () => {
  localStorage.okblock = '1';
  document.getElementById("blocknotice").hidden = true;
});
