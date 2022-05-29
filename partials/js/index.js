var list = [];
$(document).ready(() => {
	$('body').css({
		'background-color': 'grey',
		'display': 'flex',
		'justify-content': 'center'
	}).wrapInner('<div id="imagesBorder"></div>');
	$("*").css({
		'margin': '0px',
		'padding': '0px',
		'box-sizing': 'border-box'
	});
	$('#imagesBorder').css({
		'height': '90%',
		'width': '98%',
		'background-color': '#c9cad4',
		'margin-top': '1%',
		'border-radius': '10px',
		'box-shadow': 'inset 0px 0px 10px rgba(0,0,0,0.4)',
		'display': 'flex',
		'flex-direction': 'column',
		'align-items': 'center'
	});
	(async () => {
		var api = await fetch('/pixalbuddy/partials/txt/cats_images.txt');
		if (api.ok && api.status == '200') {
			var data = await api.text();
			data = data.split('\n');
			data.forEach((i) => {
				(async () => {
					var api = await fetch(i);
					if (api.ok && api.status == '200') {
						var imgs = await api.blob();
						var iml = window.URL.createObjectURL(imgs);
						try {
							list.push(iml);
						} catch (e) {
						}
					}
				})();
			});
		}
	})();
	list.forEach(i => {
		$('imagesBorder').append(i);
	});
});
