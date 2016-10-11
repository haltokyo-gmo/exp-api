$(function() {
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');

	function MaxEmotion(scores) {
		var max = 0;

		if(scores.anger > max) {
			max = scores.anger;
		}
		if(scores.contempt > max) {
			max = scores.contempt;
		}
		if(scores.disgust > max) {
			max = scores.disgust;
		}
		if(scores.fear > max) {
			max = scores.fear;
		}
		if(scores.happiness > max) {
			max = scores.happiness;
		}
		if(scores.neutral > max) {
			max = scores.neutral;
		}
		if(scores.sadness > max) {
			max = scores.sadness;
		}
		if(scores.surprise > max) {
			max = scores.surprise;
		}

		switch(max) {
			case scores.anger:
				return 'anger ' + scores.anger.toFixed(4);
			case scores.contempt:
				return 'contempt ' + scores.contempt.toFixed(4);
			case scores.disgust:
				return 'disgust ' + scores.disgust.toFixed(4);
			case scores.fear:
				return 'fear ' + scores.fear.toFixed(4);
			case scores.happiness:
				return 'happiness ' + scores.happiness.toFixed(4);
			case scores.neutral:
				return 'neutral ' + scores.neutral.toFixed(4);
			case scores.sadness:
				return 'sadness ' + scores.sadness.toFixed(4);
			case scores.surprise:
				return 'surprise ' + scores.surprise.toFixed(4);
			default:
				return 'none';
		}
	}

	$('#input').on('change', function(e) {
		var file = e.target.files[0];

		var r = new FileReader();
		r.onload = function() {
			var img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
			};
			img.src = r.result;
		};
		r.readAsDataURL(file);

		$.ajax({
			cache: false,
			contentType: 'application/octet-stream',
			data: file,
			dataType: 'json',
			headers: {
				'Ocp-Apim-Subscription-Key': 'subscription key here'
			},
			method: 'POST',
			processData: false,
			url: 'https://api.projectoxford.ai/emotion/v1.0/recognize'
		})
		.done(function(data) {
			console.log(data);
			$('#text').text(JSON.stringify(data));

			for(var i in data) {
				var rect = data[i].faceRectangle;
				var text = MaxEmotion(data[i].scores);

				ctx.beginPath();
				ctx.strokeRect(rect.left, rect.top, rect.width, rect.height);
				ctx.fillStyle = 'black';
				var m = ctx.measureText(text);
				ctx.fillRect(rect.left, rect.top - 10, m.width, 10);
				ctx.fillStyle = 'white';
				ctx.fillText(text, rect.left, rect.top);
			}
		})
		.fail(function(error) {
			console.log(error);
		})
	})
});
