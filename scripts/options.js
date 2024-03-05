import Helper from './helpers.js'

let h = new Helper();

chrome.storage.sync.get(["enabledDics"]).then((res) => {
	var def = h.getDefDicts();
	if (res.enabledDics != undefined) {
		def = res.enabledDics;
	}
	updateUI(h.getDicts(), def);
});

function updateUI(dicts, enabledDicts) {
	$('document').ready(function($) {
		$('#message').html('').show();
		$('#container-dics').html('');
		
		// render all the options
		$('#container-dics').append('<ul id="dics-list">');
		$('#container-dics ul').append('<li><i>loading...</i></li>');
		
		chrome.storage.sync.get(["order"]).then((res) => {
			console.log(res['order']);
			//var order = JSON.parse(res['order']);
			var order = undefined;
			if (res['order'] != undefined) {
				order = JSON.parse(res['order']);
				// add any new dict wihch was not in the previous save. Possibly after an update
				for (var key in dicts)
					if (!order.includes(key))
						order.push(key);
			}
			
			$('#dics-list').html('');
			
			if (order == undefined) { // if not reordered before
				let i = 0;
				for (var key in dicts) {
					console.log('key: ' + key);
					var dObj = dicts[key];
					let title = dObj.title;
					let checked = enabledDicts.includes(key) ? " checked" : "";
					$('#dics-list').append('<li id="'+i+'" title="Click-n-drag to reorder"><input type="checkbox" name="all-dicts" id="cb'+i+'" value="'+key+'" ' + checked + '/>'+
					'<label style="cursor:move;" for="cb'+i+'">'+title+'</label></li>');
					i++;
				}
			} else { // user had reordered before
				for( var i of order) {
					console.log(i);
					let title = dicts[i].title;
					let key = dicts[i].func;
					let checked = enabledDicts.includes(key) ? " checked" : "";
					$('#dics-list').append('<li id="'+i+'" title="Click-n-drag to reorder"><input type="checkbox" name="all-dicts" id="cb'+i+'" value="'+key+'" ' + checked + '/>'+
					'<label style="cursor:move;" for="cb'+i+'">'+title+'</label></li>');
				};
			}
		});
		
		// enable/disable all
		$('input[name=actionall]').click(function(){
			if ($(this).is(':checked')) {
				$('#container #container-dics input[type=checkbox]').each(function() {
					$(this).attr('checked', true);
				});
			} else {
				$('#container #container-dics input[type=checkbox]').each(function() {
					$(this).attr('checked', false);
				});
			}
		});

		// Save action
		$('.save').click(function(e) {
			e.preventDefault();
			$('#message').stop().fadeTo(1,1);
			h.saveDicts();
			let newOrder = []; //$('#dics-list').sortable('toArray');
			$('#dics-list :input').map(function() {
				newOrder.push($(this).val());
			});
			console.log(newOrder);
			//localStorage["order"] = newOrder;
			chrome.storage.sync.set({"order": JSON.stringify(newOrder)}).then((res) => {
				console.log('sorted list saved');
				chrome.runtime.reload();
			});
		});
		
		// Close action to hide the popup
		$('a[name=close]').click(function(){
			var e = jQuery.Event("keyup");
			e.keyCode = 27;
			$(document).trigger(e);
			window.close();
		});
		
		
		// Save reorder of dictionaries / drag-n-drop
		$('#dics-list').sortable({
			update: function(){
				var newOrder = $('#dics-list').sortable('toArray');
				//localStorage["order"] = newOrder;
				chrome.storage.sync.set({"order": newOrder}).then((res) => {
					console.log('sorted list saved');
				});
			}
		});
		
		$('#dics-list').disableSelection();
		
		// tab clicks
		$('ul.tabs > li > a').click(function(){
			hideAll();
			let targetName = $(this).attr('name');
			$('a[name=' + targetName + ']').attr('class', 'active');
			$('.' + targetName).show();
			
			if ('dictionaries' == targetName)
				$('.lookup-tab-save').show();
			else
				$('.lookup-tab-save').hide();
		});
		
		// hide all tabs
		function hideAll() {
			$('.tab-content').hide();
			$('ul > li > a').removeAttr('class');
		}
		
	});
}