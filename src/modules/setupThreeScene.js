function setupThreeScene (sb) {
	
	function INIT () {
		sb.listen({
			listenFor: ["finished-load"],
			moduleID: this.moduleID,
			moduleFunction: "setup"
		})
	}
	function SETUP () {
		
		var whRatio = 1.5
	 	var w = window.innerWidth - 450;
	 	var h = w/whRatio;
		
		var scene = new THREE.Scene();
	 
		var camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 10000000);
			camera.position.x = 200;
		    camera.position.y = 100;
		    camera.position.z = 200;
		    camera.lookAt(new THREE.Vector3(0,0,0))
		    scene.add(camera);
	    
	    var renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true });
		    renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
		    renderer.setSize(w, h);
		    renderer.shadowMapEnabled = true;
		    renderer.shadowMapType = THREE.BasicShadowMap;
		    renderer.sortObjects = false;

	    var axes = new THREE.AxisHelper(100);
	   		//scene.add(axes);
	    
	    var group = new THREE.Object3D()
	    	scene.add(group)
	    	
	    var scalingGroup = new THREE.Object3D()
	    	scene.add(scalingGroup)
	    
	    var spotLight = new THREE.SpotLight(0xffffff);
	    	spotLight.position.set(100, 100, 80);
	    	spotLight.castShadow = true;
	    	spotLight.shadowDarkness = 0.1;
	    	spotLight.shadowCameraNear = 0.01;
	    	spotLight.shadowCameraFar = 10000000;
	    	//spotLight.shadowBias = 0.0001;
	    	scene.add(spotLight);
	    
	    var groundMat = new THREE.MeshBasicMaterial({color: 0xf6f6f6})
	    var groundGeom = new THREE.PlaneBufferGeometry(1, 1)
	    var ground = new THREE.Mesh(groundGeom, groundMat)
			ground.receiveShadow = true;
			ground.rotation.x = -Math.PI/2;
	    	ground.renderDepth = -1;
	    	ground.scale.x = 50000;
			ground.scale.y = 50000;
	    	scene.add(ground)
	    
	    var earthRad = 6371000
	   
	    var texture = sb.models.other.globeTexture;
			texture.needsUpdate = true;
			texture.minFilter = THREE.NearestFilter
		var earthMat = new THREE.MeshBasicMaterial({map: texture, wrapAround: true})
	    var earthGeom = new THREE.SphereGeometry(earthRad, 50, 50)
	    var earth = new THREE.Mesh(earthGeom, earthMat)
	        earth.position.y = earthRad
	        earth.receiveShadow = true;
	        earth.castShadow = true;
	    
	    sb.models.other.planetEarth = earth
	    delete sb.models.other.globeTexture;
	   
	   
	    var mat = new THREE.MeshLambertMaterial({color: 0x65e1e1, transparent: true, opacity: 0.3, wrapAround: true})
	    var edgeMat = new THREE.LineBasicMaterial({color: 0xaaaaaa, linewidth: 1});
	    
	    sb.three = {
	    	renderer: renderer,
	    	camera: camera,
	    	spotLight: spotLight,
	    	scene: scene,
	    	ground: ground,
	    	material: mat,
	    	edgeMaterial: edgeMat,
	    	group: group,
	    	scalingGroup: scalingGroup
	    }
	    sb.notify({ 
			type : 'finished-setup',
			data: null
		});
	    this.destroy()
	}
	function DESTROY () {
		sb.unlisten(this.moduleID)
	}
	
	return {
		init: INIT,
		setup: SETUP,
		destroy: DESTROY
	}
}
