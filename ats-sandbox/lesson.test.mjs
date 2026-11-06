import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cases,evaluateChoice,reviewPlan} from './lesson.mjs';
test('every displayed decision has a consequence, with a supported recommendation',()=>{
  for(const c of cases){
    assert.equal(c.options.filter(o=>o.recommended).length,1);
    for(const o of c.options)assert.ok(evaluateChoice(c.id,o.id).feedback.length>100);
  }
});
test('invalid inputs cannot masquerade as reviewed choices',()=>{
  for(const args of [['criteria',null],['missing','shadow'],['pilot','made-up']])assert.throws(()=>evaluateChoice(...args));
});
test('unfinished and risky reviews are not exported as approved plans',()=>{
  assert.equal((reviewPlan({}).match(/Not reviewed yet/g)||[]).length,4);
  const text=reviewPlan({criteria:'domain',evidence:'accept',access:'recording',pilot:'volume'});
  assert.equal((text.match(/Revisit before a pilot/g)||[]).length,4);
  assert.match(text,/Your decision: Keep ATS/);
});
test('recommended review preserves uncertainty, access, and human contact approval',()=>{
  const text=reviewPlan({criteria:'ownership',evidence:'split',access:'confirm',pilot:'shadow'});
  assert.match(text,/Ratings can guide improvements/);
  assert.match(text,/without treating a requested adjustment as evidence of ability/);
  assert.match(text,/People decide and approve candidate contact/);
});
