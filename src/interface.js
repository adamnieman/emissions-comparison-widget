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

function EmissionsComparisonWidget( config ){

    this.version = '1.0';

    if( typeof config.container === 'undefined' ){
        console.warn('You must supply a container ID in the config object');
    }

    this.initInterface(config);

}

EmissionsComparisonWidget.prototype.initInterface = function( config ){

    this.config = config;

    this.container = document.getElementById(config.container);
    if( this.container === null ){
        console.warn('Element with id \'' + config.container + '\' not found');
    } 
    this.container.className = ( this.container.className + ' ecw-container' ).trim();

    nodeToElem( this.container, interfaceNodes );

    document.getElementById('MassNum').addEventListener('change', function(){
        changeHandler( this.value );
    });

};

/**
 * Recursive function that converts nested 
 * objects into DOM elements
 *
 * @param parent
 * @param node
 */
function nodeToElem( parent, node ){

    if( node.constructor === Array ){
        for(var i in node){
            nodeToElem(parent, node[i]);
        }
    } else {
        var thisElem = document.createElement( node.type );
        if( node.id ){
            thisElem.id = node.id;
        }
        if( node.className ){
            thisElem.className = node.className;
        }
        if( node.text ){
            thisElem.innerHTML = node.text;
        }
        if( node.inputType ){
            thisElem.type = node.inputType;
        }
        if( node.value ){
            thisElem.value = node.value;
        }
        if( node.display === false ){
            thisElem.style.display = 'none';
        }
        if( node.for ){
            thisElem.setAttribute('for', node.for);
        }
        if( node.min ){
            thisElem.setAttribute('min', node.min);
        }

        parent.appendChild( thisElem );

        if( typeof node.children !== 'undefined' ){
            nodeToElem(thisElem, node.children);
        }

    }
}
