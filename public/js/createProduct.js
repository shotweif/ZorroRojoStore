let openEditor;
const createProduct = (data) => {

    openEditor = () => {
        sessionStorage.tempProduct = JSON.stringify(data);
        //console.log("ENTRADA")
        //console.log(sessionStorage.tempProduct)
        return `
        <button class="card-action-btn edit-btn" onclick="location.href='/add-product/${data.id}'">
            <img src="img/comp/bxs-edit-alt.svg" alt="">
        </button>`
    }
    priceShow = () => {
        //console.log(data.name[1])
        if(data.discount != 0){
            return `
            <span class="price">$${data.sellPrice}</span>
            <span class="actial-price">$${data.actualPrice}</span>`;
        }else{
            return `
            <span class="price">$${data.sellPrice}</span>`
        }
    }
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
        <div class="product-image">
            ${data.draft ? `<span class="tag">Draft</span>`:''}
            <img src="${data.image[0] || 'img/comp/instagram-post-flatline.svg'}" class="product-thumb" alt="">
            ${openEditor()}
            <button class="card-action-btn open-btn" onclick="location.href='/${data.id}'">
                <img src="img/comp/bx-show.svg" alt="">
            </button>
            <button class="card-action-btn delete-popup-btn" onclick="openDeletePopup('${data.id}', '${data.name}')">
                <img src="img/comp/bx-trash.svg" alt="">
            </button>
        </div>
        <div class="product-info">
            <h2 class="product-brand">${data.name}</h2>
            <p class="product-short-des">${data.shorDes}</p>
            ${priceShow()}
        </div>
    </div>
    `;
}

// Delete popup btn
const openDeletePopup = (id, name) => {
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => deleteAlert.style.display = 'none');

    let deleteBtn = document.querySelector('.delete-btn');
    let deleteMsg = document.querySelector('.text-del-element');
    deleteMsg.innerHTML = `Estas seguro de querer eliminar el Producto: `+name+`?`;
    deleteBtn.addEventListener('click', () => deleteItem(id))
}

const deleteItem = (id) => {
    fetch('/delete-product', {
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

