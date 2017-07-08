function onAndOff (button){
	
	var classes = button.classList;
	
	for (var i = 0; i < classes.length; i++){
		if (classes[i] === "inactive"){
			classes.remove("inactive")
			classes.add("active")
		}
		else if (classes[i] === "active"){
			classes.remove("active")
			classes.add("inactive")
		}
	}
}

function onOffSet (button, className){
	var buttonArray = document.getElementsByClassName(className)

	
	for (var i = 0; i < buttonArray.length; i++){
		var classes = buttonArray[i].classList
		for (var j = 0; j < classes.length; j++){
			if (classes[j] === "active"){
				classes.remove("active")
				classes.add("inactive")
			}
		}
	}
	
	for (var m = 0; m < button.classList.length; m++){
		if (button.classList[m] === "inactive"){
			button.classList.remove("inactive")
			button.classList.add("active")
		}
	}
	
}

function changeClass (button){
	var allButtons = document.getElementsByClassName("quantityButton");
	
	for (var i = 0; i < allButtons.length; i++){
			allButtons[i].classList.remove("active");
			allButtons[i].classList.add("inactive");
		}
	button.classList.remove("inactive")
	button.classList.add("active")
}

function changeHandler (value){
		var massNum = parseFloat(value)
	
		var allMassInputs = document.getElementsByClassName("MassInput")
		
		for (var i = 0; i < allMassInputs.length; i++){
			var element = allMassInputs[i];
			element.style.display = "none";
			document.getElementById("Mass"+(i+1)).value = ""
		}
		
		for (var i = 1; i < massNum + 1; i++){
			var id = "Mass"+i+"Div";
			var element = document.getElementById(id)
			element.style.display = "block"
		}
	
}
