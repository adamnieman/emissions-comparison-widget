function captureMouseMove (sb) {
	
	var target;
	var startDrag; 
	
	function INIT () {
		target = document.getElementById("volContainer");
		sb.addEvent(target, "mousedown", onMouseDown)
		sb.addEvent(target, "mouseup", onMouseUp)
	}
	
	function DESTROY () {
		
	}
	
	function onMouseDown (e) {
		startDrag = [e.clientX, e.clientY]
		sb.addEvent(target, "mousemove", onMouseMove)
	}
	
	function onMouseMove (e) {
		yScroll = (startDrag[1] - e.clientY)/10
	    xScroll = (e.clientX - startDrag[0])/10
	    
	    var lim = 20 
	    
	    if (xScroll > lim){
	    	xScroll = lim
	    }
	    else if (xScroll < -lim){
	    	xScroll = -lim
	    }
	    
	     if (yScroll > lim){
	    	yScroll = lim
	    }
	    else if (yScroll < -lim){
	    	yScroll = -lim
	    }
	    
	    sb.notify({ 
			type : "mouse-scroll",
			data: {xScroll: xScroll, yScroll: yScroll}
		});
	}
	
	function onMouseUp () {
		sb.removeEvent(target, "mousemove", onMouseMove)
		xScroll = 0
	 	yScroll = 0
	 	
	 	sb.notify({ 
			type : "mouse-scroll",
			data: {xScroll: xScroll, yScroll: yScroll}
		});
	}
	
	return {
		init: INIT,
		destroy: DESTROY
	}
}
