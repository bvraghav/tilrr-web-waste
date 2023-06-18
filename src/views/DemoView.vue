<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useMeta, useActiveMeta } from 'vue-meta'
import { range, zip, unzip } from '@bvraghav/node_utils'

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
  sizeMax,

  // Methods
  addSplit,
  sanitiseSplits,
  canonicaliseSplits,
  pushToSplits,
} = useSplits()


const unit = ref("in")

const solution = ref(null)
const numTiles = ref(0)

const grossWaste = ref(null)
const grossWastePc = ref(null)
const netWaste = ref(null)
const futureCount = ref(null)
const futureLength = ref([])
const computing = ref(false)
const netWastePc = ref(null)

const resetState = () => {

  solution.value = null
  numTiles.value = 0
  grossWaste.value = null
  grossWastePc.value = null
  netWaste.value = null
  futureCount.value = []
  futureLength.value = null
  netWastePc.value = ref(null)
  
}

const solveLp = async () => {
  sanitiseSplits()

  resetState()
  computing.value = true

  const {result, z} = await yatilrrGlpkJs(
    splits.value,
    sizeMax.value,
  )

  computing.value = false
  solution.value = result
  numTiles.value = solution.value.reduce(
    (a, [o,w,x]) => (a+x),
    0.0
  )

  grossWaste.value = (
    numTiles.value * sizeMax.value
      - totalRequirement.value
  )

  netWaste.value = solution.value.reduce(
    (a, [o,w,x]) => (a+w*x),
    0.0
  )

  futureCount.value = solution.value.reduce(
    (r, [o,w,x]) => {
      o.forEach(([n,c]) => {
        const i = cuts.value.indexOf(c)
        r[i] += x*n
        // console.log({c, i, r, n:n*x})
      })
      return r
    },
    requirements.value.map((x) => (-x))
  )

  futureLength.value = zip(
    futureCount.value,
    cuts.value,
  ).reduce(
    (a, [n,c]) => (a+n*c),
    0.0
  )

  grossWastePc.value = (
    grossWaste.value / totalRequirement.value
    * 100
  ).toFixed(2)

  netWastePc.value = (
    netWaste.value / totalRequirement.value
    * 100
  ).toFixed(2)

  console.log(solution.value)
}

onMounted(async () => {
  sizeMax.value = 24
  unit.value = "in"
  splits.value = [
    [1.5, 12],
    [3, 24],
    [5, 8],
    [7.5, 5],
  ]
  // splits.value = [[2,3]]

})

const updateSplits = (v) => {
  splits.value = v
}

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
             v-model="sizeMax"
             @input="resetState()"/>
      <input class="py-0.5 text-right bg-gray-100/75 pr-2
                    text-gray-500 focus:text-gray-700"
             v-model="unit"/>
    </div>
  </section>

  <section>
    <h3 class="text-lg italic border-b w-80 mb-3 mt-5"
        >User Split Data</h3>
    <Splits :modelValue='splits'
            @update:modelValue="updateSplits"
            @edited="resetState"
            class="mb-4 w-80">
      <h4 class="text-right"
          >Cut Size ({{ unit }})</h4>
      <h4 class="text-right"
          >Count</h4>
    </Splits>

    <section class="flex flex-row flex-nowrap
                    justify-between w-80 gap-4 text-sm
                    italic">
      <p><a href="javascript:void(0)"
            @click.prevent="addSplit()"
            >Add a split</a></p>

      <p><a href="javascript:void(0)"
            @click.prevent="sanitiseSplits()"
            >Sanitise splits</a></p>

      <p><a href="javscript:void(0)"
            @click.prevent="canonicaliseSplits({force:true}); resetState()"
            >Use default splits</a></p>
    </section>

    <section>
      <button class="w-80 py-2 my-2 rounded font-bold
                     text-white text-center
                     bg-orange-500
                     disabled:bg-orange-900/50
                     hover:bg-orange-400"
              :disabled="computing || solution"
              @click="solveLp()"
              >Solve for minimum waste</button>
    </section>

  </section>

  <section v-if="solution">
    <h3 class="text-lg italic border-b w-80 mt-5 mb-3"
        >Solution</h3>

    <h4 class="border-b w-80 pt-4">Summary</h4>

    <div class="splits grid grid-cols-4 w-80 gap-1">
      <h4 class="col-span-3 italic">Total required length ({{ unit }})</h4>
      <p>{{ totalRequirement }}</p>

      <h4 class="col-span-3 italic">Full tile size ({{ unit }})</h4>
      <p>{{ sizeMax }}</p>

      <h4 class="col-span-3 italic">Total num tiles</h4>
      <p>{{ numTiles || '-' }}</p>

      <h4 class="col-span-3 italic">Gross waste ({{ unit }})</h4>
      <p>{{ grossWaste || '-' }}</p>

      <h4 class="col-span-3 italic">Gross waste (%)</h4>
      <p>{{ grossWastePc }}</p>

      <h4 class="col-span-3 italic">Total length cut for future ({{ unit }})</h4>
      <p>{{ futureLength || '-' }}</p>

      <h4 class="col-span-3 italic">Net waste ({{ unit }})</h4>
      <p>{{ netWaste || '-' }}</p>

      <h4 class="col-span-3 italic">Net waste (%)</h4>
      <p>{{ netWastePc }}</p>
    </div>

    <h4 class="border-b w-80 pt-4">Details</h4>
    <div class="splits grid grid-cols-4 w-80 gap-1">
      <h5 class="italic"># Tiles</h5>
      <h5 class="italic col-span-2">Strategy</h5>
      <h5 class="italic">Net Waste</h5>
      <h5 class="col-span-4 border-b"/>
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

    <h4 class="border-b w-80 pt-4">Tiles cut for future</h4>
    <div class="splits grid grid-cols-4 w-80 gap-1">
      <h5 class="italic"></h5>
      <h5 class="italic col-span-2">Count x Cut Size</h5>
      <h5 class="italic"></h5>
      <h5 class="col-span-4 border-b"/>

      <p></p>
      <p class="col-span-2 pb-2">
        <template v-for="([n,c], i) in
                       zip(futureCount,cuts)"
                :key="i">
          <br v-if="0 < i" />
          <span>{{n}} <span class="px-2">x</span> {{c}} {{ unit }}</span>
        </template>
      </p>
      <p></p>
    </div>

  </section>

</main>
</template>
