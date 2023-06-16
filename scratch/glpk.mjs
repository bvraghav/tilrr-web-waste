// const GLPK = require('glpk.js');
// const glpk = GLPK();
// const options = {
//   msglev: glpk.GLP_MSG_ALL,
//   presol: true,
//   cb: {
//     call: progress => console.log(progress),
//     each: 1
//   }
// };
// const res = glpk.solve({
//   name: 'LP',
//   objective: {
//     direction: glpk.GLP_MAX,
//     name: 'obj',
//     vars: [
//       { name: 'x1', coef: 0.6 },
//       { name: 'x2', coef: 0.5 }
//     ]
//   },
//   subjectTo: [
//     {
//       name: 'cons1',
//       vars: [
//         { name: 'x1', coef: 1.0 },
//         { name: 'x2', coef: 2.0 }
//       ],
//       bnds: { type: glpk.GLP_UP, ub: 1.0, lb: 0.0 }
//     },
//     {
//       name: 'cons2',
//       vars: [
//         { name: 'x1', coef: 3.0 },
//         { name: 'x2', coef: 1.0 }
//       ],
//       bnds: { type: glpk.GLP_UP, ub: 2.0, lb: 0.0 }
//     }
//   ]
// }, options);


import GLPK from 'glpk.js';
(async () => {

  const glpk = await GLPK();

  // function print(res) {
  //   const el = window.document.getElementById('out');
  //   el.innerHTML = JSON.stringify(res, null, 2);
  // };
  const print = console.log

  const lp = {
    name: 'LP',
    objective: {
      direction: glpk.GLP_MAX,
      name: 'obj',
      vars: [
        { name: 'x1', coef: 0.6 },
        { name: 'x2', coef: 0.5 }
      ]
    },
    subjectTo: [
      {
        name: 'cons1',
        vars: [
          { name: 'x1', coef: 1.0 },
          { name: 'x2', coef: 2.0 }
        ],
        bnds: { type: glpk.GLP_UP, ub: 1.0, lb: 0.0 }
      },
      {
        name: 'cons2',
        vars: [
          { name: 'x1', coef: 3.0 },
          { name: 'x2', coef: 1.0 }
        ],
        bnds: { type: glpk.GLP_UP, ub: 2.0, lb: 0.0 }
      }
    ]
  };

  const opt = {
    msglev: glpk.GLP_MSG_OFF,
    cb: {
      call: res => print(res),
      each: 1
    }
  };

  let res

  try {
    console.log('')
    console.log('---')
    console.log('LP with opt')
    console.log('---')
    console.log('Messages')
    res = await glpk.solve(lp, opt)  
    console.log('---')
    console.log('Result')
    console.log(res)
    console.log('---')
  } catch (err) {
    console.error('ERROR')
    console.error(err)
  }

  console.log('')
  console.log('')
  console.log('')
  console.log('---')
  console.log('LP with DBG')
  console.log('---')
  console.log('Messages')
  res = await glpk.solve(lp, glpk.GLP_MSG_DBG)
  console.log('---')
  console.log('Result')
  console.log(res);
  console.log('---')

  // window.document.getElementById('cplex').innerHTML = await glpk.write(lp);

})();
