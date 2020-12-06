import Vue from 'vue'
var loadings = null;
console.log(Vue);
function loading () {
  loadings = Vue.prototype.$loading({
    lock: true,
    fullscreen: false,
    background: 'rgba(0, 0, 0, 0)'
  });
}
function closeLoading () {

  if (loadings) {
    loadings.close();
  }
}
export { loading, closeLoading }