import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function setLoader() {
    let loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('node_modules/three/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    return loader;
}