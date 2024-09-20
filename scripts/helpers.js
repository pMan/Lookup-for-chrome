/*********************************************************************************
	Please see readme.txt with this bundle.
	author: Prasad Cholakkottil aka pMan
**********************************************************************************/


let dicts = {
	"Cald":{
		"func":"Cald",
		"title":"Cambridge Advanced Learners",
		"url":"https://dictionary.cambridge.org/dictionary/english/"
	},
	"Ldoce":{
		"func":"Ldoce",
		"title":"Longman Contemporary English",
		"url":"https://www.ldoceonline.com/dictionary/"
	},
	"FreeDict":{
		"func":"FreeDict",
		"title":"The Free Dictionary",
		"url":"https://www.thefreedictionary.com/"
	},
	"UrbanDict":{
		"func":"UrbanDict",
		"title":"Urban Dictionary",
		"url":"https://www.urbandictionary.com/define.php?term="
	},
	"MerriamWebster":{
		"func":"MerriamWebster",
		"title":"Merriam Webster Dictionary",
		"url":"https://www.merriam-webster.com/thesaurus/"
	},
	"Wiktionary":{
		"func":"Wiktionary",
		"title":"Wiktionary",
		"url":"https://en.wiktionary.org/wiki/"
	},
	"Thesaurus":{
		"func":"Thesaurus",
		"title":"Thesaurus.com",
		"url":"https://www.thesaurus.com/browse/"
	},
	"MerriamWebsterT":{
		"func":"MerriamWebsterT",
		"title":"Merriam Webster Thesaurus",
		"url":"https://www.merriam-webster.com/thesaurus/"
	},
	"OALD":{
		"func":"OALD",
		"title":"Oxford Advanced Learners",
		"url":"https://www.oxfordlearnersdictionaries.com/definition/english/test_1?q="
	},
	"Definition":{
		"func":"Definition",
		"title":"Google definitions",
		"url":"https://www.google.com/search?tbs=dfn:1&q="
	},
	"Investopedia":{
		"func":"Investopedia",
		"title":"Investopedia",
		"url":"https://www.investopedia.com/search?q="
	},
	"Dictionary":{
		"func":"Dictionary",
		"title":"Dictionary.com",
		"url":"https://www.dictionary.com/browse/"
	},/*
	"MacmillanDic":{
		"func":"MacmillanDic",
		"title":"Macmillan Dictionary - British",
		"url":"http://www.macmillandictionary.com/dictionary/british/"
	},
	"MacmillanThes":{
		"func":"MacmillanThes",
		"title":"Macmillan Thesaurus",
		"url":"http://www.macmillandictionary.com/thesaurus/british/"
	},
	"AccountDict":{
		"func":"AccountDict",
		"title":"Accounting Dictionary",
		"url":"http://accountingdictionary.org/dictionary/"
	},*/
	"ReversoDict":{
		"func":"ReversoDict",
		"title":"Reverso Dictionary",
		"url":"https://dictionary.reverso.net/english-cobuild/"
	},
	"CollinsEnglishDict":{
		"func":"CollinsEnglishDict",
		"title":"Collins English Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english/"
	},
	"CollinsThesaurus":{
		"func":"CollinsThesaurus",
		"title":"Collins Thesaurus",
		"url":"https://www.collinsdictionary.com/dictionary/english-thesaurus/"
	},
	"CollinsFrenchDict":{
		"func":"CollinsFrenchDict",
		"title":"Collins English-French Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english-french/"
	},
	"CollinsGermanDict":{
		"func":"CollinsGermanDict",
		"title":"Collins English-German Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english-german/"
	},
	"CollinsSpanishDict":{
		"func":"CollinsSpanishDict",
		"title":"Collins English-Spanish Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english-spanish/"
	},
	"CollinsItalianDict":{
		"func":"CollinsItalianDict",
		"title":"Collins English-Italian Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english-italian/"
	},
	"LingueeEnglishSpanishDict":{
		"func":"LingueeEnglishSpanishDict",
		"title":"Linguee English-Spanish Dictionary",
		"url":"https://www.linguee.com/english-spanish/search?query="
	},
	"MerriamWebsterL":{
		"func":"MerriamWebsterL",
		"title":"Merriam Webster Learners Dictionary",
		"url":"https://www.merriam-webster.com/dictionary/"
	},
	"CollinsCobuildDict":{
		"func":"CollinsCobuildDict",
		"title":"Collins Cobuild Learners Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english/"
	},
	"OALDAMER":{
		"func":"OALDAMER",
		"title":"Oxford Advanced Learners - American English",
		"url":"https://www.oxfordlearnersdictionaries.com/definition/american_english/"
	},/*
	"MacmillanDicAmer":{
		"func":"MacmillanDicAmer",
		"title":"Macmillan Dictionary - American",
		"url":"http://www.macmillandictionary.com/dictionary/american/"
	},*/
	"AmericanHeritage":{
		"func":"AmericanHeritage",
		"title":"American Heritage Dictionary",
		"url":"https://www.ahdictionary.com/word/search.html?q="
	},
	"Vocabularycom":{
		"func":"Vocabularycom",
		"title":"Vocabulary.com",
		"url":"https://www.vocabulary.com/dictionary/"
	},
	"WebsterNewWorld":{
		"func":"WebsterNewWorld",
		"title":"Websters New World College Dictionary",
		"url":"https://www.yourdictionary.com/"
	},
	"Wordsmyth":{
		"func":"Wordsmyth",
		"title":"The Wordsmyth English Dictionary-Thesaurus",
		"url":"https://www.wordsmyth.net/?ent="
	},
	"Infoplease":{
		"func":"Infoplease",
		"title":"Infoplease Dictionary",
		"url":"https://www.infoplease.com/dictionary/"
	},/*
	"Oxford":{
		"func":"Oxford",
		"title":"Oxford Dictionary American English",
		"url":"http.://www.oxforddictionaries.com/us/definition/american_english/"
	},*/
	"Wordnik":{
		"func":"Wordnik",
		"title":"Wordnik",
		"url":"https://www.wordnik.com/words/"
	},
	"Etymology":{
		"func":"Etymology",
		"title":"Online Etymology Dictionary",
		"url":"https://www.etymonline.com/word/"
	},/*
	"UltraLingua":{
		"func":"UltraLingua",
		"title":"UltraLingua English Dictionary",
		"url":"http://www.ultralingua.com/onlinedictionary/dictionary#src_lang=English&dest_lang=English&query="
	},*/
	"OnlinePlain":{
		"func":"OnlinePlain",
		"title":"Online Plain Text English Dictionary",
		"url":"https://www.onelook.com/?ls=a&w="
	},
	"FreeDictOrg":{
		"func":"FreeDictOrg",
		"title":"The Free Dictionary.Org",
		"url":"https://freedictionary.org/?Query="
	},/*
	"AllWords":{
		"func":"AllWords",
		"title":"AllWords.com Multi-Lingual Dictionary",
		"url":"http://www.allwords.com/query.php?SearchType=3&Keyword="
	},*/
	"WordNet":{
		"func":"WordNet",
		"title":"Princeton WordNet",
		"url":"http://wordnetweb.princeton.edu/perl/webwn?s="
	},
	"CambridgeAmer":{
		"func":"CambridgeAmer",
		"title":"Cambridge American Dictionary",
		"url":"https://dictionary.cambridge.org/search/english/?q="
	},
	"Lookwayup":{
		"func":"Lookwayup",
		"title":"LookWAYup Translating Dictionary/Thesaurus",
		"url":"http://lookwayup.com/lwu.exe/lwu/d?s=f&w="
	},
	"Mnemonic":{
		"func":"Mnemonic",
		"title":"Mnemonic Dictionary",
		"url":"https://mnemonicdictionary.com/word/"
	},
	"CollinsFrenchEngDict":{
		"func":"CollinsFrenchEngDict",
		"title":"Collins French-English Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/french-english/"
	},
	"LingueeEnglishJapaneseDict":{
		"func":"LingueeEnglishJapaneseDict",
		"title":"Linguee English-Japanese Dictionary",
		"url":"https://www.linguee.com/english-japanese/search?query="
	},
	"LingueeEnglishFrenchDict":{
		"func":"LingueeEnglishFrenchDict",
		"title":"Linguee English-French Dictionary",
		"url":"https://www.linguee.com/english-french/search?query="
	},
	"CollinsEnglishChineseDict":{
		"func":"CollinsEnglishChineseDict",
		"title":"Collins English-Chinese Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english-chinese/"
	},
	"CollinsEnglishForLearnersDict":{
		"func":"CollinsEnglishForLearnersDict",
		"title":"Collins English For Learners Dictionary",
		"url":"https://www.collinsdictionary.com/dictionary/english/"
	}
};
export let savedDicts = []

