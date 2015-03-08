/**
	Options.js file does the rendering of options popup page. (for manifest V2)
	Please see readme.txt with this bundle.
	author: Prasad Cholakkottil aka pMan
**/

$('document').ready(function($) {
	$('#message').html('').show();
	$('#container-dics').html('');
	
	// render all the options
	$('#container-dics').append('<ul id="dics-list">');
	var order = localStorage['order'];
	if (order == undefined) { // if not reordered before
		for (var i in dicts) {
			title = dicts[i].title;
			$('#dics-list').append('<li id="'+i+'" title="Click-n-drag to reorder"><input type="checkbox" name="all-dicts" id="cb'+i+'" value="'+(i)+'" />'+
			'<label style="cursor:move;" for="cb'+i+'">'+title+'</label></li>');
		}
	} else { // user had reordered before
		var ds = order.split(',');
		for( var i in dicts) {
			title = dicts[ds[i]].title;
			$('#dics-list').append('<li id="'+(ds[i])+'" title="Click-n-drag to reorder"><input type="checkbox" name="all-dicts" id="cb'+ds[i]+'" value="'+(ds[i])+'" />'+
			'<label style="cursor:move;" for="cb'+(ds[i])+'">'+title+'</label></li>');
		};
	}
	
	// restore enabled options
	restoreOptions();

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
		saveDicts();
	});
	
	// Close action to hide the popup
	$('a[name=close]').click(function(){
		var e = jQuery.Event("keyup");
		e.keyCode = 27;
		$(document).trigger(e);
		window.close();
	});
	
	// Save order of dictionaries / drag-n-drop
	$('#dics-list').sortable({
		update: function(){
			var newOrder = $('#dics-list').sortable('toArray');
			localStorage["order"] = newOrder;
		}
	});
	$('#dics-list').disableSelection();
	
	// tabbing
	$('a[name=dictionaries]').click(function(){
		$('.dictionaries').show();
		$('a[name=dictionaries]').attr('class', 'active');
		
		$('.prefs').hide();
		$('.contribute').hide();
		$('a[name=prefs]').removeAttr('class');
		$('a[name=contribute]').removeAttr('class');
		
		$('.lookup-tab-save').show();
	});
	
	$('a[name=prefs]').click(function(){
		$('.dictionaries').hide();
		$('a[name=prefs]').attr('class', 'active');
		
		$('.prefs').show();
		$('.contribute').hide();
		$('a[name=dictionaries]').removeAttr('class');
		$('a[name=contribute]').removeAttr('class');
		
		$('.lookup-tab-save').show();
	});
	
	$('a[name=contribute]').click(function(){
		$('.dictionaries').hide();
		$('a[name=contribute]').attr('class', 'active');
		
		$('.prefs').hide();
		$('.contribute').show();
		$('a[name=dictionaries]').removeAttr('class');
		$('a[name=prefs]').removeAttr('class');
		
		$('.lookup-tab-save').hide();
	});
	
});
