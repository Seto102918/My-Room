import { Easing, Tween } from "@tweenjs/tween.js";
import gsap from "gsap";
import { cam,sphereGroup, scene } from "../main";

////RickRoll
const sliderdiv = document.getElementById('slider__div');
const youtube_link = document.getElementById('youtube_link');
const stop = document.querySelector('.stop');

const video = document.getElementById('video');
const texture = new THREE.VideoTexture( video );

const planeGeo = new THREE.PlaneGeometry(16/4.1,9/4.1);
const planeMesh = new THREE.Mesh(planeGeo,new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture }));

planeMesh.position.set(-5.25,1.21,-9.53);
planeMesh.rotation.set(-0.1,0,0);

export function startOnClickAnimation(kamar) {
    const coords = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
        new Tween(coords)
        .easing(Easing.Cubic.InOut)
        .to({ x: 51, y:2, z: 75 }, 3000)
        .onUpdate(() =>
        cam.position.set(coords.x, coords.y, coords.z),
        )
        .start();

    const rotation = { x: cam.rotation.x, y: cam.rotation.y ,z: cam.rotation.z};  
        new Tween(rotation)
        .easing(Easing.Cubic.InOut)
        .to({ x: 0, y: 0.6, z: 0},3000)
        .onUpdate(()=>
        cam.rotation.set(rotation.x, rotation.y, rotation.z)
        )
        .start();

    const sc = { x: kamar.rotation.x, y: kamar.rotation.y, z: kamar.rotation.z };
        new Tween(sc)
        .easing(Easing.Cubic.InOut)
        .to({ x: 0, y: 0, z: 0 }, 3000)
        .onUpdate(() =>
            kamar.rotation.set(sc.x, sc.y, sc.z),
        )
        .start();
			
}

export function sphereOnClickAnimation(obj, xpos, ypos, zpos, xrot, yrot, zrot, time) {
    const coords = { x: cam.position.x, y: cam.position.y ,z: cam.position.z};
        new Tween(coords)
        .easing(Easing.Cubic.InOut)
        .to({ x: xpos, y: ypos, z: zpos},time)
        .onUpdate(() =>
            cam.position.set(coords.x, coords.y, coords.z),
        )
        .start();

    const rotation = { x: cam.rotation.x, y: cam.rotation.y ,z: cam.rotation.z};  
        new Tween(rotation)
        .easing(Easing.Cubic.InOut)
        .to({ x: xrot, y: yrot, z: zrot},time)
        .onUpdate(()=>
            cam.rotation.set(rotation.x, rotation.y, rotation.z)
        )
        .start();

    if (obj == sphereGroup[0]){
        scene.add(planeMesh);
        video.play();
        stop.style.display="grid";
        sliderdiv.style.display="grid";
        gsap.to(stop,{x: 0,opacity: 1,duration:0.2,ease:'back'});
        gsap.to(sliderdiv,{x: 0,opacity: 1,duration:0.3,ease:'back'});
        youtube_link.style.display='block';
        gsap.to(youtube_link,{x: 0,opacity: 1,duration:0.4,ease:'back'});
    }
}