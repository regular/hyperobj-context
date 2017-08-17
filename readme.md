# hyperobj-context

Nested hyperscript contexts for hyperobj


``` js
const hs = require('hyperscript-nested-contexts')(require('hyperscript'))
const ho = require('hyperobj-context')(require('hyperobj'), hs)
const observable = require('observable')

const render = ho(
  function(v) {
    if (typeof v!=='object') return
    const h = this.ctx || hs
    return h('ol',
      Object.keys(v).map( (k)=> {
        const msg = observable()
        return ((h)=>{
          msg('clickme')
          return h('li', [
            h('em.key', h('span', msg), this.call(this, k), {
              onclick: function() {
                msg('I was clicked')
                h.cleanup()
              }
            }),
            h('span.value', this.call(this, v[k], k))
          ])
        })(this.pushContext(h.context()))
        this.popContext()
      })
    )
  },
  function(v) {
    const h = this.ctx || hs
    return h('span.string', v)
  }
)

document.body.appendChild(
  render(require('./package.json'))
)
```
