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
//---------------------------------------------------------------------------------
// Price inputs
const actualPrice = document.querySelector('#actual-price');
const discountPrice = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPrice.addEventListener('input', () => {
    if (discountPrice.value >= 100) {
        discountPrice.value = 90;
        descountCalc();

    } else {
        descountCalc();
    }
})
actualPrice.addEventListener('input', () => {
    descountCalc();
})

const descountCalc = () => {
    let discount = actualPrice.value * discountPrice.value / 100;
    sellingPrice.value = (actualPrice.value - discount).toFixed(2);
}

sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPrice.value = discount.toFixed(0);
})

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// Upload image handle
const productName = document.querySelector('#product-name');
let uploadImages = document.querySelectorAll('.fileupload');
let productImage = document.querySelector('.product-image');
let productImageIco = document.querySelector('.bxs-file-image');

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];

        if (file) {
            const reader = new FileReader();
            productImageIco.style.display = 'none';
            reader.addEventListener('load', function () {
                let imageDir;
                let label = document.querySelector(`label[for=${fileupload.id}]`);
                // Muestra la imagen en el elemento de vista previa
                imageDir = ('src', this.result);
                label.style.backgroundImage = `url(${imageDir})`;
                productImage.style.backgroundImage = `url(${imageDir})`;
            });

            reader.readAsDataURL(file);
        }
    })
})

//---------------------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js';
let imagePath = [];



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx",
    projectId: "xxxx",
    storageBucket: "xxxx.com",
    messagingSenderId: "xxxx",
    appId: "xxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Upload funtion
const storage = getStorage(app);
let photoName;

async function uploadFile(file) {
    photoName = productName.value + "-" + generarIdAleatorio();
    const storageRef = ref(storage, photoName);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}
//---------------------------------------------------------------------------------
function generarIdAleatorio() {
    // Genera un número aleatorio entre 1000 y 9999
    function generarNumero() {
        return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }
    return `${generarNumero()}-${generarNumero()}-${generarNumero()}`;
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// Form submission
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

let sizes = [];

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

// Buttons
const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');
const exitAdd = document.querySelector('#canel-btn');

exitAdd.addEventListener('click', () => {
    location.replace('/seller');
})

const storeSize = () => {
    sizes = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item => {
        if (item.checked) {
            sizes.push(item.value)
        }
    })
}

const valideForm = () => {
    if (!productName.value.length) {
        return showAlert('Debe ingresar el nombre del producto!');
    } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
        return showAlert('La descripccion debe ser de mini 10 y maximo 100 letras!');
    } else if (!des.value.length) {
        return showAlert('Ingresa una descripccion del producto!');
    } else if (!actualPrice.value.length) {
        return showAlert('Agrega el precio del producto!');
    } else if (!tags.value.length) {
        return showAlert('Agrega alguna etiqueta para clasificar el producto!');
    } else if (!tac.checked) {
        return showAlert('Acepto los terminos y condiciones!');
    }
    return true;
}

const productData = () => {
    let data;
    uploadImages.forEach(async (fileupload, index) => {
        const file = fileupload.files[0];
        if (file) {
            const result = await uploadFile(file);
            imagePath[index] = result;
        }
    });

    return data = {
        name: productName.value,
        shorDes: shortLine.value,
        des: des.value,
        image: imagePath,
        sizes: sizes,
        actualPrice: actualPrice.value,
        discount: discountPrice.value,
        sellPrice: sellingPrice.value,
        stock: stock.value,
        tags: tags.value,
        tac: tac.checked,
        email: user.email,
    }
}

// Add new product -----------------------------
addProductBtn.addEventListener('click', () => {
    storeSize();
    //Validate form
    if (valideForm()) {
        loader.style.display = 'flex';
        setTimeout(() => {
            let data = productData();
            if (productId) {
                data.id = productId;
            }
            sendData('/add-product', data);
        }, 3000);
    }
})

// Save draft btn ----------------------------
saveDraft.addEventListener('click', () => {
    storeSize();
    //check for product name
    if (!productName.value.length) {
        showAlert('Ingrese nombre del producto.');
    } else {
        loader.style.display = 'flex';
        let data = productData();
        setTimeout(() => {
            data.draft = true;
            if (productId) {
                data.id = productId;
            }
            sendData('/add-product', data);
        }, 3000);
    }
})

// Exisiting product detail handle
const setFotmData = (data) => {
    productName.value = data.name;
    shortLine.value = data.shorDes;
    des.value = data.des;
    actualPrice.value = data.actualPrice;
    discountPrice.value = data.discount;
    sellingPrice.value = data.sellPrice;
    stock.value = data.stock;
    tags.value = data.tags;

    // Setup images
    imagePath = data.image;
    imagePath.forEach((url, i) => {
        productImageIco.style.display = 'none';
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`);
        // Muestra la imagen en el elemento de vista previa
        label.style.backgroundImage = `url(${url})`;
        productImage.style.backgroundImage = `url(${url})`;
    })

    // Setup size
    sizes = data.sizes;

    let sizeCheckbox = document.querySelectorAll('.size-checkbox');
    sizeCheckbox.forEach(item => {
        if (sizes.includes(item.value)) {
            item.setAttribute('checked', '');
        }
    })
}

const fetchProductData = () => {
    // Delete the tempProduct from the session
    delete sessionStorage.tempProduct;
    fetch('/get-products', {
        method: 'POST',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ email: user.email, id: productId })
    })
    .then((res) => res.json())
    .then((data) => {
        //console.log(data.id)
        setFotmData(data);
    })
    .catch(err => {
        location.replace('/seller')
    })
}

let productId = null;
if (location.pathname != '/add-product') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}



