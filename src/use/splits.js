import { ref, computed, watch } from 'vue'
import { range, unzip, zip } from '@bvraghav/node_utils'
import { Sampler, Ops } from '@bvraghav/node_utils'

export class SplitsNotEmptyError extends Error {}

export function useSplits() {

  const splits = ref([])
  const sizeMax = ref(0)
  const nReqMax = ref(1000)
  const nReqMin = ref(100)

  const cuts = ref(0)
  const requirements = ref(0)

  watch(splits, (v) => {
    const [c_, r_] = unzip(v)
    cuts.value = c_
    requirements.value = r_
  })

  const totalRequirement = computed(() => {
    return splits.value.reduce(
      (a, [c_, r_]) => (a + c_*r_),
      0.0
    )
  })

  const canonicaliseSplits = ({force}={
    force:false
  }) => {
    if (!force && 0 < splits.value.length) {
      throw new SplitsNotEmptyError(`${splits.value.length}`)
    }

    splits.value = import.meta.env
      .VITE_DEMO_DEFAULT_SPLITS
      .split(',')
      .map((s) => [parseFloat(s), 0])
  }

  const randomiseSplits = () => {
    const S = new Sampler()
    const l = requirements.value.length

    // E[R] ~= 0.5 => sum(R) ~= len(R) * E[R]
    const z = (1/(0.5 * l)) * S.randRange(
      nReqMin.value,
      nReqMax.value
    )

    const R = Array(l).fill(0).map(
      () => Math.floor(S.random() * z)
    )

    splits.value = zip(cuts.value, R)
  }

  const pushToSplits = () => {
    splits.value.push([0,0])
  }

  const addSplit = () => {
    splits.value.push([0,0])
  }

  const sanitiseSplits = () => {
    if (splits.value.length < 2)
      return

    splits.value = splits.value.filter(
      ([s,n]) => (0 < n && 0 < s && s < sizeMax.value)
    )

    if (splits.value.length < 1)
      splits.value = [[1,0]]
  }

 
  return {
    // Data
    splits, totalRequirement, cuts, requirements,
    sizeMax,

    // Methods
    addSplit,
    sanitiseSplits,
    randomiseSplits,
    canonicaliseSplits,
    pushToSplits,
  }
}
