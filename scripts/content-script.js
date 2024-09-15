/**
 * make an element draggable
 * @param elmnt element to drag
 */
function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		//e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

// handle esc key events
function escHandler(e) {
	let popup = document.getElementById("__popup_lookup");
	if (popup != null && popup.style.display == 'block') {
		popup.style.display = 'none';
	}
}

/**
 * executes when a context menu item is clicked
 * @param {*} info 
 * @param {*} dics 
 * @returns 
 */
function injectedFunction(info, dics) {
	console.log("info");
	console.log(info);
	console.log(dics);
	
	const url = info.data.url + info.selectionText;
	
	// these are allowed in iframe
	let sameOriginDics = ["FreeDict", "UrbanDict", "MerriamWebster", "Wiktionary", "Thesaurus", "MerriamWebsterT",
		"Dictionary", "LingueeEnglishSpanishDict", "MerriamWebsterL", "AmericanHeritage",
		"WebsterNewWorld", "Wordsmyth", "Etymology", "UltraLingua", "OnlinePlain", "CollinsFrenchEngDict", 
		"LingueeEnglishJapaneseDict"];
	
	if (sameOriginDics.indexOf(info.data.func) < 0) {
		window.open(info.data.url);
		return;
	}
	var body = document.getElementById("__popup_lookup");

	if (body == null) {
		// creating the close button
		var close = document.createElement("div");
		close.innerHTML = "X";
		close.setAttribute("id", "__close_lookup");

		// creating the title of the popup
		var title = document.createElement("div");
		title.innerHTML = "Lookup Definitions Online";
		title.setAttribute("id", "__title_lookup");
		
		// create the select box to switch between dictionaries
		var listbox = document.createElement("select");
		listbox.setAttribute("id", "__dics_lookup_select"); 

		document.body.appendChild(listbox);
		
		var sel = document.createElement("div");
		sel.setAttribute("id", "__dics_lookup");
		sel.appendChild(listbox);
		
		var header = document.createElement("div");
		header.setAttribute("id", "__header_lookup");
		
		header.appendChild(sel);
		header.appendChild(title);
		header.appendChild(close);
		
		
		var popup_wrapper = document.createElement("div");
		popup_wrapper.setAttribute("id", "ldo_popup_wrapper");
		
		var iframeWrapper = document.createElement("div");
		//iframeWrapper.setAttribute("name", "lookup_definitions_online_container");
		iframeWrapper.setAttribute("id", "__iframe_wrapper__lookup");
		iframeWrapper.setAttribute("title", "Click and drag to move");
		
		
		// setup styles for popup container.Parameters are set based on the
		// dimensions of client area.
		var top = window.innerHeight * 0.1 + "px"; // top 10%
		var left = window.innerWidth * 0.1+ "px"; // left 10%
		var height = window.innerHeight * 0.8 + "px"; // height 80%
		var width = window.innerWidth * 0.8+ "px"; // width 80%

		var style = "height:"+height+";left:"+left+";width:"+width+";top:"+top +"";
			//";z-index:16777270;";
			//iframeWrapper.setAttribute("style", style);
	
		var body = document.createElement("div");
		body.setAttribute("id", "__popup_lookup");
		body.setAttribute("style", style);

		body.appendChild(header);
		body.appendChild(iframeWrapper);
		
		document.body.appendChild(body);
		
		listbox.addEventListener("change", function() {
			// setting iframe src won't work because of security policies, so recreate it
			recreateIframe(iframeWrapper);
			iframe.setAttribute("src", listbox.selectedOptions[0].value);
		});

		close.addEventListener("click", function() {
			iframe.setAttribute("src", "about:blank");
			body.style.display = "none";
			body.parentElement.removeChild(body);
		});
		
		document.addEventListener("keyup", escHandler);
		//iframe.contentWindow.document.addEventListener('keydown', escHandler);

		dragElement(document.getElementById("__popup_lookup"));

		/*
		// close popup by Esc press listener
		$(document).keyup(function(e) {
			if (e.keyCode == 27) { // Esc
				LDO.close();
			}
		});
		*/
	}

	// clear list and ad new options
	listbox = document.getElementById("__dics_lookup_select");
	listbox.options.length = 0;
	for (var i=0; i < dics.length; i++) {
		if (sameOriginDics.indexOf(dics[i].func) < 0)
			continue;
		
		let ov = document.createElement("option");
		ov.value = dics[i].url + info.selectionText;
		ov.text = dics[i].title;
		if (ov.value == url) {
			ov.setAttribute("selected", "selected");
		}
		listbox.appendChild(ov);
	}

	body.style.display = "block";
	recreateIframe(document.getElementById("__iframe_wrapper__lookup"));
	iframe = document.getElementById("__iframe_lookup");

	let loadingHtml = '<html><body><div style="margin: 40px auto; text-align: center; font-family: emoji; color: gray;">Loading...</div></body></html>';
	iframe.contentWindow.document.write(loadingHtml);
	iframe.setAttribute("src", url);	
}

recreateIframe = function(iframeWrapper) {
	for (const iframe of iframeWrapper.children) {
		iframeWrapper.removeChild(iframe);
	}
	
	iframe = document.createElement("iframe");
	iframe.setAttribute("id", "__iframe_lookup");
	
	try {
		iframe.contentWindow.document.addEventListener('keyup', escHandler);
	} catch(err) {
		console.info(err);
	}
	//iframeWrapper.appendChild(header);
	iframeWrapper.appendChild(iframe);
}