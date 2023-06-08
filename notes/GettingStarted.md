
# Table of Contents

1.  [VueJs with vite](#org5bb208e)
    1.  [Expose to network](#org2c9b43f)
2.  [UI](#org9f9718b)
    1.  [Tailwind](#org4dd8f27)
    2.  [Xicons](#orgd59d68c)
        1.  [Installation](#org8a77aa5)
        2.  [Usage](#org7513519)
    3.  [Vite SVG Loader](#orgd77792d)
    4.  [HeadlessUI](#org855f998)
3.  [Functional](#org372d673)
    1.  [Vue Use](#org9e3920a)
    2.  [Json-schema validator](#org31dc1a1)
    3.  [Vue Meta](#org7a818d7)
    4.  [BVR Node Utils](#orgbecfa36)
    5.  [JSDOM](#orga2cb78c)
4.  [Integrating Firebase](#orga1144e4)
    1.  [VueFire Wrapper](#org9213b82)
    2.  [Firebase API](#org7f00841)
    3.  [Deployment](#org25bf91b)
    4.  [App Debug Token](#org9b02f82)
5.  [GLPK](#org5f13172)
    1.  [Example](#orgdd8dcd1)

I want to jump-start a vue-based project, so that the
fundamentals like

-   [ ] routes (vue-router),
-   [ ] linting (eslint),
-   [ ] vitest,

-   [ ] css (tailwindcss),
-   [ ] svg icons
-   [ ] icons (xicons),
-   [ ] headlessui,

-   [ ] vue-use,
-   [ ] json-validator (ajv),
-   [ ] vue-meta (page metadata manager),
-   [ ] bvr-node-utils,
-   [ ] jsdom


<a id="org5bb208e"></a>

# VueJs with vite

    export PROJECT_NAME=tilrr-web-app
    pnpm create vue@latest ${PROJECT_NAME}
    cd ${PROJECT_NAME}
    pnpm install
    pnpm format
    pnpm run dev 

-   [X] routes (vue-router),
-   [X] linting (eslint),
-   [X] vitest,


<a id="org2c9b43f"></a>

## Expose to network

`package.json`

    {
      "scripts": {
        "dev": "vite --host"
      }
    }


<a id="org9f9718b"></a>

# UI

-   [ ] css (tailwindcss),
-   [ ] svg icons
-   [ ] icons (xicons),
-   [ ] headlessui,


<a id="org4dd8f27"></a>

## Tailwind

-   [X] css (tailwindcss),

    pnpm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

`tailwind.config.js`

    export default {
      content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
    }

`src/assets/style.css`

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

`src/main.js`

    // import './assets/main.css'
    import './assets/style.css'


<a id="orgd59d68c"></a>

## Xicons

-   [X] icons (xicons),


<a id="org8a77aa5"></a>

### Installation

    pnpm i -D @vicons/fluent \
         @vicons/ionicons4   \
         @vicons/ionicons5   \
         @vicons/antd        \
         @vicons/material    \
         @vicons/fa          \
         @vicons/tabler      \
         @vicons/carbon      \
         @vicons/utils


<a id="org7513519"></a>

### Usage

    <script setup>
    import { Icon } from '@vicons/utils'
    import { Money16Regular } from '@vicons/fluent'
    </script>
    
    <template>
    <Icon>
      <Money16Regular />
    </Icon>
    </template>


<a id="orgd77792d"></a>

## Vite SVG Loader

-   [X] svg icons

Install

    pnpm i -D vite-svg-loader

`vite.config.js`

    import svgLoader from 'vite-svg-loader'
    
    export default defineConfig({
      plugins: [vue(), svgLoader()]
    })

**Controlling The SVG Size (with @vicons/utils)**   
Use Xicons component `Icon` to wrap the svg

    <Icon size="80"><Logo /></Icon>

**Controlling The SVG Size (without @vicons/utils)**   
Use the HTML `width` and/ or `height` attribute to
control the size. Specifying one of them will scale
with no margin and preserve the aspect ratio, whereas
specifying both will fit, i.e. leave equal margin space
around the unfit side. Eg.

    <Logo width="80" class="rounded" />


<a id="org855f998"></a>

## HeadlessUI

-   [X] headlessui,

Install  

    pnpm install @headlessui/vue@latest @headlessui/tailwindcss@latest

Usage

    <template>
      <Menu>
        <MenuButton>More</MenuButton>
        <MenuItems>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Account settings
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Documentation
            </a>
          </MenuItem>
          <MenuItem disabled>
            <span class="opacity-75">Invite a friend (coming soon!)</span>
          </MenuItem>
        </MenuItems>
      </Menu>
    </template>
    
    <script setup>
      import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
    </script>


<a id="org372d673"></a>

# Functional

-   [ ] vue-use,
-   [ ] json-validator (ajv),
-   [ ] vue-meta (page metadata manager),
-   [ ] bvr-node-utils,
-   [ ] jsdom


<a id="org9e3920a"></a>

## Vue Use

-   [X] vue-use

Install

    pnpm i @vueuse/core


<a id="org31dc1a1"></a>

## Json-schema validator

-   [X] json-validator (ajv),

Install

    pnpm install ajv fluent-json-schema

Usage

    import Ajv from 'ajv'
    import { S } from 'fluent-json-schema'
    
    const ajv = new Ajv()
    
    const schema = S.object()
          .prop('foo', S.integer())
          .prop('bar')
          .required(['foo'])
          .additionalProperties(false)
    
    const validate = ajv.compile(schema.valueOf())
    
    const data = {
      foo: 1,
      bar: "abc"
    }
    
    const valid = validate(data)
    if (!valid) console.log(validate.errors)


<a id="org7a818d7"></a>

## Vue Meta

-   [X] vue-meta (page metadata manager),

Install

    pnpm install vue-meta@3.0.0-alpha.10

`src/main.js`

    import { createMetaManager } from 'vue-meta'
    app.use(createMetaManager())

Inside of a `<script setup>` of an SFC

    import { useMeta, useActiveMeta } from 'vue-meta'
    
    const computedMeta = computed(() => ({
      title: 'My Title',
      description : `Counted ${counter.value} times`
    }))
    
    const { meta, onRemoved } = useMeta(computedMeta)
    
    onRemoved(() => {
      // Do something as soon as this metadata is removed,
      // eg because the component instance was destroyed
    })

Inside of `<template>` of the same SFC

    <metainfo>
      <template v-slot:title="{content}">
        {{ content }} | Brand
      </template>
    </metainfo>

[Check out examples](https://github.com/nuxt/vue-meta/tree/next/examples) for more.


<a id="orgbecfa36"></a>

## BVR Node Utils

-   [X] bvr-node-utils,

Install

    pnpm i gl:bvraghav/node_utils.git


<a id="orga2cb78c"></a>

## JSDOM

For testing purposes if required at all

    pnpm i jsdom


<a id="orga1144e4"></a>

# Integrating Firebase


<a id="org9213b82"></a>

## VueFire Wrapper

<https://vuefire.vuejs.org/>

    pnpm install vuefire firebase


<a id="org7f00841"></a>

## Firebase API

    npm install firebase

Then, initialize Firebase and begin using the SDKs for
the products you'd like to use.

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAefhG8aB_NqLcKKn8PsJzhUCI2p64kiS4",
      authDomain: "tilrr-tile-waste.firebaseapp.com",
      databaseURL: "https://tilrr-tile-waste-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "tilrr-tile-waste",
      storageBucket: "tilrr-tile-waste.appspot.com",
      messagingSenderId: "866550474786",
      appId: "1:866550474786:web:b9f9d41fdcfd183bfc027b",
      measurementId: "G-PDDQNQZN8C"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);


<a id="org25bf91b"></a>

## Deployment

    npm install -g firebase-tools
    
    # Login to Google
    firebase login
    
    # Initiate your project
    firebase init
    
    # Deploy web app
    firebase deploy

App is available at:   
<https://tilrr-tile-waste.web.app/>


<a id="org9b02f82"></a>

## App Debug Token

-   **Name:** TilrrTileWaste
-   **Token:** 36CD9FBD-0136-4639-A857-8E56DA93E404


<a id="org5f13172"></a>

# GLPK

<https://github.com/jvail/glpk.js/>

    pnpm install glpk.js


<a id="orgdd8dcd1"></a>

## Example

    const GLPK = require('glpk.js');
    const glpk = GLPK();
    const options = {
      msglev: glpk.GLP_MSG_ALL,
      presol: true,
      cb: {
        call: progress => console.log(progress),
        each: 1
      }
    };
    const res = glpk.solve({
      name: 'LP',
      objective: {
        direction: glpk.GLP_MAX,
        name: 'obj',
        vars: [
          { name: 'x1', coef: 0.6 },
          { name: 'x2', coef: 0.5 }
        ]
      },
      subjectTo: [
        {
          name: 'cons1',
          vars: [
            { name: 'x1', coef: 1.0 },
            { name: 'x2', coef: 2.0 }
          ],
          bnds: { type: glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        },
        {
          name: 'cons2',
          vars: [
            { name: 'x1', coef: 3.0 },
            { name: 'x2', coef: 1.0 }
          ],
          bnds: { type: glpk.GLP_UP, ub: 2.0, lb: 0.0 }
        }
      ]
    }, options);

