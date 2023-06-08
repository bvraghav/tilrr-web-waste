
# Table of Contents

1.  [VueJs with vite](#org70f2520)
    1.  [Expose to network](#org19e590e)
2.  [UI](#org2d5d5d3)
    1.  [Tailwind](#orgd1135fa)
    2.  [Xicons](#orge130848)
        1.  [Installation](#orge4417aa)
        2.  [Usage](#orgd078fd6)
    3.  [Vite SVG Loader](#orgb4c0bbc)
    4.  [HeadlessUI](#org7eab2bc)
3.  [Functional](#org6cb80fe)
    1.  [Vue Use](#orgf1b36d7)
    2.  [Json-schema validator](#orgc4ba4b4)
    3.  [Vue Meta](#org1201692)
    4.  [BVR Node Utils](#org9c57dbc)
    5.  [JSDOM](#org8652d6c)
4.  [Integrating Firebase](#org9580a4a)
    1.  [VueFire Wrapper](#org0d1f225)
    2.  [Firebase API](#orgb19a7fd)
    3.  [Deployment](#org4626052)
    4.  [App Debug Token](#orgdb6b19e)
5.  [GLPK](#org43bc1c6)
    1.  [Example](#orgfb4b9d6)

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


<a id="org70f2520"></a>

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


<a id="org19e590e"></a>

## Expose to network

`package.json`

    {
      "scripts": {
        "dev": "vite --host"
      }
    }


<a id="org2d5d5d3"></a>

# UI

-   [ ] css (tailwindcss),
-   [ ] svg icons
-   [ ] icons (xicons),
-   [ ] headlessui,


<a id="orgd1135fa"></a>

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


<a id="orge130848"></a>

## Xicons

-   [X] icons (xicons),


<a id="orge4417aa"></a>

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


<a id="orgd078fd6"></a>

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


<a id="orgb4c0bbc"></a>

## Vite SVG Loader

-   [X] svg icons

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


<a id="org7eab2bc"></a>

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


<a id="org6cb80fe"></a>

# Functional

-   [ ] vue-use,
-   [ ] json-validator (ajv),
-   [ ] vue-meta (page metadata manager),
-   [ ] bvr-node-utils,
-   [ ] jsdom


<a id="orgf1b36d7"></a>

## Vue Use

-   [X] vue-use

Install

    pnpm i @vueuse/core


<a id="orgc4ba4b4"></a>

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


<a id="org1201692"></a>

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


<a id="org9c57dbc"></a>

## BVR Node Utils

-   [X] bvr-node-utils,

    pnpm i gl:bvraghav/node_utils.git


<a id="org8652d6c"></a>

## JSDOM

For testing purposes if required at all

    pnpm i jsdom


<a id="org9580a4a"></a>

# Integrating Firebase


<a id="org0d1f225"></a>

## VueFire Wrapper

<https://vuefire.vuejs.org/>

    pnpm install vuefire firebase


<a id="orgb19a7fd"></a>

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


<a id="org4626052"></a>

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


<a id="orgdb6b19e"></a>

## App Debug Token

-   **Name:** TilrrTileWaste
-   **Token:** 36CD9FBD-0136-4639-A857-8E56DA93E404


<a id="org43bc1c6"></a>

# GLPK

<https://github.com/jvail/glpk.js/>

    pnpm install glpk.js


<a id="orgfb4b9d6"></a>

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