export function getDefDicts() {
	return ["FreeDict", "Wiktionary", "Thesaurus", "Dictionary", "MerriamWebsterL", "Vocabularycom", "Wordsmyth", "Etymology", "OnlinePlain"];
}
export function getDicts() { return dicts; }

// static called when save button is pressed, to
// save all enabled dictionaries.
export function saveDicts() {
	if ($('#container #container-dics :checked').length < 1) {
		$('#message').html('Select at least one dictionary.').attr('class','error').show();
		$('#message > .lookup-tab').fadeOut(7000);
		return false;
	}
	
	// save all enabled dictionaries
	let enabledDics = [];
	$('#container #container-dics :checked').each(function() {
		enabledDics.push($(this).val());
	});
	chrome.storage.sync.set({ "enabledDics": enabledDics }).then(() => {
		console.log("enabledDics saved");
		console.log(enabledDics);
	});
	
	$('#message').html('Saved! ').attr('class','success').show();
	$('#message > span').fadeOut(7000);
	return true;
}

async function getDictsFromLocalStorage() {
	return (await chrome.storage.sync.get("enabledDics"))["enabledDicts"];
}

export function menuItemClicked(info, tab) {
	console.log('menuItemClicked');
	//console.log('info: ' + JSON.stringify(info));
	//console.log('tab: ' + JSON.stringify(tab));
	//console.log('savedDicts: ' + JSON.stringify(savedDicts));
	if (info == undefined)
		return;
	
	if (info["menuItemId"] == 'configure') {
		chrome.runtime.openOptionsPage();
		return;
	}

	console.log(savedDicts);

	if (savedDicts ==  undefined || savedDicts.length == 0) {
		savedDicts = getDefDicts();
	}
	let list = savedDicts;
	console.log('dicts: ' + JSON.stringify(dicts));
	console.log('savedDicts: ' + JSON.stringify(savedDicts));
	console.log('list: ' + JSON.stringify(list));
	info["data"] = dicts[info["menuItemId"]];
	console.log('info: ' + JSON.stringify(info));
	chrome.scripting.executeScript({
		args: [info, list],
		target: { tabId: tab.id },
		func: (...args) => injectedFunction(...args)
	});
}

