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
			title: "Macmillan Dictionary - British",
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
			func: "LingueeEnglishSpanishDict",
			title: "Linguee English-Spanish Dictionary",
			url: "http://www.linguee.com/english-spanish/search?query="
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
		{ // 26
			func: "MacmillanDicAmer",
			title: "Macmillan Dictionary - American",
			url: "http://www.macmillandictionary.com/dictionary/american/"
		},
		{ // 27
			func: "AmericanHeritage",
			title: "American Heritage Dictionary",
			url: "https://www.ahdictionary.com/word/search.html?q="
		},
		{ // 28
			func: "Vocabularycom",
			title: "Vocabulary.com",
			url: "http://www.vocabulary.com/dictionary/"
		},
		{ // 29
			func: "WebsterNewWorld",
			title: "Websters New World College Dictionary",
			url: "http://www.yourdictionary.com/"
		},
		{ // 30
			func: "Wordsmyth",
			title: "The Wordsmyth English Dictionary-Thesaurus",
			url: "http://www.wordsmyth.net/?ent="
		},
		{ // 31
			func: "Infoplease",
			title: "Infoplease Dictionary",
			url: "http://dictionary.infoplease.com/"
		},
		{ // 32
			func: "Oxford",
			title: "Oxford Dictionary American English",
			url: "http://www.oxforddictionaries.com/us/definition/american_english/"
		},
		{ // 33
			func: "Wordnik",
			title: "Wordnik",
			url: "https://www.wordnik.com/words/"
		},
		{ // 34
			func: "Etymology",
			title: "Online Etymology Dictionary",
			url: "http://www.etymonline.com/index.php?term="
		},
		{ // 35
			func: "UltraLingua",
			title: "UltraLingua English Dictionary",
			url: "http://www.ultralingua.com/onlinedictionary/dictionary#src_lang=English&dest_lang=English&query="
		},
		{ // 36
			func: "OnlinePlain",
			title: "Online Plain Text English Dictionary",
			url: "http://www.onelook.com/?other=web1913&w="
		},
		{ // 37
			func: "FreeDictOrg",
			title: "The Free Dictionary.Org",
			url: "http://www.freedictionary.org/?Query="
		},
		{ // 38
			func: "AllWords",
			title: "AllWords.com Multi-Lingual Dictionary",
			url: "http://www.allwords.com/query.php?SearchType=3&Keyword="
		},
		{ // 39
			func: "WordNet",
			title: "Princeton WordNet",
			url: "http://wordnetweb.princeton.edu/perl/webwn?s="
		},
		{ // 40
			func: "CambridgeAmer",
			title: "Cambridge American Dictionary",
			url: "http://dictionary.cambridge.org/search/american-english/?q="
		},
		{ // 41
			func: "Lookwayup",
			title: "LookWAYup Translating Dictionary/Thesaurus",
			url: "http://lookwayup.com/lwu.exe/lwu/d?s=f&w="
		},
		{ // 42
			func: "Mnemonic",
			title: "Mnemonic Dictionary",
			url: "http://www.mnemonicdictionary.com/word/"
		},
		{ // 43
			func: "CollinsFrenchEngDict",
			title: "Collins French-English Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/french-english"
		},
		{ // 44
			func: "LingueeEnglishJapaneseDict",
			title: "Linguee English-Japanese Dictionary",
			url: "http://www.linguee.com/english-japanese/search?query="
		},
		{ // 45
			func: "LingueeEnglishFrenchDict",
			title: "Linguee English-French Dictionary",
			url: "http://www.linguee.com/english-french/search?query="
		},
		{ // 46
			func: "CollinsEnglishChineseDict",
			title: "Collins English-Chinese Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english-chinese"
		},
		{ // 47
			func: "CollinsEnglishForLearnersDict",
			title: "Collins English For Learners Dictionary",
			url: "http://www.collinsdictionary.com/dictionary/english-cobuild-learners"
		}
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
			var dics = [0,2,3,5,11,22,27,28,34,37,40,45];
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
		return usePopup == "true" || usePopup == undefined;
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
