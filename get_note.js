const client = require('./client');

client.get({id:'1'}, (error, note)=>{
    if(!error){
        console.log('the note with id=1 : \n', note)
    } else{
        console.log('ERROR OCCURED get_single: \n')
        console.log(error)
    }

})