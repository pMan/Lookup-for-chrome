/*********************************************************************************
	Please see readme.txt with this bundle.
	author: Prasad Cholakkottil aka pMan
**********************************************************************************/

var dics = [];
var msg = '<span></span>'; // if any, once 'Save' clicked
	
	// All dictionaries in JSON.
	var dicts = [
		{ // 0
			func: "Cald",
			title: "Cambridge Advanced Learners",
			url	: "http://dictionary.cambridge.org/search/british/direct/?q="
		},
		{ // 1
			func: "Ldoce",
			title: "Longman Contemporary English",
			url	: "http://www.ldoceonline.com/search/?q="
		},
		{ // 2
			func: "FreeDict",
			title: "The Free Dictionary",
			url	: "http://www.thefreedictionary.com/"
		},
		{ // 3
			func: "UrbanDict",
			title: "Urban Dictionary",
			url	: "http://www.urbandictionary.com/define.php?term="
		},
		{ // 4
			func: "MerriamWebster",
			title: "Merriam Webster Dictionary",
			url	: "http://www.merriam-webster.com/thesaurus/"
		},
		{ // 5
			func: "Wiktionary",
			title: "Wiktionary",
			url	: "http://en.wiktionary.org/wiki/"
		},
		{ // 6
			func: "Thesaurus",
			title: "Thesaurus.com",
			url	: "http://thesaurus.com/browse/"
		},
		{ // 7
			func: "MerriamWebsterT",
			title: "Merriam Webster Thesaurus",
			url	: "http://www.merriam-webster.com/thesaurus/"
		},
		{ // 8
			func: "OALD",
			title: "Oxford Advanced Learners",
			url	: "http://www.oxfordlearnersdictionaries.com/search/english/direct/?q="
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
			url: "http://dictionary.reference.com/browse/"
		},
		{ // 12
			func: "MacmillanDic",
			title: "Macmillan Dictionary",
			url: "http://www.macmillandictionary.com/dictionary/british/"
		},
		{ // 13
			func: "MacmillanThes",
			title: "Macmillan Thesaurus",
			url: "http://www.macmillandictionary.com/thesaurus/british/"
		},
		{ // 14
			func: "AccountDict",
			title: "Accounting Dictionary",
			url: "http://accountingdictionary.org/dictionary/"
		},
		{ // 15
			func: "ReversoDict",
			title: "Reverso Dictionary",
			url: "http://dictionary.reverso.net/english-cobuild/"
		},
		{ // 16
			func: "CollinsEnglishDict",
			title: "Collins English Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english/"
		},
		{ // 17
			func: "CollinsThesaurus",
			title: "Collins Thesaurus",
			url: "http://www.collinsdictionary.com/dictionary/english-thesaurus/"
		},
		{ // 18
			func: "CollinsFrenchDict",
			title: "Collins English-French Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english-french/"
		},
		{ // 19
			func: "CollinsGermanDict",
			title: "Collins English-German Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english-german/"
		},
		{ // 20
			func: "CollinsSpanishDict",
			title: "Collins English-Spanish Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english-spanish/"
		},
		{ // 21
			func: "CollinsItalianDict",
			title: "Collins English-Italian Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english-italian/"
		},
		{ // 22
			func: "LingueeDict",
			title: "Linguee Dictionary",
			url: "http://www.linguee.es/espanol-ingles/search?query="
		},
		{ // 23
			func: "MerriamWebsterL",
			title: "Merriam Webster Learners Dictionary",
			url: "http://www.learnersdictionary.com/definition/"
		},
		{ // 24
			func: "CollinsCobuildDict",
			title: "Collins Cobuild Learners Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english-cobuild-learners/"
		},
		{ // 25
			func: "OALDAMER",
			title: "Oxford Advanced Learners - American English",
			url	: "http://www.oxfordlearnersdictionaries.com/search/american_english/direct/?q="
		},

	];

	// function called when save button is pressed, to
	// save all enabled dictionaries.
	function saveDicts() {
		if ($('#container #container-dics :checked').length < 1) {
			$('#message').html('Select at least one dictionary.').attr('class','error').show();
			$('#message > .lookup-tab').fadeOut(7000);
			return false;
		}
		
		// save all enabled dictionaries
		var enabledDics = [];
		$('#container #container-dics :checked').each(function() {
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
		} else {
			localStorage["enabled"] = false;
		}
		
		// save popup or tab
		if ($('#popup').is(':checked')) {
			localStorage["popup"] = true;
		} else {
			localStorage["popup"] = false;
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
			// for the first time, after installation
			var dics = [0,1,2,3,4,5,6,7,8,9,11,12,13,15,16,17,18,19,20,21,22,23,24];
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
	
	// return truth value, for popup preference
	// use popup, if enabled or unset.
	function usePopup() {
		var usePopup = localStorage["popup"];
		return usePopup == "true";
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
		
		var popup = usePopup();
		if (popup == true) {
			$('#popup').attr('checked','checked');
		}
		
	}

	// redirects to the Dictionary selected.
	function redirect() {
		var url = window.location.hash.substr(1);
		if(url != undefined && url != "") {
			location.href = url;
		}
	}
