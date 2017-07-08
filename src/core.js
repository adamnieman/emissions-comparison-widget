window.onload = function () {
	init()
}

var core = function (sandBox) {
	var modules = {}
	
	return {
		register: function (moduleID, creator) {
			modules[moduleID] = {
				creator: creator,
				instance: null
			};
		},
		start: function (moduleID) {
			modules[moduleID].instance = modules[moduleID].creator(sandBox);
			modules[moduleID].instance.moduleID = moduleID
			modules[moduleID].instance.init()
		},
		end: function (moduleID) {
			var module = modules[moduleID];
			if (module.instance){
				module.instance.destroy()
				module.instance = null;
			}
		},
		startAll: function () {
			for (var moduleID in modules){
				if (modules.hasOwnProperty(moduleID)){
					this.start(moduleID)
				}
			}
		},
		endAll: function () {
			for (var moduleID in modules){
				if (modules.hasOwnProperty(moduleID)){
					this.end(moduleID)
				}
			}
		},

		modules: modules
	}
}

function init () {
	
	var sandBox = {
		
		basicInfo: {
			w: 500,
			h: 500
		},
		addEvent: function (target, event, func) {
			target.addEventListener(event, func)
		},
		removeEvent: function (target, event, func) {
			target.removeEventListener(event, func)
		},
		notify : function (evt) {
			//console.log(evt) 
			for (var i = 0; i < this.listening.length; i++){
				if (evt.type === this.listening[i].type){
					
					var targetModuleID = this.listening[i].moduleID
					var targetModuleFunction = this.listening[i].moduleFunction
					
					if (CORE.modules[targetModuleID]){
						if (CORE.modules[targetModuleID].instance[targetModuleFunction]){
							CORE.modules[targetModuleID].instance[targetModuleFunction](evt.data)
						}
					}
				}
			}
		},
		listen: function (evts) {
			for (var i = 0; i <evts.listenFor.length; i++){
				this.listening.push({
					type: evts.listenFor[i], 
					moduleID: evts.moduleID, 
					moduleFunction: evts.moduleFunction
				})
			
			}
		},
		unlisten: function (moduleID){
			for (var i = 0; i < this.listening.length; i++){
				if (this.listening[i].moduleID === moduleID){
					this.listening.splice(i, 1)
				}
			}
		},
		listening: []
		
	}
	
	var CORE = core(sandBox)
		CORE.register("mod000", setupPage)
		CORE.register("mod001", loadColladaModels)
		CORE.register("mod002", setupThreeScene)
		CORE.register("mod003", render)
		CORE.register("mod004", captureMouseMove)
		CORE.register("mod005", gatherInput)
		CORE.register("mod006", createVolumes)
		CORE.register("mod007", pageResize)
		CORE.register("mod008", changeValuesForTimescale)
		CORE.register("mod009", updateCameraPosition)
		CORE.register("mod010", handleScalingObjects)
		CORE.register("mod011", createEverest)
		CORE.register("mod012", switchScalingObjects)
		CORE.register("mod013", makeZipFile)
		CORE.register("mod014", outputStats)
		
	CORE.startAll()
	
	sandBox.addEvent(window, 'beforeunload', unload)
	
	function unload () {
		CORE.endAll()
		sandBox.removeEvent(window, 'beforeunload', unload)
	}
	
}
