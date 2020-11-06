const client = require('./client');

let newNote = {
    title: "New Note",
    content: "New Note content"
}

client.insert(newNote, (error, note)=>{
    if(!error){
        console.log('THIS IS NEW NOTE: ', note)
    } else {
        console.log('ERROR OCCURED update_note: \n')
        console.log(error);
        
    }
})