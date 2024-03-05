
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

function injectedFunction(info, dics) {
	console.log("info");
	console.log(info);
	console.log(dics);
	
	const url = info.data.url + info.selectionText;
	console.log(url);
	
	let sameOriginDics = ["FreeDict", "UrbanDict", "MerriamWebster", "Wiktionary", "Thesaurus", "MerriamWebsterT",
		"Dictionary", "LingueeEnglishSpanishDict", "MerriamWebsterL", "AmericanHeritage", "Vocabularycom",
		"WebsterNewWorld", "Wordsmyth", "Oxford", "Etymology", "UltraLingua", "OnlinePlain", "CollinsFrenchEngDict", 
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
//		iframeWrapper.setAttribute("style", style);
	
		var iframe = document.createElement("iframe");
		iframe.setAttribute("id", "__iframe_lookup");
		
		//iframeWrapper.appendChild(header);
		iframeWrapper.appendChild(iframe);

		var body = document.createElement("div");
		body.setAttribute("id", "__popup_lookup");
		body.setAttribute("style", style);

		body.appendChild(header);
		body.appendChild(iframeWrapper);
		
		document.body.appendChild(body);
		
		listbox.addEventListener("change", function() {
			iframe.setAttribute("src", listbox.selectedOptions[0].value);
		});
		close.addEventListener("click", function() {
			iframe.setAttribute("src", "about:blank");
			body.style.display = "none";
			body.parentElement.removeChild(body);
		});
		
		//document.addEventListener("keydown", escHandler);
		//iframe.contentWindow.document.addEventListener('keydown', escHandler);

		dragElement(document.getElementById("__popup_lookup"));
	}
	
	// handle esc keydown events
	function escHandler() {
		if (body.style.display == 'block') {
			body.style.display = 'none';
			//iframe.setAttribute("src", "about:blank");
		}
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
	iframe = document.getElementById("__iframe_lookup");

	var s = '<div style="margin: 40px auto; text-align: center; font-family: emoji; color: gray;">Loading...</div>';
	
	iframe.contentWindow.document.write("<html><body>" + s + "</body></html>");
	
	iframe.setAttribute("src", url);
	
}
