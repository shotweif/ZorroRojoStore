const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
//const { get } = require('https');

// Firebase admin setup -----------------------------
let serviceAccount = require("./zorrorojos-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// Declare Port --------------------------------------
const PORT = 3000;

// Declare static path -------------------------------
let staticPath = path.join(__dirname, 'public')

// Initializing ---------------------------------------
const app = express();

// Middlewares
app.use(express.static(staticPath));
app.use(express.json());

// Routes ---------------------------------------------
// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})
//-------------------------------------------------------------------
// Signup route
app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})
app.post('/signup', (req, res) => {
    let { name, email, password, number, tac } = req.body;

    // Form validations
    if (name.length < 3) {
        return res.json({ 'alert': 'El nombre debe contener mas de 3 caracteres!' });
    } else if (!email.length) {
        return res.json({ 'alert': 'Ingrese su correo electronico!' });
    } else if (password.length < 8) {
        return res.json({ 'alert': 'La clave debe ser mayor a 8 caracteres!' });
    } else if (number != 0) {
        if (!Number(number) || number.length != 10) {
            return res.json({ 'alert': 'Ingresa un numero valido!' });
        }
    } else if (!tac) {
        return res.json({ 'alert': 'Debes aceptar los terminos y condiciones!' });
    }
    // Store user in db
    db.collection('users').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'Corro ya registrado!' });
            } else {
                // Encript the password before storing it
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body)
                            .then(data => {
                                res.json({
                                    name: req.body.name,
                                    email: req.body.email,
                                    seller: req.body.seller,
                                    apply: req.body.apply

                                })
                            })
                    })
                })
            }
        })
})
//-------------------------------------------------------------------
// Login
app.get("/login", (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})
app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if (!email.length || !password.length) {
        return res.json({ 'alert': 'Hay campos vacios!' });
    }

    db.collection('users').doc(email).get()
        .then(user => {
            if (!user.exists) {
                return res.json({ 'alert': 'El correo o la contraseña estan incorrectos!' });
            } else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if (result) {
                        let data = user.data();
                        return res.json({
                            name: data.name,
                            email: data.email,
                            seller: data.seller,
                            apply: data.apply
                        })
                    } else {
                        return res.json({ 'alert': 'El correo o la contraseña estan incorrectos!' });
                    }
                })
            }
        })
})
//-------------------------------------------------------------------
// Seller
app.get("/seller", (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})
app.post('/seller', (req, res) => {
    let { name, about, address, number, tac, legit, email } = req.body;
    if (!name.length || !address.length || !about.length || number.length != 10 || !Number(number)) {
        return res.json({ 'alert': 'Hay campos que estan vacios o son invalidos!' });
    } else if (!tac || !legit) {
        return res.json({ 'alert': 'Debes aceptar los terminos y condiciones' });
    } else {
        // Update user seller status
        db.collection('sellers').doc(email).set(req.body)
            .then(data => {
                db.collection('users').doc(email).update({
                    seller: true,
                }).then(data => {
                    res.json(true);
                })
            })
    }

})
//-------------------------------------------------------------------
// Products
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})
app.get('/add-product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})
// Add products
app.post('/add-product', (req, res) => {
    let { name, shorDes, des, image, sizes, actualPrice, discount,
        sellPrice, stock, tags, tac, email, draft, id } = req.body;

    if (!draft) {
        // velidation
        if (!name.length) {
            return res.json({ 'alert': 'Debe ingresar el nombre del producto!' });
        } else if (shorDes.length > 100 || shorDes.length < 10) {
            return res.json({ 'alert': 'La descripccion debe ser de mini 10 y maximo 100 letras!' });
        } else if (!des.length) {
            return res.json({ 'alert': 'Ingresa una descripccion del producto!' });
        } else if (!actualPrice.length) {
            return res.json({ 'alert': 'Agrega el precio del producto!' });
        } else if (!tags.length) {
            return res.json({ 'alert': 'Agrega alguna etiqueta para clasificar el producto!' });
        } else if (!tac) {
            return res.json({ 'alert': 'Acepto los terminos y condiciones!' });
        }
    }
    // Add product
    let docName = id == undefined ? `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}` : id;
    db.collection('products').doc(docName).set(req.body)
        .then(data => {
            res.json({ 'product': name });
        })
        .catch(err => {
            return res.json({ 'alert': 'Ha ocurrido un error. Intenta mas tarde!!!' });
        });
})
//-------------------------------------------------------------------
// Get products
app.post('/get-products', (req, res) => {
    let { email, id } = req.body;
    let docRef = id ? db.collection('products').doc(id) : db.collection('products')/*.where('email', '==', email)*/;

    docRef.get()
        .then(products => {
            if (products.empty) {
                return res.json('no products');
            }
            let productArr = [];
            //console.log(id)
            //console.log(productArr)
            if (id) {
                return res.json(products.data());
            } else {
                products.forEach(item => {
                    let data = item.data();
                    data.id = item.id;
                    productArr.push(data);
                })
                res.json(productArr);
            }
        })
})
//-------------------------------------------------------------------
// Edit booking
app.get('/booking-create', (req, res) => {
    res.sendFile(path.join(staticPath, "bookingCreate.html"));
})
app.get('/booking-create/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "bookingCreate.html"));
})
// Gnerate booking
app.post('/booking-create', (req, res) => {
    let { name, dataBooking, dataBookingfree, allBoking, bookingtake, freeBooking, email, id } = req.body;

    // Edit booking
    let docName = id == undefined ? `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}` : id;
    db.collection('booking').doc(docName).set(req.body)
        .then(data => {
            res.json({ 'book': name });
        })
        .catch(err => {
            return res.json({ 'alert': 'Ha ocurrido un error. Intenta mas tarde!!!' });
        });
})
// Get date booking
app.post('/get-book', (req, res) => {
    let { email, id } = req.body;
    let docRef = id ? db.collection('booking').doc(id) : db.collection('booking');

    docRef.get()
        .then(booking => {
            if (booking.empty) {
                return res.json('no booking');
            }
            let productArr = [];
            //console.log(id)
            //console.log(productArr)
            if (id) {
                return res.json(booking.data());
            } else {
                booking.forEach(item => {
                    let data = item.data();
                    data.id = item.id;
                    productArr.push(data);
                })
                res.json(productArr);
            }
        })
})
//-------------------------------------------------------------------
// Booking
app.get('/booking', (req, res) => {
    res.sendFile(path.join(staticPath, "booking.html"));
})

