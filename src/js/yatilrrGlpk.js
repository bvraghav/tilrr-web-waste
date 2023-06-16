import GLPK from 'glpk.js'
import { range, zip, unzip } from '@bvraghav/node_utils'
import { Permutator } from '@/js/Permutator'

/**
 * splits: Array of Tuples of (Number, Integer)
 * sizeMax: Number
 * DEBUG: Boolean; flag to indicate debug message
 *        output
 */
export async function yatilrrGlpkJs(
  splits,
  sizeMax,
  DEBUG=false,
) {
  
  const glpk = await GLPK()

  const opt = (DEBUG ? {} : glpk.GLP_MSG_DBG)

  const {
    cuts,
    requirements,
    outcomes,
    wastage,
    lp
  } = await constructLp(glpk, splits, sizeMax)

  const {result:{vars:rawResult, z}}
        =  await glpk.solve(lp, opt)

  console.log({
    outcomes: [outcomes.length, outcomes[0].length],
    wastage: wastage.length,
    cuts: cuts.length,
    requirements: requirements.length,
    rawResult: Object.values(rawResult).length,
  })

  const result = zip(
    outcomes,
    wastage,
    Object.values(rawResult)
  ).filter(
    ([out, waste, N]) => (0 < N)
  ).map(
    ([out, waste, N]) => [
      zip(out, cuts).filter(([n,c]) => (0 < n)),
      waste,
      N
    ]
  )

  return {result, z}

}

/**
 * glpk: The solver instance
 * splits: Array of Tuples of (Number, Integer)
 * sizeMax: Number
 */
export async function constructLp(
  glpk,
  splits,
  sizeMax,
) {
  // const glpk = await GLPK()

  const N_MAX=100000

  const [cuts, requirements] = unzip(splits)
  const {result: outcomes, available: wastage} =
        new Permutator(cuts, sizeMax).permute()

  console.log(zip(outcomes, wastage).map(
    ([out, waste]) => [
      zip(out, cuts).filter(([n,c]) => (0 < n)),
      waste
    ]
  ))

  const varX = (i) => `x${String(i).padStart(4,0)}`
  const sVar = (s, i) => ({
    name: varX(i),
    coef: s,
  })
  const lb = (x) => ({
    type: glpk.GLP_LO,
    ub: N_MAX,
    lb: x,
  })
  const M = outcomes.length
  const A_ = unzip(outcomes)

  const objective = {
    direction: glpk.GLP_MIN,
    name: 'tilrrObj',
    vars: range(M).map((i) => sVar(1.0, i))
  }

  const subjectTo = requirements.map(
    (r, j) => ({
      name:'',
      vars: A_[j].map((a, i) => sVar(a, i)),
      bnds: lb(r),
    })
  )

  const bounds = range(outcomes.length).map(
    (i) => ({
      name: varX(i),
      ...lb(0.0),
    })
  )

  const generals = range(outcomes.length).map(varX)

  return {
    cuts,
    requirements,
    outcomes,
    wastage,
    lp: {
      name: 'tilrrLp',
      objective,
      subjectTo,
      bounds,
      generals,
    },
  }
}
