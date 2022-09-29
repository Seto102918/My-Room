import gsap from "gsap";
import { scene, cam, domEvents,  embedRun, controls } from "../main";
import * as TWEEN from "@tweenjs/tween.js";

async function loadKamar(kamar){
    kamar.scale.set(5,5,5);
	kamar.position.set(0,-12,0);
	kamar.rotation.set(-0.65,2.85,0);
    kamar.traverse( function( node ) {
        if ( node.type === 'Mesh') { 
            node.castShadow = true; 
            node.receiveShadow = true;
        }
    } );
    scene.add(kamar);
}

function loadSpotify(spotify) {
    var backbutton = document.querySelector('#back')
    var embed = document.getElementById('spotifyembed');
    spotify.scale.set(7,5,5);
    spotify.position.set(5.6,-13.5,3);
    spotify.traverse(function( node ){
        if ( node.type === 'Mesh') { 
            node.castShadow = true; 
            node.receiveShadow = false;
        }
    } );

    domEvents.addEventListener(spotify, 'click', function(event){
        controls.enabled = false;

        gsap.to(backbutton,{opacity:1, x: 0, duration: 0.3, ease: 'back'})

        const cam_position = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
            new TWEEN.Tween(cam_position)
            .easing(TWEEN.Easing.Cubic.InOut)
            .to({ x: 15.5, y:13.5, z: 3.2 }, 2000)
            .onUpdate(() => cam.position.set(cam_position.x, cam_position.y, cam_position.z))
            .start();

        const rotation = { x: cam.rotation.x, y: cam.rotation.y ,z: cam.rotation.z};  
            new TWEEN.Tween(rotation)
            .easing(TWEEN.Easing.Cubic.InOut)
            .to({ x: 0, y: 1.4, z: 0},2000)
            .onUpdate(() => cam.rotation.set(rotation.x, rotation.y, rotation.z))
            .start();

        const spotify_position = { x: spotify.position.x, y: spotify.position.y ,z: spotify.position.z};
            const f = new TWEEN.Tween(spotify_position)
            .easing(TWEEN.Easing.Cubic.Out)
            .to({ x: 5.4, y: -13.5, z: 3},300)
            .onUpdate(() => spotify.position.set(spotify_position.x, spotify_position.y, spotify_position.z))

        const spotify_position_2 = { x: 5.4, y: -13.5, z: 3};
            const s = new TWEEN.Tween(spotify_position_2)
            .easing(TWEEN.Easing.Cubic.Out)
            .to({ x: spotify.position.x, y: spotify.position.y ,z: spotify.position.z},300)
            .onUpdate(() => spotify.position.set(spotify_position_2.x, spotify_position_2.y, spotify_position_2.z))

        f.chain(s);
        f.start();

        // pers.style.transform="perspective(20cm) rotateX(0deg) rotateY(7deg) translate(20%,0%)"
        embed.style.transform="scale(1)"
        embed.style.marginTop="25%"

        setTimeout(embedRun,2000);
    }, false)
}

function postObjLoad() {
    const loading_text  = document.getElementById('loading_text');
    const loading_container = document.getElementById('loading_container');
    const start = document.getElementById("start")
    loading_text.style.background='white';
	loading_text.style.color='black';
	loading_text.style.borderWidth='2px';
	loading_text.style.borderColor='gray';
	loading_text.style.padding='0.75rem';
	loading_text.innerText='Click Anywhere To Continue';

	loading_container.style.display='none';
	start.style.pointerEvents='all';
	start.style.cursor='pointer';
}

export { loadKamar, loadSpotify, postObjLoad }
