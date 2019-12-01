Quasar App Extension Copyable
===

> A Quasar UI extension for a copyable text component

# Install
```bash
quasar ext add copyable
```
Quasar CLI will retrieve it from NPM and install the extension.

# Uninstall
```bash
quasar ext remove copyable
```

# Example
```html
<copyable text="copyable text"/>
```
![example image](https://raw.githubusercontent.com/euphemism/copyable/master/readme_example_image.gif)


# API

| prop        | type    | default           | function  |
| ----------- | ------- | ----------------- | --------- |
| color       | String  | ```'primary'```   | Sets the color of the copy button as well as the highlight and underline of the text |
| end         | Boolean | ```false```       | Adds a non-breaking space after the text |
| icon        | String  | ```'file_copy'``` | Sets the icon of the copy button |
| middle      | Boolean | ```false```       | Adds a non-breaking space before and after the text |
| noHighlight | Boolean | ```false```       | Removes the highlight behind the copyable text |
| noUnderline | Boolean | ```false```       | Removes the underline below the copyable text |
| start       | Boolean | ```false```       | Adds a non-breaking space before the text |
| text        | String  | ```''```          | The text to make copyable |
| textClass   | String  | ```''```          | Extra classes to apply to the copyable text |
