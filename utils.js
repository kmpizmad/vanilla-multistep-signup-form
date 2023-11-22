steps.forEach(step => {
	const children = Array.from(step.childNodes);
	const requiredFields = children
		.filter(group => group.classList.contains('required'))
		.filter(group => group.tagName === 'input');
	console.log(requiredFields);
});
