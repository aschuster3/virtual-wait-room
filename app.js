var env = new Primrose.BrowserEnvironment({
  backgroundColor: 0x000000,
  font: 'helvetiker.typeface.json',
  groundTexture: "carpet.png",
  useFog: true
}),
  clockBase = hub();

env.scene.add(clockBase);
clockBase.position.set(-2, 2.3, -9.3);

var modelPromise = Promise.all(range(1, function(i) {
  var clockhand = box(0.4, 0.02, 0.02).colored(0x0000ff);
  clockhand.rotation.set(0, 0, i * -1.1, "ZYX");
  clockhand.position.set(0.2, 0, 0);
  clockBase.add(clockhand);
  return clockhand.ready;
}));


env.addEventListener("ready", function(){
  generateBuilding(env);
  buildSittingArea(env);
  placeClock(env);
  hangClinicName(env);
});

env.addEventListener("update", function(){
  clockBase.rotation.set(0, 0, performance.now() / -1000, "ZYX");
});

function generateBuilding(env) {
  var WALL = "indoor_wall.jpg";
  // Walls
  brick(WALL, 10, 5, 1)
    .addTo(env.scene)
    .at(0, 1, -10);

  brick(WALL, 1, 5, 15)
    .addTo(env.scene)
    .at(-5, 1, -3);

  brick(WALL, 1, 5, 15)
    .addTo(env.scene)
    .at(5, 1, -3);

  brick(WALL, 10, 5, 1)
    .addTo(env.scene)
    .at(0, 1, 3);

  // Ceiling
  brick(WALL, 10, 0.1, 15)
    .addTo(env.scene)
    .at(0, 3.5, -5);

  // Counter
  brick(WALL, 3, 1.5, 0.5)
    .addTo(env.scene)
    .at(3, 0.5, -8);

  brick(WALL, 1, 1.5, 1.5)
    .addTo(env.scene)
    .at(2, 0.5, -8.5);

  // Door
  var door = quad(1, 3)
              .colored(0xaa7243);
  door.rotation.set(0, Math.PI / -2, 0);
  door.addTo(env.scene).at(4.44, 1, -6);

  // Cat poster
  var catImage = new Primrose.Controls.Image("hang_in_there.png");
  catImage.position.set(4.44, 2, -3);
  catImage.rotation.set(0, Math.PI / -2, 0);
  env.scene.add(catImage);
}

function buildSittingArea(env) {
  for(var i = 1; i < 5; i++) {
    buildChairAt(env, -1.5, -1 * i, 2);
    buildChairAt(env, 1, -1 * i, 3);
  }
  buildChairAt(env, 0, 0, 1);
}

function buildChairAt(env, x_pos, y_pos, back_direction) {
  var CHAIR_COLOR = "wood_chair.jpg";
  var CHAIR_LEG_OFFSET = 0.5;
  cylinder(0.05, 0.05, 1)
    .textured(CHAIR_COLOR)
    .addTo(env.scene)
    .at(x_pos, 0, y_pos);

  cylinder(0.05, 0.05, 1)
    .textured(CHAIR_COLOR)
    .addTo(env.scene)
    .at(x_pos + CHAIR_LEG_OFFSET, 0, y_pos);

  cylinder(0.05, 0.05, 1)
    .textured(CHAIR_COLOR)
    .addTo(env.scene)
    .at(x_pos, 0, y_pos + CHAIR_LEG_OFFSET);

  cylinder(0.05, 0.05, 1)
    .textured(CHAIR_COLOR)
    .addTo(env.scene)
    .at(x_pos + CHAIR_LEG_OFFSET, 0, y_pos + CHAIR_LEG_OFFSET);

  box(CHAIR_LEG_OFFSET + 0.1, 0.1, CHAIR_LEG_OFFSET + 0.1)
    .textured(CHAIR_COLOR)
    .addTo(env.scene)
    .at(x_pos + (CHAIR_LEG_OFFSET / 2), 0.5, y_pos + (CHAIR_LEG_OFFSET / 2))

  if(back_direction === 0) {
    box(CHAIR_LEG_OFFSET + 0.1, CHAIR_LEG_OFFSET + 0.1, 0.1)
      .textured(CHAIR_COLOR)
      .addTo(env.scene)
      .at(x_pos + (CHAIR_LEG_OFFSET / 2), 0.5 + (CHAIR_LEG_OFFSET / 2), y_pos)
  } else if (back_direction === 1) {
    box(CHAIR_LEG_OFFSET + 0.1, CHAIR_LEG_OFFSET + 0.1, 0.1)
      .textured(CHAIR_COLOR)
      .addTo(env.scene)
      .at(x_pos + (CHAIR_LEG_OFFSET / 2), 0.5 + (CHAIR_LEG_OFFSET / 2), y_pos + CHAIR_LEG_OFFSET)
  } else if (back_direction === 2) {
    box(0.1, CHAIR_LEG_OFFSET + 0.1, CHAIR_LEG_OFFSET + 0.1)
      .textured(CHAIR_COLOR)
      .addTo(env.scene)
      .at(x_pos, 0.5 + (CHAIR_LEG_OFFSET / 2), y_pos + (CHAIR_LEG_OFFSET / 2))
  } else {
    box(0.1, CHAIR_LEG_OFFSET + 0.1, CHAIR_LEG_OFFSET + 0.1)
      .textured(CHAIR_COLOR)
      .addTo(env.scene)
      .at(x_pos + CHAIR_LEG_OFFSET, 0.5 + (CHAIR_LEG_OFFSET / 2), y_pos + (CHAIR_LEG_OFFSET / 2))
  }
}

function placeClock(env) {
  circle(0.4)
    .colored(0xffffffff)
    .addTo(env.scene)
    .at(-2, 2.3, -9.4);
  modelPromise.then();
}

function hangClinicName(env) {
  var name = text3D(0.5, "Virtual Urgent Care").center().colored(0x000000);
  name.position.set(-4, 2, -4);
  name.rotation.set(0, Math.PI / 2, 0);
  env.scene.add(name);
}
