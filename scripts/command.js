// Refer: http://stackoverflow.com/questions/20607108/
// Everything in this file is taken from the above URL.
// The function that finds and returns the selected text.
var funcToInject = function() {
    var selection = window.getSelection();
    return (selection.rangeCount > 0) ? selection.toString() : '';
};

// Self-executable for above function.
// http://en.wikipedia.org/wiki/Immediately-invoked_function_expression
var jsCodeStr = ';(' + funcToInject + ')();';

// handler for commands
chrome.commands.onCommand.addListener(function(cmd) {
    if (cmd === 'selectedText') {
        /* Inject the code into all frames of the active tab */
        chrome.tabs.executeScript({
            code: jsCodeStr,
            allFrames: true   //  <-- inject into all frames, as the selection 
                              //      might be in an iframe, not the main page
        }, function(selectedTextPerFrame) {
            
			if (chrome.runtime.lastError) { // Report any error
                alert('ERROR:\n' + chrome.runtime.lastError.message);
            } else if ((selectedTextPerFrame.length > 0) && (typeof(selectedTextPerFrame[0]) === 'string')) { // The results are as expected
				var keyword = validateString(selectedTextPerFrame[0]);
				if (keyword.trim() == "") {
					alert("Make a text selection first, if you meant to lookup online dictionaries.");
					return false;
				}
				showPopup(dics[0].url + keyword, keyword);
            }
        });
    }
});