export function createContextMenu(dics) {
	chrome.contextMenus.removeAll();
	console.log(dics);
	if (dics == undefined) {
		getDictsFromLocalStorage().then(enabledDics => {
			//let enabledDics = ret["enabledDics"];
			console.log(enabledDics);
			if (enabledDics == undefined) {
				enabledDics = getDefDicts();
			}
			let dicts = getDicts();
			savedDicts = []
			for (var name of enabledDics) {
				console.log('create item');
				let dict = dicts[name];
				if (dict == null)
					continue;
				savedDicts.push(dicts[name]);
				chrome.contextMenus.create({
					title: dict.title,
					contexts: ['selection'],
					id: dict.func
				}, menuItemClicked);
			}
			chrome.contextMenus.create({
				contexts: ['selection'],
				id: 'separator',
				type: "separator"
			});
			chrome.contextMenus.create({
				contexts: ['all'],
				id: 'configure',
				title: "Lookup Preferences"
			}, menuItemClicked);
		});
	} else {
		let dicts = getDicts();
		savedDicts = [];
		for (var name of dics) {
			console.log('create item');
			let dict = dicts[name];
			if (dict == null)
				continue;
			savedDicts.push(dicts[name])
			chrome.contextMenus.create({
				title: dict.title,
				contexts: ['selection'],
				id: dict.func
			}, menuItemClicked);
		}
		chrome.contextMenus.create({
			contexts: ['selection'],
			id: 'separator',
			type: "separator"
		});
		chrome.contextMenus.create({
			contexts: ['all'],
			id: 'configure',
			title: "Lookup Preferences"
		}, menuItemClicked);
	}
}