const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
const themeIcon=document.getElementById("themeIcon");
const themeText=document.getElementById("themeText");
const menuButton=document.getElementById("menuButton");
const navLinks=document.getElementById("navLinks");

function applyTheme(theme){
  root.classList.toggle("light",theme==="light");
  const light=theme==="light";
  themeIcon.textContent=light?"☾":"☼";
  themeText.textContent=light?"Dark":"Light";
}
applyTheme(localStorage.getItem("theme")||"dark");

themeToggle.addEventListener("click",()=>{
  const next=root.classList.contains("light")?"dark":"light";
  localStorage.setItem("theme",next);
  applyTheme(next);
});

menuButton.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

// Repeating scroll reveal: entering = animate in, leaving = reset.
const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
    else entry.target.classList.remove("visible");
  });
},{threshold:.12,rootMargin:"0px 0px -55px 0px"});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

// Active navigation based on the section currently in view.
const navItems=document.querySelectorAll(".nav-item");
const sections=document.querySelectorAll("main section[id]");
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    navItems.forEach(item=>{
      item.style.color=item.getAttribute("href")===`#${entry.target.id}`?"var(--text)":"var(--muted)";
    });
  });
},{rootMargin:"-40% 0px -50% 0px"});
sections.forEach(section=>sectionObserver.observe(section));

// Custom desktop cursor.
const cursor=document.getElementById("cursor");
const ring=document.getElementById("cursorRing");
let mx=0,my=0,rx=0,ry=0;
window.addEventListener("mousemove",e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+"px";cursor.style.top=my+"px";ring.style.opacity="1";
});
window.addEventListener("mouseleave",()=>ring.style.opacity="0");
function cursorLoop(){
  rx+=(mx-rx)*.13;ry+=(my-ry)*.13;
  ring.style.left=rx+"px";ring.style.top=ry+"px";
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll("a,button,.interest-row,.tool").forEach(el=>{
  el.addEventListener("mouseenter",()=>{ring.style.width="58px";ring.style.height="58px";ring.style.borderColor="var(--lime)"});
  el.addEventListener("mouseleave",()=>{ring.style.width="34px";ring.style.height="34px";ring.style.borderColor="var(--text)"});
});

// Magnetic micro-motion rather than zooming.
document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.12;
    const y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="translate(0,0)");
});

// Subtle pointer-responsive row movement.
document.querySelectorAll(".interest-row").forEach(row=>{
  row.addEventListener("mousemove",e=>{
    const r=row.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    row.style.transform=`perspective(900px) rotateX(${y*-1.1}deg) rotateY(${x*1.1}deg)`;
  });
  row.addEventListener("mouseleave",()=>row.style.transform="perspective(900px) rotateX(0) rotateY(0)");
});
