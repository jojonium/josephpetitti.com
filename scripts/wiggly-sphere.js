/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

(function() {
  var context, dragger, height, noiser, scene, shape, surf, t, width, _i, _len, _ref;

  width = 400;

  height = 400;

  shape = seen.Shapes.sphere(2).scale(height * 0.4);

  seen.Colors.randomSurfaces2(shape);

  scene = new seen.Scene({
    fractionalPoints: true,
    cullBackfaces: false,
    model: seen.Models["default"]().add(shape),
    viewport: seen.Viewports.center(width, height)
  });

  context = seen.Context('seen-canvas', scene).render();

  _ref = shape.surfaces;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    surf = _ref[_i];
    surf.originals = surf.points.map(function(p) {
      return p.copy();
    });
    surf.fillMaterial.color.a = 150;
  }

  t = 0;

  noiser = new seen.Simplex3D(Math.random());

  context.animate().onBefore(function(t, dt) {
    var i, n, p, _j, _k, _len1, _len2, _ref1, _ref2;
    _ref1 = shape.surfaces;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      surf = _ref1[_j];
      _ref2 = surf.points;
      for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
        p = _ref2[i];
        n = noiser.noise(p.x, p.y, p.z + t * 1.5e-3);
        surf.points[i] = surf.originals[i].copy().multiply(1 + n / 3);
      }
      surf.dirty = true;
    }
    return shape.rotx(dt * 1e-4).rotz(-dt * 1e-4);
  }).start();

  dragger = new seen.Drag(document.getElementById('seen-canvas'), {
    inertia: true
  });

  dragger.on('drag.rotate', function(e) {
    var xform, _ref1;
    xform = (_ref1 = seen.Quaternion).xyToTransform.apply(_ref1, e.offsetRelative);
    shape.transform(xform);
    return context.render();
  });

}).call(this);
