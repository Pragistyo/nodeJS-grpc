const client = require('./client');


client.listAll( {}, (error, notes)=>{
    if(!error) {
        console.log('fetches all notes data')
        console.log(notes)
    }else{
        console.log('ERROR OCCURED get_notes_all: \n');
        console.log(error)
    }
})

