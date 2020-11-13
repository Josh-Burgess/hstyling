document.addEventListener('DOMContentLoaded', () => {
	const footer = document.querySelector('body footer');
	const mainLanding = document.querySelector('body div.main-landing');
	const yearSpan = document.querySelector('.year');
	const hasDropdowns = document.querySelectorAll('.has-dropdown');
	const scheduleBtn = document.querySelector('a.consult');
	const costWindow = document.querySelector('div.cost');
	const hamburger = document.querySelector('.hamburger');
	const nav = document.querySelector('header > nav');

	// One opened dropdown timer
	let openDD;
	// One cost timer
	let openCost;

	// Interaction Observer Stuff
	let ioOptions = {
		root: null,
		rootMargin: '0px',
		threshold: [0.0, 0.1, 0.5, 1.0]
	};
	const ioCallback = (entries) => {
		entries.forEach(entry => {
			const isAbove = entry.boundingClientRect.y <= entry.rootBounds.y + entry.target.offsetHeight;
			if (entry.isIntersecting) {
				if (entry.target.classList.contains('animate-bg-on-scroll')
					&& ((entry.intersectionRatio >= 0.1 && !isAbove) || (entry.intersectionRatio >= 0.5 && isAbove))) {
					entry.target.classList.add('is-visible');

					window.history.pushState(
						{ 'html': document.documentElement.innerHTML },
						`${entry.target.getAttribute('data-title')}`,
						`${window.location.href.indexOf('hstyling') > 0 ? '/hstyling' : ''}${entry.target.getAttribute('data-href')}`
					);

					if (entry.target.hasAttribute('data-cost')) {
						clearTimeout(openCost);
						costWindow.innerText = entry.target.getAttribute('data-cost');
						costWindow.classList.add('show');
					} else {
						costWindow.classList.remove('show');
						openCost = setTimeout(() => {
							costWindow.innerText = '';
						}, 1000);
					}

					scheduleBtn.innerText = `Schedule ${entry.target.getAttribute('data-button-name')}`;
					entry.target.classList.remove('is-above');
				} else if (entry.target.classList.contains('show-on-scroll')) {
					entry.target.classList.add('is-visible');
				}
				if (!isAbove) {
					entry.target.classList.remove('is-above');
				}
			} else {
				entry.target.classList.remove('is-visible');
				if (isAbove) {
					entry.target.classList.add('is-above');
				}
			}
		});
	};
	const observer = new IntersectionObserver(ioCallback, ioOptions);
	const targets = document.querySelectorAll('.show-on-scroll, .animate-bg-on-scroll');

	targets.forEach(target => {
		observer.observe(target);
	});

	// Make sure our copyright notice reflects this year
	yearSpan.innerHTML = new Date().getFullYear().toString();

	// Kick-off any loading transitions
	setTimeout(() => mainLanding.classList.add('dom-loaded'), 0);

	// Show footers
	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			mainLanding.classList.add('scrolled');
		} else {
			mainLanding.classList.remove('scrolled');
		}
		if ((window.scrollY + window.innerHeight) > (document.body.scrollHeight - 10)) {
			footer.classList.add('viewable');
		} else {
			footer.classList.remove('viewable');
		}
	});

	// Do Hamburgers on Mobile
	hamburger.addEventListener('click', () => {
		nav.classList.toggle('show');
	});

	// Dropdown stuff
	hasDropdowns.forEach((dropdown) => {
		const ddME = (e) => {
			e.stopPropagation();
			clearTimeout(openDD);
		};
		const ddML = (e) => {
			e.stopPropagation();
			openDD = setTimeout(() => {
				dropdown.classList.remove('open');
				const dd = getDropdownMenu(dropdown);
				dd.classList.remove('open');
			}, 200);
		};

		dropdown.addEventListener('mouseenter', () => {
			clearTimeout(openDD);
			dropdown.classList.add('open');
			const dd = getDropdownMenu(dropdown);
			const pos = dropdown.getBoundingClientRect();
			dd.style.top = `${pos.bottom + window.scrollY}px`;
			dd.style.left = `${pos.left}px`;
			dd.classList.add('open');

			dd.removeEventListener('mouseenter', ddME);
			dd.removeEventListener('mouseleave', ddML);

			dd.addEventListener('mouseenter', ddME);
			dd.addEventListener('mouseleave', ddML);
		});

		dropdown.addEventListener('mouseleave', () => {
			openDD = setTimeout(() => {
				dropdown.classList.remove('open');
				const dd = getDropdownMenu(dropdown);
				dd.classList.remove('open');
				clearTimeout(openDD);
			}, 200);
		});
	});
});

function getDropdownMenu(dropdown) {
	const nm = Array.from(dropdown.classList).find(x => x.startsWith('dd-')).substr(3);
	return document.querySelector(`.${nm}-dropdown`);
}