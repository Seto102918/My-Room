import * as TWEEN from "@tweenjs/tween.js";
import gsap from "gsap";
import { cam } from "../main";

var backbutton = document.querySelector('#back')

export function backSpotifyAnimation(){
	gsap.to(spotifyembed,{x: -50, duration: 0.5, opacity: 0, ease: "back"})
	document.getElementById("spotifyembed").style.pointerEvents = "none";
}

export function backAnimation(){
	gsap.to(backbutton,{opacity:0, x: 0, duration: 0.3, ease: 'back.in'})
		const coords = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
			new TWEEN.Tween(coords)
			.easing(TWEEN.Easing.Cubic.InOut)
			.to({ x: 51, y: 3, z: 75 }, 2000)
			.onUpdate(() =>
			    cam.position.set(coords.x, coords.y, coords.z)
			)
			.start();
		const rotation = { x: cam.rotation.x, y: cam.rotation.y ,z: cam.rotation.z};  
			new TWEEN.Tween(rotation)
			.easing(TWEEN.Easing.Cubic.InOut)
			.to({ x: 0, y: 0.6, z: 0},2000)
			.onUpdate(()=>
			    cam.rotation.set(rotation.x, rotation.y, rotation.z)
			)
			.start();
}