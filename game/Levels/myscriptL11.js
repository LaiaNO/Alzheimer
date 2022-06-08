function createBox2(scene) {
  const mat2 = new BABYLON.StandardMaterial("mat2", scene);
  mat2.diffuseColor = BABYLON.Color3.Blue();
  const box = BABYLON.MeshBuilder.CreateBox("yogurt", scene);
  box.translate(new BABYLON.Vector3(-5.4, 0.5, -5), 1, BABYLON.Space.LOCAL);
  box.material = mat2;
  box.actionManager = new BABYLON.ActionManager(scene);
  box.actionManager.registerAction(
    new BABYLON.IncrementValueAction(
      BABYLON.ActionManager.OnPickDownTrigger,
      box,
      "rotation.y",
      0.0
    )
  );
  let box1 = scene.getMeshByName("box1");
  if (box1) {
    box.actionManager.registerAction(
      new BABYLON.IncrementValueAction(
        BABYLON.ActionManager.OnPickDownTrigger,
        box1,
        "position.x",
        0.0
      )
    );
  }
  return box;
}
function createPath(scene) {
  const mat2 = new BABYLON.StandardMaterial("mat2", scene);
  mat2.diffuseColor = BABYLON.Color3.Yellow();
  const box = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 5, height: 1.5 },
    scene
  );
  box.translate(new BABYLON.Vector3(-2, 0.01, 0), 1, BABYLON.Space.LOCAL);
  box.material = mat2;
  box.actionManager = new BABYLON.ActionManager(scene);
  box.actionManager.registerAction(
    new BABYLON.IncrementValueAction(
      BABYLON.ActionManager.OnPickDownTrigger,
      box,
      "rotation.y",
      0.0
    )
  );
  let path = scene.getMeshByName("path");
  if (path) {
    box.actionManager.registerAction(
      new BABYLON.IncrementValueAction(
        BABYLON.ActionManager.OnPickDownTrigger,
        path,
        "position.x",
        0.0
      )
    );
  }
  return box;
}
function createPath2(scene) {
  const mat2 = new BABYLON.StandardMaterial("mat2", scene);
  mat2.diffuseColor = BABYLON.Color3.Yellow();
  const box = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 1.5, height: 6 },
    scene
  );
  box.translate(new BABYLON.Vector3(-5, 0.01, -2.254), 1, BABYLON.Space.LOCAL);
  box.material = mat2;
  box.actionManager = new BABYLON.ActionManager(scene);
  box.actionManager.registerAction(
    new BABYLON.IncrementValueAction(
      BABYLON.ActionManager.OnPickDownTrigger,
      box,
      "rotation.y",
      0.0
    )
  );
  let path = scene.getMeshByName("path");
  if (path) {
    box.actionManager.registerAction(
      new BABYLON.IncrementValueAction(
        BABYLON.ActionManager.OnPickDownTrigger,
        path,
        "position.x",
        0.0
      )
    );
  }
  return box;
}
const createScene = async function (engine) {
  const scene = new BABYLON.Scene(engine);

  // LIGHT
  const light = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(0, 10, 5),
    scene
  );
  //const light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(30, -15, 5), scene);
  //Add the camera
  const camera = new BABYLON.UniversalCamera(
    "viewCamera",
    new BABYLON.Vector3(4, 1, 0),
    scene
  );
  camera.minZ = 0.001;
  camera.attachControl(canvas, true);
  camera.speed = 0.01;
  camera.rotation.y = (-70 * Math.PI) / 180;
  camera.angularSpeed = 0.05;
  camera.angle = Math.PI / 2;
  camera.direction = new BABYLON.Vector3(
    Math.cos(camera.angle),
    0,
    Math.sin(camera.angle)
  );
  scene.activeCameras.push(camera);
  //camera.parent = light;
  // Mesh to colide camera detection points
  const cone = BABYLON.MeshBuilder.CreateCylinder(
    "dummyCamera",
    { diameterTop: 0.01, diameterBottom: 0.2, height: 0.2 },
    scene
  );
  cone.parent = camera;
  cone.position.x = -0.2;
  cone.position.z = -0.2;

  // Sound
  const introaudio = new BABYLON.Sound(
    "",
    "/recursos/welcome.mp4",
    scene,
    null,
    {
      autoplay: true,
    }
  );
  const path1sound = new BABYLON.Sound("", "/recursos/path1.mp4", scene, null, {
    autoplay: false,
  });
  const nothispath = new BABYLON.Sound(
    "",
    "/recursos/distracted.mp4",
    scene,
    null,
    {
      autoplay: false,
    }
  );
  const notthis = new BABYLON.Sound("", "/recursos/notthis.mp4", scene, null, {
    autoplay: false,
  });
  const welldone = new BABYLON.Sound(
    "",
    "/recursos/yogurtok.mp4",
    scene,
    null,
    {
      autoplay: false,
    }
  );
  let path1soundState = false;
  let nothispathState = false;

  /* Set Up Scenery
    _____________________*/

  const score = 0;

  //Ground
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 30 },
    scene
  );
  ground.material = new BABYLON.StandardMaterial("groundMat", scene);
  ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
  ground.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/floorImg.jpg",
    scene
  );

  // Path
  const path = createPath(scene);
  const path2 = createPath2(scene);

  // Box
  const box2 = createBox2(scene);

  //Walls
  const wall1 = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 20 },
    scene
  );
  wall1.material = new BABYLON.StandardMaterial("groundMat", scene);
  wall1.position = new BABYLON.Vector3(0, 5, -15);
  wall1.rotation.x = (90 * Math.PI) / 180;
  wall1.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/super.png",
    scene
  );

  const wall2 = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 20 },
    scene
  );
  wall2.material = new BABYLON.StandardMaterial("groundMat", scene);
  wall2.position = new BABYLON.Vector3(0, 5, 15);
  wall2.rotation.x = (90 * Math.PI) / 180;
  wall2.rotation.z = (-180 * Math.PI) / 180;
  wall2.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/super.png",
    scene
  );

  const wall3 = ground.clone("wall1");
  wall3.position.x = +15;
  wall3.rotation.z = (90 * Math.PI) / 180;
  wall3.material = ground.material.clone("lowerMat");
  wall3.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/supe2.png",
    scene
  );

  const wall4 = ground.clone("wall1");
  wall4.position.x = -15;
  wall4.rotation.z = (-90 * Math.PI) / 180;
  wall4.material = ground.material.clone("lowerMat");
  wall4.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/supe2.png",
    scene
  );

  //instructions
  const instructions = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 1.5, height: 2 },
    scene
  );
  instructions.material = new BABYLON.StandardMaterial("groundMat", scene);
  instructions.material.backFaceCulling = false;
  instructions.position = new BABYLON.Vector3(0, 1.1, 3);
  instructions.rotation.x = (-90 * Math.PI) / 180;
  instructions.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/text863.png",
    scene
  );

  //objects
  const banana = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "banana.babylon",
    scene
  );
  const pineapple = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "pineapple.babylon",
    scene
  );
  const orange = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "orange.babylon",
    scene
  );
  const yogurt = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "yogurt.babylon",
    scene
  );

  /* Create planes to detect path position
    https://playground.babylonjs.com/#KQV9SA 
    ------------------------------------------*/
  const matPlan = new BABYLON.StandardMaterial("matPlan1", scene);
  matPlan.backFaceCulling = false;
  matPlan.emissiveColor = new BABYLON.Color3(0.2, 1, 0.2);
  matPlan.alpha = 0;

  const matBB = new BABYLON.StandardMaterial("matBB", scene);
  matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
  matBB.wireframe = true;

  const plan1 = BABYLON.MeshBuilder.CreatePlane(
    "plane1",
    { height: 2, width: 5 },
    scene
  );
  plan1.position = new BABYLON.Vector3(-1.5, 1, 0);
  plan1.rotation.x = (-90 * Math.PI) / 4;
  plan1.material = matPlan;

  const plan2 = BABYLON.MeshBuilder.CreatePlane(
    "plane2",
    { height: 2.3, width: 2.3 },
    scene
  );
  plan2.position = new BABYLON.Vector3(-5.5, 1, 0);
  plan2.rotation.x = (-90 * Math.PI) / 4;
  plan2.material = matPlan;

  const plan3 = BABYLON.MeshBuilder.CreatePlane(
    "plane3",
    { height: 2, width: 2 },
    scene
  );
  plan3.position = new BABYLON.Vector3(-5.5, 1, -2.5);
  plan3.rotation.x = (-90 * Math.PI) / 4;
  plan3.material = matPlan;

  // Balloons - BORRAR BALLON
  const balloon1 = BABYLON.Mesh.CreateSphere("balloon1", 20, 0.3, scene);
  balloon1.material = new BABYLON.StandardMaterial("matBallon", scene);
  balloon1.position = new BABYLON.Vector3(0.8, 1.2, 1.3);
  balloon1.getAbsolutePosition();
  //balloon1.parent = camera;

  //Animation
  scene.registerBeforeRender(function () {
    //Balloon 1 intersection -- Precise = false
    if (cone.intersectsMesh(plan1, false)) {
      balloon1.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
      if (!introaudio.isPlaying && !path1soundState) {
        path1sound.play();
        path1soundState = true;
      }
    } else if (cone.intersectsMesh(plan2, false)) {
      balloon1.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
    } else if (cone.intersectsMesh(plan3, false)) {
      balloon1.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
    } else {
      balloon1.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
      if (
        !introaudio.isPlaying &&
        !path1sound.isPlaying &&
        path1soundState &&
        !nothispathState
      ) {
        nothispath.play();
        nothispathState = true;
      }
    }
  });

  const name = "None";
  /* End Create Scenery */

  //Collisions Enabled and gravity
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;
  camera.applyGravity = true;

  path.collisionsEnabled = true;
  path.checkCollisions = true;
  path2.collisionsEnabled = true;
  path2.checkCollisions = true;
  ground.checkCollisions = true;
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;
  wall1.checkCollisions = true;
  wall2.checkCollisions = true;
  wall3.checkCollisions = true;
  wall4.checkCollisions = true;
  banana.checkCollisions = true;
  pineapple.checkCollisions = true;
  orange.checkCollisions = true;
  orange.isPickable = true;
  yogurt.checkCollisions = true;
  yogurt.isPickable = true;

  camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
  camera.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);

  /* New Input Management for Camera
    https://playground.babylonjs.com/#CTCSWQ#1  
    __________________________________*/

  //First remove the default management.
  camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

  //Key Input Manager To Use Keys to Move Forward and BackWard and Look to the Left or Right
  const FreeCameraKeyboardWalkInput = function () {
    this._keys = [];
    this.keysUp = [38];
    this.keysDown = [40];
    this.keysLeft = [37];
    this.keysRight = [39];
  };

  //Add attachment controls
  FreeCameraKeyboardWalkInput.prototype.attachControl = function (
    noPreventDefault
  ) {
    const _this = this;
    const engine = this.camera.getEngine();
    const element = engine.getInputElement();
    if (!this._onKeyDown) {
      element.tabIndex = 1;
      this._onKeyDown = function (evt) {
        if (
          _this.keysUp.indexOf(evt.keyCode) !== -1 ||
          _this.keysDown.indexOf(evt.keyCode) !== -1 ||
          _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          _this.keysRight.indexOf(evt.keyCode) !== -1
        ) {
          const index = _this._keys.indexOf(evt.keyCode);
          if (index === -1) {
            _this._keys.push(evt.keyCode);
          }
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      };
      this._onKeyUp = function (evt) {
        if (
          _this.keysUp.indexOf(evt.keyCode) !== -1 ||
          _this.keysDown.indexOf(evt.keyCode) !== -1 ||
          _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          _this.keysRight.indexOf(evt.keyCode) !== -1
        ) {
          const index = _this._keys.indexOf(evt.keyCode);
          if (index >= 0) {
            _this._keys.splice(index, 1);
          }
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      };
      element.addEventListener("keydown", this._onKeyDown, false);
      element.addEventListener("keyup", this._onKeyUp, false);
    }
  };

  //Add detachment controls
  FreeCameraKeyboardWalkInput.prototype.detachControl = function () {
    const engine = this.camera.getEngine();
    const element = engine.getInputElement();
    if (this._onKeyDown) {
      element.removeEventListener("keydown", this._onKeyDown);
      element.removeEventListener("keyup", this._onKeyUp);
      BABYLON.Tools.UnregisterTopRootEvents([
        { name: "blur", handler: this._onLostFocus },
      ]);
      this._keys = [];
      this._onKeyDown = null;
      this._onKeyUp = null;
    }
  };

  //Keys movement control by checking inputs
  FreeCameraKeyboardWalkInput.prototype.checkInputs = function () {
    if (this._onKeyDown) {
      const camera = this.camera;
      for (let index = 0; index < this._keys.length; index++) {
        const keyCode = this._keys[index];
        const speed = camera.speed;
        if (this.keysLeft.indexOf(keyCode) !== -1) {
          camera.rotation.y -= camera.angularSpeed;
          camera.direction.copyFromFloats(0, 0, 0);
        } else if (this.keysUp.indexOf(keyCode) !== -1) {
          camera.direction.copyFromFloats(0, 0, speed);
        } else if (this.keysRight.indexOf(keyCode) !== -1) {
          camera.rotation.y += camera.angularSpeed;
          camera.direction.copyFromFloats(0, 0, 0);
        } else if (this.keysDown.indexOf(keyCode) !== -1) {
          camera.direction.copyFromFloats(0, 0, -speed);
        }
        if (camera.getScene().useRightHandedSystem) {
          camera.direction.z *= -1;
        }
        camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
        BABYLON.Vector3.TransformNormalToRef(
          camera.direction,
          camera._cameraTransformMatrix,
          camera._transformedDirection
        );
        camera.cameraDirection.addInPlace(camera._transformedDirection);
      }
    }
  };

  //Add the onLostFocus function
  FreeCameraKeyboardWalkInput.prototype._onLostFocus = function (e) {
    this._keys = [];
  };

  //Add the two required functions for the control Name
  FreeCameraKeyboardWalkInput.prototype.getClassName = function () {
    return "FreeCameraKeyboardWalkInput";
  };

  FreeCameraKeyboardWalkInput.prototype.getSimpleName = function () {
    return "keyboard";
  };

  //Add the new keys input manager to the camera.
  camera.inputs.add(new FreeCameraKeyboardWalkInput());

  //Add buttons
  const buttonbox = document.createElement("div");
  buttonbox.id = "buttonbox";
  document.body.appendChild(buttonbox);

  const tTag = document.createElement("div");
  tTag.id = "choose";
  tTag.textContent = "score";
  buttonbox.appendChild(tTag);
  //tTag.textContent = score;

  const header = document.createElement("div");
  header.id = "headerBox";
  header.textContent = "No Picked Mesh";
  buttonbox.appendChild(header);

  /*Click Box - Selection
    ------------------------ */
  scene.onPointerDown = function (evt, pickResult) {
    //We try to pick an object
    if (pickResult.hit) {
      header.textContent = pickResult.pickedMesh.name;
      names = pickResult.pickedMesh.name;
      console.dir(names);
      if (pickResult.pickedMesh.name == "yogurt") {
        tTag.textContent = score + 1;
        welldone.play();
        setTimeout(() => {
          console.log("5 Segundo esperado");
          location.href = "/game/Levels/Level2.html";
        }, 5000);
      }
    }
  };

  const touch = path2.collisionsEnabled.State;

  return scene;
};

const canvas = document.getElementById("renderCanvasL1"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
async function main() {
  const scene = await createScene(engine); //Call the createScene function
  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });
}
main().catch(console.error);
