window.$ = window.jQuery = require('jquery');
document.addEventListener("DOMContentLoaded", function(){

    el_autohide = document.querySelector('.autohide');
    
    // add padding-top to bady (if necessary)
    // navbar_height = document.querySelector('.navbar').offsetHeight;
    // document.body.style.paddingTop = navbar_height + 'px';
  
    if(el_autohide){
      var last_scroll_top = 0;
      window.addEventListener('scroll', function() {
            let scroll_top = window.scrollY;
           if(scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            }
            else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            last_scroll_top = scroll_top;
      }); 
      // window.addEventListener
    }
    // if  

    var widnoWidth = window.screen.width;

    if(widnoWidth >= 768) {
      var swiper = new Swiper(".multi-swiper-sss", {
        // slidesPerView: 5,
        // grid: {
        //   rows: 2,
        //   fill: 'row',
        // },
        centeredSlides: true,
        // spaceBetween: 38,
        loop: true, 
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1500: {
            slidesPerView: 5,
            spaceBetween: 38,
          },
        },
      });
    };

    var swiper = new Swiper(".move-slider", {
      slidesPerView: "auto",
      spaceBetween: 38,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".brows-film-next",
        prevEl: ".brows-film-prev",
      },
      breakpoints: {
        319: {
          slidesPerView: 1,
          spaceBetween: 30,
          centeredSlides: false,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: false,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 38,
          centeredSlides: true,
        },
        
      },
    });

    // 
    // var infoToggle = document.getElementsByClassName("all-child");
    // var targetToggle = document.getElementsByClassName("clickToShow");
    // for(var i = 0; i < infoToggle.length; i++){
    //   infoToggle[i].addEventListener("click", function() {
    //     this.classList.toggle('clicked');
    //   });
    // }

    var subMenuToggle = document.querySelectorAll('.clickToShow'); 
    for(var i in subMenuToggle) {
      if(subMenuToggle.hasOwnProperty(i)) {
        subMenuToggle[i].onclick = function() {
          this.parentElement.querySelector('.clickToShow').classList.toggle("clicked");
          // this.parentElement.querySelector('.sub-nav-toggle').classList.toggle("active");
          // this.parentElement.classList.toggle("active");
        };
      }
    }

}); 

var bovdy = document.getElementsByTagName('body');
var crdSearch = document.getElementsByClassName('credential-search');
function myFunction(x) {
  x.classList.toggle("change");
  bovdy[0].classList.toggle("overflow-hidden");
  crdSearch[0].classList.toggle("op-light");
}