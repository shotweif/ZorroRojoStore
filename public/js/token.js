let char = `123abcde.fmnopqlABCDE@FJKLMNOPQRSTUVWXYZ456789stuvwxyz0!#$%&iijkrgh'*+-/
=?^_${'`'}{|}~`;

const generateToken = (key) => {
    let token = '';
    for (let i = 0; i < key.length; i++) {
        let index = char.indexOf(key[i]);
        // If the character is not found, use a default index
        if (index === -1) {
            index = char.length / 2;
        }
        let randomIndex = Math.floor(Math.random() * index);
        token += char[randomIndex] + char[index - randomIndex];
    }
    return token;
}

const compareToken = (token, key) => {
    let string = '';
    for (let i = 0; i < token.length; i = i + 2) {
        let index1 = char.indexOf(token[i]);
        let index2 = i + 1 < token.length ? char.indexOf(token[i + 1]) : 0;
        string += char[index1 + index2];
    }

    if (string === key) {
        return true;
    }
    return false;
}

// Common funtion ------------------------------------------------
// Send data funtion
const sendData = (path, data) => {
    fetch(path, {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then(response => {
            processData(response);
        })
}

// send data function
const processData = (data) => {
    //loader.style.display = null;
    if (data.alert) {
        loader.style.display = null;
        showAlert(data.alert);


    } else if (data.name) {
        // Create athToken
        //loader.style.display = null;
        data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace('/')

    } else if (data == true) {
        // Seller page
        //loader.style.display = null;
        let user = JSON.parse(sessionStorage.user);
        user.seller = true;
        sessionStorage.user = JSON.stringify(user);
        location.reload();

    } else if (data.product) {
        location.href = '/seller';
        //showMessage('Registro exitoso');
    } else if (data.book) {
        let loc = (window.location.href).split('/');
        for (var i = 0; i < loc.length; i++) {
            if (loc[i] === 'booking-create') {
                location.reload();
            }
        }
        
    } else if (data.newbooking) {
        loader.style.display = null;
        showMessage('Tu reserva fue exitosa!');

        setTimeout(() => {
            location.href = '/';
        }, 3000);
    }
}

// Alert function
const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');

    alertMsg.innerHTML = msg;
    alertBox.classList.add('alert--show');

    setTimeout(() => {
        alertBox.classList.remove('alert--show');
    }, 3000);
    return false
}

// Alert function

const showMessage = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertImg = document.querySelectorAll('.alert-img');
    let alertMsg = document.querySelector('.alert-msg');


    alertMsg.innerHTML = msg;
    alertBox.classList.add('alert-box-finish');

    alertBox.classList.remove('alert-box');
    alertImg[0].classList.remove('image-show')
    alertImg[1].classList.add('image-show')

    alertBox.classList.add('alert--show');

    setTimeout(() => {
        alertBox.classList.remove('alert--show');
    }, 3000);
    return false
}