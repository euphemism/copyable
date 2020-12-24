module.exports = function (api) {
  api.compatibleWith('quasar', '^1.5.0')
  api.compatibleWith('@quasar/app', '^1.1.4 || ^2.0.0')

  api.extendQuasarConf(extendConf)
}

function extendConf (conf) {
  conf.boot.push('~quasar-app-extension-copyable/src/boot/register.js')

  conf.build.transpileDependencies.push(/quasar-app-extension-copyable[\\/]src/)

  conf.css.push('~quasar-app-extension-copyable/src/component/Copyable.css')

  conf.framework.plugins.push('Notify')
}