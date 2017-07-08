function makeZipFile (sb) {
	
	var download = document.getElementById("downloadZip")
	var outputCount = 0;
	
	var img;
	var text;
	
	function INIT () {
		sb.listen({
			listenFor: ["new-img-data"],
			moduleID: this.moduleID,
			moduleFunction: "newImgData"
		})
		sb.listen({
			listenFor: ["new-text-data"],
			moduleID: this.moduleID,
			moduleFunction: "newTextData"
		})
		sb.addEvent(download, "click", updateOutputCount)
	}
	
	function NEWIMGDATA (data) {
		
		img = data.substr(data.indexOf(",") + 1);
		if (text) {
			makeZip();
		}
	}
	
	function NEWTEXTDATA (data) {
		
		text = data
		
		if (img) {
			makeZip();
		}
		
	}
	
	function DESTROY () {
		sb.unlisten(this.moduleID)
		sb.removeEvent(download, "click", updateOutputCount)
		download = null;
		outputCount = null;
		img = null;
		text = null;
	}
	
	
	function makeZip () {
		
		var zip = new JSZip();
		zip.file("visual-data-output.png", img, {base64: true});
		zip.file("data-output.txt", text)
	
		var content = zip.generate({type:"blob"});
		
		download.innerHTML = "<a id = 'downloadLink' href="+window.URL.createObjectURL(content)+" download = 'visualisation-"+outputCount+".zip'>Click here to download your visualisation!</a>"
		
	}
	
	function updateOutputCount () {
		outputCount++
	}
	
	
	return {
		init : INIT,
		newImgData: NEWIMGDATA,
		newTextData: NEWTEXTDATA,
        destroy : DESTROY
	}
}
