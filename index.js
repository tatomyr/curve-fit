const fit = (xy, f, cPrev, sPrev, iterations = 1, d) => Array(iterations).fill().reduce(prev => fit.one(xy, f, prev.c, prev.s, d), { c: cPrev, s: sPrev || Infinity });

fit.s = (xy, f, c) => xy.reduce((sum, point) => sum + (point[1] - f(point[0], c))**2, 0);

fit.one = (xy, f, c, s = Infinity, d = 1) => {
  const delta = typeof d === 'array' && d || typeof d === 'number' && c * d || c.map(item => 1);
  const c_ = c.map((item, i) => item + (Math.random() - Math.random()) * delta[i]);
  const s_ = fit.s(xy, f, c_);
  return s_ < s ? { c: c_, s: s_ } : { c, s };
}

/////////////////////////////////////////
/*
let xy = [
  [1,7],
  [2,3],
  [5,4],
];

let c = [ 10, -1 ];
let f = (x, c) => c[0] + c[1] * x;

console.log( fit(xy, f, c, Infinity, 10) );


let data = `
  1 12
  7 14
  12 5
  41 7
`;
xy = data.trim().split('\n').filter(item => item).map(item => item.trim().split(/ +/));
console.log(xy);
console.log( fit(xy, f, c, Infinity, 10) );
*/
