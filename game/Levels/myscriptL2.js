var createScene = function (engine) {
  var scene = new BABYLON.Scene(engine);

  // LIGHT
  var light = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(0, 10, 5),
    scene
  );
  var light2 = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(30, -15, 5),
    scene
  );
  //Add the camera
  var camera = new BABYLON.UniversalCamera(
    "MyCamera",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  camera.minZ = 0.0001;
  camera.attachControl(canvas, true);
  camera.speed = 0.01;
  camera.angularSpeed = 0.05;
  camera.angle = Math.PI / 2;
  camera.direction = new BABYLON.Vector3(
    Math.cos(camera.angle),
    0,
    Math.sin(camera.angle)
  );
  scene.activeCameras.push(camera);

  /* Set Up Scenery
    _____________________*/

  //Ground
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 30 },
    scene
  );
  ground.material = new BABYLON.StandardMaterial("groundMat", scene);
  ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
  ground.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/gras.png",
    scene
  );

  //Walls
  const wall1 = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 20 },
    scene
  );
  wall1.material = new BABYLON.StandardMaterial("groundMat", scene);
  wall1.position.z = -15;
  wall1.position.y = 5;
  wall1.rotation.x = (90 * Math.PI) / 180;
  wall1.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/park.png",
    scene
  );

  const wall2 = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 20 },
    scene
  );
  wall2.material = new BABYLON.StandardMaterial("groundMat", scene);
  wall2.position.z = 15;
  wall2.position.y = 5;
  wall2.rotation.x = (90 * Math.PI) / 180;
  wall2.rotation.z = (-180 * Math.PI) / 180;
  wall2.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/park.png",
    scene
  );

  const wall3 = ground.clone("wall1");
  wall3.position.x = +15;
  wall3.rotation.z = (90 * Math.PI) / 180;
  wall3.material = ground.material.clone("lowerMat");
  wall3.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/park3.png",
    scene
  );

  const wall4 = ground.clone("wall1");
  wall4.position.x = -15;
  wall4.rotation.z = (-90 * Math.PI) / 180;
  wall4.material = ground.material.clone("lowerMat");
  wall4.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/park2.png",
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
  instructions.position.x = 0;
  instructions.position.y = 1.1;
  instructions.position.z = 3;
  instructions.rotation.x = (-90 * Math.PI) / 180;
  instructions.material.diffuseTexture = new BABYLON.Texture(
    "/recursos/momfind.png",
    scene
  );

  BABYLON.SceneLoader.ImportMesh(
    "",
    "https://assets.babylonjs.com/meshes/",
    "HVGirl.glb",
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      var hero = newMeshes[0];
      hero.position.x = -5;
      //Scale the model down
      hero.scaling.scaleInPlace(0.1);

      //Get the Samba animation Group
      const sambaAnim = scene.getAnimationGroupByName("Samba");

      //Play the Samba animation
      sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
    }
  );

  // Append glTF model to scene.
  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "oldMan.gltf",
    scene
  ).then(function (result) {
    result.meshes[0].position.x = 5;
    result.meshes[0].position.y = 0;
    result.meshes[0].scaling.scaleInPlace(1.1);
  });
  // Append glTF model to scene.
  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "looking.gltf",
    scene
  ).then(function (look) {
    look.meshes[0].position.x = 4;
    look.meshes[0].position.z = 2;
    look.meshes[0].rotation.z = (70 * Math.PI) / 180;
    look.meshes[0].scaling.scaleInPlace(0.9);
  });
  // Append glTF model to scene.
  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "think.gltf",
    scene
  ).then(function (think) {
    think.meshes[0].position.x = -4;
    think.meshes[0].position.z = 6;
    think.meshes[0].rotation.z = (70 * Math.PI) / 180;
    think.meshes[0].scaling.scaleInPlace(0.9);
  });
  // Append glTF model to scene.
  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/recursos/",
    "waving.gltf",
    scene
  ).then(function (waving) {
    waving.meshes[0].position.x = -14;
    waving.meshes[0].position.z = 6;
    waving.meshes[0].rotation.z = (70 * Math.PI) / 180;
    waving.meshes[0].scaling.scaleInPlace(0.9);
  });

  var name = "None";
  scene.onPointerDown = function (evt, pickResult) {
    // We try to pick an object
    if (pickResult.hit) {
      name = pickResult.pickedMesh.name;
      //name.textContent = pickResult.pickedMesh.name;
      console.dir(name);
    }
  };

  /* End Create Scenery */

  //Collisions Enabled and gravity
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;
  camera.applyGravity = true;

  ground.checkCollisions = true;

  scene.collisionsEnabled = true;
  camera.checkCollisions = true;
  ground.checkCollisions = true;
  wall1.checkCollisions = true;
  wall2.checkCollisions = true;
  wall3.checkCollisions = true;
  wall4.checkCollisions = true;

  camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
  camera.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);

  /* New Input Management for Camera
    https://playground.babylonjs.com/#CTCSWQ#1  
    __________________________________*/

  //First remove the default management.
  camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

  //Key Input Manager To Use Keys to Move Forward and BackWard and Look to the Left or Right
  var FreeCameraKeyboardWalkInput = function () {
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
    var _this = this;
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();
    if (!this._onKeyDown) {
      element.tabIndex = 1;
      this._onKeyDown = function (evt) {
        if (
          _this.keysUp.indexOf(evt.keyCode) !== -1 ||
          _this.keysDown.indexOf(evt.keyCode) !== -1 ||
          _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          _this.keysRight.indexOf(evt.keyCode) !== -1
        ) {
          var index = _this._keys.indexOf(evt.keyCode);
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
          var index = _this._keys.indexOf(evt.keyCode);
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
    var engine = this.camera.getEngine();
    var element = engine.getInputElement();
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
      var camera = this.camera;
      for (var index = 0; index < this._keys.length; index++) {
        var keyCode = this._keys[index];
        var speed = camera.speed;
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

  /*Click Box - Selection
    ------------------------ */
  scene.onPointerDown = function (evt, pickInfo) {
    if (pickInfo.hit) {
      camera.focusOn([pickInfo.pickedMesh], true);
    }
  };

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
