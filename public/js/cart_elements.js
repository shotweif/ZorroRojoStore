const createCartEspetial = () => {
    let cart_new = document.querySelector('.product-new');
    cart_new.innerHTML = `
    <section class="product-card-container">
        <div class="product">
            <h2 class="product-category">Nuevos trabajos 🪡</h2>
            <div class="product-container">

                <div class="product-card-">
                    <a href="#">
                        <div class="product-image">
                            <!--span class="discount-tag">10% Off</span-->
                            <img src="img/imagen-008.jpg" class="product-thumb" alt="">
                            <!--button class="card-btn">Comprar <i class='bx bx-cart-add' ></i> </button-->
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">💜GIORNO GIOVANNA💜</h2>
                            <p class="product-short-des">Cosplay de uno de los personajes del anime...</p>
                            <!--span class="price">$20</span><span class="actial-price">$40</span-->
                        </div>
                    </a>
                </div>
                <div class="product-card-">
                    <a href="#">
                        <div class="product-image">
                            <!--span class="discount-tag">10% Off</span-->
                            <img src="img/imagen-009.jpg" class="product-thumb" alt="">
                            <!--button class="card-btn">Comprar <i class='bx bx-cart-add' ></i> </button-->
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">✨OSAMU DAZAI✨</h2>
                            <p class="product-short-des">Cosplay de uno de los personajes del anime...</p>
                            <!--span class="price">$20</span><span class="actial-price">$40</span-->
                        </div>
                    </a>
                </div>
                <div class="product-card-">
                    <a href="#">
                        <div class="product-image">
                            <!--span class="discount-tag">10% Off</span-->
                            <img src="img/imagen-010.jpg" class="product-thumb" alt="">
                            <!--button class="card-btn">Comprar <i class='bx bx-cart-add' ></i> </button-->
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">💖PRINCESS PEACH💖</h2>
                            <p class="product-short-des">Cosplay de uno de los personajes del anime...</p>
                            <!--span class="price">$20</span><span class="actial-price">$40</span-->
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
    `;
}




createCartEspetial();