/**
* @fileoverview disallow using target="_blank" attribute without rel="noreferrer noopener"
* @author Przemyslaw Falowski (@przemkow)
*/
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function hasExternalLink (node) {
  const href = utils.getAttribute(node, 'href')
  return href && href.value && href.value.value &&
    /^(?:\w+:|\/\/)/.test(href.value.value)
}

function hasSecureRel (node, allowReferrer) {
  const rel = utils.getAttribute(node, 'rel')
  return rel && rel.value.value.includes('noopener') && (allowReferrer || rel.value.value.includes('noreferrer'))
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow using `target="_blank"` attribute without `rel="noreferrer noopener"`',
      categories: ['vue3-recommended', 'recommended'],
      url: 'https://eslint.vuejs.org/rules/template-no-target-blank.html'
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        allowReferrer: {
          type: 'boolean'
        },
        enforceDynamicLinks: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }],
    messages: {
      noTargetBlank: 'Using target="_blank" without rel="noopener noreferrer" creates security vulnerability.'
    }
  },
  create: function (context) {
    return utils.defineTemplateBodyVisitor(context, {
      'VElement[name = a]' (node) {
        const options = Object.assign({}, {
          allowReferrer: false,
          enforceDynamicLinks: true
        }, context.options[0] || {})

        if (!utils.hasAttribute(node, 'target', '_blank') || hasSecureRel(node, options.allowReferrer)) {
          return
        }

        const reportDynamicLink = options.enforceDynamicLinks && utils.hasDirective(node, 'bind', 'href')

        if (reportDynamicLink || hasExternalLink(node)) {
          context.report({
            node,
            loc: node.loc,
            messageId: 'noTargetBlank',
            fix: (fixer) => {
              const rel = utils.getAttribute(node, 'rel')
              const target = utils.getAttribute(node, 'target')

              if (rel) {
                const relValues = new Set(rel.value.value.split(' '))
                relValues.add('noopener')
                relValues.add('noreferrer')
                return fixer.replaceTextRange(rel.range, `rel="${Array.from(relValues).join(' ')}"`)
              } else {
                return fixer.insertTextAfterRange(target.range, 'rel="noopener noreferrer"')
              }
            }
          })
        }
      }
    })
  }
}
