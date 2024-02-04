// Redirect to home page if user is logged
window.onload = () => {
    if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            location.replace('/');
        }
    }
}

// Loder
const loader = document.querySelector('.loader');

// Select input
const submitBtn = document.querySelector('.submit-btn');
const usr = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password_ = document.querySelector('#password-conf') || null;
const number = document.querySelector('#number') || null;
const tac = document.querySelector('#terms-and-condition') || null;


// Send event
let v = [password_,password];

for(i=0;i<2;i++){
    if(v[i] != null){
        v[i].addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                dataEvent();
            }
        })
    }
}

submitBtn.addEventListener('click', () => {
    dataEvent();
})

const dataEvent = () => {
    if (usr != null) { // signup
        if(password_.value != password.value){
            showAlert('Las claves no coinciden!');
        }else{
            // submit form
            loader.style.display = 'flex';
            sendData('/signup', {
                name: usr.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked,
                seller: false,
                apply: false
            });
        }
        
    } else { // login
        if (!email.value.length || !password.value.length) {
            showAlert('Hay campos vacios!');
        } else {
            loader.style.display = 'flex';
            sendData('/login', {
                email: email.value,
                password: password.value
            });
        }
    }
}

