var github_url = 'https://github.com/api/v2/json/repos/show';




$(document).ready(function() {
	$('li.public.source a').bind({
		mouseover : function(element) {
			var $this = $(this);
			var repo = $this.attr('pathname');
			$.ajax({
				url: github_url + repo,
				success: function(data) {
					console.log(data['repository']['description']);
					$this.attr('title',data['repository']['description']);
				}
				
			})
		}

	});

	console.log('started');
	
	
	
});
