import Helper from './helpers.js'

let h = new Helper();
let dicts = h.getDicts();
let contexts = ['selection'];
let list = [];

function createContextMenu() {
	
	chrome.storage.sync.get(["enabledDics"], function (r) {
		
		chrome.contextMenus.removeAll(
			function() { console.log('conext menu items removed') }
		)
		
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
		}, menuItemClicked);
	})
}

function menuItemClicked(info, tab) {
	if (info == undefined)
		return;
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

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.contextMenus.onClicked.addListener(menuItemClicked);
