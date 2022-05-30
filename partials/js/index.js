var list = [];
var url = new URL(window.location.href);
var page = url.searchParams.get('page') ? url.searchParams.get('page') : 1;
$(document).ready(() => {
	$('body').css({
		'background-color': 'grey',
		'display': 'flex',
		'justify-content': 'center',
		'flex-direction': 'column',
		'align-items': 'center'
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
			if (page === 'first') {
				page = 1;
			}
			if (page === 'last') {
				page = list.length - 1;
			}
			if (page < 1) {
				page = 1;
			}
			if (page > list.length - 1) {
				page = list.length - 1;
			}
			page = page - 1;
			var jai = 0;
			for (var src of list.at(page)) {
				jai += 1
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
					<a href="${src}" class='a' download='${page}_${jai}'>
					<li>
						<ion-icon name="cloud-download"></ion-icon>
					</li>
					</a>
				</ul></div></div>`);
			}
			$('.a').on('click dblclick', (e) => {
				e.preventDefault();
				if (e.target.name === "copy") {
					if ($('div').hasClass('.copyarea') === true) {
						$('.copyarea input').val(e.target.parentElement.parentElement.href);
					} else if ($('div').hasClass('.copyarea') === false) {
						var cpdiv = document.createElement('div');
						cpdiv.className = "copyarea";
						cpdiv.innerHTML = `<input type="text" value="${e.target.parentElement.parentElement.href}" readonly>`;
						e.target.parentElement.parentElement.parentElement.parentElement.parentElement.appendChild(cpdiv);
					}
				} else if (e.target.name === "cloud-download") {
					var df = e.target.parentElement.parentElement.href;
					fetch(df).then(rrr => {
						rrr.blob().then(jjjj => {
							console.log(jjjj);
							var read = new FileReader();
							read.readAsDataURL(jjjj);
							read.onloadend = () => {
								var b64d = read.result;
								var d = document.createElement('a');
								d.href = b64d;
								d.target = '_self';
								d.download = e.target.parentElement.parentElement.download;
								d.click();
							}
						});
					});
				} else {
					window.location.href = e.target.parentElement.parentElement.href;
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
				'background-color': '#e1f2ee',
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
				'align-items': 'center',
				'left': '-5%',
				'position': 'relative'
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
			$('body').last().append(`<div id="slider">
		<ul>
        <li onclick="gofirst();">
            <ion-icon name="rewind"></ion-icon>
        </li>
        <li onclick="gobackword();">
            <ion-icon name="arrow-round-back"></ion-icon>
        </li>
        <li onclick="goforward();">
            <ion-icon name="arrow-round-forward"></ion-icon>
        </li>
        <li onclick="golast();">
            <ion-icon name="fastforward"></ion-icon>
        </li>
        </ul>
      </div>`);
			$('#slider ul').children().addClass('active');
		})();
		$('head').append(`
		<style>
		.copyarea input {
			height: 85%;
			width: 90%;
			display: flex;
			background-color: rgba(52, 189, 235, 0.5);
			justify-content: center;
			align-items: center;
			border-radius: 12px;
			border-style: none;
			outline: none;
			box-shadow: inset 0px 0px 7px rgba(52, 189, 235, 3.6);
			padding: 0px 8px;
			font-size: 1.15em;
			color: rgba(156, 255, 248,0.8);
		}
		.copyarea {
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 10;
			position: fixed;
			height: 7.5%;
			width: 85%;
			background: rgba(156, 255, 248,0.8);
			border-radius: 8px;
			box-shadow: inset 0px 0px 3px rgba(156, 255, 248,0.8);
			left: 2%;
			top: 1%;
		}
		.active {
			transition: width 0.6s, height 0.6s;
			box-shadow: inset 0px 0px 5px rgba(156, 255, 248,0.8);
			height: 75%;
			width: 12.5%;
			border-radius: 50%;
		}
		.active:hover {
			height: 63%;
			width: 10.5%;
			background: skyblue;
		}
		 #slider ul {
  list-style: none;
  width: 98%;
  height: 98%;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  left: -9%;
  top: -28%;
}
#slider ul li {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
ion-icon {
  font-size: 1.45em;
  color: #d1cfcf;
}
#slider {
  margin-top: 1%;
  margin-bottom: 1%;
  height: 7%;
  width: 98%;
  border-radius: 10px;
  background: #abb8c9;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px rgba(0,0,0,0.7);
}
a {
  color: #d1cfcf;
}
a:visited {
  color: #e7f0bd;
}
a:active {
  color: #d4d0c7;
}
		</style>
`);
	} catch (e) {}
});

function golast() {
	var curwin = window.location.href;
	var npv = 'last';
	var win = curwin.split('.github.io')[0];
	var newurl = win + '.github.io/pixalbuddy/?page=' + npv;
	window.location.href = newurl;
}

function gofirst() {
	var curwin = window.location.href;
	var npv = 'first';
	var win = curwin.split('.github.io')[0];
	var newurl = win + '.github.io/pixalbuddy/?page=' + npv;
	window.location.href = newurl;
}

function goforward() {
	var curwin = window.location.href;
	var npv = page + 2;
	var win = curwin.split('.github.io')[0];
	var newurl = win + '.github.io/pixalbuddy/?page=' + npv;
	window.location.href = newurl;
}

function gobackword() {
	var curwin = window.location.href;
	var npv = page;
	var win = curwin.split('.github.io')[0];
	var newurl = win + '.github.io/pixalbuddy/?page=' + npv;
	window.location.href = newurl;
}
