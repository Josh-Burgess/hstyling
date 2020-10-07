document.addEventListener('DOMContentLoaded', () => {
	const footer = document.querySelector('body footer');
	const mainLanding = document.querySelector('body div.main-landing');
	const yearSpan = document.querySelector('.year');

	yearSpan.innerHTML = new Date().getFullYear().toString();

	setTimeout(() => mainLanding.classList.add('dom-loaded'), 0);

	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			mainLanding.classList.add('scrolled');
			footer.classList.add('viewable');
		} else {
			mainLanding.classList.remove('scrolled');
			footer.classList.remove('viewable');
		}
	});
});