'use strict'
const grpc = require('grpc')
const PROTO_PATH = './notes.proto'
const notesProto = grpc.load(PROTO_PATH)
// const uuidv1 = require('uuid/v1')
const { v1: uuidv1 } = require('uuid');

const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
]

const server = new grpc.Server()


//grpc service
server.addService(
    notesProto.NoteService.service,
    {
    listAll: (_,callback)=>{
        callback(null, notes)
    },
    get:(call, callback) =>{
        let note = notes.find((n)=> n.id == call.request.id)
        if (note) {
            callback(null, note)
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Not Found'
            })
        }
    },
    insert:(call, callback)=>{
        let note = new call.request
        note.id =uuidv1()
        notes.push(note)
        callback(null, note)
    },
    update:(call, callback)=>{
        let existingNote =  notes.find( (n) =>
            n.id == call.request.id)
        let existingNoteIndex = notes.findIndex( (n)=> 
        n.id == call.request.id)     
        if (existingNote){
            existingNote.title = call.request.title
            existingNote.content = call.request.content
            callback(null, notes[existingNoteIndex])
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'not found data to be updated'
            }, null)
        }
    },
    remove: (call, callback)=>{
        let existingNoteIndex = notes.findIndex( (n)=> 
        n.id == call.request.id)
        if(existingNoteIndex !=-1 ){
            notes.splice(existingNoteIndex, 1)
            callback(null,{})
        }else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'not found id to delete'
            }, null)
        }
    }
})


server.bind('127.0.0.1:50051', 
grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()

