import { createContextMenu, menuItemClicked } from './helpers.js'

let contexts = ['selection'];

chrome.runtime.onInstalled.addListener(async function () {
	createContextMenu();
});

chrome.contextMenus.onClicked.addListener(menuItemClicked);

chrome.storage.onChanged.addListener(
	function(changes, areaName) {
		console.log('storage change event');
		console.log(changes);
		console.log(areaName);
		if (changes.enabledDics == undefined)
			return;
		createContextMenu(changes.enabledDics.newValue);
	}
);