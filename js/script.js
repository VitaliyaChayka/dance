"use strict"

//ждем загрузку контента

window.onload = function () {
   const parallax = document.querySelector('.parallax');

   if (parallax) {
      const content = document.querySelector('.parallax__container');
      const triangle = document.querySelector('.images-parallax__triangle');
      const woman = document.querySelector('.images-parallax__woman');
      const fon = document.querySelector('.images-parallax__fon');

      //коэффициенты
      const forFon = 40;
      const forTriangle = 50;
      const forWoman = 30;

      //скорость анимации
      const speed = 0.08;

      //объявление переменных
      let positionX = 0,
          positionY = 0;

      let coordXprocent = 0,
          coordYprocent = 0;

      function setMouseParallaxStyle() {
         const distX = coordXprocent - positionX;
         const distY = coordYprocent - positionY;

         positionX = positionX + (distX * speed);
         positionY = positionY + (distY * speed);

         //передаем стили
         fon.style.cssText = `transform: translate(${positionX / forFon}%,${positionY / forFon}%);`;
         triangle.style.cssText = `transform: translate(${positionX / forTriangle}%,${positionY / forTriangle}%);`;
         woman.style.cssText = `transform: translate(${positionX / forWoman}%,${positionY / forWoman}%);`;

         requestAnimationFrame(setMouseParallaxStyle);
      }
      setMouseParallaxStyle();


      parallax.addEventListener("mousemove", function (e) {

         const parallaxWidth = parallax.offsetWidth;
         const parallaxHeight = parallax.offsetHeight;
         //ноль по середине
         const coordX = e.pageX - parallaxWidth / 2;
         const coordY = e.pageY - parallaxHeight / 2;
         //получаем проценты
         coordXprocent = coordX / parallaxWidth * 100;
         coordYprocent = coordY / parallaxHeight * 100;

      });

      // parallax  при скролле      

      let thresholdSets = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
         thresholdSets.push(i);
      }
      const callback = function (entries, observer) {
         const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
         setParallaxItemStyle(scrollTopProcent);
      };

      const observer = new IntersectionObserver(callback, {
         threshold: thresholdSets

      });

      observer.observe(document.querySelector('.content'));

      function setParallaxItemStyle(scrollTopProcent) {
         content.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
         triangle.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
         woman.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 10}%);`;
      }
   }
}

/////////////////////////burger


let burger = document.querySelector('.header__burger');
let nav = document.querySelector('.nav');
let body = document.getElementsByTagName('body');

burger.addEventListener('click', function(){
    burger.classList.toggle('active');
    nav.classList.toggle('active');
})

nav.addEventListener('click', function(){
    burger.classList.remove('active');
    nav.classList.remove('active');
 })

 ///////////////// fon header

let header = document.querySelector('.header');
let wHeight = window.innerHeight;

window.addEventListener("scroll", function() {

   if (wHeight  < window.pageYOffset){
      header.classList.add('active2')
   }
   else{
      header.classList.remove('active2')

   }
}) 

/////// 

      // let popup = document.querySelector('.popup');
      // let btnOpen = document.querySelector('.btn-open');
      // let btnClose =  document.querySelector('.btn-close');
   
    
      // btnOpen.addEventListener('click', function(){
      //    popup.classList.add('active3')
      // })
      // btnClose.addEventListener('click', function(){
      //    popup.classList.remove('active3')
      // })
 
/////////////////////modal


let popup = document.querySelector('.popup');
let btnClose =  document.querySelector('.btn-close');

function togglePopup(popup) {
   popup.classList.toggle('active3');
}

function closePopup(popup) {
   popup.classList.remove('active3');
}

function initPopup() {
   const buttonsArr = [...document.querySelectorAll('.price__btn')];

   if (!buttonsArr.length) {
      return;
   }

   buttonsArr.forEach(button => {
      
      button.addEventListener('click', () => {
         togglePopup(popup);
      });

      btnClose.addEventListener('click', () => {
         closePopup(popup);
      });

   })
}
initPopup();


////////////////////////////////// icon scrollup

window.addEventListener('resize', function(){
    wHeight = window.innerHeight;
})

function scrollUp(){
let upBtn = document.getElementById ('scrollup');
window.addEventListener('scroll', function(){
    if (wHeight < window.scrollY){
        upBtn.classList.add('scrollup_active')
    }
    else {
        upBtn.classList.remove('scrollup_active')
    }
})

upBtn.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
   })
}
scrollUp();


///////////////////////

function windowScroll(){
for (let link of document.getElementsByClassName('nav__link')){
    link.addEventListener('click', function(e){
        e.preventDefault();
        let id_section = this.getAttribute('href') 
        window.scrollTo({
        top: document.querySelector(id_section).offsetTop - 90,
        left: 0,
        behavior: 'smooth'
    });
    })
}
}
windowScroll();

/////////////////////////

function activeScrollLink() {
    for (let link of document.getElementsByClassName('nav__link')) {
       let id_section = link.getAttribute('href');
       window.addEventListener('scroll', function () {
          let pos = document.querySelector(id_section).getBoundingClientRect();
          if (pos.top < wHeight / 2 && pos.top > pos.height * -1 + wHeight / 2) {
             link.classList.add('link__active')
          } else {
             link.classList.remove('link__active')
          }
       })
    }
 }
activeScrollLink();
















////////////////////////////////////

const Masonry = require("masonry-layout");
// import Masonry from "masonry-layout"

var grid = document.querySelector('.grid');
var msnry = new Masonry( grid, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 370,
  columnWidth: '.persent-size',
  percentPosition: true,
  gutter: 20,
  transitionDuration: '0.8s',
  isFitWidth: true,
  horizontalOrder: true,

});

var msnry = new Masonry( '.grid', {
  // options
});


imagesLoaded( document.querySelector('.grid'), function( instance ) {
   console.log('all images are loaded');
   msnry.layout();

 });
 
imagesLoaded( grid ).on( 'progress', function() {
   msnry.layout();
});


grid.addEventListener( 'click', function( event ) {
   // don't proceed if item was not clicked on
   if ( !matchesSelector( event.target, '.grid-item' ) ) {
     return;
   }
   // change size of item via class
   event.target.classList.toggle('grid-item--gigante');
   // trigger layout
   msnry.layout();
 });

 


