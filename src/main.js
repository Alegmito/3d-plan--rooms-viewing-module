// import '@babel/polyfill'
// import 'mutationobserver-shim'
import Vue from 'vue'
import VueCesium from 'vue-cesium'
import VueSlider from 'vue-slider-component';
import lang from 'vue-cesium/lang/en-us'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

// import 'vue-material/dist/theme/default.css';
// VueCesium will load Cesium.js from `https://unpkg.com/cesium/Build/Cesium/Cesium.js` by default.
Vue.config.productionTip = false

Vue.use(VueCesium, {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjJhNjJhMy1lOGNlLTRmNzUtYThhMC01NDExNGFmZmZmODAiLCJpZCI6NDI1OTMsImlhdCI6MTYxMTYwOTMxNH0.xIcBPtrAJIGCLbfGl9hMVgiOUjCf5aKqGpGUDKXwSio',
  lang: lang
    ,cesiumPath: '/Cesium/Cesium.js'
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


import 'vue-slider-component/theme/default.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'vue-cesium/lib/vc-navigation.css'

Vue.component('vue-slider', VueSlider);

import App from './App.vue';


new Vue({
  render: h => h(App),
}).$mount('#app')
