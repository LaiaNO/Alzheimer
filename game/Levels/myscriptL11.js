var createScene = function (engine) {
    var scene = new BABYLON.Scene(engine);

    // LIGHT
    var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 10, 5), scene);

    //Add the camera
    var camera = new BABYLON.UniversalCamera("MyCamera", new BABYLON.Vector3(0, 1, 0), scene);
    camera.minZ = 0.0001;
    camera.attachControl(canvas, true);
    camera.speed = 0.02;
    camera.angularSpeed = 0.05;
    camera.angle = Math.PI/2;
    camera.direction = new BABYLON.Vector3(Math.cos(camera.angle), 0, Math.sin(camera.angle));
    scene.activeCameras.push(camera);


    /* Set Up Scenery
    _____________________*/

    //Ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 30, height: 30}, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    ground.material.backFaceCulling = false;

    //Walls
    var wall1 = ground.clone("ground");
    wall1.position.z = -15;
    wall1.rotation.x = 90 * Math.PI / 180;
    wall1.material = ground.material.clone("lowerMat");
    wall1.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

    var wall2 = ground.clone("wall1");
    wall2.position.z = +15;
    wall2.rotation.x = -90 * Math.PI / 180;
    wall2.material = ground.material.clone("lowerMat");
    wall2.material.diffuseColor = new BABYLON.Color3(0, 0, 1);

    var wall3 = ground.clone("wall1");
    wall3.position.x = +15;
    wall3.rotation.z = 90 * Math.PI / 180;
    wall3.material = ground.material.clone("lowerMat");
    wall3.material.diffuseColor = new BABYLON.Color3(1, 0, 0);

    var wall4 = ground.clone("wall1");
    wall4.position.x = -15;
    wall4.rotation.z = -90 * Math.PI / 180;
    wall4.material = ground.material.clone("lowerMat");
    wall4.material.diffuseColor = new BABYLON.Color3(1, 1, 0);

    var instructions = BABYLON.MeshBuilder.CreateGround("ground", {width: 1.5, height: 2}, scene);
    instructions.material = new BABYLON.StandardMaterial("groundMat", scene);
    instructions.material.backFaceCulling = false;
    instructions.position.x = 0;
    instructions.position.y = 1.3;
    instructions.position.z = 3;
    instructions.rotation.x = -90 * Math.PI / 180;
    instructions.material.diffuseTexture = new BABYLON.Texture("/recursos/text863.png", scene);
    

    var randomNumber = function (min, max) {
		if (min == max) {
			return (min);
		}
		var random = Math.random();
		return ((random * (max - min)) + min);
	};

    var box = new BABYLON.MeshBuilder.CreateBox("crate", {size: 2}, scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/bricktile.jpg", scene);
    box.checkCollisions = true;

    var boxNb = 6;
    var theta = 0;
    var radius = 6;
    box.position = new BABYLON.Vector3((radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.cos(theta + randomNumber(-0.1 * theta, 0.1 * theta)), 1, (radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.sin(theta + randomNumber(-0.1 * theta, 0.1 * theta)));

    var boxes = [box];
    for (var i = 1; i < boxNb; i++) {
        theta += 2 * Math.PI / boxNb;
        var newBox = box.clone("box" + i);
        boxes.push(newBox);
        newBox.position = new BABYLON.Vector3((radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.cos(theta + randomNumber(-0.1 * theta, 0.1 * theta)), 1, (radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.sin(theta + randomNumber(-0.1 * theta, 0.1 * theta)));
    }
    /* End Create Scenery */

    //Collisions Enabled
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
    }
    
    //Add attachment controls
    FreeCameraKeyboardWalkInput.prototype.attachControl = function (noPreventDefault) {
            var _this = this;
            var engine = this.camera.getEngine();
            var element = engine.getInputElement();
            if (!this._onKeyDown) {
                element.tabIndex = 1;
                this._onKeyDown = function (evt) {                 
                    if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
                        _this.keysDown.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1) {
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
                    if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
                        _this.keysDown.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1) {
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
                    { name: "blur", handler: this._onLostFocus }
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
                    }
                    else if (this.keysUp.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(0, 0, speed);               
                    }
                    else if (this.keysRight.indexOf(keyCode) !== -1) {
                        camera.rotation.y += camera.angularSpeed;
                        camera.direction.copyFromFloats(0, 0, 0);
                    }
                    else if (this.keysDown.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(0, 0, -speed);
                    }
                    if (camera.getScene().useRightHandedSystem) {
                        camera.direction.z *= -1;
                    }
                    camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
                    BABYLON.Vector3.TransformNormalToRef(camera.direction, camera._cameraTransformMatrix, camera._transformedDirection);
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

 
    return scene;
}

const canvas = document.getElementById("renderCanvasL1"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
const scene = createScene(engine); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});