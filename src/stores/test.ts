import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import { test_status_enum } from '@/interfaces/test_state_enum'
import type Test from '@/interfaces/Test'
import { generateRandomNotesArray } from '@/API/note_model'
import type Note from '@/interfaces/note'
import { useUserStore } from './user'
import EvaluationModel from '@/API/evaluation_model'
import type Tag from '@/interfaces/tag'


export const useTestStore = defineStore('tests',()=>{
    const user = useUserStore().user
    const evalModel = new EvaluationModel(user!.id!)
    const statut = ref(test_status_enum.not_started)
    const notes = ref([] as Array<Note & {user_response?:string, score?:number}>)
    const score = computed(()=>{
        let sum=0;
        notes.value.forEach(elt=> sum+=elt.score||0)
        return sum
    })
    const currentNoteIndex = ref(0)
    
    const initTest = async (tags: Array<number>, nbr_questions: number)=>{
        statut.value = test_status_enum.in_test
        try{
            console.log('getting not')
            const res = await evalModel.random_note(tags, nbr_questions)
            notes.value = await res.json()
            console.log(notes.value )
            return true
        }
        catch(err){
            console.log("Une erreur est survenu lors de la Collecte des question")
            notes.value = []
            return false
        }
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