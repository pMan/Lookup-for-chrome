/*********************************************************************************
	Please see readme.txt with this bundle.
	author: Prasad Cholakkottil aka pMan
**********************************************************************************/

	// walk-through function for stringify, sanitize it
	function validate(key, value) {
		if (typeof value != 'object' && typeof value != 'undefined') {
			return String(value);
		}
		return false;
	}
	
	// filter keyword, this can be object
	function validateString(string) {
		keywd = JSON.parse(JSON.stringify(string, validate));
		if( keywd.length > 45 ) {
			alert("Whooops...\nSelection can\'t exceed 45 characters.\n\nThe longest word in English is only 45 characters long.\n\'pneumonoultramicroscopicsilicovolcanoconiosis\'");
			exit;
		}
		return keywd;
	}

	// get tab id of lookup tab
	function getTabId(newTab) {
		if(tabId == null || onlyOneTab === false) {
			tabId = Number(newTab.id);
		}
	}
	
	// called when tab closed event triggered
	function tabClosed(tab) {
		var cur_tab_id = JSON.parse(JSON.stringify(tab));
		if(cur_tab_id == tabId) {
			tabId = null;
		}
		return;
	}
	
	// Open a new tab for lookup
	function openTab(tabUrl) {
		if (tabId == null || onlyOneTab == false) {
			chrome.tabs.create({url: tabUrl, selected:true}, getTabId);
		} else {
			if (onlyOneTab == true) {
				chrome.tabs.update(tabId, {url: tabUrl, selected:true});
			}
		}
		chrome.tabs.onRemoved.addListener(tabClosed);
	}
	
	// for Cambridge dictionary
	function lookupCald(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://dictionary.cambridge.org/search/british/direct/?q="+keyword);
		}
	}

	// for www.freedictionary.com
	function lookupFreeDict(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.thefreedictionary.com/"+keyword);
		}
	}

	// for Google definitions
	function lookupDefinition(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			openTab("/html/loading.html#https://www.google.com/search?tbs=dfn:1&q="+keyword);
		}
	}

	// for Urban dictionary
	function lookupUrbanDict(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			openTab("/html/loading.html#http://www.urbandictionary.com/define.php?term="+keyword);
		}
	}

	// for Wiktionary
	function lookupWiktionary(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://en.wiktionary.org/wiki/"+keyword);
		}
	}

	// for Merriam webster
	function lookupMerriamWebster(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.merriam-webster.com/dictionary/"+keyword);
		}
	}
	
	// for Longman Dict Of Contemporary English
	function lookupLdoce(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.ldoceonline.com/search/?q="+keyword);
		}
	}
	
	// for Merriam webster thesaurus
	function lookupMerriamWebsterT(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.merriam-webster.com/thesaurus/"+keyword);
		}
	}
	
	// for Thesaurus.com
	function lookupThesaurus(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://thesaurus.com/browse/"+keyword);
		}
	}
	
	// for Oxford Advanced Learners Dictionary
	function lookupOALD(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.oxfordadvancedlearnersdictionary.com/search/?q="+keyword);
		}
	}
	
	// for Investopedia
	function lookupInvestopedia(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.investopedia.com/search/default.aspx?q="+keyword);
		}
	}
	
	// for Dictionary.com
	function lookupDictionary(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://dictionary.reference.com/browse/"+keyword);
		}
	}
	
	// for Dictionary.com
	function lookupMacmillanDic(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.macmillandictionary.com/dictionary/british/"+keyword);
		}
	}
	
	// for Dictionary.com
	function lookupMacmillanThes(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			showPopup("http://www.macmillandictionary.com/thesaurus/british/"+keyword);
		}
	}
	
	function showPopup(url) {
		chrome.tabs.insertCSS(null, {file:"html/inject.css"});
		chrome.tabs.executeScript(null, {code: "var url='"+url+"';"}, function(){
			chrome.tabs.executeScript(null, {file:"js/jquery.min.js"}, function(){
				chrome.tabs.executeScript(null, {file:"js/inject.js"}, function(){
					
				});
			});
		});
	}
	
	// initialize	
	var url = "";
	var tabId = null;
	var keywd = null;
	var selCxt = "selection";
	var pageCxt = "page";
	var title = "";
	var onlyOneTab = lookupInOnlyOneTab();
	var enabled = isEnabled();

	chrome.contextMenus.removeAll();	// clear all
	if (enabled == true) {
		// adding context menu items from dics (JSON) that stores all available dicts
		dics = getEnabledDicts('menu');		// get all enabled dictionaries and
		for (var i in dics) {				// add them one by one.
			title = dics[i].title;
			func = this["lookup" + dics[i].func];
			chrome.contextMenus.create({"title": title, "contexts":[selCxt], "onclick": func});
		}
	}
