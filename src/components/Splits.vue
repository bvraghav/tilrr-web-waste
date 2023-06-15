<script setup>
import { ref, computed, watch, onMounted, defineEmits } from 'vue'

const props = defineProps({
  modelValue : {
    type: Array,
    default: []
  },
});

const emit = defineEmits(['update:modelValue'])

const splits = ref([])

watch(
  () => (props.modelValue),
  (v) => {splits.value = v},
)

// computed({
//   get() { return props.modelValue },
//   set(v) { emit('update:modelValue', v) },
// });

watch(
  splits,
  (v) => { emit('update:modelValue', v) }
)

onMounted(() => {
  // TODO: do something
  splits.value = props.modelValue
})
</script>

<template>
<section>
  <div class="splits grid grid-cols-2 w-40 gap-1
  text-gray-500 focus:text-gray-700">
    <template v-for="([s,n], i) in splits" key="i">
      <input type="number"
             class="px-2 py-0.5 text-right bg-gray-100/75"
             v-model="splits[i][0]"/>
      <input type="number"
             class="px-2 py-0.5 text-right bg-gray-100/75"
             v-model="splits[i][1]"/>
    </template>
  </div>

  <p>
    <a href="javascript:void(0)"
       @click.prevent="$emit('update:modelValue', [...modelValue, [0,0]])"
       >Add a split</a>
  </p>  
</section>

</template>


<style scoped>

</style>
