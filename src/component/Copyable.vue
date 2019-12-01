<template>
  <span
    class="copyable-text-container row inline items-center q-mr-xs no-wrap"
    :style="cssDecorationColorProperties"
  >
    <span v-if="start || middle">&nbsp;</span>
    
    <span
      :class="[textClass, {'copyable-text-underline': !noUnderline}]"
      :style="cssProperties"
    >
      {{ text }}
    </span>
    
    <span v-if="end || middle">&nbsp;</span>

    <q-btn
      :class="['copyable-button--color', {'q-ml-xs': !(middle || end)}]"
      round
      flat
      size="0.7em"
      :color="decorationColor"
      :icon="icon"
      @click="copy"
    />
  </span>
</template>

<script>
import { colors, copyToClipboard, extend } from 'quasar'
const csscolors = require('css-color-names')
const { getBrand, hexToRgb } = colors

export default {
  name: 'Copyable',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    end: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'file_copy'
    },
    middle: {
      type: Boolean,
      default: false
    },
    noHighlight: {
      type: Boolean,
      default: false
    },
    noUnderline: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    textClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    copy(e) {
      copyToClipboard(this.text)
        .then(() => {
          this.$q.notify('Copied to clipboard')
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Failed to copy to clipboard'
          })
        })
    }
  },
  computed: {
    decorationColor() {
      const requestedColor = this.color.toLowerCase()
      const brandColor = getBrand(requestedColor)

      if (null === brandColor) {
        if (csscolors.hasOwnProperty(requestedColor)) {
          return csscolors[requestedColor]
        }

        return requestedColor
      }

      return brandColor
    },
    cssDecorationColorProperties() {
      return {
        '--copyable-decoration-color': this.decorationColor
      }
    },
    cssProperties() {
      const rgb = hexToRgb(this.decorationColor)
      const opacity = this.$q.dark.isActive ? 0.2 : 0.1

      const properties = {
        'word-break': 'break-all'
      }

      if (!this.noHighlight) {
        return extend(properties, {
          background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
        })
      }

      return properties
    }
  }
}
</script>

<style scoped>
  @import './Copyable.css';
</style>
