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
    id:'access',title:'Check a score from an adjusted exercise',subtitle:'3. Score an adjusted exercise',
    context:'Sam asked for captions, questions in writing as well as read aloud, and a short pause before answering. The recruiter agreed and ran the live workshop exercise that way. The AI then drafted a score for each skill in the rubric. Check its score for responding to questions.',
    draft:'Responding to questions: partially meets. Sam gave accurate answers but needed questions in writing and paused before each one, so it is unclear whether Sam can keep up in a fast-moving live workshop.',
    evidence:[['Rubric: responding to questions','Answers the question asked, checks that the participant understood, and offers a next step. How quickly someone answers is not scored.'],['Recruiter’s exercise notes','A participant asked how to add a scorecard to one interview stage. Sam paused, gave the exact steps, asked whether that matched the participant’s setup, and offered the checklist. Agreed setup: captions, written questions, short pause.']],
    question:'What should happen to the AI’s score?',
    options:[
      {id:'recording',label:'Keep “partially meets” and add a note that the setup was approved, so the hiring manager reads the score in context.',feedback:'The note explains the setup, but the score still marks Sam down for using it. The rubric scores the answer, not its speed. Score what Sam said and did, and keep the setup out of the assessment.'},
      {id:'confirm',label:'Rescore against the rubric, remove the comment about the pause and written questions, and keep the setup out of the assessment.',recommended:true,feedback:'The score now reflects what Sam did: answered the exact question, checked understanding, and offered a next step. The agreed setup stays with the people running the exercise, so it cannot lower a skill score.'},
      {id:'waive',label:'Hold the score and run a second exercise without the setup to see how Sam answers at real workshop pace.',feedback:'Sam would lose the setup the recruiter agreed to, and the retest would measure speed, which the rubric does not score. The notes already show Sam answering, checking understanding, and offering a next step.'}
    ],
    takeaway:'Score the job skill against the rubric, without treating a requested adjustment as evidence of ability or guessing why someone asked for it. Keep access arrangements out of the AI’s assessment.',
    questionForHuman:'Did the setup work for you, and is there anything you would change for the next interview?'
  },
  {
    id:'pilot',title:'Decide what counts as success',subtitle:'4. Plan a small pilot',
    context:'Your team wants to spend less time sorting applications and more time talking with candidates. The AI drafted a pilot plan. Check it against what another team learned from a similar pilot.',
    draft:'Run the AI on the next 40 applications alongside manual review for two weeks. Recruiters approve every follow-up message before it is sent. The pilot succeeds if review time drops below 5 minutes per application.',
    evidence:[['Team goal','Spend less time sorting applications and more time in useful conversations with candidates.'],['Another team’s pilot','Review time fell from 12 to 4 minutes per application. In a spot check, 3 of 10 summaries left out relevant experience from another industry, and 1 credited a candidate with a result the application did not claim.']],
    question:'What would you change before the pilot starts?',
    options:[
      {id:'shadow',label:'Track missed experience, corrected claims, and whether the follow-up questions helped, alongside review time.',recommended:true,feedback:'Now the pilot can show both sides. A fast review that misses relevant experience or repeats an overstated claim counts as a problem, and recruiters can say whether the questions led to better conversations.'},
      {id:'volume',label:'Lower the target to 3 minutes per application so the pilot shows a clear gain over manual review.',feedback:'A tighter target rewards recruiters for trusting the summaries. The other team got faster while 3 of 10 summaries missed relevant experience. Track missed experience and corrected claims alongside time.'},
      {id:'approve',label:'Keep the plan, and have a manager spot-check a few summaries if review time looks suspiciously fast.',feedback:'A spot check triggered by speed comes too late and catches too little. The other team found its errors through a planned check. Track missed experience, corrected claims, and useful questions from the start.'}
    ],
    takeaway:'Measure what the AI misses and overstates, not only time saved. Compare a small batch with manual review. People decide and approve candidate contact.',
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
