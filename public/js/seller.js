let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);

const becomeSellerElement = document.querySelector('.become-seller');
const productListingEnlement = document.querySelector('.product-listing');

const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');
const exitBtn = document.querySelector('#cancel-btn');

const productPageBtn = document.querySelector('#add-product');
const bookingPageBtn = document.querySelector('#add-booking');
const productPage = document.querySelector('#product-page');
const bookingPage = document.querySelector('#booking-page');

const btnAddActive = document.querySelector('.btn-p');
const btnSeeActive = document.querySelector('.btn-b');
const inputText = document.querySelector('.add-product-text');


// Check user is logged in
window.addEventListener ('load', function() {
    if (user) {
        if (compareToken(user.authToken, user.email)) {
            if (!user.seller) {
                becomeSellerElement.classList.remove('hide');
            } else if (!user.apply) {
                loader.style.display = 'flex';
                location.replace('/');

            } else {
                //productListingEnlement.classList.remove('hide');
                loader.style.display = 'flex';
                getEditBooking();
                setupProducts();
                setupBooking();
            }
        } else {
            location.replace('/login');
        }
    } else {
        location.replace('/login')
    }
})

//--------------------------------------------------------------------------------------
// Form btn
showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})
exitBtn.addEventListener('click', () => {
    becomeSellerElement.classList.remove('hide');
    applyForm.classList.add('hide');
    
})

//--------------------------------------------------------------------------------------
// Pages Alternate Product / Booking
const avtivePage = (activePage, removePage, text) => {
    activePage.classList.remove('displace');
    removePage.classList.add('displace');
    inputText.innerHTML = text;
}
if(productPage.classList.contains('displace')){
    avtivePage(bookingPage,productPage,'Gestionmar calendario');
    btnSeeActive.style.display = 'flex';
    btnAddActive.style.display = 'none';

}else{
    avtivePage(productPage,bookingPage,'Añadir nuevo producto');
    btnSeeActive.style.display = 'none';
    btnAddActive.style.display = 'flex';
}

productPageBtn.addEventListener('click', () => {
    avtivePage(productPage,bookingPage,'Añadir nuevo producto');
    btnSeeActive.style.display = 'none';
    btnAddActive.style.display = 'flex';
})
bookingPageBtn.addEventListener('click', () => {
    avtivePage(bookingPage,productPage,'Gestionmar calendario');
    btnSeeActive.style.display = 'flex';
    btnAddActive.style.display = 'none';
})


//--------------------------------------------------------------------------------------
// Form submission
const applyFormButon = document.querySelector('#apply-form-btn');
const busisnessName = document.querySelector('#business-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-condition');
const legalInfo = document.querySelector('#legitInfo');

applyFormButon.addEventListener('click', () => {
    if (!busisnessName.value.length || !address.value.length || !about.value.length || !number.value.length) {
        showAlert('Hay campos que estan vacios o son invalidos!');
    } else if (!tac.checked || !legalInfo.checked) {
        showAlert('Debes aceptar los terminos y condiciones!')
    } else {
        // Marking server request
        loader.style.display = 'flex';
        sendData('/seller', {
            name: busisnessName.value,
            address: address.value,
            about: about.value,
            number: number.value,
            tac: tac.checked,
            legit: legalInfo.checked,
            email: JSON.parse(sessionStorage.user).email
        });
    }
})

// Products list
const setupProducts = () => {
    fetch('/get-products', {
        method: 'POST',
        headers: new Headers({"Content-Type":"application/json"}),
        body: JSON.stringify({email: user.email})
    })
    .then(res => res.json())
    .then(data => {
        //loader.style.display = null;
        //productListingEnlement.classList.remove('hide');
        if(data == 'no products'){
            let emptySvg = document.querySelector('.no-product-image');
            emptySvg.classList.remove('hide');
        }else{
            data.forEach(product => createProduct(product));
            //console.log(data);
        }
    });
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
const getEditBooking = () => {
    fetch('/get-book', {
        method: 'POST',
        headers: new Headers({"Content-Type":"application/json"}),
        body: JSON.stringify({email: user.email})
    })
    .then(res => res.json())
    .then(data => {
        //loader.style.display = null;
        if(data == 'no booking'){
            btnSeeActive.addEventListener('click', () => {
                location.href='/booking-create';
            })
        }else{
            data.forEach(booking => {
                //console.log(booking.id)
                btnSeeActive.addEventListener('click', () => {
                    location.href=`/booking-create/${booking.id}`;
                })
            });
        }
    });
}


//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

const mailContainer = document.querySelectorAll('.mail-container') || null;

// Booking list
const setupBooking = () => {
    fetch('/get-booking-msg', {
        method: 'POST',
        headers: new Headers({"Content-Type":"application/json"}),
        body: JSON.stringify({email: user.email})
    })
    .then(res => res.json())
    .then(data => {
        loader.style.display = null;
        //productListingEnlement.classList.remove('hide');
        if(data == 'no newBooking'){
            let emptySvg = document.querySelector('.no-booking-image');
            emptySvg.classList.remove('hide');
        }else{
            data.forEach(newBooking => createBooking(newBooking));
        }
    });
}

