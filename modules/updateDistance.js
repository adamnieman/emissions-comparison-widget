function updateDistance (sb) {
	
	function INIT () {
		sb.listen({
			listenFor: ["ready-to-draw"],
			moduleID: this.moduleID,
			moduleFunction: "calculateDistance"
		})
	}
	
	function CALCULATEDISTANCE () {
		
	}
	function DESTROY () {
		sb.unlisten(this.moduleID)
	}
	
	return {
		init: INIT,
		calculateDistance: CALCULATEDISTANCE,
		destroy: DESTROY
	}
}