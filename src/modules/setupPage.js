function setupPage(sb) {
	
	function INIT () {
		setup()
		this.destroy();
	}
	
	function setup () {
		document.getElementById("universalStats").style.display = "none"
		document.getElementById("stats1").style.display = "none"
		document.getElementById("stats2").style.display = "none"
		
		var mainContainer = document.getElementById("volContainer");
		 if (!window.WebGLRenderingContext) {
		    volContainer.innerHTML = "<p>I'm sorry! Your browser does not currently support webGL and so this visualisation cannot be rendered. Please click <a href = 'http://get.webgl.org'>here</a> to find out more."
		    window.location = "http://get.webgl.org";
		 } 
		 else {
		    var canvas = document.createElement( 'canvas' );
		    var context = canvas.getContext("webgl");
		    if (!context) {
		       volContainer.innerHTML = "<p>I'm sorry! WebGL has failed to initialise and so this visualisation cannot be rendered. Please click <a href = 'http://get.webgl.org/troubleshooting'>here</a> to find out more."
		   
		      window.location = "http://get.webgl.org/troubleshooting";
		    }
		 }
	}
	
	function DESTROY () {
	}
	
	return { 
        init : INIT,
        destroy : DESTROY
    }; 
}
