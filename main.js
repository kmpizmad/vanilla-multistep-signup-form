let width = 0;
let currentStep = 0;
const form = document.getElementById('my-form');
const steps = Array.from(form.querySelectorAll('.form-step'));
const buttons = Array.from(form.querySelectorAll('.submit-button'));
const upload = document.getElementById('image-upload');
const image = document.getElementById('image');

document.addEventListener('DOMContentLoaded', () => {
	upload.addEventListener('click', e => {
		e.preventDefault();
		image.click();
	});

	image.addEventListener('change', e => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			upload.style.backgroundImage = 'url(' + reader.result + ')';
			upload.style.borderColor = '#b3a7a6';
			document.getElementById('image-upload-svg').style.display = 'none';
		};

		if (file) reader.readAsDataURL(file);
	});

	steps.at(0).style.opacity = '1';
	buttons.forEach((button, i) =>
		button.addEventListener('click', e => {
			e.preventDefault();

			width += steps.at(0).clientWidth;
			steps.forEach(step => {
				step.style.transform = `translateX(-${width}px)`;
			});
			steps.at(i).style.opacity = '0';
			steps.at(i + 1).style.opacity = '1';

			nextStep();
		}),
	);
});

function nextStep() {
	const icons = Array.from(document.querySelectorAll('.form-progress-icon'));
	const inactiveIcons = icons.filter(container => !container.classList.contains('active'));

	if (inactiveIcons.length === 0) return;

	const activeIcons = icons.filter(container => container.classList.contains('active'));
	const currentLines = Array.from(activeIcons.at(-1).querySelectorAll('.line'));
	currentLines.at(-1).classList.add('line-active');

	const nextIcon = inactiveIcons.at(0);
	nextIcon.classList.add('active');
	const nextLines = Array.from(inactiveIcons.at(0).querySelectorAll('.line'));
	nextLines.at(0).classList.add('line-active');
}
