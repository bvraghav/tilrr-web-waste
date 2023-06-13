import { ref } from 'vue'

export class SplitsNotEmptyError extends Error {}

export function useSplits() {

  const splits = ref([])

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

  const pushToSplits = () => {
    splits.value.push([0,0])
  }
 
  return {
    // Data
    splits,

    // Methods
    canonicaliseSplits,
    pushToSplits,
  }

}
