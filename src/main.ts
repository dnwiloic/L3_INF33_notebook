import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBarsStaggered, faClipboard, faDna,
     faHouse, faXmark, faLayerGroup, faStar, faMagnifyingGlass, faUserLarge, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUber } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faBarsStaggered,faHouse, faPenToSquare, faTrash,
      faUserLarge,faMagnifyingGlass , faClipboard, faStar, faXmark, faLayerGroup, faDna)


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
