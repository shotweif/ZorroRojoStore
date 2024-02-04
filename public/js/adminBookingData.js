let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// Check user is logged in
window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login');
        }
    } else {
        location.replace('/login')
    }
}

//---------------------------------------------------------------------------------
// Boking statte
const addProductBtn = document.querySelector('#add-btn');
const exitAdd = document.querySelector('#canel-btn');
const storeName = 'ZorroRojoStore';

const allBoking = document.querySelector('#actual-price');
const bookingtake = document.querySelector('#discount');
const freeBooking = document.querySelector('#sell-price');

const dateSelect = document.querySelector('#date-select');
const bookNum = document.querySelector('#booking-num');
let sizeCheckBox = document.querySelectorAll('.size-checkbox');

if(!Number(allBoking.value)){
    allBoking.value = 0;
}

sizeCheckBox.forEach(item => {
    item.addEventListener('click', () => {
        dataBooking()
        let freeDay = ((allBoking.value*numMonth) - bookingtake.value);
        freeBooking.value = freeDay;
        bookingtake.value = 0;
        //freeBooking.value = 0;
    })
})

allBoking.addEventListener('input', () => {
    dataBooking()
    let freeDay = ((allBoking.value*numMonth) - bookingtake.value);
    freeBooking.value = freeDay;
})

bookingtake.addEventListener('input', () => {
    let freeDay = ((allBoking.value*numMonth) - bookingtake.value);
    freeBooking.value = freeDay;
})

let bookingDates = [];
let stateBokingFree = [];
let numMonth = 0;

exitAdd.addEventListener('click', () => {
    location.replace('/seller');
})

const dataBooking = () => {
    bookingDates = [];
    stateBokingFree = [];
    numMonth = 0;
    sizeCheckBox.forEach(item => {
        if (item.checked) {
            bookingDates.push(item.value)
            stateBokingFree.push(allBoking.value);
            //printList(item)
            numMonth++;
        }
    })
}

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

addProductBtn.addEventListener('click', () => {
    //dataBooking()
    loader.style.display = 'flex';
    let data = bookingtData();
    if (bookingId) {  
        data.id = bookingId;
    }
    sendData('/booking-create', data);
})

// Exisiting booking detail handle
let reserv = 0;
const setFotmData = (data) => {
    allBoking.value = data.allBoking;

    // Setup size
    bookingDates = data.dataBooking;
    stateBokingFree = data.dataBookingfree;

    let sizeCheckbox = document.querySelectorAll('.size-checkbox');
    sizeCheckbox.forEach(item => {
        if (bookingDates.includes(item.value)) {
            item.setAttribute('checked', '');
            dateSelect.innerHTML +=`<p class="date-act-name center-line">${item.value}</p>`;            
            numMonth++;
        }
    })
    bookNum

    stateBokingFree.forEach(item => {
        bookNum.innerHTML +=` <input id="date-act-name" class="date-act-name" value="${item}" type="number">`;         
        //reserv +=  parseInt(item);
    })
    defin(stateBokingFree);
    editable();
    loader.style.display = 'none';

}

const editable = () => {
    const sleectFree = document.querySelectorAll('#date-act-name');
    sleectFree.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.value)
            defin(sleectFree);
        })
    })
        
}

const defin = (item) => {
    reserv = 0;
    stateBokingFree = [];

    item.forEach(item => {
        if(item.value){
            reserv +=  parseInt(item.value);
            stateBokingFree.push(item.value)

        }else{
            reserv +=  parseInt(item);
            stateBokingFree.push(item)
        }
    })
    bookingtake.value = (allBoking.value*numMonth-reserv);
    freeBooking.value = reserv;
}

const fetchBookingData = () => {
    // Delete the tempProduct from the session
    delete sessionStorage.tempProduct;
    fetch('/get-book', {
        method: 'POST',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ email: user.email, id: bookingId })
    })
    .then((res) => res.json())
    .then((data) => {
        //console.log(data)
        loader.style.display = 'flex';
        setFotmData(data);
    })
    .catch(err => {
        location.replace('/seller')
        console.log(err)
    })
}
let bookingId = null;
if (location.pathname != '/booking-create') {
    bookingId = decodeURI(location.pathname.split('/').pop());
    fetchBookingData();
}