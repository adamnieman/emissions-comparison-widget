function pageResize (sb) {
	
	var whRatio = 1.5
	
	function INIT () {
		sb.addEvent(window, "resize", this.resize)
	}
	
	function RESIZE () {
		outputWidth = window.innerWidth - 450
	 	if (outputWidth > 900){
	 		outputWidth = 900
	 	}
	 	outputHeight = outputWidth/whRatio
	 	sb.three.renderer.setSize(outputWidth, outputHeight);
	}
	
	function DESTROY () {
		sb.removeEvent(window, "resize", this.resize)
		whRatio = null;
	}
	
	return {
		init: INIT,
		resize: RESIZE,
		destroy: DESTROY
	}
}
