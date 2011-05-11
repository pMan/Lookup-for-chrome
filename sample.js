	var tabId = null;
	var keywd = null;
	var context = "selection";
	var title = "";
	
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
	function toGetTabId(lookupTab) {
		if(tabId == null) {
			tabId = Number(lookupTab.id);
		}
	}
	
	// called when tab closed event triggered
	function tabClosed(tab) {
		tabId = null;
	}
	
	// Open a new tab for lookup
	function openTab(tabUrl) {
		chrome.tabs.create({url: tabUrl, selected:true}, toGetTabId);
		chrome.tabs.onRemoved.addListener(tabClosed);
	}
	
	// for Cambridge dictionary
	function lookupCald(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			if (tabId == null) {
				openTab("query_form.html#"+keyword);
			} else {
				chrome.tabs.update(tabId, {url: "query_form.html#"+keyword, selected:true});
			}
		}
	}

	// for www.freedictionary.com
	function lookupFreeDict(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			if (tabId == null) {
				openTab("loading.html#http://www.thefreedictionary.com/"+keyword);
			} else {
				chrome.tabs.update(tabId, {url: "http://www.thefreedictionary.com/"+keyword, selected:true});
			}
		}
	}

	// for Google definitions
	function lookupDefinition(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			if (tabId == null) {
				openTab("loading.html#http://www.google.com/search?q=define:"+keyword);
			} else {
				chrome.tabs.update(tabId, {url: "http://www.google.com/search?q=define:"+keyword, selected:true});
			}
		}
	}

	// for Urban dictionary
	function lookupUrbanDict(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			if(tabId == null) {
				openTab("loading.html#http://www.urbandictionary.com/define.php?term="+keyword);
			} else {
				chrome.tabs.update(tabId, {url: "http://www.urbandictionary.com/define.php?term="+keyword, selected:true});
			}
		}
	}

	// for Wiktionary
	function lookupWiktionary(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			if(tabId == null) {
				openTab("loading.html#http://en.wiktionary.org/wiki/"+keyword);
			} else {
				chrome.tabs.update(tabId, {url: "http://en.wiktionary.org/wiki/"+keyword, selected:true});
			}
		}
	}

	// for Merriam webster
	function lookupMerriamWebster(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			if(tabId == null) {
				openTab("loading.html#http://www.merriam-webster.com/dictionary/"+keyword);
			} else {
				chrome.tabs.update(tabId, {url: "http://www.merriam-webster.com/dictionary/"+keyword, selected:true});
			}
		}
	}
	
	// for Longman Dict Of Contemporary English
	function lookupLdoce(info, tab) {
		var keyword = validateString(info.selectionText);
		if (keyword != false) {
			if(tabId == null) {
				openTab("loading.html#http://www.ldoceonline.com/search/?q="+keyword);
			} else {
				chrome.tabs.update(tabId, {url: "http://www.ldoceonline.com/search/?q="+keyword, selected:true});
			}
		}
	}
	
	// add to context menu, one by one
	title = "Cambridge Advanced Learner's";
	chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": lookupCald});

	title = "Longman Contemporary English";
	chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": lookupLdoce});

	title = "thefreedictionary.com";
	chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": lookupFreeDict});

	title = "Urban Dictionary";
	chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": lookupUrbanDict});

	title = "Merriam Webster Dictionary";
	chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": lookupMerriamWebster});

	title = "Wiktionary";
	chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": lookupWiktionary});

	title = "Google definitions";
	chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": lookupDefinition});
