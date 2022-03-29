const info = document.getElementById('info');
const writeInfo = document.getElementById('writeInfo');
const updateInfo = document.getElementById('updateInfo');

var infoDisplay = true;
writeInfo.addEventListener('click', e => {
    if (infoDisplay) {
        updateInfo.style.display = 'block';
        info.style.display = 'none';
        infoDisplay = false;
    } else {
        updateInfo.style.display = 'none';
        info.style.display = 'block';
        infoDisplay = true;
    }
});