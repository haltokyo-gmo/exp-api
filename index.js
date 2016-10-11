$(function() {
	$('#input').on('change', function(e) {
		var file = e.target.files[0];

		var r = new FileReader();
		r.onload = function() {
			$('#image').attr('src', r.result);
		};
		r.readAsDataURL(file);

		$.ajax({
			cache: false,
			contentType: 'application/octet-stream',
			data: file,
			dataType: 'json',
			headers: {
				'Ocp-Apim-Subscription-Key': '5950dd30a8184b6bb9996ae5952c28e7'
			},
			method: 'POST',
			processData: false,
			url: 'https://api.projectoxford.ai/emotion/v1.0/recognize'
		})
		.done(function(data) {
			console.log(data);
			$('#text').text(JSON.stringify(data));
		})
		.fail(function(error) {
			console.log(error);
		})
	})
});
