let stopRain;let rainElements=[...document.getElementsByClassName("box"),...document.getElementsByClassName("letter"),document.getElementById("systemspace-link"),document.getElementById("oneko"),"cursor"];window.isThunder=false;setTimeout(()=>{if(isSlow)return;let forceThunder=false;let stop=false;let power=Math.sin(Date.now()/90000000);let thunderPlaying=false;window.isThunder=power>=0.99||forceThunder;let rainBgm=new Audio(window.isThunder?"/sounds/rainHeavy3.mp3":"/sounds/rainLight1.mp3");rainBgm.loop=true;rainBgm.volume=0.2;let thunderBgm;if(window.isThunder){thunderBgm=new Audio("/sounds/AM_RAIN-QuietThunder.mp3");thunderBgm.loop=true;document.body.append(thunderBgm);thunderBgm.play().catch(()=>{document.addEventListener("click",()=>{thunderBgm.play();},{once:true});});thunder();}
document.body.append(rainBgm);rainBgm.play().catch(()=>{document.addEventListener("click",()=>{rainBgm.play();},{once:true});});onVisibilityChange(visible=>{rainBgm.muted=!visible;if(thunderBgm)thunderBgm.muted=!visible;});let chatBox=document.getElementById("chat");let chatRect=chatBox.getBoundingClientRect();let hmcBox=document.getElementById("hidemycursor-div");let hmcRect=hmcBox.getBoundingClientRect();let mouseX=0,mouseY=0;document.addEventListener("mousemove",e=>{let x=e.pageX;mouseX=e.x;let y=e.pageY;mouseY=e.y;if(y>chatRect.top&&x>chatRect.left&&x<hmcRect.right){rainBgm.volume=0.05;}else{rainBgm.volume=0.2;}
rects=new Map();});stopRain=()=>{rainBgm.pause();if(thunderBgm)thunderBgm.pause();clearInterval(spawnInterval);clearInterval(slowCheckInterval);ctx.clearRect(0,0,c.width,c.height);stop=true;window.isThunder=false;};let slowCheckInterval=setInterval(()=>{if(isSlow){stopRain();}},100);let c=document.getElementById("rain-canvas");let rects=new Map();c.width=window.innerWidth;c.height=window.innerHeight;let ctx=c.getContext("2d");let rainDrops=[];let defaultLength=50;let defaultSpeed=20;let defaultAngle=90*Math.PI/180;let length=defaultLength;let speed=defaultSpeed;let angle=defaultAngle;let angleSin=Math.sin(angle);let angleCos=Math.cos(angle);setInterval(()=>{let x=Date.now()/1000000;let power=Math.sin(2*Math.PI*(2*x-Math.cos(x)))/2+0.5;angle=(90+Math.sin(x)*1.25)*Math.PI/180;speed=defaultSpeed+power*10;let power2=Math.sin(Date.now()/90000000);let power3=Math.sin((Date.now()-1000)/90000000);if(power3<0.99&&power2>=0.99){clearInterval(spawnInterval);spawnInterval=setInterval(newDrop,30);rainBgm.src="/sounds/rainHeavy3.mp3";window.isThunder=true;if(!thunderBgm){thunderBgm=new Audio("/sounds/AM_RAIN-QuietThunder.mp3");thunderBgm.loop=true;document.body.append(thunderBgm);}
thunderBgm.play();thunder();}
if(power3>=0.99&&power2<0.99){clearInterval(spawnInterval);spawnInterval=setInterval(newDrop,50);rainBgm.src="/sounds/rainLight1.mp3";window.isThunder=false;if(thunderBgm)thunderBgm.pause();}
if(power2>=0.99||forceThunder){speed*=2;angle=(90+Math.sin(x)*3)*Math.PI/180;length=defaultLength*2;}else{length=defaultLength;}},1000);let spawnInterval=setInterval(newDrop,100);setTimeout(()=>{clearInterval(spawnInterval);spawnInterval=setInterval(newDrop,power>=0.99||forceThunder?30:50);},1500);window.addEventListener("resize",onResize);window.addEventListener("scroll",()=>{rects=new Map();},{passive:true});document.addEventListener("visibilitychange",function(){if(stop)return;if(document.hidden){clearInterval(spawnInterval);}else{power=Math.sin(Date.now()/90000000);spawnInterval=setInterval(newDrop,power>=0.99?30:50);}
rects=new Map();});function playThunder(){if(thunderPlaying||stop)return;let audio=new Audio(`/sounds/CThunderA_${Math.floor(Math.random()*5)+1}.mp3`);let ctx=new AudioContext();let analyser=ctx.createAnalyser();let audioSrc=ctx.createMediaElementSource(audio);audioSrc.connect(analyser);analyser.connect(ctx.destination);let dynamicStyle=document.getElementById("dynamic-style");function renderFrame(){if(stop)return thunderPlaying=false;let array=new Uint8Array(analyser.frequencyBinCount);analyser.getByteFrequencyData(array);let value=array.reduce((a,b)=>a+b,0);if(value>7000){dynamicStyle.innerHTML=`
                    .box {
                        filter: brightness(${(value/6000).toFixed(3)});
                    }
                `;}else{dynamicStyle.innerHTML=``;}
if(audio.ended){thunderPlaying=false;dynamicStyle.innerHTML=``;return;}
requestAnimationFrame(renderFrame);}
audio.play().then(()=>{thunderPlaying=true;renderFrame();});}
function thunder(){if(isTabFocused)playThunder();if(window.isThunder)setTimeout(thunder,10000+Math.floor(Math.random()*20000));}
function RainDrop(x,y,angle){this.x=x;this.y=y;rainDrops.push(this);}
function newDrop(){for(let x=0;x<50;x++){new RainDrop(Math.random()*c.width,-40-100*Math.random(),angle);}}
update();function update(){for(let x=0;x<rainDrops.length;x++){let drop=rainDrops[x];drop.x+=speed*angleCos;drop.y+=speed*angleSin;drop.endX=drop.x+length*angleCos;drop.endY=drop.y+length*angleSin;if(drop.y>c.height){rainDrops[x]=undefined;}}
rainDrops=rainDrops.filter(i=>i);draw();}
function draw(){if(stop)return;ctx.clearRect(0,0,c.width,c.height);ctx.lineWidth=1;ctx.lineCap="round";ctx.strokeStyle="#0984e3";let gradient=ctx.createLinearGradient(0,0,0,c.height);gradient.addColorStop(0,"#55a8ff");gradient.addColorStop(1,"white");gradient.addColorStop(1,"white");ctx.strokeStyle=gradient;ctx.beginPath();for(let i=0;i<rainDrops.length;i++){ctx.moveTo(Math.floor(rainDrops[i].x),Math.floor(rainDrops[i].y));ctx.lineTo(Math.floor(rainDrops[i].endX),Math.floor(rainDrops[i].endY));}
ctx.stroke();clearRegions();window.requestAnimationFrame(update);}
function onResize(){if(stop)return;c.width=window.innerWidth;c.height=window.innerHeight;rects=new Map();}
function getRect(el){if(el==="cursor"){return{x:mouseX,y:mouseY+4,left:mouseX,top:mouseY+4,width:14,height:16,right:mouseX+14,bottom:mouseY+16};}
if(el.id==="oneko"){let rect=el.getBoundingClientRect();rect.y+=20;rect.top+=20;rect.height-=12;return rect;}
let stored=rects.get(el);if(stored)return stored;let rect=el.getBoundingClientRect();rects.set(el,rect);return rect;}
function clearRegions(){if(stop)return;ctx.globalCompositeOperation="destination-out";for(let i=0;i<rainElements.length;i++){let boundingBox=getRect(rainElements[i]);let yDistanceBottom=c.height-boundingBox.bottom;let yDistanceTop=c.height-boundingBox.top;let bottomLeftX=boundingBox.left+yDistanceBottom*Math.tan(Math.PI/2-angle);let bottomRightX=boundingBox.right+yDistanceBottom*Math.tan(Math.PI/2-angle);let bottomLeftX2=boundingBox.left+yDistanceTop*Math.tan(Math.PI/2-angle);let bottomRightX2=boundingBox.right+yDistanceTop*Math.tan(Math.PI/2-angle);ctx.beginPath();ctx.moveTo(boundingBox.left,boundingBox.bottom);ctx.lineTo(bottomLeftX,c.height);ctx.lineTo(bottomRightX,c.height);ctx.lineTo(boundingBox.right,boundingBox.bottom);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(boundingBox.left,boundingBox.top);ctx.lineTo(bottomLeftX2,c.height);ctx.lineTo(bottomRightX2,c.height);ctx.lineTo(boundingBox.right,boundingBox.top);ctx.closePath();ctx.fill();}
ctx.globalCompositeOperation="source-over";}},2000);