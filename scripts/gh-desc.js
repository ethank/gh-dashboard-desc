var github_url = 'https://github.com/api/v2/json/repos/show';
var to_add = [];


function addTitle (element) {
	var $this = element;
	var repo = $this.attr('pathname');
	if (!$this.attr('title')) {
		$.ajax({
			url: github_url + repo,
			success: function(data) {
				console.log(data['repository']['description']);
				$this.attr('title',data['repository']['description']);
			}
		});
	}
}

function checkTitles() {
	console.log('executed');
	$('li.public.source a').each(
		function() {
			if (!$(this).attr('title')) {
				console.log($(this).attr('pathname'));
				to_add.push($(this));
			}
		}
	);
	for (var i=0, len=to_add.length; i<len; ++i) {
		addTitle(to_add[i]);
	}
}



$(document).ready(function() {
	
	$('li.public.source a').each(
		function() {
			addTitle($(this));
		}
	);

	$('a.#inline_watched_repos').bind('click',function() {
		setTimeout('checkTitles()', 1500);
	});


	console.log('started');
	
	
	
});
