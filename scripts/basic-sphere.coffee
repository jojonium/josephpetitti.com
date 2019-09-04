/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

width  = 400
height = 400

# Create sphere shape with randomly colored surfaces
shape = seen.Shapes.sphere(2).scale(height * 0.4)
seen.Colors.randomSurfaces2(shape)

# Create scene and add shape to model
scene = new seen.Scene
  model    : seen.Models.default().add(shape)
  viewport : seen.Viewports.center(width, height)

# Create render context from canvas
context = seen.Context('seen-canvas', scene).render()

# Slowly rotate sphere
context.animate()
  .onBefore((t, dt) -> shape.rotx(dt*1e-4).roty(0.7*dt*1e-4))
  .start()

# Enable drag-to-rotate on the canvas
dragger = new seen.Drag('seen-canvas', {inertia : true})
dragger.on('drag.rotate', (e) ->
  xform = seen.Quaternion.xyToTransform(e.offsetRelative...)
  shape.transform(xform)
  context.render()
)
