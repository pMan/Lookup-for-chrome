
// setup iframe to show the popup
var iframe = document.createElement("iframe");
iframe.setAttribute("class", "iframe_window");

// setup iframe container. If undefined, create one. Empty existing one, otherwise
if( iframe_container == undefined) {
	var iframe_container = document.createElement("div");
	iframe_container.setAttribute("name", "lookup_definitions_online_container");
	iframe_container.setAttribute("class", "lookup_popup");
}else {
	iframe_container.innerHTML = "";
}

// setup styles for popup container. Popup height is 60% of client area height and
// left is 10% of client area width
var height = window.innerHeight * 0.6;
var left = window.innerWidth * 0.1;
iframe_container.setAttribute("style", "height:"+height+"px;left:"+left+"px;z-index:16777270;");

// creating the close button
var close = document.createElement("div");
close.innerHTML = "Close";
close.setAttribute("class", "close");

// add iframe and close button to the containder
iframe_container.appendChild(iframe);
iframe_container.appendChild(close);

// add container to the document body
document.body.appendChild(iframe_container);

// set 'loading...' in the popup and then set url
iframe.contentDocument.write("<html><body><div style='margin:40px auto; "+
	"display:block; color: gray;'><i>loading...</i></div></body></html>");
iframe.setAttribute("src", url);

// finally show it!
$(".lookup_popup").fadeIn("1600");

// close button action
$(document).keyup(function(e) {
    if (e.keyCode == 27) { // Esc
        $(".lookup_popup").fadeOut("600", function(){
        	$(".lookup_popup").remove();
        });
    }
});

$(".close").click(function(){
	$(".lookup_popup").fadeOut("600", function(){
		$(".lookup_popup").remove();
	});
});

