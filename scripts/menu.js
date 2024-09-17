import Helper from './helpers.js'

let helper = new Helper();
let dicts = helper.getDicts();
let contexts = ['selection'];

async function getDictsFromLocalStorage() {
	return (await chrome.storage.sync.get("enabledDics"))["enabledDics"];
}

chrome.runtime.onInstalled.addListener(async function () {
	getDictsFromLocalStorage().then(enabledDics => {
		if (enabledDics == undefined) {
			enabledDics = helper.getDefDicts();
		}
		let dicts = helper.getDicts();
		for (var name of enabledDics) {
			let dict = dicts[name];
			if (dict == null)
				continue;
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
		}, menuItemClicked());
	});
});

function menuItemClicked(info, tab) {
	if (info == undefined)
		return;
	
	if (info["menuItemId"] == 'configure') {
		chrome.runtime.openOptionsPage();
		return;
	}

	getDictsFromLocalStorage().then(savedDicts => {
		console.log(savedDicts);
		if (savedDicts ==  undefined || savedDicts.length == 0) {
			savedDicts = helper.getDefDicts();
		}
		let list = [];
		for (var name of savedDicts) {
			let dict = dicts[name];
			list.push(dicts[name]);
		}
		info["data"] = dicts[info["menuItemId"]];
		chrome.scripting.executeScript({
			args: [info, list],
			target: { tabId: tab.id },
			func: (...args) => injectedFunction(...args)
		});
	});
}

chrome.contextMenus.onClicked.addListener(menuItemClicked);
