const createBooking = (data) => {

    openDescrip = () => {
        console.log('Click ',data.id)
    }

    let bookingContainer = document.querySelector('.booking-container');
    bookingContainer.innerHTML += `
    <div class="mail-container-">
        <div class="booking-list" >
            <div class="booking-info" onclick="openDescript('${data.id}')">
                <div class="booking-image">
                    <img src="img/comp/user/bxs-user-w.svg" alt="">
                </div>
                <div class="user-info-book">
                    <h4 class="user-email" id="cliente-mail">${data.email_s}</h4>
                    <p class="booking-short-des" id="cliente-des">${data.des}</p>
                    <h4 class="data-info" id="cliente-data-send">${data.dateCreate}</h4>
                </div>
            </div>
            <div class="booking-btn">
                <button class="btn-delete-booking"><img src="img/comp/bx-trash.svg" onclick="openDeletePopupMsg('${data.id}' ,'${data.email_s}')"></button>
            </div>
        </div>
        <div class="mail-container" id="${data.id}">
            <div class="by-mail">
                <h4 class="user-name-des" id="cliente-mail">${data.name}</h4>
                <p class="user-email-des" id="cliente-mail"> ${data.email_s}</p>
            </div>
            <p class="cliente-description">${data.des || 'No hay descripcion.'}</p>

            <div class="by-cont">
                <h4 class="booking-data-select">Fecha: </h4><p> ${data.freeData}</p>
            </div>
            <div class="by-cont">
                <h4 class="size-class">Tamaño: </h4><p> ${data.size}</p>
            </div>
            <div class="by-cont">
                <h4 class="pay">Metodo de pago: </h4><p> ${data.pay}</p>
            </div>
            <!--p class="number-contact">Numero de contacto: <a href="tel:${data.number}">${data.number}</a></p-->
            <p class="number-contact">Numero de contacto: <a href="https://wa.me/${data.number}" target="_blank">${data.number}</a></p>
        </div>
    </div>
    `;
}

// open descriptiom
openDescript = (id) => {
    const btnDescript = document.querySelectorAll('.mail-container');

    btnDescript.forEach(item => {
        if(item.id === id){
            item.classList.toggle('show-descript');
        }else{
            item.classList.remove('show-descript');
        }
    })

}

// Delete popup btn
const openDeletePopupMsg = (id, email) => {
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => deleteAlert.style.display = 'none');

    let deleteBtn = document.querySelector('.delete-btn');
    let deleteMsg = document.querySelector('.text-del-element');
    deleteMsg.innerHTML = `Estas seguro de querer eliminar el Mensaje de: ${email}?`;
    deleteBtn.addEventListener('click', () => deleteItemBooking(id))
}

const deleteItemBooking = (id) => {
    fetch('/delete-bookingMsg', {
        method: "POST",
        headers: new Headers({"Content-Type":"application/json"}),
        body: JSON.stringify({id : id})
    }).then(res => res.json())
    .then(data => {
        if(data == 'success'){
            location.reload();
        }else{
            showAlert('Ha ocurrido un error al eliminar el producto !!');
        }
    })
}