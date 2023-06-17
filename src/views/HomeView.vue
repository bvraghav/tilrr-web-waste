<script setup>
  import {RouterLink} from 'vue-router'
</script>

<template>
<main>
  <section class="w-80">
    <p>This web app aims to solve the problem of excess
      tile waste on construction sites, by leveraging
      optimisation theory, implemented using technical
      advances in numerical solvers, and in information
      technology.  We hope for a requisite prior
      planning on-site, and this app is a step towards
      facilitating the same.</p>

    <p class="border-b mt-6 mb-2"
       style="font-variant-caps:all-small-caps"
       >Usage
    </p>

    <p>We assume that the tile is cut only along one
      dimension. User requires <i>Full Tile
      Size,</i> <i>List of cut tile sizes,</i>
      and <i>Required count of each.</i></p>

    <p><RouterLink
         to="/demo"
         class="w-80 py-2 my-2 rounded font-bold block
                visited:text-white hover:text-white
                text-white text-center bg-orange-500
                hover:bg-orange-400"
         >Go to Demo</RouterLink></p>

    <p class="border-b mt-6 mb-2"
       style="font-variant-caps:all-small-caps"
       >Software Credits
    </p>

    <ul>
      <li><a href="https://www.gnu.org/software/glpk/">GNU GLPK</a></li>
      <li><a href="https://github.com/jvail/glpk.js/">GLPK.JS</a></li>
      <li><a href="https://vuejs.org/">Vue JS</a></li>
      <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
    </ul>
  </section>
</main>
</template>
