// setup iframe to show the popup
var __liframe = document.createElement("iframe");
__liframe.setAttribute("id", "__iframe_window");

// setup iframe container. If undefined, create one. Empty existing one, otherwise
if( iframe_container == undefined) {
	var iframe_container = document.createElement("div");
	iframe_container.setAttribute("name", "lookup_definitions_online_container");
	iframe_container.setAttribute("id", "__lookup_popup");
	iframe_container.setAttribute("title", "Click and drag to move");
	iframe_container.setAttribute("style", "background-image:url(http://cdn.sstatic.net/Img/mini-hero-bg.png);");
}else {
	iframe_container.innerHTML = "";
}

// setup styles for popup container.Parameters are set based on the
// dimensions of client area.
var __lh = window.innerHeight * 0.8 + "px"; // height 80%
var __lw = window.innerWidth * 0.8+ "px"; // width 80%
var __lt = window.innerHeight * 0.1 + "px"; // top 10%
var __ll = window.innerWidth * 0.1+ "px"; // left 10%

var __s = iframe_container.getAttribute("style");
iframe_container.setAttribute("style", __s + "padding-top:24px;cursor:crosshair;"
		+"height:"+__lh+";left:"+__ll+";width:"
		+__lw+";top:"+__lt+";z-index:16777270;");

// creating the close button
var __lclose = document.createElement("div");
__lclose.innerHTML = "X";
__lclose.setAttribute("id", "__close_lookup");

// seggregate the date sent from extension script
var __ldata = $.parseJSON(a);
var __lurl = __ldata[0];
var __lkwd = __ldata[1];
var __ldics = __ldata[2];

// create the select box to switch between dictionaries
var __lsel = document.createElement("select");
__lsel.setAttribute("id", "__lsel"); 

// add all dictionaries which are enabled by user.
for (var i=0; i < __ldics.length; i++) {
	if ( __ldics[i].func == "UrbanDict" || __ldics[i].func == "Definition" || __ldics[i].func == "" ) {
		continue;
	}
    var ov = document.createElement("option");
    ov.value = __ldics[i].url + __lkwd;
    ov.text = __ldics[i].title;
    if (ov.value == __lurl) {
    	ov.setAttribute("selected", "selected");
    }
    __lsel.appendChild(ov);
}

// add iframe and close button to the containder
iframe_container.appendChild(__liframe);
iframe_container.appendChild(__lclose);
iframe_container.appendChild(__lsel);

// add container to the document body
document.body.appendChild(iframe_container);

// set 'loading...' in the popup and then set url
__liframe.contentDocument.write("<html><body><div style='width:100%; "+
	"color: gray; text-align: center; line-height: 100%;'><i style='padding-top: 100px;"+
	"display: block;'>loading...</i></div></body></html>");
__liframe.setAttribute("src", __lurl);

// finally show it!
$("#__lookup_popup").fadeIn("1600");

// close popup by Esc press listener
$(document).keyup(function(e) {
    if (e.keyCode == 27) { // Esc
        $("#__lookup_popup").fadeOut("600", function(){
        	$("#__lookup_popup").remove();
        });
    }
});

$("#__lookup_popup").draggable();

// Close popup button click hadler
$("#__close_lookup").click(function() {
	$("#__lookup_popup").fadeOut("600", function(){
		$("#__lookup_popup").remove();
	});
});

// Other dictionaries change handler
$("#__lsel").change(function() {
	if ($(this).val() != "") { // select other dics
		__liframe.setAttribute("src", $(this).val());
	}
});
