
# Table of Contents

1.  [VueJs with vite](#org108d701)
    1.  [Expose to network](#orgd7e7900)
2.  [UI](#orgbc356b9)
    1.  [Tailwind](#orgc1cc823)
    2.  [Xicons](#org7e6945b)
        1.  [Installation](#org5aacd41)
        2.  [Usage](#orgf098c03)
    3.  [Vite SVG Loader](#org153f4a4)
    4.  [HeadlessUI](#org0a35c89)
3.  [Functional](#orge603313)
    1.  [Vue Use](#org2e31319)
    2.  [Json-schema validator](#orgdbf7307)
    3.  [Vue Meta](#org840c42c)
    4.  [BVR Node Utils](#org142d78f)
    5.  [JSDOM](#orgdb4c5d4)
4.  [Integrating Firebase](#org39e9e8e)
    1.  [VueFire Wrapper](#orgae5722f)
    2.  [Firebase API](#org22a728e)
    3.  [Deployment](#orgc6bf3d5)
    4.  [App Debug Token](#org7afdfd8)
5.  [GLPK](#org5606f91)
    1.  [Example](#org1599fc6)

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


<a id="org108d701"></a>

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


<a id="orgd7e7900"></a>

## Expose to network

`package.json`

    {
      "scripts": {
        "dev": "vite --host"
      }
    }


<a id="orgbc356b9"></a>

# UI

-   [ ] css (tailwindcss),
-   [ ] svg icons
-   [ ] icons (xicons),
-   [ ] headlessui,


<a id="orgc1cc823"></a>

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


<a id="org7e6945b"></a>

## Xicons

-   [X] icons (xicons),


<a id="org5aacd41"></a>

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


<a id="orgf098c03"></a>

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


<a id="org153f4a4"></a>

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


<a id="org0a35c89"></a>

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


<a id="orge603313"></a>

# Functional

-   [ ] vue-use,
-   [ ] json-validator (ajv),
-   [ ] vue-meta (page metadata manager),
-   [ ] bvr-node-utils,
-   [ ] jsdom


<a id="org2e31319"></a>

## Vue Use

-   [X] vue-use

    pnpm i @vueuse/core


<a id="orgdbf7307"></a>

## Json-schema validator

-   [X] json-validator (ajv),

    pnpm install ajv fluent-json-schema

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


<a id="org840c42c"></a>

## Vue Meta

-   [X] vue-meta (page metadata manager),

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


<a id="org142d78f"></a>

## BVR Node Utils

-   [X] bvr-node-utils,

    pnpm i gl:bvraghav/node_utils.git


<a id="orgdb4c5d4"></a>

## JSDOM

For testing purposes if required at all

    pnpm i jsdom


<a id="org39e9e8e"></a>

# Integrating Firebase


<a id="orgae5722f"></a>

## VueFire Wrapper

<https://vuefire.vuejs.org/>

    pnpm install vuefire firebase


<a id="org22a728e"></a>

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


<a id="orgc6bf3d5"></a>

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


<a id="org7afdfd8"></a>

## App Debug Token

-   **Name:** TilrrTileWaste
-   **Token:** 36CD9FBD-0136-4639-A857-8E56DA93E404


<a id="org5606f91"></a>

# GLPK

<https://github.com/jvail/glpk.js/>

    pnpm install glpk.js


<a id="org1599fc6"></a>

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

