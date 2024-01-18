import type Note from "@/interfaces/note";
import BackendAPI from "./baseAPI";
import { type note_statut } from "@/interfaces/note_status_enum";

// Fonction pour générer un tableau d'objets de notes aléatoires
export default class NoteModel{
  backendApi: BackendAPI;
  user_id: number
  constructor(user_id:number){
    this.backendApi = new BackendAPI(`users/${user_id}/notes/`)
    this.user_id = user_id
  }

  createNote(note: Omit<Note, 'tags'>){
    note.is_draft = false;
    note.is_deleted=false;
    delete(note.user_id)
    console.log(note)
    return this.backendApi.post(note)
  }

  getAllUserNotes(){
    return this.backendApi.get()
  }

  getNote(note_id:number){
    return this.backendApi.get(`${note_id}`)
  }

  updateNote(note: Note){
    delete(note.user_id)
    delete(note.created_at)
    delete(note.updated_at )
    const id_note =note.id 
    delete(note.id )
    console.log(note)
    return this.backendApi.put(note, `${id_note}`)
  }

  deleteNote(note_id:number){
    return this.backendApi.delete({},`${note_id}`)
  }

  addNoteTag(note_id:number, tag_id:number){
    return this.backendApi.post({},`${note_id}/tags/${tag_id}`)
  }

  removeNoteTag(note_id:number, tag_id:number){
    console.log("link roump")
    return this.backendApi.delete({},`${note_id}/tags/${tag_id}`)
  }
}

export function  generateRandomNotesArray(limit: number) :Array<Note>{
  const notes = [] as Array<Note>;

  for (let i = 0; i < limit; i++) {
    const note = {
      title: `Note ${i + 1}`,
      content: `Contenu de la note ${i + 1}`,
      question: `Question de la note ${i + 1}`,
      response: `Response a la quetion ${i+1}`,
      is_favorite: true,
      created_at: new Date(),
      statut: 'acquied' as note_statut,
      tags: [
        { id: 1, content: 'TagA' },
        { id: 2, content: 'TagB' },
        { id: 3, content: 'TagC' }
      ] 
    };

    notes.push(note);
  }

  return notes.map((note,index)=>{
    note.is_favorite = false;
    note.statut='aquied'
    note.created_at = '2024-01-01'
    if(index%3 === 0){
      note.is_favorite = true;
      note.statut='not_aquied'
      note.created_at = '2024-01-05'
      note.tags = [
        { id: 2, content: 'TagB' },
        { id: 3, content: 'TagC' }
      ]
    }if(index%2 === 0){
      note.statut='in_aquisition'
      note.created_at = '2024-01-10'
      note.tags = [
        { id: 1, content: 'TagA' },
        { id: 2, content: 'TagB' },
        { id: 3, content: 'TagC' },
        { id: 5, content: 'motifB' },
        { id: 6, content: 'motifC' }
      ]
    }
    
    return note
  });
}