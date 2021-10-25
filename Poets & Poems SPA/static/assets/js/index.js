async function getPoemPoet (colAcc) {
    try {
        const colDisp = ['ws-', 'ww-', 'eap-'];
        const currColDisp = [];
        for (const i of colDisp) {
            currColDisp.push(parseInt(document.getElementById(i + 'id').innerHTML));
        }

        const allPoetReq = await fetch('http://127.0.0.1:8090/poets/details?name=true').catch(e =>
            alert('Network error. All poet details GET request rejected. Try again later.'));
        let allPoetJSON = await allPoetReq.json();
        allPoetJSON = allPoetJSON.data;
        const allPoemReq = await fetch('http://127.0.0.1:8090/poems/details').catch(e =>
            alert('Network error. All poem details GET request rejected. Try again later.'));
        let allPoemJSON = await allPoemReq.json();
        allPoemJSON = allPoemJSON.data;
        let hasPoem = false;

        while (!hasPoem) {
            const randInt = Math.floor(Math.random() * allPoetJSON.length);
            const poetID = allPoetJSON[randInt].id;
            for (let i = 0; i < allPoemJSON.length; i++) {
                if (allPoemJSON[i].poet_id === poetID & !(currColDisp.includes(poetID))) {
                    if (allPoemJSON[i].poems.length > 0) {
                        hasPoem = true;
                        changePoemPoet(randInt, colAcc);
                    };
                }
            }
        }
    } catch (e) {
        alert('Error when retreiving new poet (function: getPoemPoet)');
        console.error(e);
    }
}

async function changePoemPoet (poetID, colAcc) {
    try {
        const poetReq = await fetch('http://127.0.0.1:8090/poet/' +
            poetID +
            '/details?name=true&born=true&died=true&age=true&pob=true&movement=true&image=true').catch(e =>
            alert('Network error. Poet details GET request rejected. Try again later.'));
        let poetJSON = await poetReq.json();
        poetJSON = poetJSON.data[0];

        document.getElementById(colAcc + 'name').innerHTML = poetJSON.name;
        document.getElementById(colAcc + 'id').innerHTML = poetJSON.id;
        const bio = '<b>Born:</b> ' + poetJSON.born + ' <br>' +
            '<b>Place of Birth:</b> ' + poetJSON.pob + ' <br>' +
            '<b>Died:</b> ' + poetJSON.died + ' <br>' +
            '<b>Age:</b> ' + poetJSON.age + ' <br>' +
            '<b>Movement:</b> ' + poetJSON.movement;
        document.getElementById(colAcc + 'bio').innerHTML = bio;

        const img = new Image();
        img.src = poetJSON.image;
        img.setAttribute('style', 'width: 100%; height: 450px;');
        img.setAttribute('alt', poetJSON.name + ' Portrait');
        document.getElementById(colAcc + 'img').innerHTML = '';
        document.getElementById(colAcc + 'img').appendChild(img);

        const poemReq = await fetch('http://127.0.0.1:8090/poet/' +
                poetID +
                '/details?name=true&poems=true')
            .catch(e =>
                alert('Network error. Poet details GET request rejected. Try again later.'));
        let poemJSON = await poemReq.json();
        poemJSON = poemJSON.data[0];
        const poemDisp = '<b>Poem Title:</b> ' + poemJSON.poems[0].title + '<br>' +
            '<b>Poem Text:</b><br>' + poemJSON.poems[0].text;
        document.getElementById(colAcc + 'poem').innerHTML = poemDisp;
    } catch (e) {
        alert('Error when trying to change poet information (function: change_poem_poet)');
        console.error(e);
    }
}

