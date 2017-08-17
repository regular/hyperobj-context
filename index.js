function decorate(ho, hs) {
  return function() {
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
}

module.exports = decorate
