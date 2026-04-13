/* ═══ CUSTOM CURSOR ═══ */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx=0, my=0, tx=0, ty=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
(function animTrail(){
  tx += (mx-tx)*0.12; ty += (my-ty)*0.12;
  trail.style.left=tx+'px'; trail.style.top=ty+'px';
  requestAnimationFrame(animTrail);
})();
document.querySelectorAll('a,button,.project-card,.skill-card,.contact-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.transform='translate(-50%,-50%) scale(2.2)'; cursor.style.background='rgba(0,212,255,0.5)'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.transform='translate(-50%,-50%) scale(1)'; cursor.style.background='var(--accent)'; });
});

/* ═══ NAVBAR SCROLL ═══ */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ═══ HAMBURGER ═══ */
document.getElementById('hamburger').addEventListener('click',()=>{
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile(){ document.getElementById('mobileMenu').classList.remove('open'); }

/* ═══ SCROLL REVEAL ═══ */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{ threshold:0.12 });
document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));

/* ═══ TYPEWRITER ═══ */
const roles = ['AI / ML Engineer','Computer Vision Developer','Drone Analytics Builder','Generative AI Explorer','Problem Solver'];
let ri=0, ci=0, deleting=false;
function type(){
  const word = roles[ri];
  const el   = document.getElementById('typewriter');
  if(!el) return;
  if(!deleting){
    el.textContent = word.slice(0,++ci);
    if(ci===word.length){ deleting=true; setTimeout(type,1800); return; }
  } else {
    el.textContent = word.slice(0,--ci);
    if(ci===0){ deleting=false; ri=(ri+1)%roles.length; setTimeout(type,400); return; }
  }
  setTimeout(type, deleting?50:90);
}
setTimeout(type, 600);

/* ═══ NEURAL NETWORK CANVAS ═══ */
(function(){
  const canvas = document.getElementById('networkCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W,H,nodes=[];
  const N=60, MAX_DIST=150;

  function resize(){ W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; }
  window.addEventListener('resize',()=>{ resize(); init(); });
  resize();

  function init(){
    nodes=[];
    for(let i=0;i<N;i++) nodes.push({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
      r:Math.random()*2+1
    });
  }
  init();

  function draw(){
    ctx.clearRect(0,0,W,H);
    // edges
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<MAX_DIST){
          const alpha=(1-d/MAX_DIST)*0.35;
          ctx.strokeStyle=`rgba(0,212,255,${alpha})`;
          ctx.lineWidth=0.5;
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n=>{
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle='rgba(0,212,255,0.5)'; ctx.fill();
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>W) n.vx*=-1;
      if(n.y<0||n.y>H) n.vy*=-1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
