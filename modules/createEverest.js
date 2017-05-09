function createEverest (sb) {
	
	function INIT () {
		sb.listen({
			listenFor: ["finished-load"],
			moduleID: this.moduleID,
			moduleFunction: "buildEverestFromArray"
		})
	}
	
	function BUILDEVERESTFROMARRAY () {
		
		var data = sb.models.other.mountEverest;
		
		var faceMaterials = []
	 
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		faceMaterials.push (new THREE.MeshBasicMaterial({color: 0xdddddd}));
		faceMaterials.push (new THREE.MeshBasicMaterial({color: 0xdddddd}));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b}));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b}));
		faceMaterials.push (new THREE.MeshBasicMaterial({ color: 0x9c7b4b }));
		
		var faceMaterial = new THREE.MeshFaceMaterial(faceMaterials);
	       
		var cubeGeom = new THREE.BoxGeometry(20000, 2, 20000, 99, 1, 99);
		var expEv = new THREE.Mesh(cubeGeom, faceMaterial);
		expEv.castShadow = true;
	    expEv.receiveShadow = true;
		expEv.position.x = 0
		expEv.position.y = 1
		expEv.position.z =0
		
		allVertices = expEv.geometry.vertices;
		verticesArray = []
		
		for (var l = 0; l < allVertices.length; l++){
			if (allVertices[l].y ===1){
				verticesArray.push(allVertices[l])
			}
		}
	
		verticesArray.sort(function(a, b) {
	      if (a.z === b.z) return a.x > b.x ? 1 : -1;
	      if (a.z > b.z) return 1;
	      return -1;
	
	
		});
			
		for(var m = 0; m < data.length; m++){
			var dataPoint = data[m]
		    	
			verticesArray[m].y = dataPoint;
		    	
		}
		   
		sb.models.other.mountEverest = expEv 
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
	}
	
	return { 
        init : INIT,
        buildEverestFromArray: BUILDEVERESTFROMARRAY,
        destroy : DESTROY
    }; 
}
