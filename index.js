
function imageEl(src, alt) {
	let imgEl = document.createElement('img');
	imgEl.src = src;
	imgEl.alt = alt;

	return imgEl;
}

function audioEl(src){
	let audioEl = document.createElement('audio');
	audio.src = src;
	return audioEl;
}

function cardEl(imgUrl, title, description, link, linkText) {
	`<div class="card">
		<img src="${imgUrl}" alt="" class="card-img-top">
		<div class="card-body">
			<h3>${title}</h3>
			<a target="_blank" href="${link}">${linkText}</a>
		</div>
	</div>`
}

function setupBranding() {
	const brandText = app.brand;
	const logoUrl = app.logo;
	let logoContainer = document.querySelector('#logo');

	const logoImgEl = imageEl(logoUrl, 'logo');
	logoContainer.appendChild(logoImgEl);

	let brandEl = document.createElement('span');
	brandEl.classList.add('brand-text');
	brandEl.innerText = brandText;
	logoContainer.appendChild(brandEl);
}


function setupLanguages() {
	window.selectedLanguage = window.selectedLanguage || 'en'
	const languages = app.languages;
	let langSwitch = document.querySelector('#lang');	
	var langSelectEl = document.createElement('select');
	langSelectEl.classList.add('form-select');

	languages.forEach(function(lang){
		var option = document.createElement("option");
		option.value = lang;
		option.text = lang;
		langSelectEl.add(option, null);
	});
	langSwitch.addEventListener('change', function(e){
		selectedLanguage = e.target.value;
		setupServices();
	});
	langSwitch.appendChild(langSelectEl);
}

function handleAudioPlay(e) {
	console.log("button clicked", e);
	var audioUrl = e.target.dataset['audio'];

	var audioEl = document.querySelector('#screen-reader');
	audioEl.src = audioUrl;
	audioEl.play();
}
function cardEl(appMeta, lang) {
	var {icon, title, description, link} = appMeta;
	return `<div class="card">
		<img src="${icon.url}" alt="${icon.alt}" class="card-img-top">
		<div class="card-body">
			<div class="d-flex"><h3>${title[lang].text}</h3> 
			<button type="button" class="btn btn-outline-info btn-sm audio-play" onclick="handleAudioPlay(event)" data-audio="${title[lang].audio}">🔊</button>
			</div>
			<p>${description[lang].text} 
			<button type="button" class="btn btn-outline-info btn-sm audio-play" onclick="handleAudioPlay(event)" data-audio="${description[lang].audio}">🔊</button>
			</p>
			<a target="_blank" href="${link.url}">${link.text[lang].txt}</a>
			<button type="button" class="btn btn-outline-info btn-sm audio-play" onclick="handleAudioPlay(event)" data-audio="${link.text[lang].audio}">🔊</button>
		</div>
	</div>`
}

function setupServices() {
	const services = app.services;
	const servicesIndex = Object.keys(services);
	let servicesContainer = document.querySelector('#services');
	servicesContainer.innerHTML = "";

	servicesIndex.forEach(function(app) {
		var card = cardEl(services[app], selectedLanguage);
		servicesContainer.insertAdjacentHTML('beforeend', card);
	});

}

function render() {
	setupBranding();
	setupLanguages();
	setupServices();
	console.log(app);
}

render();