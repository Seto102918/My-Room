import { ambient, light7, lightColor, scene, switchAudio, time } from "../main";

export function addLight(){
	const light6 = new THREE.PointLight(lightColor.yellowish,0.2)
		light6.castShadow = true
		light6.shadow.bias = -0.005;
		light6.position.set(-10,6,8.4)
		light6.shadow.camera.near = 0; 
		light6.shadow.camera.far = 100; 

	const light5 = new THREE.SpotLight(lightColor.yellowish,2)
		light5.castShadow = true
		light5.shadow.mapSize.width = 1024;
		light5.shadow.mapSize.height = 1024;
		light5.decay = 2
		light5.distance = 25
		light5.position.set(-8,9,-9)

	// const rectLight = new THREE.RectAreaLight(lightColor.yellowish, 0 ,  80, 80 )
	// 	rectLight.position.set( 0, 25, 0 );
	// 	rectLight.lookAt( 0, 0, 0 );

	const rectLight2 = new THREE.RectAreaLight(lightColor.blueish, 0.5 ,  80, 80 )
		rectLight2.position.set( 0, -25, 0 );
		rectLight2.lookAt( 0, 0, 0 );

	ambient.intensity = 0.7
	
	scene.add(light6);
	scene.add(light5);

	if (time.hour>5 && time.hour<17){
		scene.add(light7)
	}

	// scene.add(rectLight);
	scene.add(rectLight2);
	scene.add(ambient);
    
	switchAudio.play();
}


export function lightTransition(out){
	const lightTransambient = {color: ambient.intensity};
		new TWEEN.Tween(lightTransambient)
		.easing(TWEEN.Easing.Cubic.InOut)
		.to({color: out}, 2000)
		.onUpdate(() => ambient.color.set(lightTransambient.color))
		.start();
}


var transitionstate = 0;

export function lightOrDark(){

    var bg_now;

	console.log(time.hour)
	if (time.hour > 5 && time.hour < 17){ console.log("1");
		transitionstate = 0;
		document.body.style.backgroundColor = "#2bceff";
	}else if(time.hour > 17 && time.hour < 24 || time.hour >= 0 && time.hour < 5){ console.log("2");
		transitionstate = 0;
		bg_now = lightColor.backnigth;
		document.body.style.backgroundColor = "#04040f";
	}else if(time.hour === 5 && transitionstate === 0){ console.log("3");
		gsap.to(body,{backgroundColor: "#2bceff", duration: 10});
		switchaudio.play();

		transitionstate = 1;
	}else if(time.hour === 17 && transitionstate === 0){ console.log("3");
		gsap.to(body,{backgroundColor:"#04040f", duration: 10});
		bg_now = lightColor.backnigth;
		
		transitionstate = 1;
	}

    return bg_now;
}