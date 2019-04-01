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

//Formularios de sesión
let errorAccount = document.querySelector(".errorMessage");
let errorLogIn =document.querySelector(".errorMessageLogIn");
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
var db = firebase.firestore();
function safeCourseFirebase(){
db.collection("courses").add({
  name :document.querySelector(".name").value,
  days:document.querySelector(".days").value,
  institution:document.querySelector(".institution").value,
  address: document.querySelector(".address").value,
  tel : document.querySelector(".tel").value,
  email: document.querySelector(".email").value,
  register : document.querySelector(".start").value,
  moreInformation: document.querySelector(".moreInformation").value
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
  document.querySelector(".name").value="";
  document.querySelector(".days").value=""
  document.querySelector(".institution").value="";
  document.querySelector(".address").value ="";
  document.querySelector (".tel").value = "";
  document.querySelector (".email").value = "";
  document.querySelector(".start").value= "";
  document.querySelector(".moreInformation").value="";
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
}
document.querySelector(".save").addEventListener("click", safeCourseFirebase);
function saveDirectory(){
db.collection("Instituciones").add({
  name : document.querySelector(".nameInst").value,
  schedule:document.querySelector(".scheduleInst").value,
  tel:document.querySelector(".telInst").value,
  email:document.querySelector(".emailInst").value,
  address: document.querySelector(".addressInst").value,
  moreInformation: document.querySelector(".moreInformationInst").value,
  services: document.querySelector(".services").value
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
  document.querySelector(".nameInst").value="";
  document.querySelector(".scheduleInst").value=""
  document.querySelector(".addressInst").value ="";
  document.querySelector(".telInst").value= "";
  email:document.querySelector(".emailInst").value = "",
  document.querySelector(".moreInformationInst").value="";
  document.querySelector(".services").value= "";
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
}
document.querySelector(".saveInst").addEventListener("click", saveDirectory);
const registerInstitution = () => {
  document.querySelector(".registroInstitucion").style.display = "block";
}
document.querySelector(".registrarInstitucion").addEventListener("click", registerInstitution);
//creación de lista de talleres en archivo local
let coursesList = [];
const courseRegister = () => {
  let course=formulario();
  coursesList.push(course);
   console.log(coursesList);
}
const courseRegisterPage = () =>{
  document.querySelector(".registroTaller").style.display = "block";
}
document.querySelector(".registrarTaller").addEventListener("click", courseRegisterPage);