$('.open-overlay').click(function() {
    $('.open-overlay').css('pointer-events', 'none');
    var overlay_navigation = $('.overlay-navigation'),
      top_bar = $('.bar-top'),
      middle_bar = $('.bar-middle'),
      bottom_bar = $('.bar-bottom');

    overlay_navigation.toggleClass('overlay-active');
    if (overlay_navigation.hasClass('overlay-active')) {

      top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
      middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
      bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
      overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
      overlay_navigation.velocity('transition.slideLeftIn', {
        duration: 300,
        delay: 0,
        begin: function() {
          $('nav ul li').velocity('transition.perspectiveLeftIn', {
            stagger: 150,
            delay: 0,
            complete: function() {
              $('nav ul li a').velocity({
                opacity: [1, 0],
              }, {
                delay: 10,
                duration: 140
              });
              $('.open-overlay').css('pointer-events', 'auto');
            }
          })
        }
      })

    } else {
      $('.open-overlay').css('pointer-events', 'none');
      top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
      middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
      bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
      overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
      $('nav ul li').velocity('transition.perspectiveRightOut', {
        stagger: 150,
        delay: 0,
        complete: function() {
          overlay_navigation.velocity('transition.fadeOut', {
            delay: 0,
            duration: 300,
            complete: function() {
              $('nav ul li a').velocity({
                opacity: [0, 1],
              }, {
                delay: 0,
                duration: 50
              });
              $('.open-overlay').css('pointer-events', 'auto');
            }
          });
        }
      })
    }
  })


  //llave del proyecto
  
var config = {
 apiKey: "AIzaSyA-RoBa-FiAmyEhyQAhBRJueSCDmC8KNVc",
 authDomain: "talleresdeoficios-71857.firebaseapp.com",
 databaseURL: "https://talleresdeoficios-71857.firebaseio.com",
 projectId: "talleresdeoficios-71857",
 storageBucket: "talleresdeoficios-71857.appspot.com",
 messagingSenderId: "379073271267"
};

firebase.initializeApp(config);
let institutionsList = document.querySelector(".showInstituciones");
 var db = firebase.firestore();
 db.collection("Instituciones").onSnapshot((querySnapshot) => {
   let card=" ";
   querySnapshot.forEach((doc) => {
       card=card +
       `<div class="containerD py-3">
       <div class="card cardDirectorio">
         <div class="row ">
             <div class="col-md-8 px-3">
               <div class="card-block px-3">
                 <h4 class="card-title">"`+ doc.data().name  + " " +` </h4>
                 <p class="card-text">  `+ doc.data().services + " " +` </p>
                 <p class="card-text">`+doc.data().schedule +  " " + doc.data().tel + " " +doc.data().email+ "" +doc.data().address + " " +doc.data().moreInformation+ " " +`</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>`
     institutionsList.innerHTML = card;

       console.log(`${doc.id} => ${doc.data().name}`);
   });

});