async function getPoem (colAcc) {
    try {
        const poetID = document.getElementById(colAcc + 'id').innerHTML;

        const poetPoemsReq = await fetch('http://127.0.0.1:8090/poet/' +
                poetID +
                '/details?name=true&poems=true')
            .catch(e =>
                alert('Network error. Poet details GET request rejected. Try again later.'));
        let poetPoemsJSON = await poetPoemsReq.json();
        poetPoemsJSON = poetPoemsJSON.data[0];

        let poemStr = document.getElementById(colAcc + 'poem').innerHTML;
        poemStr = poemStr.substring(19);
        const poemTitle = poemStr.substring(0, poemStr.indexOf('<'));
        for (let i = 0; i < poetPoemsJSON.poems.length; i++) {
            if (poetPoemsJSON.poems[i].title === poemTitle) {
                if (poetPoemsJSON.poems.length === 1) {
                    alert('Only one poem for this poet');
                }
                i = (i + 1) % poetPoemsJSON.poems.length;
                const poemDisp = '<b>Poem Title:</b> ' + poetPoemsJSON.poems[i].title + '<br>' +
                    '<b>Poem Text:</b><br>' + poetPoemsJSON.poems[i].text;
                document.getElementById(colAcc + 'poem').innerHTML = poemDisp;
                break;
            }
        }
    } catch (e) {
        alert('Error when trying to get new poem (function: getPoem)');
        console.error(e);
    }
}

async function poetNameSelect () {
    try {
        const poetNamesReq = await fetch('http://127.0.0.1:8090/poets').catch(e =>
            alert('Network error. All poets GET request rejected. Try again later.'));
        const poetNamesJSON = await poetNamesReq.json();

        const ddOpt = document.getElementById('upload-poem-poet');
        ddOpt.innerHTML = null;
        const numNames = poetNamesJSON.data.length;
        for (let i = 0; i < numNames; i++) {
            const option = document.createElement('option');
            option.text = poetNamesJSON.data[i].name;
            ddOpt.appendChild(option);
        }
    } catch (e) {
        alert('Error when creating poet name dropdown selection options (function: poetNameSelect)');
        console.error(e);
    }
}

window.addEventListener('load', async function (event) {
    try {
        const poetAcc = {
            0: 'ws-',
            1: 'ww-',
            2: 'eap-'
        };
        for (let i = 0; i < 3; i++) {
            changePoemPoet(i, poetAcc[i]);
        }
        poetNameSelect();
    } catch (e) {
        alert('Error on initial loading of page');
        console.error(e);
    }
});

const np1ButtonClick = document.getElementById('np1-button');
np1ButtonClick.addEventListener('click', async function (event) {
    try {
        getPoemPoet('ws-');
    } catch (e) {
        alert('Error when trying to get a random poet for column 1 (function: np1ButtonClick)');
        console.error(e);
    }
});

const np2ButtonClick = document.getElementById('np2-button');
np2ButtonClick.addEventListener('click', async function (event) {
    try {
        getPoemPoet('ww-');
    } catch (e) {
        alert('Error when trying to get a random poet for column 2 (function: np2ButtonClick)');
        console.error(e);
    }
});

const np3ButtonClick = document.getElementById('np3-button');
np3ButtonClick.addEventListener('click', async function (event) {
    try {
        getPoemPoet('eap-');
    } catch (e) {
        alert('Error when trying to get a random poet for column 3 (function: np3ButtonClick)');
        console.error(e);
    }
});

const wsButtonClick = document.getElementById('ws-button');
wsButtonClick.addEventListener('click', async function (event) {
    try {
        getPoem('ws-');
    } catch (e) {
        alert('Error when trying to get next poem for column 1 (function: wsButtonClick)');
        console.error(e);
    }
});

const wwButtonClick = document.getElementById('ww-button');
wwButtonClick.addEventListener('click', async function (event) {
    try {
        getPoem('ww-');
    } catch (e) {
        alert('Error when trying to get next poem for column 2 (function: wwButtonClick)');
        console.error(e);
    }
});

