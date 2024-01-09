import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import { test_status_enum } from '@/interfaces/test_state_enum'
import type Test from '@/interfaces/Test'
import { generateRandomNotesArray } from '@/API/note_model'
import type Note from '@/interfaces/note'



export const useTestStore = defineStore('tests',()=>{
    const statut = ref(test_status_enum.not_started)
    const notes = ref([] as Array<Note & {user_response?:string, score?:number}>)
    const score = computed(()=>{
        let sum=0;
        notes.value.forEach(elt=> sum+=elt.score||0)
        return sum
    })
    const currentNoteIndex = ref(0)
    
    const initTest = (nbr_questions: number)=>{
        statut.value = test_status_enum.in_test
        notes.value = generateRandomNotesArray(nbr_questions)
        currentNoteIndex.value = 0;
    }

    const changeStep = () =>{
        if(statut.value === test_status_enum.in_test && isLastNote){
            currentNoteIndex.value = 0;
            statut.value = test_status_enum.halfway;
            return
        }
        else if(statut.value === test_status_enum.halfway){
            currentNoteIndex.value = 0;
            statut.value = test_status_enum.in_correction;
            return
        }
        else if(statut.value === test_status_enum.in_correction && isLastNote){
            statut.value = test_status_enum.finish;
            return
        }
    }

    const isLastNote = computed(()=>{
        return (currentNoteIndex.value >= notes.value.length-1)
    }) 

    const currentNote = computed(()=>{
        return notes.value[currentNoteIndex.value]
    })

    const test = computed(()=>{
        return  notes.value.map(
            (note,index)=>Object(
                {index: index,
                question:note.question,
                user_response: note.user_response})
        )
    })

    const setUserResponse = ( user_response: string)=>{
        notes.value[currentNoteIndex.value].user_response = user_response
    }

    const changeNote = () =>{
        if(!isLastNote.value)
            currentNoteIndex.value ++;
    }

    /**
     * @param score: number in [-1, 0, 1]. -1: not acquired, 0: currently being acquired, 1:acquired
     */
    const setQuestionScore = ( score:number)=>{
        notes.value[currentNoteIndex.value].score = score
    }

    const getCorrectionDatas = ()=>{
        return notes.value
    }

    return {statut, notes, score, isLastNote, currentNote,test,
        changeNote, changeStep, initTest, setUserResponse, setQuestionScore, getCorrectionDatas}
})