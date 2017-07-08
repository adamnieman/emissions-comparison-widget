function switchScalingObjects (sb) {
	
	var group;
	var scene;
	var addRemove = true;
	
	function INIT () {
		
		var button = document.getElementById("scale")
		
		sb.listen({
			listenFor: ["finished-setup"],
			moduleID: this.moduleID,
			moduleFunction: "cacheGroup"
		})
		sb.addEvent(button, "click", addOrRemove)
	}
	
	function CACHEGROUP () {
		group = sb.three.scalingGroup;
		scene = sb.three.scene;
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
		sb.removeEvent(button, "click", addOrRemove)
		group = null;
		scene = null;
		addRemove = null;
	}
	
	function addOrRemove () {
		if (group && scene) {
			if (addRemove === true){
				scene.remove(group)
			}
			else {
				scene.add(group)
				
			}
			addRemove = !addRemove
		}
	}
	
	return {
		init : INIT,
		cacheGroup: CACHEGROUP,
        destroy : DESTROY
	}
}
