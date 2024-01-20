import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Tag from '@/interfaces/tag';
import NoteModel from '@/API/note_model';
import type Note from '@/interfaces/note';

const check_note_content_tag= (note: Note, tag:Tag) =>{
  for( const tg of note.tags!){
    console.log(note)
      if(tg.id==tag.id && tg.content==tag.content)return true
  }
  return false
}
export const useNoteStore = defineStore('Notes', () => {
  const allNotes = ref({} as Array<Note>)
  const fetchUserNotes = async (user_id: number) => {
    const noteModel = new NoteModel(user_id)
    try {
     const res = await noteModel.getAllUserNotes()
     allNotes.value = await res.json()
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }

  const createNote = (user_id: number, note: Note) => {
    const noteModel = new NoteModel(user_id)
    const trueNote = {...note}
    trueNote.user_id = user_id
    delete(trueNote.tags)
    noteModel.createNote(trueNote).then(
     async res => {
        res.json().then( (return_note)=>{
          note.tags!.forEach(async (tg) => {
              await noteModel.addNoteTag(return_note.id , tg.id!)
          })
          
           fetchUserNotes(user_id)}
          )
      }
    )
  }

  const updateNote = (user_id: number, note: Note) => {
    const noteModel = new NoteModel(user_id)
    const trueNote = {...note}
    trueNote.user_id = user_id
    delete(trueNote.tags)
    noteModel.updateNote(trueNote).then(
      res => {
        res.json().then( (return_note)=>{ 
          note.tags!.forEach(async (tg) => {
            if(!check_note_content_tag(return_note,tg))
            {
              console.log("add tag")
              await noteModel.addNoteTag(return_note.id , tg.id!)
            }
              
          })
          return_note.tags.forEach(async (tg : Tag) => {
            if(!check_note_content_tag(note,tg)){
              console.log("rm tag")
              await noteModel.removeNoteTag(return_note.id , tg.id!)
            }
          })
          fetchUserNotes(user_id)
        })
      }
    )
  }

  const deleteNote = (user_id: number, note_id: number) => {
    const noteModel = new NoteModel(user_id)
    noteModel.deleteNote(note_id).then(
      res => {
        res.json().then( ()=>{ fetchUserNotes(user_id)})
      }
    )
  }

  const addNoteTag = (user_id:number, note_id:number, tag_id:number) => {
    const noteModel = new NoteModel(user_id)
    noteModel.addNoteTag(note_id, tag_id).then(
      res => {
        res.json().then( ()=>{ fetchUserNotes(user_id)})
      }
    )
  }

  const removeNoteTag = (user_id: number, note_id:number, tag_id:number) => {
    const noteModel = new NoteModel(user_id)
    noteModel.removeNoteTag(note_id, tag_id).then(
      res => {
        res.json().then( ()=>{ fetchUserNotes(user_id)})
      }
    )
  }


  return { allNotes, fetchUserNotes,
         createNote, deleteNote, 
         updateNote, addNoteTag, removeNoteTag }
})
