//import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import React from "react";
const ExpoGraphics = require("expo-graphics");
const GraphicsView = ExpoGraphics.View;

export default class App extends React.Component {
  renderer: ExpoTHREE.Renderer | undefined;
  scene: ExpoTHREE.THREE.Scene | undefined;
  camera: ExpoTHREE.THREE.PerspectiveCamera | undefined;
  cube: ExpoTHREE.THREE.Mesh | undefined;
  constructor(props: Readonly<{}>) {
    super(props);
  }
  componentDidMount() {
    //THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio
  }: {
    gl: WebGLRenderingContext;
    canvas: any;
    width: number;
    height: number;
    scale: number;
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);
  };

  onRender = (delta: number) => {
    if (this.cube && this.renderer && this.scene && this.camera) {
      this.cube.rotation.x += 3.5 * delta;
      this.cube.rotation.y += 2 * delta;
      this.renderer.render(this.scene, this.camera);
    }
  };
}
