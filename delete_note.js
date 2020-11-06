const client = require('./client');



client.remove({ id: '1' }, (error, _) => {
    if(!error){
        console.log('Note with id 1 successfullt deleted: ')
    }else{
        console.log('ERROR OCCURED delete_note: \n');
        console.log(error)
    }
})