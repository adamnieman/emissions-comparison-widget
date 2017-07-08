function changeValuesForTimescale (sb) {
	
	var input = null;
	var timescaleButtons;
	var secondButton = document.getElementById("sec")
	
	function INIT () {
		timescaleButtons = document.getElementsByClassName("timescale")
		
		sb.listen({
			listenFor: ["input-processed"],
			moduleID: this.moduleID,
			moduleFunction: "getNewInput"
		})
		
		for (var i = 0; i < timescaleButtons.length; i++){
			sb.addEvent(timescaleButtons[i], "click", calculateValues)
		}
		
	}
	
	function GETNEWINPUT (data) {
		input = data;
		calculateValues()
	}

	function calculateValues () {
		if (input){

			var timescaleIndicator;
			if (this.id) {
				onOffSet (this, "timescale")
				timescaleIndicator = this.id
			}
			else {
				onOffSet (secondButton, "timescale")
				timescaleIndicator = "sec";
			}
			
			if (input.hasOwnProperty("mass1")){
				if (input.mass1.timeUnit === "false"){
					input.mass1.vol = input.mass1.volPerSecond
					input.mass1.kg = input.mass1.kgPerSecond
					
				}
				else {
					input.mass1.vol = timescaleMultiplier(input.mass1.volPerSecond, timescaleIndicator)
					input.mass1.kg = timescaleMultiplier(input.mass1.kgPerSecond, timescaleIndicator)
					
				}
			}
			
			if (input.hasOwnProperty("mass2")){
				if (input.mass2.timeUnit === "false"){
					input.mass2.vol = input.mass2.volPerSecond
					input.mass2.kg = input.mass2.kgPerSecond
				}
				else {
					input.mass2.vol = timescaleMultiplier(input.mass2.volPerSecond, timescaleIndicator)
					input.mass2.kg = timescaleMultiplier(input.mass2.kgPerSecond, timescaleIndicator)
				}
			}


			
			sb.notify({ 
				type : "ready-to-draw",
				data: input
			});
		}
	}
	
	/*function CALCULATEVALUES () {
		if (input){
			var timescaleIndicator = "sec"
			if (this.id) {
				timescaleIndicator = this.id
			}
			if (input.hasOwnProperty("mass1")){
				input.mass1.vol = timescaleMultiplier(input.mass1.volPerSecond, timescaleIndicator)
			}
			if (input.hasOwnProperty("mass2")){
				input.mass2.vol = timescaleMultiplier(input.mass2.volPerSecond, timescaleIndicator)
			}
			
			sb.notify({ 
				type : "ready-to-draw",
				data: input
			});
		}
	}*/
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
		
		for (var i = 0; i < timescaleButtons.length; i++){
			sb.removeEvents(timescaleButtons[i], "click", this.calculateValues)
		}
		
		input = null;
		timescaleButtons = null;
	}
	
	function timescaleMultiplier (volPerSec, time) {
		
		var multiplier;
		
		switch(time) {
	    case "sec":
	        multiplier = 1
	        break;
	    case "min":
	        multiplier = 60
	        break;
	    case "day":
	    	multiplier = 86400
	    	break;
	    case "year":
	    	multiplier = 31556900
	    	break;
	   }
	   
	   return volPerSec * multiplier
	}
	
	return {
		init: INIT,
		getNewInput: GETNEWINPUT,
		destroy: DESTROY
	}
}
