<template>
  <span
    class="copyable-text-container row inline items-center q-mr-xs no-wrap"
    :style="cssDecorationColorProperties"
  >
    <span v-if="start || middle">&nbsp;</span>

    <span
      ref="copyableText"
      @click="copy"
      :class="[textClass, { 'copyable-text-underline': !noUnderline }]"
      :style="cssProperties"
    >
      {{ text }}

      <q-tooltip v-if="!hideTooltip && clickToCopy">click to copy</q-tooltip>
    </span>

    <span v-if="end || middle">&nbsp;</span>

    <q-btn
      v-if="!clickToCopy"
      ref="copyButton"
      @click="copy"
      :class="['copyable-button--color', { 'q-ml-xs': !(middle || end) }]"
      :color="decorationColor"
      :icon="icon"
      flat
      round
      size="0.7em"
    >
      <q-tooltip v-if="!hideTooltip && !clickToCopy">click to copy</q-tooltip>
    </q-btn>
  </span>
</template>

<script>
import { colors, copyToClipboard, extend } from "quasar";
const { getBrand, hexToRgb } = colors;

import csscolors from "css-color-names";

export default {
  name: "Copyable",
  props: {
    clickToCopy: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    end: {
      type: Boolean,
      default: false
    },
    hideTooltip: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "file_copy"
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
      default: ""
    },
    textClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    copy(e) {
      if (e.target === this.$refs.copyableText) {
        if (!this.clickToCopy) {
          return;
        }
      }

      copyToClipboard(this.text)
        .then(() => {
          this.$q.notify("Copied to clipboard");
        })
        .catch(() => {
          this.$q.notify({
            message: "Failed to copy to clipboard",
            type: "negative"
          });
        });
    }
  },
  computed: {
    decorationColor() {
      const requestedColor = this.color.toLowerCase();
      const brandColor = getBrand(requestedColor);

      if (null === brandColor) {
        if (csscolors.hasOwnProperty(requestedColor)) {
          return csscolors[requestedColor];
        }

        return requestedColor;
      }

      return brandColor;
    },
    cssDecorationColorProperties() {
      return {
        "--copyable-decoration-color": this.decorationColor
      };
    },
    cssProperties() {
      const rgb = hexToRgb(this.decorationColor);
      const opacity = this.$q.dark.isActive ? 0.2 : 0.1;

      let properties = {
        "word-break": "break-all"
      };

      if (!this.noHighlight) {
        properties = extend(properties, {
          background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
        });
      }

      if (this.clickToCopy) {
        properties = extend(properties, {
          cursor: "pointer"
        });
      }

      return properties;
    }
  }
};
</script>

<style scoped>
@import "./Copyable.css";
</style>
