document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = e.keyCode;
    alert(charCode);
        getSelectionHtml();
    }
    
    function getSelectionHtml() {
		if (typeof window.getSelection !== undefined && window.getSelection().toString() != "") {
	        alert(window.getSelection().toString());
		} else {
			alert('Select a word first.');
		}
	}
	
};
