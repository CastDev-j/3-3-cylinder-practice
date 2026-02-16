import "../global.css";
import GUI from "lil-gui";
import * as THREE from "three";
import { Renderer } from "./lib/renderer";
import { Cylinder } from "./lib/cylinder";

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element not found");
}

const gui = new GUI();
const renderer = new Renderer(canvas);

const cylinder = new Cylinder({
  position: new THREE.Vector3(0, 0, 0),
  size: 1,
  edgeCount: 5,
  wireframe: true,
  color: new THREE.Color(0x00ff00),
});

renderer.scene.add(cylinder.mesh);

const config = {
  wireframe: cylinder.wireframe,
  size: cylinder.size,
  height: cylinder.height,
  edgeCount: cylinder.edgeCount,
  color: `#${cylinder.color.getHexString()}`,
};

gui.add(config, "wireframe").onChange((value: boolean) => {
  cylinder.wireframe = value;
  (cylinder.mesh.material as THREE.MeshBasicMaterial).wireframe = value;
});

gui.add(config, "size", 0.1, 5).onChange((value: number) => {
  cylinder.updateSize(value);
});

gui.add(config, "height", 0.1, 5).onChange((value: number) => {
  cylinder.updateHeight(value);
});

gui.add(config, "edgeCount", 3, 30, 1).onChange((value: number) => {
  cylinder.updateEdgeCount(value);
});

gui.addColor(config, "color").onChange((value: string) => {
  const color = new THREE.Color(value);
  cylinder.updateColor(color);
});

renderer.animate(() => {
  const time = Date.now() * 0.001;
});
