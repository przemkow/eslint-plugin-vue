---
pageClass: rule-details
sidebarDepth: 0
title: vue/template-no-target-blank
description: disallow using `target="_blank"` attribute without `rel="noreferrer noopener"`
---
# vue/template-no-target-blank
> disallow using `target="_blank"` attribute without `rel="noreferrer noopener"`

- :gear: This rule is included in `"plugin:vue/vue3-recommended"` and `"plugin:vue/recommended"`.
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule aims to disallow using `target="_blank"` attribute without `rel="noreferrer noopener"` to eliminate potential security vulnerability. 

Examples of **incorrect** code for this rule:

<eslint-code-block fix :rules="{'vue/template-no-target-blank': ['error']}">

```vue
<template>
  // GOOD:
  <a target="_blank" rel="noopener noreferrer" href="https://example.com"></a>
  <a target="_blank" rel="noopener noreferrer" :href="dynamicLink"></a>
  <a target="_blank" href="relative/path"></a>
  <a target="_blank" href="/relative/path"></a>


  // BAD:
  <a target="_blank" href="https://example.com"></a>
  <a target="_blank" rel="noopener" href="https://example.com"></a>
  <a target="_blank" rel="noreferrer" href="https://example.com"></a>
  <a target="_blank" :href="dynamicLink"></a>
  <a target="_blank" rel="noopener" :href="dynamicLink"></a>
  <a target="_blank" rel="noreferrer" :href="dynamicLink"></a>
</template>
<script>
export default {
  data() {
    return {
      dynamicLink: 'https://www.dynamic-link.com'
    }
  }
}
</script>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "vue/template-no-target-blank": ["error", {
    "allowReferrer": false,
    "enforceDynamicLinks": true
  }]
}
```

### `allowReferrer`
* default: `false`
* valid options: `true`, `false`
* description:  When value is set to `true` eslint won't report `rel` without `noreferrer` value

  
#### Example: `allowReferrer: true`

<eslint-code-block fix :rules="{'vue/template-no-target-blank': ['error', { allowReferrer: true }]}">

```vue
<template>
  <!-- GOOD: -->
  <a target="_blank" rel="noopener" href="http://example.com"></a>
 
  <!-- BAD: -->
  <a target="_blank" href="http://example.com"></a>
</template>
```

</eslint-code-block>

### `enforceDynamicLinks`
* default: `true`
* valid options: `true`, `false`
* description:  When value is set to `false` eslint won't report `href` with dynamic argument without `rel="noopener noreferrer"`

#### Example: `enforceDynamicLinks: false`

<eslint-code-block fix :rules="{'vue/template-no-target-blank': ['error', { enforceDynamicLinks: false }]}">

```vue
<template>
  // GOOD:
  <a target="_blank" :href="dynamicLink"></a>
  <a target="_blank" rel="noopener" :href="dynamicLink"></a>
  <a target="_blank" rel="noopener noreferrer" :href="dynamicLink"></a>
</template>
<script>
export default {
  data() {
    return {
      dynamicLink: 'https://www.dynamic-link.com'
    }
  }
}
</script>
```

</eslint-code-block>

## Further Reading

[https://developers.google.com/web/tools/lighthouse/audits/noopener](https://developers.google.com/web/tools/lighthouse/audits/noopener) 

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/template-no-target-blank.js)
- [Test source](https://github.com/vuejs/eslint-plugin-vue/blob/master/tests/lib/rules/template-no-target-blank.js)
