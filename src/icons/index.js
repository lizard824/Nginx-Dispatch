import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)
// exported function has 3 properties: resolve, keys, id
// keys is a function that returns an array of all possible requests that the context module can handle
const requireAll = requireContext => requireContext.keys().map(requireContext)
// 去找svg文件夹下 以svg结尾的文件能被require的文件 param(directory,useSubdirectiories,regExp)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
