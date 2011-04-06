var github_url = 'https://github.com/api/v2/json/repos/show'; // Github API URL
var to_add = [];

/**
* Add the title to the element
*/

function addTitle (element) {
	var $this = element;
	var repo = $this.attr('pathname');
	// If title isn't there...
	if (!$this.attr('title')) {
		// Call Github API for the repo data
		$.ajax({
			url: github_url + repo,
			success: function(data) {
				// Set the title
				$this.attr('title',data['repository']['description']);
			}
		});
	}
}

/**
* Check titles for any missing
*/

function checkTitles() {
	$('li.public.source a').each(
		function() {
			// If title is missing
			if (!$(this).attr('title')) {
				// Push element to an array for processing
				to_add.push($(this));
			}
		}
	);
	// Process missing titles
	for (var i=0, len=to_add.length; i<len; ++i) {
		addTitle(to_add[i]);
	}
}


// When document is ready
$(document).ready(function() {
	
	// Go through each watched repo
	$('li.public.source a').each(
		function() {
			// addTitles to them
			addTitle($(this));
		}
	);

	// Bind an event for the "More repos" button
	$('a.#inline_watched_repos').bind('click',function() {
		// Wait until the ajax request is done and then check for missing titles
		setTimeout('checkTitles()', 1500);
	});

});
