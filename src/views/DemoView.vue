<script setup>
import { useMeta, useActiveMeta } from 'vue-meta'
import { useSplits, SplitsNotEmptyError } from '@/use/splits'

// ---------------------------------------------------
// Componens
// ----------------------------------------------------
import Splits from '@/components/Splits.vue'

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
    <Splits v-model='splits' />
    <a href="javscript:void(0)"
       @click.prevent="canonicaliseSplits({force:true})"
       >Use Default Splits</a>
  </div>
</main>
</template>
