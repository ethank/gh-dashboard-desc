var github_url = 'https://github.com/api/v2/json/repos/show'; // Github API URL
var to_add = [];

/**
* Local Storage Methods
*/
//sets the item in the localstorage
function setItem(key, value) {
  try {
    log("Inside setItem:" + key + ":" + value);
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, value);
  }catch(e) {
    log("Error inside setItem");
    log(e);
  }
  log("Return from setItem" + key + ":" +  value);
}
//Gets the item from local storage with the specified
//key
function getItem(key) {
  var value;
  log('Get Item:' + key);
  try {
    value = window.localStorage.getItem(key);
  }catch(e) {
    log("Error inside getItem() for key:" + key);
	  log(e);
	  value = "null";
  }
  log("Returning value: " + value);
  return value;
}
//Clears all the key value pairs in the local storage
function clearStrg() {
  log('about to clear local storage');
  window.localStorage.clear();
  log('cleared');
}

function log(txt) {
    console.log(txt);
}


/**
* Add the title to the element
*/

function addTitle (element) {
	var $this = element;
	var repodata;
	var repo = $this.attr('pathname');
	// If title isn't there...
	if (!$this.attr('title')) {
		// Check to see if it's in local storage
		if (!getItem(repo)) {
			// Call Github API for the repo data
			$.ajax({
				url: github_url + repo,
				success: function(data) {
					// Set the title
					setItem(repo,data['repository']['description']);
					repodata = getItem(repo);
				}
			});
		}
		else {
			repodata = getItem(repo);
		}	
		//$this.attr('title',repodata);
		$this.parent().append('<div class="repodesc" style="font-size:10px;display:none;">'+repodata+'</div>');
		$this.parent().hover(function(){$this.parent().children(".repodesc").slideDown();},function(){$this.parent().children(".repodesc").slideUp();});
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
