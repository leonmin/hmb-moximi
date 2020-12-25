import Vue from 'vue'
function regist(context) {
  return context.keys().forEach(c => {
    const vc = context(c)
    const vn = vc.name ? vc.name.toLowerCase() : /\/([\w-]+)\.vue$/.exec(c)[1]
    Vue.component(vn, vc.default)
  })
}
regist(require.context('./', false, /\.vue$/))
