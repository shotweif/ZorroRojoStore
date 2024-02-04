//----------------------------------------------------------------------
// InnerHtml NavBar

const createNav = () => {
    let nav = document.querySelector('.navbar');
    let nav_search = document.querySelector('.nav-search');
    nav.innerHTML = `
        <div class="nav">
            <a  href="/"><img src="img/logo/isotipo-t.svg" class="brand-logo" alt="ZorroRojoStore"></a>

            <ul class="link-cotainer link-cotainer--show" id="link-cotainer">
                <li class="link-item"><a href="/" class="link">Inicio</a></li>
                <li class="link-item"><a href="/cosplay" class="link">Cosplays</a></li>
                <li class="link-item"><a href="/products" class="link">Productos</a></li>
                <li class="link-item"><a href="/galery" class="link">Galeria</a></li>
                <li class="link-item"><a id="link-booking-d" class="link">✨ Reservar ✨</a></li>
            </ul>

            <div class="login-logout-popup hide">                                
                <div class="popup-container">   
                    <a><div class="a-container on-class">
                        <img src="img/comp/user/bxs-user.svg" class="on-class-img" alt="">
                        <h2 class="account-info on-class-txt-it">Inicia sesión para realizar pedidos</h2>
                    </div></a>
                    <a id="link-booking"><div class="a-container on-class">
                        <p class="account-info on-class-txt"><i class='bx bxs-receipt'></i> Reservar ✨</p>
                    </div></a>
                    <a id="link-config"><div class="a-container on-class">
                        <p class="account-info on-class-txt">Configuraciones</p>
                    </div></a>
                    <div class="menu-line"></div>
                    <button class="btn" id="user-btn">Iniciar Sesión</button>
                    <a href="/signup">
                        <p class="link-signup" id="link-signup">Crear nuevo usuario</p>
                    </a>
                </div>
            </div>

            <div class="nav-item">
                <div class="user-sect">
                    <div class="upload-b show-btn" id="upload-menu">
                        <a href="/seller"></a>
                    </div>
                    <div class="search-b">
                        <i class='bx bx-search-alt'></i>
                    </div>
                    <div class="user-cart">
                        <a>
                            <i class='bx bxs-cart'></i>
                        </a>
                    </div>
                    <div class="user-img">
                        <a>
                            <img src="img/comp/user/bxs-user.svg" id="user-img" alt="">
                        </a>
                    </div>
                    <div class="icon-hamburger" id="hamburger">
                        <i class='bx bx-menu'></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    nav_search.innerHTML = `
    <section class="search" id="search-bar">
        <input type="text" class="search-box" id="search" placeholder="Buscar productos...">
        <button class="search-btn">
            <i class='bx bx-search-alt'></i>
        </button>
    </section>
    `;
}

createNav();

//----------------------------------------------------------------------
// Hamburger funtion
const nav_bar = document.getElementById('link-cotainer');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    nav_bar.classList.toggle('link-cotainer--show');
})


//----------------------------------------------------------------------
// Search bar
const search_des = document.querySelector('.search-b');
const show_search_bar = document.getElementById('search-bar');

search_des.addEventListener('click', () => {
    show_search_bar.classList.toggle('search--show');
    search_des.classList.toggle('search--active');

    if (show_search_bar.classList.contains('search--show')) {
        document.getElementById("search").focus();
    }
})

//----------------------------------------------------------------------
// vap popup 
const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');
const actionBtn_create = document.querySelector('#link-signup');
const actionBtn_booking_d = document.querySelector('#link-booking-d');
const actionBtn_booking = document.querySelector('#link-booking');
const btn_upload = document.querySelector('#upload-menu');




userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
})

window.addEventListener('click', e => {
    if (!userPop.classList.contains('hide') && e.target != userPop && e.target != userImageButton && e.target != popuptext) {
        userPop.classList.toggle('hide');
    }
})

window.addEventListener ('load', function() {
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null) {
        // Means user is logged in
        popuptext.innerHTML = `${user.name}`;
        actionBtn.innerHTML = `Cerrar Sesión`;
        actionBtn_create.classList.add('link-signup--show');

        popuptext.addEventListener('click', () => {
            /*location.href = '/accountinfo';*/
        })
        actionBtn_booking.addEventListener('click', () => {
            location.href = '/booking';
        })
        actionBtn_booking_d.addEventListener('click', () => {
            location.href = '/booking';
        })
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
            location.href = '/'; // TEMP
        })

        if (user.seller != false) {
            btn_upload.innerHTML = `<a href="/seller"><i class='bx bx-upload'></i></a>`;
            btn_upload.classList.remove('show-btn');
        } else if(user.apply != false){
            btn_upload.innerHTML = `<a href="/seller"><i class='bx bxs-briefcase-alt-2'></i></a>`;
            btn_upload.classList.remove('show-btn');
        } else {
            btn_upload.classList.add('show-btn');
        }

    } else {
        // User is loget out
        popuptext.innerHTML = `Inicia sesión para realizar pedidos`;
        actionBtn.innerHTML = `Iniciar Sesión`;
        actionBtn_create.classList.remove('link-signup--show');

        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
        actionBtn_booking.addEventListener('click', () => {
            location.href = '/login';
        })
        actionBtn_booking_d.addEventListener('click', () => {
            location.href = '/login';
        })
    }
})
//----------------------------------------------------------------------
// Toggle
/*const save_menus = (element, classasign) => {
    element.classList.toggle(classasign);
}*/
