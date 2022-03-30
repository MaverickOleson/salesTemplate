const info = document.getElementById('info');
const writeInfo = document.getElementById('writeInfo');
const updateInfo = document.getElementById('updateInfo');
const addInfo = document.getElementById('addInfo');

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

var addedInfo = false;
addInfo.addEventListener('click', e => {
    const parent = addInfo.parentElement;
    parent.removeChild(addInfo);
    parent.innerHTML = `
        ${parent.innerHTML}
        <input type=" text" name="newInfo" placeholder="Entry Name" />
        <input type="text" name="newInfo" placeholder="Entry info" />
    `;
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.innerHTML = 'Submit';
    parent.appendChild(addInfo);
    if (!addedInfo) parent.removeChild(submit);
    parent.appendChild(submit);
    addedInfo = false;
});