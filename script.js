
class Auth{
  constructor(){
    
     this.$firebaseAuthContainer=document.querySelector("#firebaseui-auth-container");
    
    this.$app.style.display="none";
    
    this.handleAuth()
 


}

handleAuth(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
         this.redirectToApp();
       } else {
        this.redictTOAuth();
    }
     });
}
redictTOAuth(){
 
    this.$firebaseAuthContainer.style.display="block";
  this.$app.style.display="auth";
   this.ui.start('#firebaseui-auth-container', {
        signInOptions: [
         firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
          // Other config options...
     });
}
redirectToApp(){
   this.$firebaseAuthContainer.style.display="none";
   this.$app.style.display="block";
}

}
const authForm =new Auth();