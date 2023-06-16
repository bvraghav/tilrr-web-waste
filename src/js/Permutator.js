import { range } from '@bvraghav/node_utils'

export class Permutator {

  constructor(
    cutSizes,
    maxSize,
    result=null,
    available=null
  ) {
    this.cutSizes = cutSizes
    this.maxSize = maxSize
    this.result = null
    this.available = null
    this.cursor = 0
  }

  permute() {
    if (this.isTerminal()) {
      this.postPrune()
      return {result:this.result, available:this.available}
    }

    const m = this.maxSize
    const i = this.cursor
    const c = this.cutSizes[i]
    const N = range(1+Math.floor(m/c))

    this.update(c,N)
    this.prePrune()

    // console.log(`cursor: ${this.cursor}`)

    // console.log('result')
    // console.log(this.result)

    // console.log('available')
    // console.log(this.available)

    this.inc()

    return this.permute()
  }

  inc() {
    this.cursor += 1
  }

  isTerminal() {
    return this.cutSizes.length <= this.cursor
  }

  update(s, N)  {
    // Initial Update
    // ------------------------------------------------
    if (this.result === null) {
      const M = this.maxSize
      this.result = N.map((n) => ([n]))
      this.available = N.map((n) => (M - s * n))

      return
    }

    // Get the lengths
    // ------------------------------------------------
    const r = this.result.length
    const n = N.length

    // Update results
    // ------------------------------------------------
    // [R1,...,Rr]
    //   => [R1,...n-times,
    //       ...,
    //       Rr,...n-times]
    const R_ = this.result.flatMap(
      (arr) => (Array(n).fill(arr))
    )
    // [n1,...,nN] => [[n1],...,[nN], ... rtimes]
    const N_ = Array(r).fill(N).flat().map((n) => ([n]))
    // Concatenate
    // => [[...R1, n1], [...R1,n2],..., [...Rr,nN]]
    this.result = range(R_.length).map(
      (i) => ([...R_[i],...N_[i]])
    )

    // Update availables
    // ------------------------------------------------
    // [a1,...,ar] => [a1,... n-times,
    //                 ...,
    //                 ar, ...n-times]
    const A_ = this.available.flatMap(
      (a) => (Array(n).fill(a))
    )
    // [n1,...,nN] => [s*n1,...,s*nN,... rtimes]
    const S_ = Array(r).fill(N).flat()
          .map((n) => (s*n))
    this.available = range(S_.length).map(
      (i) => (A_[i] - S_[i])
    )

  }

  prePrune() {
    const filterFn = (i) => (0 <= this.available[i])
    const n = this.available.length

    return this.maskResults(range(n).filter(filterFn))
  }

  
  postPrune() {
    const filterFn = (i) => this.available[i] < cutoff

    const cutoff = Math.min(...this.cutSizes)
    const n = this.available.length

    this.maskResults(range(n).filter(filterFn))
  }

  maskResults(mask) {
    const result = this. result
    const available = this. available
    this.result = mask
      .map((i) => (result[i]))
    this.available = mask
      .map((i) => (available[i]))
  }
}

export default {
  Permutator
}
