const client = require('./client');

const updatedNote = {
    id: '1',
    title: 'Updated Note',
    content: ' this is updated note'
}

client.update(updatedNote, (error,note)=>{
    if(!error){
        console.log('Note with id 1 successfullt updated ', note)
    } else{
        console.log('ERROR OCCURED update_note: \n');
        console.log(error)
    }
})