function gatherInput (sb){
	
	function INIT () {
		var submitButton = document.getElementById("submit")
		sb.addEvent(submitButton, "click", this.processInput)
	}
	
	function PROCESSINPUT () {
		
		var input = {}
			input.gas = {}
			input.gas.gasDensity = document.getElementById("Gas").value;
			input.gas.gasName = document.getElementById('Gas').options[document.getElementById('Gas').selectedIndex].text;
			
		var mass1InputValue = checkNumeric(document.getElementById("Mass1").value);
		var mass2InputValue = checkNumeric(document.getElementById("Mass2").value);
		
		if (mass1InputValue) {
			input.mass1 = {}
			input.mass1.inputValue = mass1InputValue
			input.mass1.unit = document.getElementById("Mass1Unit").value;
			input.mass1.timeUnit = document.getElementById("Mass1Per").value;
			input.mass1.kg = toKg(mass1InputValue, input.mass1.unit)
			input.mass1.volPerSecond = toVol(input.mass1.kg, input.gas.gasDensity)
			input.mass1.kgPerSecond = input.mass1.kg
			if (input.mass1.timeUnit !== "false"){
				var inputVol = input.mass1.volPerSecond
				var inputKg = input.mass1.kgPerSecond
				input.mass1.volPerSecond = toSec(inputVol, input.mass1.timeUnit)
				input.mass1.kgPerSecond = toSec(inputKg, input.mass1.timeUnit)
			
			}
			
			if (mass2InputValue) {
				input.mass2 = {}
				input.mass2.inputValue = mass2InputValue
				input.mass2.unit = document.getElementById("Mass2Unit").value;
				input.mass2.timeUnit = document.getElementById("Mass2Per").value;
				input.mass2.kg = toKg(mass2InputValue, input.mass2.unit)
				input.mass2.volPerSecond = toVol(input.mass2.kg, input.gas.gasDensity)
				input.mass2.kgPerSecond = input.mass2.kg
				if (input.mass2.timeUnit !== "false"){
					var inputVol = input.mass2.volPerSecond
					var inputKg = input.mass2.kgPerSecond
					input.mass2.volPerSecond = toSec(inputVol, input.mass2.timeUnit)
					input.mass2.kgPerSecond = toSec(inputKg, input.mass2.timeUnit)
				}
			}
		}
			
		if (input.mass1.kg > 1000000000000000000) {
	 		alert("I'm sorry! This visualisation is not designed to work for values over 1,000,000 Gigatonnes. Did you know that the total amount of carbon dioxide in earth's atmosphere is just over 3,000 Gigatonnes?")
	 	}
	 	else if (input.hasOwnProperty("mass2") &&
	 			input.mass2.kg > 1000000000000000000){
	 		alert("I'm sorry! This visualisation is not designed to work for values over 1,000,000 Gigatonnes. Did you know that the total amount of carbon dioxide in earth's atmosphere is just over 3,000 Gigatonnes?")
		}
	 	else {

	 		sb.notify({ 
				type : 'input-processed',
				data: input
			});
	 	}
	}
	
	function DESTROY () {
		sb.removeEvent(submitButton, "click", this.processInput)
	}
	
	function checkNumeric (value){
		valueToNum = parseFloat(value)
		
		if (isNaN(value) === true){
			alert("Oops! Mass values must be numeric!")
			return null;
		}
		else if (valueToNum <= 0){
			alert("Mass values must be positive numbers!")
			return null;
		}
		
		else {
			return valueToNum
		}
	}
	
	function toKg (value, unit) {
		var multiplier;
		
		switch(unit) {
	    case "kg":
	        multiplier = 1
	        break;
	    case "t":
	        multiplier = 1000
	        break;
	    case "gt":
	    	multiplier = 1000000000000
	    	break;
	   }
	   
	   return value * multiplier
	}
	
	function toVol (value, density){
		return value/density;
	}
	
	function toSec (valueKg, per) {
		var multiplier;
		
		switch(per) {
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
	   
	   return valueKg / multiplier
	}
	
	return {
		init: INIT,
		processInput: PROCESSINPUT,
		destroy: DESTROY
	}
	
}