// Send Date Booking create
app.post('/booking', (req, res) => {
    let { name, email_s, number, freeData, size, pay, tac, email, 
        dateCreate, id } = req.body;

    // velidation
    if (!name.length) {
        return res.json({ 'alert': 'Debe ingresar el nombre del producto!' });
    } else if (!email_s.length) {
        return res.json({ 'alert': 'Debe ingresar un correo!' });
    } else if (!Number(number) || number.length != 10) {
        return res.json({ 'alert': 'Ingresa un numero valido!' });
    } else if (!tac) {
        return res.json({ 'alert': 'Acepto los terminos y condiciones!' });
    }
    console.log('valor de save: ',dateCreate)

    // Add product
    let docName = id == undefined ? `${dateCreate}-${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}` : id;
    db.collection('newBooking').doc(docName).set(req.body)
        .then(data => {
            res.json({ 'newbooking': name });
        })
        .catch(err => {
            return res.json({ 'alert': 'Ha ocurrido un error. Intenta mas tarde!!!' });
        });
})
app.post('/get-booking-msg', (req, res) => {
    let { email, id } = req.body;
    let docRef = id ? db.collection('newBooking').doc(id) : db.collection('newBooking');
    
    docRef.get()
        .then(newBooking => {
            if (newBooking.empty) {
                return res.json('no newBooking');
            }
            let newBookingArr = [];
            //console.log(id)
            //console.log(newBookingArr)
            if (id) {
                console.log(id);
                return res.json(newBooking.data());
            } else {
                newBooking.forEach(item => {
                    let data = item.data();
                    data.id = item.id;
                    newBookingArr.push(data);
                })
                res.json(newBookingArr);
            }
        })
})
//-------------------------------------------------------------------
// Delete Messager
app.post('/delete-bookingMsg', (req, res) => {
    let { id } = req.body;

    db.collection("newBooking").doc(id).delete()
        .then((data) => {
            res.json('success');
        }).catch(err => {
            res.json('err');
        })//.documentID;
})
//-------------------------------------------------------------------
// Delete products
app.post('/delete-product', (req, res) => {
    let { id } = req.body;

    db.collection("products").doc(id).delete()
        .then((data) => {
            res.json('success');
        }).catch(err => {
            res.json('err');
        })//.documentID;
})
//-------------------------------------------------------------------
// Profile
app.get('/profile', (req, res) => {
    res.sendFile(path.join(staticPath, "profile.html"));
})


//-------------------------------------------------------------------
// 404 route
app.get("/404", (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})
app.use((req, res) => {
    res.redirect("/404");
})
// Server port conection ------------------------------
app.listen(PORT, () => {
    console.log('listening on port 3000...')
})
