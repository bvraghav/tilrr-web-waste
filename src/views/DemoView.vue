<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMeta, useActiveMeta } from 'vue-meta'

import { useSplits, SplitsNotEmptyError } from '@/use/splits'
import { yatilrrGlpkJs } from '@/js/yatilrrGlpk'

// ---------------------------------------------------
// Componens
// ----------------------------------------------------
import Splits from '@/components/Splits.vue'

useMeta({
  title: 'Demo',
})

const {
  // Data
  splits, totalRequirement, cuts, requirements,

  // Methods
  addSplit,
  sanitiseSplits,
  canonicaliseSplits,
  pushToSplits,
} = useSplits()


const sizeMax = ref(24)
const unit = ref("in")

const solution = ref('')
const numTiles = ref(0)

const solveLp = async () => {
  sanitiseSplits()

  solution.value = "Computing ..."
  numTiles.value = 0

  const {result, z} = await yatilrrGlpkJs(
    splits.value,
    sizeMax.value,
  )

  solution.value = result
  numTiles.value = solution.value.reduce(
    (a, [o,w,n]) => (a+n),
    0.0
  )

  console.log(solution.value)
}

onMounted(async () => {
  splits.value = [
    [1.5, 12],
    [3, 24],
    [5, 8],
    [7.5, 5],
  ]
  // splits.value = [[2,3]]

})
</script>

<template>
<main>
  <header>
    <h2 class="text-xl font-bold pb-1 border-b w-80 mb-8"
        >Demo for Tilrr</h2>
  </header>

  <section>
    <h3 class="text-lg italic border-b w-80 mt-5 mb-3"
        >Full Tile Size</h3>

    <div class="splits grid grid-cols-4 w-80 gap-1">
      <input type="number"
             class="py-0.5 text-right bg-gray-100/75
                    text-gray-500 focus:text-gray-700
                    col-span-3"
             v-model="sizeMax"/>
      <input class="py-0.5 text-right bg-gray-100/75 pr-2
                    text-gray-500 focus:text-gray-700"
             v-model="unit"/>
    </div>
  </section>

  <section>
    <h3 class="text-lg italic border-b w-80 mb-3 mt-5"
        >User Split Data</h3>
    <Splits :modelValue='splits'
            @update:modelValue='(v) => {splits.value = v}'
            class="mb-4 w-80">
      <h4 class="text-right"
          >Cut Size ({{ unit }})</h4>
      <h4 class="text-right"
          >Count</h4>
    </Splits>

    <section class="flex flex-row flex-nowrap gap-4
                    text-sm italic">
      <p><a href="javascript:void(0)"
            @click.prevent="addSplit()"
            >Add a split</a></p>

      <p><a href="javascript:void(0)"
            @click.prevent="sanitiseSplits()"
            >Sanitise splits</a></p>

      <p><a href="javscript:void(0)"
            @click.prevent="canonicaliseSplits({force:true})"
            >Use default splits</a></p>
    </section>

    <section>
      <button class="w-80 py-2 my-2 rounded font-bold
                     text-white text-center
                     bg-orange-500"
              @click="solveLp()"
              >Solve for minimum waste</button>
    </section>

  </section>

  <section>
    <h3 class="text-lg italic border-b w-80 mt-5 mb-3"
        >Solution</h3>

    <div class="splits grid grid-cols-4 w-80 gap-1">
      <h4 class="col-span-3 italic">Total required length</h4>
      <p>{{ totalRequirement }} {{ unit }}</p>

      <h4 class="col-span-3 italic">Full tile size</h4>
      <p>{{ sizeMax }} {{ unit }}</p>

      <h4 class="col-span-3 italic">Total num tiles</h4>
      <p>{{ numTiles || '-' }}</p>

      <h4 class="col-span-3 italic">Net waste</h4>
      <p v-if="numTiles" >{{ numTiles * sizeMax - totalRequirement }}
        {{ unit }}</p>
      <p v-else>-</p>
    </div>

    <h4 class="border-b w-80 pt-4">Details</h4>
    <div class="splits grid grid-cols-4 w-80 gap-1">
      <h5 class="italic"># Tiles</h5>
      <h5 class="italic col-span-2">Strategy</h5>
      <h5 class="italic">Gross Waste</h5>
      <hr class="col-span-4 border-b"/>
      <template v-for="([outcomes, waste, N], i) in solution"
                :key="i">
        <p>{{ N }} tiles </p>
        <p class="col-span-2 pb-2">
          <template v-for="([n, c], j) in outcomes"
                    :key="j">
            <br v-if="0 < j" />
            <span>{{n}} <span class="px-2">x</span> {{c}} {{ unit }}</span>
          </template>
        </p>
        <p>{{ N*waste }} {{ unit }}.</p>
      </template>
    </div>

  </section>
</main>
</template>
