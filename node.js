const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$('#yr').textContent=new Date().getFullYear();

/* theme */
const root=document.documentElement;
try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t;else if(matchMedia('(prefers-color-scheme:dark)').matches)root.dataset.theme='dark'}catch(e){}
$('#theme').onclick=()=>{const d=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=d;try{localStorage.setItem('theme',d)}catch(e){}};

/* mobile menu */
const links=$('#links'),burger=$('#burger');
burger.onclick=()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.textContent=o?'✕':'☰'};
$$('#links a').forEach(a=>a.onclick=()=>{links.classList.remove('open');burger.textContent='☰';burger.setAttribute('aria-expanded',false)});

/* typing effect */
const roles=['Cyber Security student','Web developer in the making','Curious problem solver'];
let ri=0,ci=0,del=false;const typed=$('#typed');
(function tick(){const w=roles[ri];typed.textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(tick,1400)}
 if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
 ci+=del?-1:1;setTimeout(tick,del?35:70)})();

/* password demo */
const pw=$('#pw'),bar=$('#pwBar'),txt=$('#pwText'),tips=$('#pwTips');
pw.addEventListener('input',()=>{
 const v=pw.value;
 if(!v){bar.style.width='0';txt.textContent='Start typing to see the score.';tips.innerHTML='';return}
 let s=0;const t=[];
 v.length>=12?s++:t.push('Use at least 12 characters.');
 /[a-z]/.test(v)&&/[A-Z]/.test(v)?s++:t.push('Mix upper and lower case letters.');
 /\d/.test(v)?s++:t.push('Add a number.');
 /[^A-Za-z0-9]/.test(v)?s++:t.push('Add a symbol like ! or #.');
 if(/(password|123456|qwerty|admin|letmein)/i.test(v)){s=Math.max(0,s-2);t.push('Avoid common words and sequences.')}
 const L=[['Very weak','var(--bad)'],['Weak','var(--bad)'],['Okay','var(--warn)'],['Good','var(--ok)'],['Strong','var(--ok)']];
 const [n,c]=L[Math.min(s,4)];
 bar.style.width=(Math.max(s,.5)/4*100)+'%';bar.style.background=c;txt.textContent='Strength: '+n;
 tips.innerHTML=t.map(x=>'<li>'+x+'</li>').join('');
});

/* project filter */
$$('.filters button').forEach(b=>b.onclick=()=>{
 $$('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
 $$('.card').forEach(c=>c.classList.toggle('hide',b.dataset.f!=='all'&&!c.dataset.c.split(' ').includes(b.dataset.f)));
});

/* reveal + skill bars */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('.bar i',e.target).forEach(i=>i.style.width=i.dataset.w+'%');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));

/* active nav link */
const secs=$$('main section'),navA=$$('#links a');
addEventListener('scroll',()=>{let cur='home';secs.forEach(s=>{if(scrollY>=s.offsetTop-120)cur=s.id});navA.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur))},{passive:true});

/* contact form validation */
const form=$('#form');
const rules={
 name:v=>v.trim().length<2?'Enter your name (at least 2 characters).':'',
 email:v=>!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)?'Enter a valid email like name@example.com.':'',
 message:v=>v.trim().length<10?'Write at least 10 characters so I know how to help.':''
};
function check(el){const m=rules[el.name](el.value);el.closest('.field').classList.toggle('err',!!m);$('.msg',el.closest('.field')).textContent=m;return !m}
$$('input,textarea',form).forEach(el=>el.addEventListener('blur',()=>check(el)));
form.addEventListener('submit',e=>{
 e.preventDefault();$('#formOk').textContent='';
 const ok=$$('input,textarea',form).map(check).every(Boolean);
 if(!ok){$('.err input,.err textarea',form).focus();return}
 const d=new FormData(form);
 const sub=encodeURIComponent('Portfolio message from '+d.get('name'));
 const body=encodeURIComponent(d.get('message')+'\n\nFrom: '+d.get('name')+' ('+d.get('email')+')');
 location.href='mailto:shawrahu0159@gmail.com?subject='+sub+'&body='+body;
 $('#formOk').textContent='Thanks! Your email app should open with the message ready to send.';
 form.reset();
});   