var LDO = {
	
	init: function() {
		
		// setup iframe to show the popup
		var iframe = document.createElement("iframe");
		iframe.setAttribute("id", "ldo_iframe");

		var iframeWrapper = document.getElementById("ldo_popup");
		
		// setup iframe container. If undefined, create one. Empty existing one, otherwise
		if( iframeWrapper == undefined) {
			var iframeWrapper = document.createElement("div");
			iframeWrapper.setAttribute("name", "lookup_definitions_online_container");
			iframeWrapper.setAttribute("id", "ldo_popup");
			iframeWrapper.setAttribute("title", "Click and drag to move");
			
			
			// setup styles for popup container.Parameters are set based on the
			// dimensions of client area.
			var top = window.innerHeight * 0.1 + "px"; // top 10%
			var left = window.innerWidth * 0.1+ "px"; // left 10%
			var height = window.innerHeight * 0.8 + "px"; // height 80%
			var width = window.innerWidth * 0.8+ "px"; // width 80%

			var style = "height:"+height+";left:"+left+";width:"+width+";top:"+top +
				";background-image:url(http://cdn.sstatic.net/Img/mini-hero-bg.png);" +
				"padding-top:24px;cursor:move;z-index:16777270;position:fixed;";
			iframeWrapper.setAttribute("style", style);

		} else {
			iframeWrapper.innerHTML = "";
		}

		// creating the close button
		var close = document.createElement("div");
		close.innerHTML = "X";
		close.setAttribute("id", "__close_lookup");

		// creating the title of the popup
		var titil = document.createElement("span");
		titil.innerHTML = "<u>Lookup Definitions Online by pMan</u>";
		titil.setAttribute("id", "__title_lookup");
		
		// seggregate the date sent from extension script
		var info = $.parseJSON(a);
		var url = info[0];
		var kwd = info[1];
		var dics = info[2];

		// create the select box to switch between dictionaries
		var listbox = document.createElement("select");
		listbox.setAttribute("id", "dics_listbox"); 

		// add all dictionaries which are enabled by user.
		for (var i=0; i < dics.length; i++) {
			if ( dics[i].func == "UrbanDict" || dics[i].func == "Definition" || 
				dics[i].func == "Infoplease" || dics[i].func == "Etymology" || dics[i].func == "" ) {
				continue;
			}
			var ov = document.createElement("option");
			ov.value = dics[i].url + kwd;
			ov.text = dics[i].title;
			if (ov.value == url) {
				ov.setAttribute("selected", "selected");
			}
			listbox.appendChild(ov);
		}

		// add iframe and close button to the containder
		iframeWrapper.appendChild(titil);
		iframeWrapper.appendChild(iframe);
		iframeWrapper.appendChild(close);
		iframeWrapper.appendChild(listbox);

		// add container to the document body
		document.body.appendChild(iframeWrapper);

		// set 'loading...' in the popup and then set url
		iframe.contentDocument.write("<html><body><div style='width:100%; "+
			"color: gray; text-align: center; line-height: 100%;'><i style='padding-top: 100px;"+
			"display: block;'>loading...</i></div></body></html>");
		iframe.setAttribute("src", url);
		
		// finally show it!
		$("#ldo_popup").fadeIn("1600");
		
		LDO.attachHandlers(iframe);
	},
	
	attachHandlers: function(iframe) {
		// make popup draggable
		LDO.makeDraggable();
		
		// close popup by Esc press listener
		$(document).keyup(function(e) {
			if (e.keyCode == 27) { // Esc
				LDO.close();
			}
		});
		
		// Close popup button click hadler
		$("#__close_lookup").click(function() {
			LDO.close();
		});
		
		// Other dictionaries change handler
		$("#dics_listbox").change(function() {
			LDO.updatePopup(this, iframe);
		});
	},
	
	close: function() {
		$("#ldo_popup").fadeOut("600", function(){
			$("#ldo_popup").remove();
		});
	},
	
	makeDraggable: function() {
		$("#ldo_popup").draggable({
			iframeFix: true,
			drag: function(event, ui) {
		        var mult = 3;
		        var top = ui.position.top*mult;
		        var left = ui.position.left*mult;
				
		        $(ui).css({
		            top: top + "px;",
		            left: left + "px;"
		        });
		        
            }
        });
	},
	
	updatePopup: function(select, iframe) {
		if (select.value != "") {
			iframe.setAttribute("src", select.value);
		}
	}
};

LDO.init();
