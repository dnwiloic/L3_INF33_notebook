import type FilterOption from '@/interfaces/filter'
import type Note from '@/interfaces/note'
import {defineStore } from 'pinia'
import {ref} from 'vue'


export const useFilterStore = defineStore('Filter', ()=>{
    const NoteFilterParam = ref({} as FilterOption) 

    const setNoteFilterPaams = (params : FilterOption)=>{
        console.log(params)
        NoteFilterParam.value = params
    }
    const NotesFilter = (notes: Array<Note>) => {
        let data =  notes

        if(NoteFilterParam.value.favorite)
            data = data.filter((note, index)=> note.is_favorite===NoteFilterParam.value.favorite)

        if(NoteFilterParam.value.content)
            data = data.filter((note, index)=> note.content.includes(NoteFilterParam.value.content!))

        if(NoteFilterParam.value.title)
            data = data.filter((note, index)=> note.title.includes(NoteFilterParam.value.title!))

        if(NoteFilterParam.value.question)
            data = data.filter((note, index)=> note.question.includes(NoteFilterParam.value.question!))
           
        if(NoteFilterParam.value.response)
            data = data.filter((note, index)=> note.response.includes(NoteFilterParam.value.response!))
        
        if(NoteFilterParam.value.statut && NoteFilterParam.value.statut.length >= 0)
            data = data.filter((note, index)=> NoteFilterParam.value.statut?.includes(note.statut)  )

        if(NoteFilterParam.value.created_date && NoteFilterParam.value.created_date.debut && NoteFilterParam.value.created_date.debut!='')
            data = data.filter((note, index)=> {
                const note_created_date = new Date(note.created_date)
                const min_date = new Date(NoteFilterParam.value.created_date!.debut!)
                console.log(min_date <= note_created_date)
                return min_date <= note_created_date
            })

        if(NoteFilterParam.value.created_date && NoteFilterParam.value.created_date.fin && NoteFilterParam.value.created_date.fin!='')
            data = data.filter((note, index)=> {
                const note_created_date = new Date(note.created_date)
                const max_date = new Date(NoteFilterParam.value.created_date!.fin!)

                return max_date >= note_created_date
            })

        if(NoteFilterParam.value.tags)
            data = data.filter((note, index)=>{
            for( const tg of NoteFilterParam.value.tags!){
                if(!note.tags.includes(tg)) return false
            }

            return true
        })
        return data
    }

    return { NotesFilter, setNoteFilterPaams, NoteFilterParam }
})