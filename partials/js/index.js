var list = [];
var url = new URL(window.location.href);
var page = parseInt(url.searchParams.get('page'));
if (!page) {
	page = 1;
}
if (page < 1) {
	page = 1;
}
$(document).ready(() => {
	$('body').css({
		'background-color': 'grey',
		'display': 'flex',
		'justify-content': 'center'
	}).wrapInner('<div id="imgBox"></div>');
	$("*").css({
		'margin': '0px',
		'padding': '0px',
		'box-sizing': 'border-box'
	});
	$('#imgBox').css({
		'height': '90%',
		'width': '98%',
		'background-color': '#c9cad4',
		'margin-top': '1%',
		'border-radius': '10px',
		'box-shadow': 'inset 0px 0px 10px rgba(0,0,0,0.4)',
		'display': 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'overflow': 'auto',
		'gap': '5px'
	});
	try {
		(async () => {
			var api = await fetch('/pixalbuddy/partials/txt/cats_images.txt');
			if (api.ok && api.status == '200') {
				var data = await api.text();
				data = data.split('\n');
				for (var i = 0; i <= data.length; i += 10) {
					var mata = data.slice(i, i + 10);
					list.push(mata);
				}
			}
			if (page > list.length) {
				page = list.length;
			}
			page = page - 1;
			for (var src of list[page]) {
				$('#imgBox').append(`<div><object data='${src}'></object><div class='navbar'><ul>
					<a href="${src}" class='a'>
					<li>
						<ion-icon name="copy"></ion-icon>
					</li>
					</a>
					<a href="${src}",  target="_self" class='a'>
					<li>
						<ion-icon name="share-alt"></ion-icon>
					</li>
					</a>
					<a href="${src}" class='a'>
					<li>
						<ion-icon name="cloud-download"></ion-icon>
					</li>
					</a>
				</ul></div></div>`);
			}
			$('.a').on('click dblclick', (e) => {
				e.preventDefault();
				if(e.target.name === "copy") {
					
				}
				else if(e.target.name === "cloud-download") {
					var d = document.createElement('a');
					var df = e.target.parentElement.parentElement.href;
					var type = df.split('.').at(-1);
					d.target = '_blank';
					d.download = 'ab.' + type;
					d.href = window.URL.createObjectURL(df);
					alert('hi');
					d.click();
				} else {
				}
			});
			$('object').css({
					'height': '80%',
					'width': '98%',
					'margin-top': '5px',
					'border-radius': '8px',
					'box-shadow': 'inset 0px 0px 7px rgba(0,0,0,0.4)',
				});
				$('.navbar').css({
					'margin-top': '0.8%',
					'height': '16%',
					'width': '98%',
					'background-color': '#c9cad4',
					'border-radius': '8px',
					'box-shadow': 'inset 0px 0px 7px rgba(0,0,0,0.4)',
					'display': 'flex',
					'align-items': 'center',
					'justify-content': 'center'
				});
				$('ul').css({
					'list-style': 'none',
					'height': '98%',
					'width': '98%',
					'display': 'flex',
					'justify-content': 'space-evenly',
					'flex-direction': 'row',
					'align-items': 'center'
				});
				$('li').css({
					'float': 'left'
				});
				$('object').parent().css({
					'height': '40%',
					'width': '98%',
					'display': 'flex',
					'align-items': 'center',
					'flex-direction': 'column',
					'background-color': 'grey',
					'border-radius': '8px',
					'box-shadow': 'inset 0px 0px 7px rgba(0,0,0,0.4)',
					'min-height': '40%',
					'min-width': '98%',
				});
				$('#imgBox div').last().css('margin-bottom', '5px');
				$('#imgBox div').first().css('margin-top', '5px');
		})();
	} catch (e) {}
});