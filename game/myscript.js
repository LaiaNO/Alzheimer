
const createScene = function(engine) {

    const scene = new BABYLON.Scene(engine);

    // We implement universal camera
    // https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction 
    //Parameters: name, alpha, beta, radius, target position, scene
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    // Positions the camera overwriting alpha, beta, radius
    camera.setPosition(new BABYLON.Vector3(0, 0, 0));
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    
    // Append glTF model to scene.
    BABYLON.SceneLoader.Append("/recursos/", "buttons.gltf", scene, function (scene) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        scene.activeCamera.alpha += Math.PI;
    });

    return scene;
}

const canvas = document.getElementById("renderCanvasInstructions"); // Get the canvas element
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




