function handleScalingObjects (sb) {
	
	var distance = 0
	var frontOrBehind = 1
	
	var colladaModels;
	var otherModels;
	
	function INIT () {
		sb.listen({
			listenFor: ["shapes-drawn"],
			moduleID: this.moduleID,
			moduleFunction: "changeObject"
		})
		sb.listen({
			listenFor: ["finished-setup"],
			moduleID: this.moduleID,
			moduleFunction: "cacheObjects"
		})
	}
	
	function CACHEOBJECTS () {
		colladaModels = sb.models.colladaModels;
		otherModels = sb.models.other;
	}
	
	function CHANGEOBJECT (data) {
		distance = data.sideLength
		var object;
		
		if (data.height < 0.4){
	 		object = colladaModels.teacup
	 		positionObj (0.2, data.height)
	 	}
	 	else if (data.height < 35){
	 		object = colladaModels.human
	 		positionObj (1.7, data.height)
	 	}
	 	else if (data.height < 300){
	 		object = colladaModels.statueOfLiberty
	 		positionObj (90, data.height)
	 	}
	 	else if (data.height < 800){
	 		object = colladaModels.eiffelTower
	 		positionObj (300, data.height)
	 	}
	 	else if (data.height < 6000) {
	 		object = colladaModels.burjKhalifa
	 		positionObj (900, data.height)
	 	}
	 	else if (data.height <80000){
	 		object = otherModels.mountEverest
	 		positionObj (10000, data.height)
	 	}
	 	else {
	 		object = otherModels.planetEarth
	 		positionObj (60000000, data.height)
	 	}
	 	var bBox = new THREE.Box3().setFromObject(object);
		var currentWidth = bBox.max.x - bBox.min.x
		var widthAdd = 0;
		
		if (currentWidth > distance){
			widthAdd = currentWidth/2
		}
	 	
	 	object.position.x = data.position.x + ((0.1+distance) * frontOrBehind)  + (widthAdd * frontOrBehind)
	 	object.position.z = data.position.z + ((0.1 + distance/2) * frontOrBehind)  + (widthAdd * frontOrBehind)
	 	
	 	
	 	sb.three.scalingGroup.add(object)
		
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
		distance = null;
		frontOrBehind = null;
		colladaModels = null
		otherModels= null;
	}
	 	
	function positionObj (value, maxHeight) {
	 	if (maxHeight < value){
	 		frontOrBehind = -1
	 	}
	 	else {
	 		frontOrBehind = 1
	 	}
	}
	
	return {
		init : INIT,
		cacheObjects: CACHEOBJECTS,
        changeObject: CHANGEOBJECT,
        destroy : DESTROY
	}
}
