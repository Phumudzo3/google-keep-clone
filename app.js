const firebaseConfig = {
    apiKey: "AIzaSyBGH_g96dUa7PivIesS26TkBb2RwTa1V5w",
authDomain: "keep-e5a9f.firebaseapp.com",
projectId: "keep-e5a9f",
storageBucket: "keep-e5a9f.appspot.com",
messagingSenderId: "323665114649",
appId: "1:323665114649:web:15946d89175a568467dc88"
}; 

// Initialize Firebase
firebase.initializeApp(firebaseConfig); 
const auth= firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
console.log(db);   



class Note{
constructor(id,title,text){
this.id=id;
this.title=title;
this.text=text;
 
}
}
class App{
constructor(){


this.miniSideBar=true;
//this.notes = [new Note("abc1","test title","test text")];
this.notes = [];
this.$activeform = document.querySelector(".active-form");
this.$inactiveform = document.querySelector(".inactive-form");
this.$noteTitle = document.querySelector(".note-title");
this.$noteText = document.querySelector(".note-text");
this.$noteText1 = document.querySelector(".note-text1");
this.$notes = document.querySelector(".note");
this.$form = document.querySelector("#form");
this.$form = document.querySelector("#form");
this.$modal = document.querySelector(".modal");
this.$modalForm=document.querySelector(".modal-form");
this.$modalTitle=document.querySelector(".modal-title");
this.$modalText=document.querySelector(".modal-text");
this.$sidebar=document.querySelector(".left");
this.$logOutButton =document.querySelector(".logout");
this.ui = new firebaseui.auth.AuthUI(auth);
this.$firebaseAuthContainer=document.querySelector("#firebaseui-auth-container");
this.$app =document.querySelector("#app");
this.$app.style.display="none";
this.$authUserText=document.querySelector(".auth-user");
this.$selectedNoteId="";
this.userId="";
this.handleAuth();

this.addEventListeners();
this.displayNotes();

}


addEventListeners(){
document.body.addEventListener("click",(event) => {
this.handleFormClick(event);
// this.closeModal(event);
//  this.openModal(event);
this.handleArchiving(event);
})
this.$form.addEventListener("submit",(event) => {
event.preventDefault();
const title =this.$noteTitle.value;
const text=this.$noteText.value;
this.addNote({title,text});
this.closeActiveForm();
})
this.$logOutButton.addEventListener("click",(event) =>{
this.handleLogOut();
});

this.$sidebar.addEventListener("mouse",(event) =>{
this.handleToggleSideBar();
})
this.$sidebar.addEventListener("mouseout",(event) =>{
this.handleToggleSideBar();
})
}
handleFormClick(event) {
const isActiveFormClickOn=this.$activeform.contains(event.target);
const isInactiveFormClickOn=this.$inactiveform.contains(event.target);
const title =this.$noteTitle.value;
const text=this.$noteText.value;
if(isInactiveFormClickOn){
this.openActiveForm();
}
else if(!isInactiveFormClickOn && !isActiveFormClickOn){
this.addNote({title,text});
this.closeActiveForm();
}
//call function

}
//function to copy values
openActiveForm(){
this.$inactiveform.style.display ="none";
this.$activeform.style.display ="block";
this.$noteText.focus();
}
closeActiveForm(){
this.$inactiveform.style.display ="block";
this.$activeform.style.display ="none";
this.$noteText.focus();
this.$noteText.value= "";
this.$noteTitle.value="";
}

// openModal(event){
// const $selectedNote=event.target.closest(".note");

//if ($selectedNote && !event.target.closest(".archive")){
//   this.$selectedNoteId =$selectedNote.id;
//  this.$modalTitle.value =$selectedNote.children[1].innerHTML;
//   this.$modalText$.value=$selectedNote.children[2].innerHTML;
//    this.$modal.classList.add("open-model");
//  }else {
//      return;
//  }

//}

//closeModal(event){
//onst isModalFormClickedOn=this.$modalForm.contains(event.target);
//if (!isModalFormClickedOn && this.$modal.classList.contains("open-modal")){
//   this.editNote(this.$selectedNoteId,{title: this.$modalTitle.value,text : this.$modalText.value})
//   this.$modal.classList.remove("open-model");
// }

// }

handleArchiving(event){
const $selectedNote=event.target.closest(".note");
if ($selectedNote ){
this.$selectedNoteId =$selectedNote.id;
this.delete(this.$selectedNoteId);

}else {
return;
}

}
handleToggleSideBar(){
if(this.miniSideBar){
this.$sidebar.style.width="250px";
this.miniSideBar=false;
}
else
{
this.$sidebar.style.width="80px"
this.miniSideBar=true;
}
}

addNote({title,text}){
//generate id -cuid
if(text !=""){
    const newNote= { id:cuid(),title,text};
    this.notes =[...this.notes,newNote];
    this.displayNotes();
    this.render();
}

}
handleLogOut(){
firebase.auth().signOut().then(() => {
// Sign-out successful.
this.redictTOAuth();
}).catch((error) => {
console.log("error accrred",error);
});
}
handleAuth(){
firebase.auth().onAuthStateChanged((user) => {

if (user) {
// duplicate username to html class="auth-user"
    //this.$authUserText.forEach((element) => {
        //element.innerHTML = username;});
     // this.userId = user.uid;
  console.log(user);
  this.userId=user;
  this.$authUserText.innerHTML=user.displayName;
 this.redirectToApp();
} else {
this.redictTOAuth();
}
});
}


redictTOAuth(){

this.$firebaseAuthContainer.style.display="block";
this.$app.style.display="none";
this.ui.start('#firebaseui-auth-container', {
callbacks: {
signInSuccessWithAuthResult: function(authResult, redirectUrl) {
// User successfully signed in.
// Return type determines whether we continue the redirect automatically
// or whether we leave that to developer to handle.
// this.userId=authResult.user;
console.log("authResult",authResult.user);
this.userId=authResult.user;
  this.$authUserText.innerHTML=user.displayName;
 this.redirectToApp();

return true;
}
},
signInOptions: [
 firebase.auth.EmailAuthProvider.PROVIDER_ID,
 firebase.auth.GoogleAuthProvider.PROVIDER_ID,
],
  // Other config options...
});
}
redirectToApp(){
this.$firebaseAuthContainer.style.display="none";
this.$app.style.display="block";
this.fetchNoteFormDb();
}


fetchNoteFormDb(){
var docRef = db.collection("users").doc("this.userId");
docRef.get().then((doc) => {
if (doc.exists) {
   console.log("Document data:", doc.data().notes);
   this.notes =doc.data().notes;
   this.displayNote();
} else {
    //doc.data() will be undefined in this case
 console.log("No such document!");
 db.collection("users").doc(this.userId).set({
    notes : []
     
 })
 .then(() => {
     console.log("user successfully written!");
 })
 .catch((error) => {
     console.error("Error writing document: ", error);
 });
}
}).catch((error) => {
//    cons ole.log("Error getting document:", error);
});    
}
fetchNoteFormDb(){
var docRef = db.collection("users").doc("this.userId");
docRef.get().then((doc) => {
if (doc.exists) {
   console.log("Document data:", doc.data().notes);
   this.notes =doc.data().notes;
   this.displayNote();
} else {
    //doc.data() will be undefined in this case
 console.log("No such document!");
 db.collection("users").doc(this.userId).set({
    notes : []
     
 })
 .then(() => {
     console.log("user successfully written!");
 })
 .catch((error) => {
     console.error("Error writing document: ", error);
 });
}
}).catch((error) => {
//    cons ole.log("Error getting document:", error);
});    
}

saveNotes(){
const db = firebase.firestore();
console.log(db);  
//Add a new document in collection "cities"
db.collection("users").doc(this.userId).set({
notes : this.notes

})
.then(() => {
console.log("Document successfully written!");
})
.catch((error) => {
console.error("Error writing document: ", error);
});
}
render(){
this.saveNotes() ;
this.displayNotes();
}
editNote(id,{title,text}){
this.notes=this.notes.map((note) => {
if(note.id==id){
note.title=title;
note.text=text;

}
return note;

});

}
delete(id){
this.notes=this.notes.filter((note) => note.id != id);
this.displayNotes();
}

handleMouseOverNote(element){
const $note=document.querySelector("#"+element.id);
const $checkNote=document.querySelector(".check-circle");
const $noteFooter=document.querySelector(".search-icon11");
$checkNote.style.visibility="visible";
$noteFooter.style.visibility="visible";


}
handleMouseOutNote(element){
const $note=document.querySelector("#"+element.id);
const $checkNote=document.querySelector(".check-circle");
const $noteFooter=document.querySelector(".search-icon11");
$checkNote.style.visibility="hidden";
$noteFooter.style.visibility="hidden";

}
displayNotes(){
this.$notes.innerHTML = this.notes.map((note) =>
//onmouseover="app.handleMouseOverNote(this)" onmouseout="app.handleMouseOutNote(this)"
`
<div class="note"  id="${note.id}" onmouseover="app.handleMouseOverNote(this)" onmouseout="app.handleMouseOutNote(this)" >
<span class="material-icons check-circle">
check_circle
</span>
<div class=" active-form2 archive   ">
<div class="title"> ${note.title}</div>
<div class="text"> ${note.text}</div>


<div class="search-icon11">

     <span class="material-icons">
         add_alert
         </span>
         <span class="material-icons">
             group_work
             </span>
             <span class="material-icons">
                 color_lens
                 </span>
                 <span class="material-icons">
                     image
                     </span>
                     <span class="material-icons hover ">
                         archive
                         </span>
                         <span class="material-icons">
                             more_vert
                             </span>
                             </div>
</div>
</div>
`

).join("");
}
}
const app =new App();



