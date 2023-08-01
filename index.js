class Note{
    constructor(id,title,text){
        this.id=id;
        this.title=title;
        this.text=text
    }
}
class App{
    constructor(){
        this.notes = [];
   
    this.$activeform = document.querySelector(".active-form");
    this.$inactiveform = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector(".note-title");
    this.$noteText = document.querySelector(".note-text");
    this.$noteText1 = document.querySelector(".note-text1");
    this.$notes = document.querySelector(".note");
    this.$form = document.querySelector("#form");
this.addEventListeners();
}
addEventListeners(){
    document.body.addEventListener("click",(event) => {
        this.handleFormClick(event);
    })
    this.$form.addEventListener("submit",(event) => {
        event.preventDefault();
        const title =this.$noteTitle.value;
const text=this.$noteText.value;
this.addNote({title,text});
    this.closeActiveForm();
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
    addNote({title,text}){
        //generate id -cuid
        if(text !=""){
            const newNote= new Note(cuid(),title,text);
            this.notes =[...this.notes,newNote];
            this.displayNotes();
        }
      
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
}
displayNotes(){
    this.$notes.innerHTML = this.notes.map((note) =>
    `
    <div class="note  id=$(note.id}">
    <span class="material-icons check-circle">
        check_circle
        </span>
    <div class=" active-form2 ">
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
                             <span class="material-icons hover">
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
