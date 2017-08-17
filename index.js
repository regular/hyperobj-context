function decorate(ho, hs) {
  let ret = function() {
    let render = ho.apply(this, [].slice.apply(arguments))
    render.pushContext = function(h) {
      render._contexts = render._contexts || []
      render._contexts.push(render.ctx || hs)
      render.ctx = h
      return h
    }
    render.popContext = function() {
      render.ctx = render._contexts.pop()
    }
    render.ctx = hs
    return render
  }
  Object.keys(ho).forEach((k)=>ret[k] = ho[k])
  return ret
}

module.exports = decorate
