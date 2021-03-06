// const fit = (xy, f, cPrev, sPrev, iterations = 1, d) => Array(iterations).fill().reduce(prev => fit.one(xy, f, prev.c, prev.s, d), { c: cPrev, s: sPrev || Infinity });
async function fit(xy, f, cPrev, sPrev, iterations = 1, d) {
  return await Array(iterations).fill().reduce(prev => fit.one(xy, f, prev.c, prev.s, d), { c: cPrev, s: sPrev || Infinity });
}

fit.s = (xy, f, c) => xy.reduce((sum, point) => sum + (point[1] - f(point[0], c))**2, 0);

fit.one = (xy, f, c, s = Infinity, d = 1) => {
  const delta = typeof d === 'array' && d || c.map(item => d);
  const c_ = c.map((item, i) => item + (Math.random() - Math.random()) * delta[i]);
  const s_ = fit.s(xy, f, c_);
  return s_ < s ? { c: c_, s: s_ } : { c, s };
}
