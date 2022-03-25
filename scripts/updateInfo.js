const writeInfo = document.getElementById('writeInfo');
const updateInfo = document.getElementById('updateInfo');
writeInfo.addEventListener('click', e => {
    updateInfo.style.display = 'block';
    writeInfo.style.display = 'none';
});