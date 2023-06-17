<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue : {
    type: Array,
    default: []
  },
});

const emit = defineEmits([
  'update:modelValue',
  'edited',
])

const splits = ref([])
const el = ref()

// GET from parent
watch(
  () => (props.modelValue),
  (v) => {
    splits.value = v
    console.log(el.value.querySelectorAll('input'))
  },
)

// EMIT Update
watch(
  splits,
  (v) => {
    emit('update:modelValue', v)
  }
)

onMounted(() => {
  // TODO: do something
  splits.value = props.modelValue
})
</script>

<template>
<section>
  <div class="splits grid grid-cols-2 gap-1"
       ref="el">
    <slot></slot>
    <template v-for="([s,n], i) in splits" key="i">
      <input type="number"
             class="py-0.5 text-right bg-gray-100/75
                    text-gray-500 focus:text-gray-700"
             v-model="splits[i][0]"
             @input="$emit('edited')" />
      <input type="number"
             class="py-0.5 text-right bg-gray-100/75
                    text-gray-500 focus:text-gray-700"
             v-model="splits[i][1]"
             @input="$emit('edited')" />
    </template>
  </div>
</section>

</template>


<style scoped>

</style>
