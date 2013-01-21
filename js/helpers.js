/*********************************************************************************
	Please see readme.txt with this bundle.
	author: Prasad Cholakkottil aka pMan
**********************************************************************************/

var dics = [];
var msg = '<span></span>'; // if any, once 'Save' clicked
	
	// All dictionaries in JSON.
	// TODO: remove url, no need
	var dicts = [
		{ // 0
			func: "Cald",
			title: "Cambridge Advanced Learner's",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 1
			func: "Ldoce",
			title: "Longman Contemporary English",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 2
			func: "FreeDict",
			title: "The Free Dictionary",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 3
			func: "UrbanDict",
			title: "Urban Dictionary",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 4
			func: "MerriamWebster",
			title: "Merriam Webster Dictionary",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 5
			func: "Wiktionary",
			title: "Wiktionary",
			url	: "http://en.wiktionary.org/wiki/"
		},
		{ // 6
			func: "Thesaurus",
			title: "Thesaurus",
			url	: "http://thesaurus.com/browse/"
		},
		{ // 7
			func: "MerriamWebsterT",
			title: "Merriam Webster Thesaurus",
			url	: "http://www.merriam-webster.com/thesaurus/"
		},
		{ // 8
			func: "OALD",
			title: "Oxford Advanced Learner's",
			url	: "http://www.oxfordadvancedlearnersdictionary.com/search/?q="
		},
		{ // 9
			func: "Definition",
			title: "Google definitions",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 10
			func: "Investopedia",
			title: "Investopedia",
			url	: "http://www.investopedia.com/search/default.aspx?q="
		},
		{ // 11
			func: "Dictionary",
			title: "Dictionary.com",
		},
		
	];

	// function called when save button is pressed, to
	// save all enabled dictionaries.
	function saveDicts() {
		if ($('#container > #container-dics :checked').length < 1) {
			$('#message').html('Select at least one dictionary.').attr('class','error').show();
			$('#message > .lookup-tab').fadeOut(7000);
			return false;
		}
		
		// save all enabled dictionaries
		var enabledDics = [];
		$('#container > #container-dics :checked').each(function() {
			enabledDics.push($(this).val());
		});
		localStorage["enabledDics"] = enabledDics;
		
		// save only one tab or multiple tabs for lookup
		if ($('#one-tab').is(':checked')) {
			localStorage["one-tab"] = true;
		} else {
			localStorage["one-tab"] = false;
		}
		
		// save enabled/disabled
		if ($('#enabled').is(':checked')) {
			localStorage["enabled"] = true;
			//chrome.browserAction.setIcon({path:"images/mybug.gif"});
		} else {
			localStorage["enabled"] = false;
			//chrome.browserAction.setIcon({path:"images/mybug-dim.gif"});
		}
		
		$('#message').html('Saved! ' + msg).attr('class','success').show();
		$('#message > span').fadeOut(7000);
		
		var bkg = chrome.extension.getBackgroundPage();
		bkg.location.reload();
	}

	// Return all enabled dictionaries.
	function getEnabledDicts(flag) {
		var enabledDics = localStorage["enabledDics"];
		if (enabledDics != undefined && enabledDics != null ) {
			var dics = enabledDics.split(','); // private
		} else {
			var dics = [1,7,9,10]; // for the first time, after installation
		}
		if (flag == "menu") {
			var retVal = [];
			for (var i in dics) {
				retVal.push(dicts[dics[i]]);
			}
			dics = retVal;
		}
		return dics;
	}

	// return truth value for single tab lookup
	function lookupInOnlyOneTab() {
		var tab = localStorage["one-tab"];
		return tab == "true" || tab == undefined;
	}

	// return truth value, true if enabled
	function isEnabled() {
		var enabled = localStorage["enabled"];
		return enabled == "true" || enabled == undefined; // true, if enabled
	}
	
	// to populate data in options page
	function restoreOptions() {
		ds = getEnabledDicts("option");
		for (var i in ds) {
			$('#container-dics #dics-list input[value='+ds[i]+']').attr('checked','checked');
		}
		var onlyOneTab = lookupInOnlyOneTab();
		if (onlyOneTab) {
			$('#one-tab').attr('checked','checked');
		}
		
		var enabled = isEnabled();
		if (enabled) {
			$('#enabled').attr('checked','checked');
		}
	}

	// redirects to the Dictionary selected.
	function redirect() {
		var url = window.location.hash.substr(1);
		if(url != undefined && url != "") {
			location.href = url;
		}
	}
