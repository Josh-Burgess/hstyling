document.addEventListener('DOMContentLoaded', () => {
	const footer = document.querySelector('body footer');
	const mainLanding = document.querySelector('body div.main-landing');
	const yearSpan = document.querySelector('.year');
	const hasDropdowns = document.querySelectorAll('.has-dropdown');

	// One opened dropdown timer
	let openDD;

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

	hasDropdowns.forEach((dropdown) => {
		dropdown.addEventListener('mouseover', () => {
			clearTimeout(openDD);
			dropdown.classList.add('open');
			const dd = getDropdownMenu(dropdown);
			const pos = dropdown.getBoundingClientRect();
			dd.style.top = `${pos.bottom}px`;
			dd.style.left = `${pos.left}px`;
			dd.classList.add('open');

			dd.addEventListener('mouseover', (e) => {
				e.stopPropagation();
				clearTimeout(openDD);
			});

			dd.addEventListener('mouseout', (e) => {
				e.stopPropagation();
				openDD = setTimeout(() => {
					dropdown.classList.remove('open');
					const dd = getDropdownMenu(dropdown);
					dd.classList.remove('open');
				}, 200);
			});
		});

		dropdown.addEventListener('mouseout', () => {
			openDD = setTimeout(() => {
				dropdown.classList.remove('open');
				const dd = getDropdownMenu(dropdown);
				dd.classList.remove('open');
			}, 200);
		});
	});
});

function getDropdownMenu(dropdown) {
	const nm = Array.from(dropdown.classList).find(x => x.startsWith('dd-')).substr(3);
	return document.querySelector(`.${nm}-dropdown`);
}