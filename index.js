
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

function setupServices() {
	const services = app.services;
	const servicesIndex = Object.keys(services);
	let servicesContainer = document.querySelector('#services');
	servicesContainer.innerHTML = "";

	servicesIndex.forEach(function(app) {
		var appContainer = document.createElement('div');
		appContainer.classList.add('card');
		var appImage = imageEl(services[app].icon['url'], services[app].icon['alt']);
		appImage.classList.add('card-img-top');
		var appName = document.createElement('h3');

		appName.innerText = services[app].title[selectedLanguage].text || services[app].title[selectedLanguage].text;
		var link = document.createElement('a');
		link.target = '_blank';
		link.innerText = services[app].link['text'];
		link.href = services[app].link['url'];
		appContainer.appendChild(appImage);
		var cardBody = document.createElement('div');
		cardBody.classList.add('card-body');
		cardBody.appendChild(appName);
		cardBody.appendChild(link);
		appContainer.appendChild(cardBody);
		servicesContainer.appendChild(appContainer);
	});

}

function render() {
	setupBranding();
	setupLanguages();
	setupServices();
	console.log(app);
}

render();