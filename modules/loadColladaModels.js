function loadColladaModels (sb) {
	
	function INIT () {
		this.loadModels();
		this.destroy();
	}
	
	function LOADMODELS () {
		var objMat = new THREE.MeshBasicMaterial({color: 0x888888})
		
		var objArray = []
		
		var loader1 = new THREE.ColladaLoader();
		var loader2 = new THREE.ColladaLoader();
		var loader3 = new THREE.ColladaLoader();
		var loader4 = new THREE.ColladaLoader();
		var loader5 = new THREE.ColladaLoader();
		
			loader1.load("assets/3d/teacup.dae", function
			(result) {
				var teacup = result.scene.children[0].children[0].clone();
				teacup.rotation.x = -Math.PI/2
				teacup.rotation.z = Math.PI/4
				objArray.push(teacup)
				
				loader2.load("assets/3d/human.dae", function
				(result) {
					var human = result.scene.children[0].children[0].clone();
					human.rotation.x = -Math.PI/2
					objArray.push(human)
					
					loader3.load("assets/3d/liberty.dae", function
					(result) {
						var liberty = result.scene.children[0].children[0].clone();
						liberty.rotation.x = -Math.PI/2
						objArray.push(liberty)
						
						loader4.load("assets/3d/eiffel.dae", function
						(result) {
							var eiffel = result.scene.children[0].children[0].clone();
							eiffel.rotation.x = -Math.PI/2
							objArray.push(eiffel)
							
							loader5.load("assets/3d/burj.dae", function
							(result) {
								var burj = result.scene.children[0].children[0].clone();
								burj.rotation.x = -Math.PI/2
								objArray.push(burj)
								
									var terrainLoader2 = new THREE.TerrainLoader();
										terrainLoader2.load('lowresEv.bin', function(data) {
									var everestData = data
									
									var heightArray = [0.1, 1.7, 93, 301, 830]
									for (var v = 0; v < objArray.length; v++){
										changeMaterial (objArray[v].children, objMat)
										makeCorrectSize (objArray[v], heightArray[v])
										objArray[v].receiveShadow = true;
	        							objArray[v].castShadow = true;
									}
									var texture = THREE.ImageUtils.loadTexture("svgmapbiggest.svg", {}, function() {
		    							
		    							sb.models = {colladaModels: {
																		teacup: teacup,
																		human: human,
																		statueOfLiberty: liberty,
																		eiffelTower: eiffel,
																		burjKhalifa: burj
																	},
													other: {
																mountEverest: everestData,
																globeTexture: texture
															}
													}
												
										sb.notify({ 
							                type : 'finished-load',
							                data: null
							            });
							            
						            });
											
								});
										
							});
								
						});
						
					});
					
				});
				
			});
	}
	
	function TESTLISTEN () {
		console.log("SUCCESS!")
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
	}
	
	return { 
        init : INIT,
        loadModels: LOADMODELS,
        testListen: TESTLISTEN,
        destroy : DESTROY
    }; 
}
