Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};

function changeMaterial (childGroup, material) {
			   	
	for (var w = 0; w < childGroup.length; w++){
		if (childGroup[w].material){
			 childGroup[w].castShadow = true;
	    	 childGroup[w].receiveShadow = true;
			 childGroup[w].material = material
		}
	    else {
			 changeMaterial (childGroup[w].children, material)
		}
	}
}

function makeCorrectSize (object, correctHeight){
	        	
	var bBox = new THREE.Box3().setFromObject(object);
	var currentHeight = bBox.max.y - bBox.min.y
	var scale = (1/currentHeight) * correctHeight		
			    
	object.scale.set(scale, scale, scale);
	object.position.x = 0;
	object.position.y = 0;
	object.position.z = 0;
			
}

function addCommas (nStr)
	{
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}