const eapButtonClick = document.getElementById('eap-button');
eapButtonClick.addEventListener('click', async function (event) {
    try {
        getPoem('eap-');
    } catch (e) {
        alert('Error when trying to get next poem for column 3 (function: eapButtonClick)');
        console.error(e);
    }
});

// POST REQUESTS METHODS

const uploadPoet = document.getElementById('upload-poet');
uploadPoet.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        const poetNamesReq = await fetch('http://127.0.0.1:8090/poets').catch(e =>
            alert('Network error. All poets GET request rejected. Try again later.'));
        const poetNamesJSON = await poetNamesReq.json();

        const inpFile = document.getElementById('input-file');
        const imageFormData = new FormData();

        const poetID = (poetNamesJSON.data.length);
        const poetName = document.getElementById('upload-poet-name').value;
        const poetDOB = document.getElementById('upload-poet-dob').value;
        const poetDOD = document.getElementById('upload-poet-dod').value;
        const poetAge = parseInt(document.getElementById('upload-poet-age').value);
        const poetPOB = document.getElementById('upload-poet-pob').value;
        const poetMovement = document.getElementById('upload-poet-movement').value;

        const numNames = poetNamesJSON.data.length;
        for (let i = 0; i < numNames; i++) {
            if (poetNamesJSON.data[i].name === poetName) {
                alert('Cannot enter duplicate poet');
                document.getElementById('upload-poet').reset();
                return null;
            }
        }

        imageFormData.append('inpFile', inpFile.files[0]);
        imageFormData.append('new_img_name', './static/assets/images/' + poetName + '.jpg');

        await fetch('http://127.0.0.1:8090/saveimage', {
            method: 'post',
            body: imageFormData
        }).catch(e =>
            alert('Network error. Image POST request rejected. Try again later.'));

        const poet = {
            id: poetID,
            name: poetName,
            born: poetDOB,
            died: poetDOD,
            age: poetAge,
            pob: poetPOB,
            movement: poetMovement,
            image: './assets/images/' + poetName + '.jpg'
        };

        await fetch('http://127.0.0.1:8090/poet/add', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poet)
        }).catch(e =>
            alert('Network error. Poet POST request rejected. Try again later.'));

        document.getElementById('upload-poet').reset();
        poetNameSelect();
    } catch (e) {
        document.getElementById('upload-poet').reset();
        alert('Error when trying to add new poet (function: upload_poet)');
        console.error(e);
    }
});

const uploadPoem = document.getElementById('upload-poem');
uploadPoem.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        const allPoemReq = await fetch('http://127.0.0.1:8090/poems').catch(e =>
            alert('Network error. All poems GET request rejected. Try again later.'));
        let allPoemJSON = await allPoemReq.json();
        allPoemJSON = allPoemJSON.data;

        const poetNamesReq = await fetch('http://127.0.0.1:8090/poets').catch(e =>
            alert('Network error. All poets GET request rejected. Try again later.'));
        let poetNamesJSON = await poetNamesReq.json();
        poetNamesJSON = poetNamesJSON.data;

        const poemID = allPoemJSON.length;
        let poemPoet;
        const poemTitle = document.getElementById('upload-poem-title').value;
        const poemText = document.getElementById('upload-poem-text').value;

        for (let i = 0; i < allPoemJSON.length; i++) {
            if (document.getElementById('upload-poem-poet').value === poetNamesJSON[i].name) {
                poemPoet = poetNamesJSON[i].id;
                break;
            }
        }
        const poem = {
            id: poemID,
            poet_id: poemPoet,
            title: poemTitle,
            text: poemText
        };

        await fetch('http://127.0.0.1:8090/poem/add', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poem)
        }).catch(e =>
            alert('Network error. Poem POST request rejected. Try again later.'));

        document.getElementById('upload-poem').reset();
    } catch (e) {
        document.getElementById('upload-poem').reset();
        alert('Error when trying to add new poem (function: uploadPoem)');
        console.error(e);
    }
});
