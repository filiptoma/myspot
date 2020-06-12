import Vue from 'vue'
import Unicon from 'vue-unicons/dist/vue-unicons-ssr.common.js'
import
{
    uniHomeAlt, uniSearch, uniUser, uniSignOutAlt, uniPlus, uniTimes, uniArrowLeft, uniArrowRight, uniCloudUpload, uniCheck, uniImagePlus, uniImageCheck
} from 'vue-unicons/src/icons'
import 'vue-unicons/dist/vue-unicons-ssr.css'

Unicon.add([
    uniHomeAlt, uniSearch, uniUser, uniSignOutAlt, uniPlus, uniTimes, uniArrowLeft, uniArrowRight, uniCloudUpload, uniCheck, uniImagePlus, uniImageCheck
])
Vue.use(Unicon)