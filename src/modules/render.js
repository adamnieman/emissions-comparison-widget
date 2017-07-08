function render (sb) {
	
	var camera;
	
	var xScroll = 0;
	var yScroll = 0;
	var distance = 200/3;
	var camRadius;
	var updateCam = false;
	
	var newCameraPosition;
	var cameraPosition;
	var cameraLookAt;
	
	function INIT () {
		sb.listen({
			listenFor: ["finished-setup"],
			moduleID: this.moduleID,
			moduleFunction: "render"
		})
		sb.listen({
			listenFor: ["mouse-scroll"],
			moduleID: this.moduleID,
			moduleFunction: "reposCam"
		})
		sb.listen({
			listenFor: ["new-camera-position"],
			moduleID: this.moduleID,
			moduleFunction: "tweenCam"
		})
		//listen for: camera position change on user scroll, distance change
	}
	
	function RENDER () {
		camera = sb.three.camera
		cameraPosition = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
		newCameraPosition = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
		camRadius = Math.sqrt(Math.pow(camera.position.x, 2) + Math.pow(camera.position.z, 2))
		cameraLookAt = new THREE.Vector3(0,0,0)
		
		document.getElementById("volContainer").appendChild(sb.three.renderer.domElement);
		renderLoop()
		
		var renderCycle = 0
		
		function renderLoop () {
			if (renderCycle === 100){
				var img = sb.three.renderer.domElement.toDataURL("image/png");
				sb.notify({ 
					type : "new-img-data",
					data: img
				});
				renderCycle = 0
			}
			renderCycle++
			
			if (xScroll != 0 ||
			 	yScroll != 0){
			 		
			 	userPositionedCamera ()
			 }
			 	
			 if (updateCam != false){
			 	scalePositionedCamera ()
			 }
				
			sb.three.renderer.render(sb.three.scene, camera);
		 	requestAnimationFrame(renderLoop);
		}
	}
	
	
	
	function REPOSCAM (data) {
		xScroll = data.xScroll;
		yScroll = data.yScroll;
		
	}
	
	function TWEENCAM (data) {
		
		cameraLookAt = data.look
		
		newCameraPosition.x = data.x;
		newCameraPosition.y = data.y;
		newCameraPosition.z = data.z;
		
		distance = (newCameraPosition.x/1.5)
		
		cameraPosition.x = camera.position.x;
		cameraPosition.y = camera.position.y;
		cameraPosition.z = camera.position.z;
		
		updateCam = 1;
		
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
		
		camera = null;
		xScroll = null;
		yScroll = null;
		distance = null;
		camRadius = null;
		updateCam = null;
		newCameraPosition = null;
		cameraPosition = null;
		cameraLookAt = null;
	}
	
	function userPositionedCamera () {
		var divisor = 1000/distance;
	 	
	 	camera.position.x += (xScroll/divisor)
	 	if (camera.position.x < 0){
	 		camera.position.x = 0;
	 	}
	 	else if (Math.pow(camera.position.x, 2) > Math.pow(camRadius, 2)){
	 		camera.position.x = camRadius
	 	}
	 	
	 	camera.position.z = Math.sqrt(Math.pow(camRadius, 2) - Math.pow(camera.position.x, 2))
	 	
	 	camera.position.y += (yScroll/divisor)
	 	
	 	if (camera.position.y < 0){
	 		camera.position.y = 0;
	 	}
	 	else if (camera.position.y > camRadius){
	 		camera.position.y = camRadius
	 	}
	 	
	 	camera.lookAt(cameraLookAt)
	}
	
	function scalePositionedCamera () {
		
		var changeX = (newCameraPosition.x - cameraPosition.x)
	 	var changeY = (newCameraPosition.y - cameraPosition.y)
	 	var changeZ = (newCameraPosition.z - cameraPosition.z)
	 	
	 	camera.position.x = easeInOutQuad (updateCam, cameraPosition.x, changeX, 60)
	 	camera.position.y = easeInOutQuad (updateCam, cameraPosition.y, changeY, 60)
	 	camera.position.z = easeInOutQuad (updateCam, cameraPosition.z, changeZ, 60)
	 	
		camRadius = Math.sqrt(Math.pow(camera.position.x, 2) + Math.pow(camera.position.z, 2))
	 	
	 	updateCam ++
	 	
	 	camera.lookAt(cameraLookAt)
	 	
	 	if (updateCam === 61){
	 		updateCam = false
	 		cameraDis = newCameraDis
	 	}
	}
	
	function easeInOutQuad (t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	 };
	
	return { 
        init : INIT,
        render: RENDER,
        reposCam: REPOSCAM,
        tweenCam: TWEENCAM,
        destroy : DESTROY
    }; 
}
