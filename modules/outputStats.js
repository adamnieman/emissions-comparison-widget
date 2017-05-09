function outputStats (sb){
	
	var stats1 = document.getElementById("stats1")
	var stats2 = document.getElementById("stats2")
	var universalStats = document.getElementById("universalStats")
	
	function INIT () {
		sb.listen({
			listenFor: ["ready-to-draw"],
			moduleID: this.moduleID,
			moduleFunction: "createTextContent"
		})
	}
	
	function CREATETEXTCONTENT (data) {
		
		removePrevious (stats1)
	 	removePrevious (stats2)
	 	removePrevious (universalStats)
	 	
		
		if (stats1.style.display === "none"){
			stats1.style.display = "block";
			universalStats.style.display = "block";
		}
		
		var statsArray = []
		
		var baseWidth = Math.sqrt(data.mass1.vol/data.mass1.height)
		var baseMass = Math.pow(baseWidth, 3)*data.gas.gasDensity
			baseMass = kgConverter(baseMass)
		var gas = data.gas.gasName
		
		statsArray.push(["base mass: "+baseMass, universalStats, "p"])
		statsArray.push(["gas: "+gas, universalStats, "p"])

		
		var mass1 = data.mass1.kg
			mass1 = kgConverter(mass1)
		var volume1 = data.mass1.vol
			volume1 = volConverter(volume1)
		var dimensions1 = [baseWidth, data.mass1.height, baseWidth]
			dimensions1 = dimensConverter (dimensions1[0], dimensions1[1], dimensions1[2])
		
		statsArray.push(["shape 1", stats1, "h2"])
		statsArray.push(["mass: "+mass1, stats1, "p"])
		statsArray.push(["volume: "+volume1, stats1, "p"])
		statsArray.push(["dimensions: "+dimensions1, stats1, "p"])
		
		var mass2;
		var volume2;
		var dimensions2;
		
		if (data.hasOwnProperty("mass2")){
			
			stats2.style.display = "block";
			
			mass2 = data.mass2.kg
			mass2 = kgConverter(mass2)
			volume2 = data.mass2.vol
			volume2 = volConverter(volume2)
			dimensions2 = [baseWidth, data.mass2.height, baseWidth]
			dimensions2 = dimensConverter (dimensions2[0], dimensions2[1], dimensions2[2])
			
			statsArray.push(["shape 2", stats2, "h2"])
			statsArray.push(["mass: "+mass2, stats2, "p"])
			statsArray.push(["volume: "+volume2, stats2, "p"])
			statsArray.push(["dimensions: "+dimensions2, stats2, "p"])
		}
		else {
			stats2.style.display = "none";
		}
		
		var text;
	 	
	 	for (var k = 0; k < statsArray.length; k++){
	 		var para = document.createElement(statsArray[k][2])
	 		para.innerHTML = statsArray[k][0];
	 		if (text === undefined){
	 			text = statsArray[k][0] + "\r";
	 		}
	 		else {
	 			text = text.concat(statsArray[k][0]+ "\r")
	 		}
	 		statsArray[k][1].appendChild(para); 
	 	}
	 	
	 	sb.notify({ 
			type : 'new-text-data',
			data: text
		});
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
		stats1 = null;
		stats2 = null;
		universalStats = null;
	}
	
	function removePrevious (div){
		if (div.childNodes){
			var count = div.childNodes.length
		 	for (var k = 0; k < count; k++){
		 		div.removeChild(div.childNodes[0])
			 		
		 	}
	 	}
	 }
	
	function kgConverter (mass) {
		var amount;
		var unit;
		
		if (mass >= 1000000000000){
			amount = mass/1000000000000
			unit = "Gt"
		}
		else if (mass >= 1000) {
			amount = mass/1000
			unit = "t"
		}
		else {
			amount = mass
			unit = "kg"
		}
		amount = addCommas((Math.round(amount*100))/100)
		return amount +" "+ unit
	}
	
	function volConverter (vol) {
		var amount;
		var unit;
		
		if (vol >= 1000000000){
			amount = Math.round((vol/1000000000)*100)/100
			unit = "km<sup>3</sup>"
		}
		else {
			amount = Math.round(vol*100)/100
			unit = "m<sup>3</sup>"
		}
		
		amount = addCommas(amount)
		return amount +" "+ unit
	}
	
	function dimensConverter (num1, num2, num3) {
		var highestDimen = Math.max(num1, num2, num3)
		
		var amounts = []
		var unit;
		
		if (highestDimen >= 1000) {
			amounts[0] = num1/1000
			amounts[1] = num2/1000
			amounts[2] = num3/1000
			unit = "km"
		}
		else if (highestDimen < 1){
			amounts[0] = num1 * 100
			amounts[1] = num2 * 100
			amounts[2] = num3 * 100
			unit = "cm"
		}
		else {
			amounts[0] = num1
			amounts[1] = num2
			amounts[2] = num3
			unit = "m"
		}
		
		return addCommas(Math.round((amounts[0])*100)/100) +" x "+addCommas(Math.round((amounts[1])*100)/100)+" x "+addCommas(Math.round((amounts[2])*100)/100)+" "+unit
	}
	
	return {
		init: INIT,
		createTextContent: CREATETEXTCONTENT,
		destroy: DESTROY
	}
	
}
