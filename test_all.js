const fs = require('fs');
const jsdom = require('./temp_jsdom/node_modules/jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/quiz.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/' });

const t1 = fs.readFileSync('f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t1.js', 'utf8');
const t2 = fs.readFileSync('f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t2.js', 'utf8');
const t3 = fs.readFileSync('f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t3.js', 'utf8');
const t4 = fs.readFileSync('f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t4.js', 'utf8');

dom.window.eval(t1);
dom.window.eval(t2);
dom.window.eval(t3);
dom.window.eval(t4);

dom.window.eval(`
  window.TESTS = TESTS;
`);

setTimeout(() => {
  let w = dom.window;
  for (let t = 0; t < w.TESTS.length; t++) {
    w.selectTest(t);
    let qs = w.TESTS[t].questions;
    for (let i = 0; i < qs.length; i++) {
      let q = qs[i];
      for (let j = 0; j < q.opts.length; j++) {
        w.startTest(); // reset
        
        let el = w.document.querySelector('#qi' + i + ' .opt[data-o="' + j + '"]');
        if (!el) {
          console.error("ELEMENT NOT FOUND FOR TEST " + t + " Q " + i + " OPT " + j);
          continue;
        }
        w.pickOpt(i, j, el);
        
        try {
          w.handleSubmit();
        } catch(e) {
          console.error("CRASH ON TEST " + t + " Q " + i + " OPT " + j, e);
        }
      }
    }
    console.log("Test " + t + " passed all 1-question simulations.");
    
    // Now simulate picking ALL answers correctly
    w.startTest();
    for (let i = 0; i < qs.length; i++) {
      let correct = qs[i].ans;
      w.pickOpt(i, correct, w.document.querySelector('#qi' + i + ' .opt[data-o="' + correct + '"]'));
    }
    try {
      w.handleSubmit();
      console.log("Test " + t + " passed all-correct simulation.");
    } catch(e) {
      console.error("CRASH ON ALL-CORRECT", e);
    }
    
    // Simulate picking multiple random answers
    w.startTest();
    for (let i = 0; i < qs.length; i += 2) { // pick every other question
      w.pickOpt(i, 0, w.document.querySelector('#qi' + i + ' .opt[data-o="0"]'));
    }
    try {
      w.handleSubmit();
      console.log("Test " + t + " passed partial simulation.");
    } catch(e) {
      console.error("CRASH ON PARTIAL", e);
    }
  }
}, 500);
