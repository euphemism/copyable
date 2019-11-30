/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

module.exports = function (api) {
  api.compatibleWith('quasar', '^1.5.0')
  api.compatibleWith('@quasar/app', '^1.1.4')

  // Here we extend /quasar.conf.js, so we can add
  // a boot file which registers our new UI component;
  // "extendConf" will be defined below (keep reading the tutorial)
  api.extendQuasarConf(extendConf)
}

function extendConf (conf) {
  conf.boot.push('~quasar-app-extension-copyable/src/boot/register.js')

  conf.build.transpileDependencies.push(/quasar-app-extension-copyable[\\/]src/)

  conf.css.push('~quasar-app-extension-copyable/src/component/Copyable.css')

  conf.framework.plugins.push('Notify')
}