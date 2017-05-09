function updateCameraPosition (sb){
	
	var distance;
	var camera;
	var spotLight;
	var ground;
	
	function INIT () {
		sb.listen({
			listenFor: ["shapes-drawn"],
			moduleID: this.moduleID,
			moduleFunction: "newCameraPos"
		})
	}
	
	function NEWCAMERAPOS (data) {
		if (!camera) {
			camera = sb.three.camera;
			spotLight = sb.three.spotLight;
			ground = sb.three.ground;
		}
		
		distance = ((data.sideLength * 3) > data.height) ? (data.sideLength * 3) : data.height;
		
		camera.near = distance/3;
		camera.far = distance*500
		spotLight.shadowCameraNear = distance/3;
		spotLight.shadowCameraFar = distance*500;
		spotLight.shadowCamera.near = spotLight.shadowCameraNear;
		spotLight.shadowCamera.far = spotLight.shadowCameraFar;
		spotLight.shadowCamera.updateProjectionMatrix();
		camera.updateProjectionMatrix()
		
		ground.scale.x = distance*500;
		ground.scale.y = distance*500;
		
		ground.position.y = -(distance/100)
		if (ground.position.y > -0.001){
			ground.position.y = -0.001
		}
		
		var look = new THREE.Vector3(0, data.height/2, 0)
		
		var camDis = distance;
		
		var x = camDis*1.5
		var y = (camDis*1.5)/2
		var z = camDis*1.5
		
		if (camDis < 0.3){
			x = 0.3
			y = 0.15
			z = 0.3
		}
		
		newCameraDis = {x: x, y: y, z: z, look: look}
		spotLight.position.set(x*2, x*2, y*2)
		
		sb.notify({ 
			type : 'new-camera-position',
			data: newCameraDis
		});
		
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
	}
	
	return {
		init: INIT,
		newCameraPos: NEWCAMERAPOS,
		destroy: DESTROY
	}
	
}
