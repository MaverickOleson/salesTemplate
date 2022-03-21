//changing css variables for vh and vw based on current window size
window.addEventListener('resize', () => {
	document.documentElement.style.setProperty('--winH', `${window.innerHeight}px`);
	document.documentElement.style.setProperty('--winW', `${window.innerWidth}px`);
});
window.addEventListener("deviceorientation", () => {
	document.documentElement.style.setProperty('--winH', `${window.innerHeight}px`);
	document.documentElement.style.setProperty('--winW', `${window.innerWidth}px`);
});