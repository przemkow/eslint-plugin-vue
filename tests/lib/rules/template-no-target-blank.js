/**
 * @fileoverview prevent using target="_blank" attribute without rel="noreferrer noopener"
 * @author Przemyslaw Falowski (@przemkow)
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/template-no-target-blank')

const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

ruleTester.run('template-no-target-blank', rule, {
  valid: [
    {
      code: '<template><p target="_blank">text</p></template>'
    },
    {
      code: '<template><a href="http://example.com">link</a></template>'
    },
    {
      code: '<template><a target="_blank" rel="noopener noreferrer" href="http://example.com">link</a></template>'
    },
    {
      code: '<template><a target="_blank" rel="noopener noreferrer" href="http://example.com"></a></template>'
    },
    {
      code: '<template><a target="_blank" rel="noopener noreferrer" :href="dynamicLink"></a></template>'
    },
    {
      code: '<template><a target="_blank" href="relative/path"></a></template>'
    },
    {
      code: '<template><a target="_blank" href="/relative/path"></a></template>'
    },
    // allowReferrer: true
    {
      code: '<template><a target="_blank" rel="noopener" href="http://example.com"></a></template>',
      options: [{
        allowReferrer: true
      }]
    },
    {
      code: '<template><a target="_blank" rel="noopener" :href="dynamicLink"></a></template>',
      options: [{
        allowReferrer: true
      }]
    },
    // enforceDynamicLinks: false
    {
      code: '<template><a target="_blank" rel="noopener" :href="dynamicLink"></a></template>',
      options: [{
        enforceDynamicLinks: false
      }]
    },
    {
      code: '<template><a target="_blank" rel="noreferrer" :href="dynamicLink"></a></template>',
      options: [{
        enforceDynamicLinks: false
      }]
    },
    {
      code: '<template><a target="_blank" :href="dynamicLink"></a></template>',
      options: [{
        enforceDynamicLinks: false
      }]
    },
    // allowReferrer: true, enforceDynamicLinks: false
    {
      code: '<template><a target="_blank" rel="noopener" href="http://example.com"></a></template>',
      options: [{
        allowReferrer: true,
        enforceDynamicLinks: false
      }]
    },
    {
      code: '<template><a target="_blank" rel="noopener" :href="dynamicLink"></a></template>',
      options: [{
        allowReferrer: true,
        enforceDynamicLinks: false
      }]
    },
    {
      code: '<template><a target="_blank" rel="noreferrer" :href="dynamicLink"></a></template>',
      options: [{
        allowReferrer: true,
        enforceDynamicLinks: false
      }]
    },
    {
      code: '<template><a target="_blank" :href="dynamicLink"></a></template>',
      options: [{
        allowReferrer: true,
        enforceDynamicLinks: false
      }]
    }
  ],

  invalid: [
    {
      code: '<template><a href="http://example.com" target="_blank">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    {
      code: '<template><a href="http://example.com" target="_blank" rel="noopener">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    {
      code: '<template><a href="http://example.com" target="_blank" rel="noreferrer">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    {
      code: '<template><a :href="dynamicLink" target="_blank">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    {
      code: '<template><a :href="dynamicLink" target="_blank" rel="noopener">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    {
      code: '<template><a :href="dynamicLink" target="_blank" rel="noreferrer">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    // allowReferrer: true
    {
      code: '<template><a href="http://example.com" target="_blank" rel="noreferrer"></a></template>',
      options: [{
        allowReferrer: true
      }],
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    {
      code: '<template><a href="http://example.com" target="_blank"></a></template>',
      options: [{
        allowReferrer: true
      }],
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    // enforceDynamicLinks: false
    {
      code: '<template><a href="http://example.com" target="_blank">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.'],
      options: [{
        enforceDynamicLinks: false
      }]
    },
    {
      code: '<template><a href="http://example.com" target="_blank" rel="noopener">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.'],
      options: [{
        enforceDynamicLinks: false
      }]
    },
    {
      code: '<template><a href="http://example.com" target="_blank" rel="noreferrer">link</a></template>',
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.'],
      options: [{
        enforceDynamicLinks: false
      }]
    },
    // allowReferrer: true, enforceDynamicLinks: false
    {
      code: '<template><a href="http://example.com" target="_blank" rel="noreferrer"></a></template>',
      options: [{
        allowReferrer: true,
        enforceDynamicLinks: false
      }],
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    },
    {
      code: '<template><a href="http://example.com" target="_blank"></a></template>',
      options: [{
        allowReferrer: true,
        enforceDynamicLinks: false
      }],
      errors: ['Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.']
    }
  ]
})
