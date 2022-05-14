
const createScene = function(engine) {

    const scene = new BABYLON.Scene(engine);

    // We implement universal camera
    // https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction 
    //Parameters: name, alpha, beta, radius, target position, scene
    //var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 1, 0), scene);
    var camera1 = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 20, -50), scene);
    camera1.setTarget(BABYLON.Vector3.Zero());
    camera1.attachControl(canvas, true);

    var camera2 = new BABYLON.ArcRotateCamera("camera2", -Math.PI/4, 1.1, 65, BABYLON.Vector3.Zero());
    camera2.target = BABYLON.Vector3.Zero(); 
 
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.y = 0.5;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});

    window.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            setCamArcRotate();
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            setCamUniversal();
        }
    })
  

    var setCamUniversal = function() {
        scene.activeCamera = camera1;
        camera1.attachControl(canvas, true);
    };
    var setCamArcRotate = function() {
        scene.activeCamera = camera2;
        camera2.attachControl(canvas, true);
    };

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




