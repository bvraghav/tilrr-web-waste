<script setup>
import { useMeta, useActiveMeta } from 'vue-meta'
import { useSplits, SplitsNotEmptyError } from '@/use/splits'

useMeta({
  title: 'Demo',
})

const {
  // Data
  splits,

  // Methods
  canonicaliseSplits,
  pushToSplits,
} = useSplits()

splits.value = [[2,3]]
</script>

<template>
<main>
  <div>
    <p>This is a demo page.</p>
    <template v-for="([s,n], i) in splits" key="i">
      <p>s: {{ s }}, n: {{ n }}</p>
    </template>
    <a href="javscript:void(0)"
       @click.prevent="canonicaliseSplits({force:true})"
       >Canonicalise Splits</a>
  </div>
</main>
</template>
