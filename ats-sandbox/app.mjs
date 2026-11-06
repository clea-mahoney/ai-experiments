import {cases,evaluateChoice,reviewPlan} from './lesson.mjs?v=20261030-2';
const $=id=>document.getElementById(id);
let index=0;
const decisions={},selections={},notes={};
function el(tag,text,cls){const node=document.createElement(tag);if(text)node.textContent=text;if(cls)node.className=cls;return node;}
function saveNote(){if(index<cases.length)notes[cases[index].id]=$('note').value;}
function renderNav(){
  $('steps').replaceChildren();
  [...cases.map(c=>c.subtitle),'5. Your review'].forEach((text,i)=>{
    const li=el('li'),button=el('button',text,'step-button');button.type='button';
    if(index===i)button.setAttribute('aria-current','step');
    button.addEventListener('click',()=>{saveNote();index=i;render();});li.append(button);$('steps').append(li);
  });
}
function focusSection(id){
  const heading=$(id);heading.focus({preventScroll:true});
  const nav=document.querySelector('nav[aria-label="Practice sections"]');
  window.scrollTo({top:heading.getBoundingClientRect().top+window.scrollY-nav.offsetHeight-24});
}
function render(moveFocus=true){
  renderNav();const finish=index===cases.length;
  $('case-screen').hidden=finish;$('finish-screen').hidden=!finish;
  if(finish){renderReview();focusSection('finish-heading');return;}
  const c=cases[index];
  $('case-subtitle').textContent=c.subtitle;$('case-heading').textContent=c.title;$('case-context').textContent=c.context;$('draft').textContent=c.draft;
  $('evidence').replaceChildren(...c.evidence.map(([title,text])=>{const div=el('div');div.append(el('dt',title),el('dd',text));return div;}));
  $('question').textContent=c.question;$('options').replaceChildren();
  c.options.forEach(o=>{const label=el('label',null,'answer'),input=document.createElement('input');input.type='radio';input.name='decision';input.value=o.id;input.required=true;input.checked=selections[c.id]===o.id;label.append(input,document.createTextNode(o.label));$('options').append(label);});
  $('note').value=notes[c.id]||'';$('feedback').hidden=!decisions[c.id];
  if(decisions[c.id])$('feedback-text').textContent=evaluateChoice(c.id,decisions[c.id]).feedback;
  $('back').disabled=index===0;$('next').textContent=index===cases.length-1?'See my review →':'Next section →';
  $('position').textContent=`Section ${index+1} of ${cases.length}. ${decisions[c.id]?'Feedback reviewed.':'Not reviewed yet.'}`;
  if(moveFocus)focusSection('case-heading');
}
$('decision-form').addEventListener('submit',event=>{
  event.preventDefault();const c=cases[index],choice=new FormData(event.currentTarget).get('decision');
  const result=evaluateChoice(c.id,choice);decisions[c.id]=choice;
  $('feedback-text').textContent=result.feedback;$('feedback').hidden=false;$('position').textContent=`Section ${index+1} of ${cases.length}. Feedback reviewed.`;focusSection('feedback-heading');
});
// A newly selected answer must be submitted before its consequence enters the review.
$('options').addEventListener('change',event=>{saveNote();selections[cases[index].id]=event.target.value;delete decisions[cases[index].id];$('feedback').hidden=true;$('position').textContent=`Section ${index+1} of ${cases.length}. Choice changed. See what happens.`;});
$('note').addEventListener('input',saveNote);
$('back').addEventListener('click',()=>{saveNote();if(index>0)index--;render();});
$('next').addEventListener('click',()=>{saveNote();index++;render();});
function renderReview(){
  const reviewed=Object.keys(decisions).length;
  const revisit=cases.filter(c=>!decisions[c.id]||!evaluateChoice(c.id,decisions[c.id]).recommended).length;
  $('completion').textContent=`You reviewed ${reviewed} of ${cases.length} decisions. ${revisit ? `${revisit} ${revisit===1?'section needs':'sections need'} another look before a pilot.` : 'Your review is ready to take into the pilot.'}`;
  $('review').replaceChildren(...cases.map((c,i)=>{
    const card=el('article',null,'panel review-card'),choice=c.options.find(o=>o.id===decisions[c.id]);
    card.append(el('h3',c.subtitle),el('p',choice?`Your decision: ${choice.label}`:'Not reviewed yet.'));
    if(choice)card.append(el('p',evaluateChoice(c.id,choice.id).feedback));
    card.append(el('p',`Practice guidance: ${c.takeaway}`),el('p',`Human follow-up: ${c.questionForHuman}`));
    if(notes[c.id])card.append(el('p',`Your note: ${notes[c.id]}`));
    const button=el('button','Revisit this section','secondary');button.type='button';button.addEventListener('click',()=>{index=i;render();});card.append(button);return card;
  }));
}
$('return').addEventListener('click',()=>{index=cases.length-1;render();});
$('restart').addEventListener('click',()=>{Object.keys(decisions).forEach(k=>delete decisions[k]);Object.keys(notes).forEach(k=>delete notes[k]);Object.keys(selections).forEach(k=>delete selections[k]);$('copy-status').textContent='';index=0;render();});
$('copy').addEventListener('click',async()=>{
  const text=reviewPlan(decisions)+cases.filter(c=>notes[c.id]).map(c=>`\n\nYour note (${c.subtitle}): ${notes[c.id]}`).join('');
  try{await navigator.clipboard.writeText(text);$('copy-status').textContent='Review copied.';}catch{$('copy-status').textContent='Copy is unavailable. Select the review text above to copy it.';}
});
render(false);
