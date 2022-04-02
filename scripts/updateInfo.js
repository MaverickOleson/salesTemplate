const info = document.getElementById('info');
const writeInfo = document.getElementById('writeInfo');
const updateInfo = document.getElementById('updateInfo');
const addInfo = document.getElementById('addInfo');
const userSubmit = document.getElementById('userSubmit');

var infoDisplay = true;
writeInfo.addEventListener('click', e => {
    if (infoDisplay) {
        writeInfo.innerHTML = 'Cancel'
        updateInfo.style.display = 'block';
        info.style.display = 'none';
        infoDisplay = false;
    } else {
        writeInfo.innerHTML = 'Update Info'
        updateInfo.style.display = 'none';
        info.style.display = 'block';
        infoDisplay = true;
    }
});

addInfo.addEventListener('click', e => {
    const parent = addInfo.parentElement;
    parent.removeChild(addInfo);
    parent.removeChild(userSubmit);
    const entryName = document.createElement('input');
    const entryInfo = document.createElement('input');
    entryName.type = 'text';
    entryName.name = 'newInfo';
    entryName.placeholder = 'Entry Name';
    entryInfo.type = 'text';
    entryInfo.name = 'newInfo';
    entryInfo.placeholder = 'Entry info';
    parent.appendChild(entryName);
    parent.appendChild(entryInfo);
    parent.appendChild(addInfo);
    parent.appendChild(userSubmit);
});