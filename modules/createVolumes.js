function createVolumes (sb){
	
	var baseArray;
	var input;
	var baseMass;
	
	function INIT () {
		sb.listen({
			listenFor: ["ready-to-draw"],
			moduleID: this.moduleID,
			moduleFunction: "getInput"
		})
		
		getBaseArray ()
	}
	
	function GETINPUT (data) {
		input = data;
		
		removeMeshes ()
		updateBaseArray ()
		assignBaseMass ()
		
		input.mass1.height = input.mass1.vol/(Math.pow(baseMass.sideLength, 2))
		if (input.hasOwnProperty("mass2")) {
			
			input.mass2.height = input.mass2.vol/(Math.pow(baseMass.sideLength, 2))
		}
		
		setupMeshes ()
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
	}
	
	function setupMeshes () {
		
		var heights;
		var mass1;
		var mass2;
		
		if (input.hasOwnProperty("mass2")){
			var geom1 = new THREE.BoxGeometry(baseMass.sideLength, input.mass1.height, baseMass.sideLength)
			var geom2 = new THREE.BoxGeometry(baseMass.sideLength, input.mass2.height, baseMass.sideLength)
			
			mass1 = new THREE.Mesh (geom1, sb.three.material)
			shapeOutline (mass1, baseMass.sideLength, input.mass1.height)
				mass1.position.x = -baseMass.sideLength
				mass1.position.y = input.mass1.height/2
				mass1.position.z = baseMass.sideLength
				mass1.receiveShadow = true;
				mass1.castShadow = true;
				
			mass2 = new THREE.Mesh (geom2, sb.three.material)
			shapeOutline (mass2, baseMass.sideLength, input.mass2.height)
				mass2.position.x = baseMass.sideLength
				mass2.position.y = input.mass2.height/2
				mass2.position.z = -baseMass.sideLength
				mass2.receiveShadow = true;
				mass2.castShadow = true;
				
			sb.three.group.add(mass1)
			sb.three.group.add(mass2)
			
			height = (input.mass1.height > input.mass2.height) ? input.mass1.height : input.mass2.height;
		}
		else {
			var geom1 = new THREE.BoxGeometry(baseMass.sideLength, input.mass1.height, baseMass.sideLength)
			
			mass1 = new THREE.Mesh (geom1, sb.three.material)
			shapeOutline (mass1, baseMass.sideLength, input.mass1.height)
				mass1.position.y = input.mass1.height/2
				mass1.receiveShadow = true;
				mass1.castShadow = true;
				
			sb.three.group.add(mass1)
			
			height = input.mass1.height
		}
		
		sb.notify({ 
			type : 'shapes-drawn',
			data: {sideLength: baseMass.sideLength, height: height, position: mass1.position}
		});
	}
	
	function shapeOutline (shape, wi, he) {
		var edgeGeom = new THREE.Geometry();
		edgeGeom.vertices.push(
					new THREE.Vector3( 0, 0, 0 ),
					new THREE.Vector3( 0, 0, wi ),
					new THREE.Vector3( wi, 0, wi ),
					new THREE.Vector3( wi, 0, 0 ),
					new THREE.Vector3( 0, 0, 0 ),
					new THREE.Vector3( 0, he, 0 ),
					new THREE.Vector3( 0, he, wi ),
					new THREE.Vector3( 0, 0, wi ),
					new THREE.Vector3( 0, he, wi ),
					new THREE.Vector3( wi, he, wi ),
					new THREE.Vector3( wi, 0, wi ),
					new THREE.Vector3( wi, he, wi ),
					new THREE.Vector3( wi, he, 0 ),
					new THREE.Vector3( wi, 0, 0 ),
					new THREE.Vector3( wi, he, 0 ),
					new THREE.Vector3( 0, he, 0 )
					
				);
				
		edge = new THREE.Line(edgeGeom, sb.three.edgeMaterial);
		edge.position.x = -wi/2
		edge.position.y = -he/2
		edge.position.z = -wi/2
		shape.add(edge)
	}
	
	function assignBaseMass () {
		var smallest = input.mass1.vol
		
		if (input.hasOwnProperty("mass2")){
			if (input.mass2.vol < smallest){
				smallest = input.mass2.vol
			}
		}
		
		var descrep;
		var targetBase;
		
		for (var v = 0; v < baseArray.length; v++){
			var diff = Math.abs(baseArray[v].volume-smallest)
			if (descrep === undefined){
				descrep = diff
				targetBase = baseArray[v]
			}
			else if (diff < descrep){
				descrep = diff
				targetBase = baseArray[v]
			}	
		}
		baseMass = targetBase
	}
	
	function getBaseArray () {
	 	var baseMass = [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5]
		for (var g = 1; g < 50; g++){
			var baseMass1 = Math.pow(10, g)
			var baseMass2 = baseMass1 * 5
			
			baseMass.push(baseMass1)
			baseMass.push(baseMass2)
		}
		
		baseArray = []
		
		for (var v = 0; v < baseMass.length; v++){
			baseArray.push({mass: baseMass[v]})
		}
	}
	
	function updateBaseArray () {
		for (var i = 0; i < baseArray.length; i++){
			baseArray[i].volume = toVol(baseArray[i].mass, input.gas.gasDensity)
			baseArray[i].sideLength = Math.cbrt(baseArray[i].volume)
		}
		
	}
	
	function removeMeshes () {
		
		var children = sb.three.group.children
		var length = children.length
		for (var i = 0; i < length; i++){
			sb.three.group.remove(children[0])
		}
		children = null;
		
		var scalingChildren = sb.three.scalingGroup.children 
		scalingLength = scalingChildren.length
		for (var i = 0; i < scalingLength; i++){
			sb.three.scalingGroup.remove(scalingChildren[0])
		}
		scalingChildren = null;
	}
	 
	function toVol (value, density){
		return value/density;
	}
	 
	return {
		init: INIT,
		getInput: GETINPUT,
		destroy: DESTROY
	}
	
}
