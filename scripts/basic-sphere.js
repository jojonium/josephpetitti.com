/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

(function() {
  var context, dragger, height, scene, shape, width;

  width = 400;

  height = 400;

  shape = seen.Shapes.sphere(2).scale(height * 0.4);

  seen.Colors.randomSurfaces2(shape);

  scene = new seen.Scene({
    model: seen.Models["default"]().add(shape),
    viewport: seen.Viewports.center(width, height)
  });

  context = seen.Context('seen-canvas', scene).render();

  context.animate().onBefore(function(t, dt) {
    return shape.rotx(dt * 1e-4).roty(0.7 * dt * 1e-4);
  }).start();

  dragger = new seen.Drag('seen-canvas', {
    inertia: true
  });

  dragger.on('drag.rotate', function(e) {
    var xform, _ref;
    xform = (_ref = seen.Quaternion).xyToTransform.apply(_ref, e.offsetRelative);
    shape.transform(xform);
    return context.render();
  });

}).call(this);
