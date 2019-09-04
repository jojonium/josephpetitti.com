/* (C) 2019 Joseph Petitti | https://josephpetitti.com/license.txt */

width  = 400
height = 400

# Create a simple sphere
shape = seen.Shapes.sphere(2).scale(height * 0.4)
seen.Colors.randomSurfaces2(shape)

# Create scene and render context
scene = new seen.Scene
  fractionalPoints : true  # Smoothes motion
  cullBackfaces    : false # Necessary since we have transparency
  model            : seen.Models.default().add(shape)
  viewport         : seen.Viewports.center(width, height)

context = seen.Context('seen-canvas', scene).render()

# Create a copy of the surface points so we can manipulate them later
for surf in shape.surfaces
  surf.originals = surf.points.map (p) -> p.copy()
  surf.fillMaterial.color.a = 150 # Add a little transparency

# Apply animated 3D simplex noise to sphere vertices
t = 0
noiser = new seen.Simplex3D(Math.random())
context.animate()
  .onBefore((t, dt) ->
    for surf in shape.surfaces
      for p,i in surf.points
        n = noiser.noise(p.x, p.y, p.z + t*1.5e-3)
        surf.points[i] = surf.originals[i].copy().multiply(1 + n / 3)

      # Since we're modifying the points directly, we need to mark the surface dirty
      # to make sure the cache doesn't ignore the change
      surf.dirty = true

    shape.rotx(dt*1e-4).rotz(-dt*1e-4)
  )
  .start()

# Enable drag-to-rotate
dragger = new seen.Drag(document.getElementById('seen-canvas'), {inertia : true})
dragger.on('drag.rotate', (e) ->
  xform = seen.Quaternion.xyToTransform(e.offsetRelative...)
  shape.transform(xform)
  context.render()
)
