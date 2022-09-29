import * as THREE from 'three';
import gsap from "gsap";
import { update } from "@tweenjs/tween.js";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { getTime } from './other/time.js';
import { setLoader } from './other/loader.js';
import { addLight, lightOrDark } from './other/light.js';

let spotifyState = 0;

export const switchAudio = new Audio('/Content/Audio/switch2.mp3');
export const lightColor = {
	yellowish: 0xF0EA5C,
	blu: 0x8ceeff,
	backnigth: 0x04040f,
	backday: 0xE4DACC
}

const start = document.getElementById("start");
const back = document.getElementById("back");

//set camera
export const cam = new THREE.PerspectiveCamera(30,innerWidth/innerHeight,0.1,1000)
cam.position.set(51,0,75)
cam.rotation.set(0,0.6,0)

//initial commands
export const loader = setLoader();
export const scene = new THREE.Scene();
export const render = new THREE.WebGLRenderer({
	alpha: true,
	antialias: false
});

render.shadowMap.enabled = false;
render.shadowMap.type = THREE.PCFSoftShadowMap;
render.setSize(innerWidth,innerHeight);
render.setPixelRatio(devicePixelRatio/1.75);
document.body.appendChild(render.domElement);

console.log("run")

export const domEvents = new THREEx.DomEvents(cam, render.domElement);

document.querySelector('#app');
const container = document.createElement( 'div' );
export let time = getTime();
const bg_now = lightOrDark();

///Loading objs
let kamar, spotify;

import ('./other/load.js').then(({loadKamar , loadSpotify, postObjLoad}) => {
	loader.load( 'Content/idkanimorlahbro.glb', function ( obj ) {
		kamar = obj.scene;
		loadKamar(kamar);
		postObjLoad();
	}, undefined, error => console.error(error));
	
	loader.load('Content/Spotify/spotify2.glb',function( obj ){
		spotify = obj.scene;
		loadSpotify(spotify);
	}, undefined, error => console.error(error));
}).catch(e => alert("Failed to import load.js"))

//fps stats
const stats = new Stats();
document.body.appendChild(container);		
container.appendChild( stats.dom );
stats.dom.id = 'stats';

//controls
export const controls = new OrbitControls( cam, render.domElement );
controls.update();

////Spheres
const sphereGeo = new THREE.SphereGeometry(0.6,16,16)
export var sphereGroup = {};

for (var i = 0;i < 4; i++){
	sphereGroup[i] = new THREE.Mesh(sphereGeo,new THREE.MeshBasicMaterial({
		color: 0xffffff
	}));
}

sphereGroup[0].position.set(0,-1,-9);
sphereGroup[1].position.set(-11,3,2);
sphereGroup[2].position.set(8,-2,4);
sphereGroup[3].position.set(-10,-8,-2);

sphereOnClick(sphereGroup[0],-2,8,25,-0.3,0,0,2000);
sphereOnClick(sphereGroup[1],25,3,2,0,1.5,0,2000);
sphereOnClick(sphereGroup[2],11,40,5,-1.5,0,0,2000);
sphereOnClick(sphereGroup[3],6,-6,21,0,0.65,0,2000);

///////Window Resize listener
window.addEventListener('resize', function() {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
    animate()
}, false)

///////Main Lights
export let ambient = new THREE.AmbientLight(bg_now);
export let light7 = new THREE.PointLight(lightColor.yellowish,0.5);
light7.castShadow = true
light7.shadow.mapSize.width = 1024;
light7.shadow.mapSize.height = 1024;
light7.shadow.bias = -0.005;
light7.position.set(0,20,0)
light7.shadow.camera.far = 50; 

///////animate
function animate(time){ 
	requestAnimationFrame(animate)
	update(time)
	render.render(scene,cam)
	stats.update()
}

///////click event listeners
const stop = document.querySelector('.stop');
const sliderdiv = document.getElementById('slider__div');
const backbutton = document.getElementById('back');
const youtube_link = document.getElementById('youtube_link');
const slider = document.getElementById('slider');
const guide = document.getElementById('guide');
const understoodButton = document.getElementById('understood_button');
const guide_text_1 = document.getElementById('guide_text_1');
const guide_text_2 = document.getElementById('guide_text_2');

back.addEventListener("click", function () {
	import ('./animation/backAnimations').then(({ backAnimation, backSpotifyAnimation }) => {
		if(spotifyState === 1){
			backSpotifyAnimation();
			controls.enabled = true;
			setTimeout(backAnimation,500);
			spotifyState = 0;
		}else backAnimation()
	})
});

stop.addEventListener("click",(event)=>{
	video.pause()
	video.currentTime = 0;
	gsap.to(stop,{x: -100,opacity: 0,duration:0.2,ease:'back.in', function(){
		stop.style.display="none";
	}})
	gsap.to(sliderdiv,{x: -100,opacity: 0,duration:0.3,ease:'back.in', function() {
		sliderdiv.style.display="none";
	}})
	gsap.to(youtube_link,{x: 0,opacity: 0,duration:0.4,ease:'back', function() {
		youtube_link.style.display='none';
	}});
})

start.addEventListener("click",(event)=>{
	start.style.pointerEvents="none";
	gsap.to(start,{opacity:0,duration:1,ease:'power1', function() {
		start.style.display="none";
		guide.style.display="flex";
	}});
	gsap.to(guide,{opacity:1,duration:1,ease:'power1', function() {
		guide.style.pointerEvents="all";
	}});
});

var understoodButton_counter = 0;

understoodButton.addEventListener("click",(event)=>{
	if(understoodButton_counter === 0){
		guide_text_1.innerText = 'Click on the Spheres to look in';
		guide_text_2.innerText = 'Click on the Spotify logo to see my playlist';
		understoodButton.innerText= 'Understood!'
		return understoodButton_counter++;
	}

	guide.style.pointerEvents="none";
	gsap.to(guide,{opacity:0,duration:1,ease:'power1', function() {
		guide.style.display="none";
	}});
	animate();
	
	import ('./animation/onClickAnimations').then (({ startOnClickAnimation }) => {
		startOnClickAnimation(kamar);
		setTimeout(function() {
			scene.add(spotify)
			scene.add(sphereGroup[0])
			scene.add(sphereGroup[1])
			scene.add(sphereGroup[2])
			scene.add(sphereGroup[3])
			addLight();
		},3000);
	});
});

function sphereOnClick(obj, xpos, ypos, zpos, xrot, yrot, zrot, time){
	import ('./animation/onClickAnimations').then (({ sphereOnClickAnimation }) =>{
		domEvents.addEventListener(obj, 'click', function(event){
			gsap.to(backbutton,{opacity:1, x: 0, duration: 0.3, ease: 'back'})
			sphereOnClickAnimation(obj, xpos, ypos, zpos, xrot, yrot, zrot, time);
		}, false)
	});
}

video.volume = slider.value/100;
slider.oninput = function(){
	video.volume = this.value/100
}

////spotify Embed
export function embedRun(){
    spotifyState = 1;
	gsap.to(spotifyembed,{x: 50, duration: 0.5, opacity: 0.6, ease: "back"})
	document.getElementById("spotifyembed").style.pointerEvents = "all";
}