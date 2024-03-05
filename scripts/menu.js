import Helper from './helpers.js'

let h = new Helper();
let dicts = h.getDicts();
let contexts = ['selection'];
let list = [];

chrome.runtime.onInstalled.addListener(function () {
	
	chrome.storage.sync.get(["enabledDics"], function (r) {
		console.log("r");
		console.log(r.enabledDics);
		
		let enabledDics = h.getDefDicts();
		if (r.enabledDics != undefined) {
			enabledDics = r.enabledDics;
		}
		
		let dicts = h.getDicts();
		for (var name of enabledDics) {
			let dict = dicts[name];
			if (dict == null)
				continue;
			list.push(dict);
			console.log(dict);
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
			contexts: ['selection'],
			id: 'configure',
			title: "Options"
		}, menuItemClicked());
	})
});

function menuItemClicked1() {
	chrome.runtime.openOptionsPage();
}

function menuItemClicked(info, tab) {
	if (info == undefined)
		return;
	console.log(info);
	if (info["menuItemId"] == 'configure') {
		chrome.runtime.openOptionsPage();
		return;
	}
	info["data"] = dicts[info["menuItemId"]];
	chrome.scripting.executeScript({
		args: [info, list],
		target: { tabId: tab.id },
		func: (...args) => injectedFunction(...args)
	});
}

chrome.contextMenus.onClicked.addListener(menuItemClicked);
