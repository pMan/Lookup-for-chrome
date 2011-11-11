/*********************************************************************************
	Please see readme.txt with this bundle.
	author: Prasad Cholakkottil aka pMan
**********************************************************************************/

var dics = [];
var esc = '<div class="lookup-tab">Press Esc Key to exit...</div>';
	
	// All dictionaries in JSON.
	// TODO: remove url, no need
	var dicts = [
		{ // 1
			func: "Cald",
			title: "Cambridge Advanced Learner's",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 2
			func: "Ldoce",
			title: "Longman Contemporary English",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 3
			func: "FreeDict",
			title: "The Free Dictionary",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 4
			func: "UrbanDict",
			title: "Urban Dictionary",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 5
			func: "MerriamWebster",
			title: "Merriam Webster Dictionary",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		{ // 6
			func: "Wiktionary",
			title: "Wiktionary",
			url	: "http://en.wiktionary.org/wiki/"
		},
		{ // 7
			func: "Thesaurus",
			title: "Thesaurus",
			url	: "http://thesaurus.com/browse/"
		},
		{ // 8
			func: "MerriamWebsterT",
			title: "Merriam Webster Thesaurus",
			url	: "http://www.merriam-webster.com/thesaurus/"
		},
		{ // 9
			func: "OALD",
			title: "Oxford Advanced Learner's",
			url	: "http://www.oxfordadvancedlearnersdictionary.com/search/?q="
		},
		{ // 10
			func: "Definition",
			title: "Google definitions",
			url	: "http://www.google.com/search?tbs=dfn:1&q="
		},
		
	];

	// function called when save button is pressed, to
	// save all enabled dictionaries.
	function saveDicts() {
		if ($('#container > #container-dics :checked').length < 1) {
			$('#message').html('Select at least one dictionary to save.' + esc).attr('class','error').show();
			$('#message > .lookup-tab').fadeOut(7000);
			return false;
		}
		
		// save all enabled dictionaries
		var enabled = [];
		$('#container > #container-dics :checked').each(function() {
			enabled.push($(this).val());
		});
		localStorage["enabled"] = enabled;
		
		// save only one tab or multiple tabs for lookup
		if ($('#one-tab').is(':checked')) {
			localStorage["one-tab"] = true;
		} else {
			localStorage["one-tab"] = false;
		}
		
		$('#message').html('Saved!' + esc).attr('class','success').show().fadeOut(4000);
		$('#message > .lookup-tab').fadeOut(7000);
		
		var bkg = chrome.extension.getBackgroundPage();
		bkg.location.reload();
	}

	// Return all enabled dictionaries.
	function getEnabledDicts(flag) {
		var enabled = localStorage["enabled"];
		if (enabled != undefined && enabled != null ) {
			var dics = enabled.split(','); // private
		} else {
			var dics = [1,7,9,10]; // for the first time, after installation
		}
		if (flag == "menu") {
			var retVal = [];
			for (var i in dics) {
				retVal.push(dicts[dics[i]-1]);
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

	// to populate data in options page
	function restore() {
		ds = getEnabledDicts("option");
		for (var i in ds) {
			$('#container input[value='+ds[i]+']').attr('checked','checked');
		}
		var onlyOneTab = lookupInOnlyOneTab();
		if (onlyOneTab) {
			$('#one-tab').attr('checked','checked');
		}
	}
