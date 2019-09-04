/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

console.log('here');

const width  = 200;
const height = 200;
const n      = 7;

let nums = new Array(n);
for (let i = 0; i < n; ++i) {
  nums[i] = i;
}

// create shapes
let shapes = nums.map((i) => {
  if (i % 2 === 0)
    return seen.Shapes.sphere(1).scale(height * 0.4);
  else
    return seen.Shapes.icosahedron().scale(height * 0.4);
});

// create a scene for each shape
let scenes = shapes.map((shape) => {
  return new seen.Scene({
    fractionalPoints: true,
    model: seen.Models.default().add(shape),
    viewport: seen.Viewports.center(width, height)
  })
});

// create render context for each shape
let contexts = new Array(n);
for (let i = 0; i < n; ++i) {
  seen.Colors.randomSurfaces2(shapes[i]);
  contexts[i] = seen.Context(`seen-canvas-${i + 1}`, scenes[i]).render();
}

// add slow rotation
new seen.Animator().onFrame((t, dt) => {
  for (let i = 0; i < n; ++i) {
    shapes[i].rotx(dt*1e-4).roty(dt*8e-5);
    contexts[i].render();
  }
}).start();
