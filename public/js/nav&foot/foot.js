const createFoot = () => {
    let foot = document.querySelector('.footer');
    foot.innerHTML = `
    <div class="footer-content">
        <img src="img/logo/isotipo.svg" disabled class="logo" alt="">
        <div class="footer-zrs-social">
            <h1 class="footer-text footer-store-name">Zorro Rojo Store</h1>
            <p class="footer-text">Trabajamos bajo medida o con medidas estándar según el gusto y la comodidad de nuestro cliente.
                Preferimos trabajar con las telas que disponemos completamente dentro del taller, ya que sabemos como trabajan cada una de las telas y la cantidad exacta que se necesita para cada traje.
            </p>
            
            <h4 class="footer-text sub-text">Si necesitas asesoramiento cotactanos.</h4>
            <p class="footer-text cont-txt">Correo: zorrorojostore001@gmail.com</p>
            <p class="footer-text cont-txt">Numero: +593 96 365 7812</p>
            <div class="social-media">
                <a href="https://www.facebook.com/zorrorojostore01" target="_blank">
                    <div class="social-icon"><i class='bx bxl-facebook'></i></div>
                </a>
                <a href="https://www.instagram.com/zorrorojo_store01/" target="_blank">
                    <div class="social-icon"><i class='bx bxl-instagram' ></i></div>
                </a>
                <a href="https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2Fil7i26&e=AT2W9oAW7EjPD6KX0NUycje9MV9aytVvsd-Yv1fHa2-vBVB6ha1JkKZQ9djzFzkXe1JaAeWqGzHVlP5RKOWaOpHXgL3pcQnHBND617wR9q3CUsPHDQLCBg" target="_blank">
                    <div class="social-icon"><i class='bx bxl-whatsapp' ></i></div>
                </a>
                <a href="#" target="_blank">
                    <div class="social-icon"><i class='bx bxl-gmail' ></i></div>
                </a>
            </div>
        </div>
        <div class="footer-map-container">
            

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31917.99364212949!2d-78.564153!3d-0.3372470000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5a32e95c0921b%3A0xec2f552890d84fe1!2sZorro%20Rojo%20Store!5e0!3m2!1ses!2sec!4v1707017479048!5m2!1ses!2sec" 
            width="100%" height="100%" style="border:0;" allowfullscreen="" 
            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
    `;
}

createFoot();