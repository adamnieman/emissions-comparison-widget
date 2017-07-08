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

var perOptions = [
    {
        type: 'option',
        value: 'false',
        text: 'no time period'
    },
    {
        type: 'option',
        value: 'year', 
        text: 'per year' 
    },
    { 
        type: 'option',
        value: 'day', 
        text: 'per day'
    },
    { 
        type: 'option',
        value: 'min', 
        text: 'per min'
    },
    { 
        type: 'option',
        value: 'sec', 
        text: 'per second'
    }
];

var unitOptions = [
    {
        type: 'option',
        value: 'kg',
        text: 'kg'
    },
    {
        type: 'option',
        value: 't', 
        text: 'tonnes' 
    },
    { 
        type: 'option',
        value: 'gt', 
        text: 'gigatonnes'
    }
];

var interfaceNodes = [
    {
        type: 'div',
        id: 'volContainer'
    },
    {
        type: 'div',
        id: 'infoContainer',
        children: [
            {
                type: 'div',
                id: 'controls',
                children: [
                    {
                        type: 'form',
                        children: [
                            {
                                type: 'p',
                                className: 'formRow',
                                children: [
                                    {
                                        type: 'label',
                                        for: 'Gas',
                                        text: 'Gas:'
                                    },
                                    {
                                        type: 'select',
                                        id: 'Gas',
                                        children: [
                                            {
                                                type: 'option',
                                                value: '1.98',
                                                text: 'Carbon dioxide'
                                            },
                                            {
                                                type: 'option',
                                                value: '1.14', 
                                                text: 'Carbon monoxide' 
                                            },
                                            { 
                                                type: 'option',
                                                value: '1000', 
                                                text: 'Water'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'p',
                                className: 'formRow',
                                children: [
                                    {
                                        type: 'label',
                                        for: 'MassNum',
                                        text: 'Number of masses to compare:'
                                    },
                                    {
                                        type: 'select',
                                        id: 'MassNum',
                                        children: [
                                            {
                                                type: 'option',
                                                text: '1'
                                            },
                                            {
                                                type: 'option',
                                                text: '2' 
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'div',
                                id: 'Mass1Div',
                                className: 'MassInput',
                                children: [
                                    {
                                        type: 'label',
                                        for: 'Mass1',
                                        text: 'Mass 1:'
                                    },
                                    {
                                        type: 'input',
                                        inputType: 'text',
                                        id: 'Mass1'
                                    },
                                    {
                                        type: 'select',
                                        id: 'Mass1Unit',
                                        children: unitOptions
                                    },
                                    {
                                        type: 'select',
                                        id: 'Mass1Per',
                                        children: perOptions
                                    }
                                ]
                            },
                            {
                                type: 'div',
                                id: 'Mass2Div',
                                className: 'MassInput',
                                display: false,
                                children: [
                                    {
                                        type: 'label',
                                        for: 'Mass2',
                                        text: 'Mass 2:'
                                    },
                                    {
                                        type: 'input',
                                        inputType: 'text',
                                        id: 'Mass2'
                                    },
                                    {
                                        type: 'select',
                                        id: 'Mass2Unit',
                                        children: unitOptions
                                    },
                                    {
                                        type: 'select',
                                        id: 'Mass2Per',
                                        children: perOptions
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'p',
                        children: [
                            {
                                type: 'button',
                                id: 'submit',
                                className: 'inactive',
                                text: 'Submit'
                            }
                        ]
                    },
                    {
                        type: 'p',
                        className: 'bottom',
                        children: [
                            {
                                type: 'button',
                                id: 'scale',
                                className: 'active',
                                text: 'scaling obj'
                            }
                        ]
                    }
                ]
            },
            {
                type: 'div',
                id: 'buttonContainer',
                children: [
                    {
                        type: 'button',
                        id: 'sec',
                        className: 'timescale inactive',
                        text: 'per second'
                    },
                    {
                        type: 'button',
                        id: 'min',
                        className: 'timescale inactive',
                        text: 'per minute'
                    },
                    {
                        type: 'button',
                        id: 'day',
                        className: 'timescale inactive',
                        text: 'per day'
                    },
                    {
                        type: 'button',
                        id: 'year',
                        className: 'timescale inactive',
                        text: 'per year'
                    }
                ]
            },
            {
                type: 'div',
                id: 'stats',
                children: [
                    {
                        type: 'div',
                        id: 'stats1',
                        className: 'stats'
                    },
                    {
                        type: 'div',
                        id: 'stats2',
                        className: 'stats'
                    },
                    {
                        type: 'div',
                        id: 'universalStats'
                    },
                    {
                        type: 'p',
                        id: 'downloadZip'
                    }
                ]
            }
        ]
    }
];

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

        parent.appendChild( thisElem );

        if( typeof node.children !== 'undefined' ){
            nodeToElem(thisElem, node.children);
        }

    }
}
