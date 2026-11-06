// Fictional, authored practice. No model calls or applicant data.
export const cases = [
  {
    id:'criteria', title:'Turn a shortcut into a useful criterion', subtitle:'1. Set up the review',
    context:'The hiring manager needs someone who can run recurring customer workshops, coach presenters, and improve the sessions. The team can teach its ATS and webinar tools. The AI proposes the criterion below before reviewing applications.',
    draft:'Require three years delivering live training at an ATS company. This will identify people who can teach our customers with minimal ramp time.',
    evidence:[['Hiring manager note','The first priority is reliable delivery of the existing program. Recruiting knowledge is useful, but we can teach the product. We need evidence of workshop ownership, presenter coaching, and operational follow-through.'],['Two profiles in the practice batch','Maya ran technical customer workshops for a payroll platform and coached subject-matter experts. Eli delivered ATS product demos and managed event logistics; workshop design and presenter coaching are not described.']],
    question:'Which instruction would you give the AI before it reviews this batch?',
    options:[
      {id:'domain',label:'Keep ATS experience as a required criterion; review people from other sectors if the first batch is too small.',feedback:'Maya drops out of the first review despite owning the workshops and coaching this role needs. Record ATS experience as useful context so the recruiter can review relevant work from other sectors.'},
      {id:'ownership',label:'Look for ownership of recurring customer workshops and presenter coaching. Record ATS experience separately as useful context.',recommended:true,feedback:'Maya stays in review based on workshop ownership and coaching. Eli brings product knowledge and event logistics; the recruiter can ask what Eli personally designed and how Eli supported presenters.'},
      {id:'broad',label:'Accept any presentation experience and let the hiring manager check workshop ownership later.',feedback:'Eli’s product demos now count toward workshop ownership, leaving the recruiter to untangle the difference later. Have the AI separate evidence of designing workshops, coaching presenters, and running a recurring program.'}
    ],
    takeaway:'Use evidence of recurring workshop ownership and presenter coaching. Treat recruiting-domain experience as context, not a gate.',
    questionForHuman:'Tell me about a recurring workshop you owned. What did you handle yourself, and how did you help other presenters teach?'
  },
  {
    id:'evidence',title:'Check what a positive result actually shows',subtitle:'2. Inspect the reasoning',
    context:'The agreed criteria also require someone who uses learner feedback and customer actions to improve sessions. Here, “customer actions” means tasks such as configuring an interview plan after a workshop. Review the AI’s summary against the source.',
    draft:'Eli meets the improvement criterion. Attendance doubled and ratings averaged 4.8/5, demonstrating that customers learned to configure interview plans.',
    evidence:[['Eli’s application, excerpt 1','Owned registration, reminders, production, and recordings for a monthly ATS webinar. Attendance doubled after a new reminder sequence. Session ratings averaged 4.8/5.'],['Eli’s application, excerpt 2','After customers reported that the setup walkthrough was too fast, I added a pause and a written checklist. I have not yet checked whether participants configured an interview plan afterward.']],
    question:'How should you handle this summary?',
    options:[
      {id:'reject',label:'Mark the criterion as not met because there is no post-session product-use data.',feedback:'Eli added a pause and checklist in response to learner feedback. Keep that improvement visible and ask how Eli would check whether customers could configure an interview plan afterward.'},
      {id:'accept',label:'Keep “meets” because attendance, ratings, and a revised checklist together support the claim.',feedback:'The summary now credits Eli with a result the application says has not been checked. Keep the attendance increase and checklist change; ask what happened when customers tried configuring an interview plan.'},
      {id:'split',label:'Keep the feedback-driven change as evidence. Remove the claim about customer task completion and draft a follow-up question.',recommended:true,feedback:'The corrected summary credits Eli’s change to the session and leaves task completion open. The recruiter can ask: “How would you check whether customers can configure an interview plan after using your checklist?”'}
    ],
    takeaway:'Separate observed evidence, interpretation, and unknowns. Ratings can guide improvements; they do not establish that someone completed a product task.',
    questionForHuman:'How would you check whether customers can configure an interview plan after using your checklist?'
  },
  {
    id:'access',title:'Keep the skill. Change the way it is demonstrated.',subtitle:'3. Handle an access request',
    context:'The role includes facilitating live customer workshops. The work sample asks candidates to explain a workflow, respond to questions, and adjust their explanation. Fast speech, camera presence, and visual polish are not criteria. Every candidate is assessed against the same facilitation skills.',
    draft:'Keep the live exercise, with captions, written questions, and brief thinking time as requested. Confirm the setup with Sam. The recruiter should assess explanation, response to questions, and adaptation against the same rubric.',
    evidence:[['Sam’s application','Ran monthly customer clinics using live demonstration, chat, and shared notes. The application includes a session outline, but no observation of Sam responding to a participant’s question.'],['Candidate’s message','Could you enable captions, share questions in writing as well as reading them aloud, and allow a short pause before I answer? I can participate in the live exercise with those adjustments.']],
    question:'What should happen next?',
    options:[
      {id:'recording',label:'Offer a recording and written Q&A so Sam can demonstrate communication without live time pressure.',feedback:'Sam asked for adjustments to the live exercise. A recording removes the chance to observe Sam responding to a participant in real time. Confirm the requested setup with Sam and arrange the live exercise.'},
      {id:'confirm',label:'Confirm the requested setup with Sam, arrange the live exercise, and assess the same explanation, response, and adaptation skills.',recommended:true,feedback:'Sam can demonstrate facilitation with the requested setup. Assess the explanation, response to questions, and adaptation. Keep access arrangements with the people coordinating the exercise and out of the AI’s assessment of Sam’s ability.'},
      {id:'waive',label:'Use Sam’s past clinics as sufficient evidence and skip the work sample to avoid adding burden.',feedback:'The recruiter still needs evidence of how Sam responds and adapts to a participant. Arrange the requested setup so Sam can demonstrate those skills in the live exercise.'}
    ],
    takeaway:'Confirm access needs with the candidate. Assess the job skill consistently without treating a requested adjustment as evidence of ability or inferring a diagnosis.',
    questionForHuman:'Can you confirm this setup works for you? We will assess explaining the workflow, responding to questions, and adapting the explanation.'
  },
  {
    id:'pilot',title:'Decide what the AI may do next',subtitle:'4. Plan a small pilot',
    context:'Your team wants to spend less time organizing applications and more time talking with candidates. Decide how to test the review workflow with the recruiting team.',
    draft:'The review plan is ready. Apply it to the whole applicant pool, move profiles with missing evidence out of the review queue, and send follow-up messages automatically.',
    evidence:[['Pilot priorities','The team wants to know which relevant experience the AI misses, which claims recruiters need to correct, and whether its questions help candidate conversations.'],['Proposed division of work','The AI can prepare source-linked evidence summaries and draft questions. A recruiter verifies the evidence and decides the next conversation. Changes to criteria and overrides should be recorded. Candidate contact requires human review.']],
    question:'Which next step best tests whether the workflow helps?',
    options:[
      {id:'shadow',label:'Run a small pilot alongside manual review. Verify summaries, inspect missing-evidence cases and overrides, and compare review time and the usefulness of follow-up questions.',recommended:true,feedback:'Compare the AI’s summaries with manual review. Record missed evidence, corrections, useful questions, and time spent. Assign a recruiter to review each summary and message, and use the findings to decide what to change before expanding.'},
      {id:'volume',label:'Use it across the pool, keep hiring decisions with recruiters, and check how many summaries they review per hour.',feedback:'The team learns how fast recruiters work, but misses whether the AI hides relevant experience or overstates claims. Compare a small batch with manual review and track corrections alongside time spent.'},
      {id:'approve',label:'Have a manager approve the instructions once, then automate follow-ups for candidates who meet them.',feedback:'Messages go out before recruiters check the candidate evidence or the drafted question. Keep messages as drafts during the pilot so recruiters can correct them before contacting candidates.'}
    ],
    takeaway:'Pilot source-linked summaries and draft questions alongside manual review. Track useful work and errors as well as time. People decide and approve candidate contact.',
    questionForHuman:'What did the AI miss or overstate, which questions helped the conversation, and where did review time actually change?'
  }
];
export function evaluateChoice(caseId, choiceId){
  const scenario=cases.find(c=>c.id===caseId);
  const option=scenario?.options.find(o=>o.id===choiceId);
  if(!option)throw new Error('Choose an option before reviewing the consequence.');
  return {recommended:Boolean(option.recommended),feedback:option.feedback};
}
export function reviewPlan(decisions){
  return cases.map(c=>{
    const choice=c.options.find(o=>o.id===decisions[c.id]);
    return `${c.subtitle}\nYour decision: ${choice?.label || 'Not reviewed yet.'}\n${choice ? (choice.recommended ? 'Recommended for this scenario.' : 'Revisit before a pilot. '+choice.feedback) : 'Revisit before a pilot.'}\nPractice guidance: ${c.takeaway}\nHuman follow-up: ${c.questionForHuman}`;
  }).join('\n\n');
}
