let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

window.addEventListener('load', function () {
    loader.style.display = 'flex';
    if (user) {
        if (compareToken(user.authToken, user.email)) {
            getDataFree();
        } else {
            location.replace('/login');
        }
    } else {
        location.replace('/login')
    }
})

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const des = document.querySelector('#description');


const freeData = document.querySelector('#data-list');
const submitBtn = document.querySelector('.submit-btn');
let sizes;
let pay;

const tac = document.querySelector('#terms-and-condition');

const chargerUserData = () => {
    name.value = user.name;
    email.value = user.email;
    if (user.number != undefined) {
        number.value = user.number;
    }
}

// Get date free
let newBooking = [];

const getDataFree = () => {
    fetch('/get-book', {
        method: 'POST',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ email: user.email })
    })
        .then(res => res.json())
        .then(data => {
            //loader.style.display = null;
            if (data == 'no booking') {
                nonBooking();
            } else {
                data.forEach(booking => {
                    loader.style.display = null;
                    if (booking.dataBooking && booking.dataBooking.length > 0) {
                        for (i = 0; i < booking.dataBooking.length; i++) {
                            newBooking.push(booking.dataBookingfree[i]);
                            if (booking.dataBookingfree[i] != 0) {
                                freeData.innerHTML += `
                                    <option value="${booking.dataBooking[i]}">${booking.dataBooking[i]}</option>
                                `;
                            }
                        }
                    } else {
                        nonBooking();
                    }
                    if (freeData.value == '') {
                        freeData.innerHTML += `
                            <option value="no-value">Reservaciones terminadas</option>
                        `;
                    }
                });
            }
        });
}

const nonBooking = () => {
    freeData.innerHTML += `
        <option value="">No hay fechas activas</option>
    `;
    submitBtn.disabled = true;
    submitBtn.style.background = '#e9c1a6';
}

const mineDataBtn = document.querySelector('.btn-mine');
mineDataBtn.addEventListener('click', () => {
    mineDataBtn.classList.toggle('data-active')

    if (mineDataBtn.classList.contains('data-active')) {
        chargerUserData();
    } else {
        name.value = '';
        email.value = '';
        number.value = '';
    }

})

// Save size select
let sizeBtn = document.querySelectorAll('.size-btn');
let payBtn = document.querySelectorAll('.pay-btn');
let checkedBtn = 0;
let checkedBtn2 = 0;

sizeBtn.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtn[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
        sizes = item.textContent;
    })
})
payBtn.forEach((item, i) => {
    item.addEventListener('click', () => {
        payBtn[checkedBtn2].classList.remove('check');
        item.classList.add('check');
        checkedBtn2 = i;
        pay = item.textContent;
    })
})
const dateCheck = () => {
    sizeBtn.forEach((item, i) => {
        if (item.classList.contains('check')) {
            sizes = item.textContent;
        }
    })
    payBtn.forEach((item, i) => {
        if (item.classList.contains('check')) {
            pay = item.textContent;
        }
    })
}


//----------------------------------------------------------------------------------------
submitBtn.addEventListener('click', () => {
    if (freeData.value != 'no-value') {

        dateCheck();
        getDataFreeNum();
        dataEvent();
    } else {
        showAlert('Lo sentimos, las reservas se llenaron :(');
    }
})


/*---------------------------------------------------------------------------*/
const bookingtData = () => {
    let data;
    return data = {
        name: storeName,
        dataBooking: bookingDates,
        dataBookingfree: stateBokingFree,
        allBoking: allBoking.value,
        bookingtake: bookingtake.value,
        freeBooking: freeBooking.value,
    }
}
const getDataFreeNum = () => {

    fetch('/get-book', {
        method: 'POST',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ email: user.email })
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(booking => {
                //console.log(booking.dataBooking, booking.dataBooking.length)
                if (booking.dataBooking && booking.dataBooking.length > 0) {
                    for (i = 0; i < booking.dataBooking.length; i++) {
                        if (booking.dataBookingfree[i] != 0 && booking.dataBooking[i] == freeData.value) {
                            newBooking[i] = booking.dataBookingfree[i] - 1;
                            //console.log(newBooking[i])
                        }
                    }
                    booking.dataBookingfree = newBooking;
                    //console.log(booking.dataBookingfree)
                    sendData('/booking-create', booking);
                }
            });
        });
}

/*---------------------------------------------------------------------------*/
var date = new Date();
var day = ("0" + date.getDate()).slice(-2);
var month = ("0" + (date.getMonth() + 1)).slice(-2);
var year = date.getFullYear();
var dateSave = (year + '-' + month + '-' + day);

const dataEvent = () => {
    if (!name.value || !email.value || !number.value) {
        showAlert('Debes llenar todos los campos!');
    } else {
        // submit form
        loader.style.display = 'flex';
        sendData('/booking', {
            name: name.value,
            email_s: email.value,
            number: number.value,
            freeData: freeData.value,
            des: des.value,
            size: sizes,
            pay: pay,
            tac: tac.checked,
            email: user.email,
            dateCreate: dateSave,
        });
    }
}

