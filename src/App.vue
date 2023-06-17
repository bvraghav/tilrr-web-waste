<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Icon } from '@vicons/utils'
import Logo from '@/assets/logo.svg'
import { useMeta, useActiveMeta } from 'vue-meta'

useMeta({
  title: 'Home',
})

</script>

<template>
<metainfo>
  <template v-slot:title="{content}">
    {{ content }} | Tilrr: Tile Waste Optimiser
  </template>
</metainfo>

<header class="flex flex-wrap gap-5 items-end text-xl
               border-b border-solid border-amber-700/25 pb-2">

  <RouterLink to="/" class="flex flex-wrap gap-3 items-end">
    <Icon size="56" class="rounded block">
      <Logo />
    </Icon>
    <span>Tilrr</span>
  </RouterLink>


  <template v-if='$route.name != "home"'>
    <RouterLink to="/demo">Demo</RouterLink>
  </template>
</header>

<div class="main-content mt-8">
  <RouterView />
</div>
</template>

<style scoped>

</style>
