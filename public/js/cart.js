//-------------------------------------------------------------------------------
// Model #1
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.next-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimentions = item.getBoundingClientRect();
    let containerWidth = containerDimentions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += (containerWidth);
    })
    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= (containerWidth);
    })
})

//-------------------------------------------------------------------------------
// Model #2
/*const product_image = [...document.querySelectorAll('.product-images')];
const nxt_Btn = [...document.querySelectorAll('.next')];
const pre_Btn = [...document.querySelectorAll('.prev')];

product_image.forEach((item, i) => {
    let containerDimentions = item.getBoundingClientRect();
    let containerWidth = containerDimentions.width;

    nxt_Btn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })
    pre_Btn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
*/