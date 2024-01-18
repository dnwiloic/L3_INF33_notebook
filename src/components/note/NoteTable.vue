<script setup lang="ts">
import  {ref, computed, watch} from 'vue'
import {useUiStore} from '../../stores/ui'
import NoteFilter from '../forms/NoteFilterForm.vue';
import NoteForm from '../forms/NoteForm.vue';
import { useFilterStore } from '@/stores/filter';
import type Note from '@/interfaces/note';
import SelectPage from './SelectPage.vue';
import type { FormAction } from '../forms/TagForm.vue';
import DeleteNote from '../forms/DeleteNote.vue';


    const filterStore = useFilterStore()
    const props = defineProps(['notes'])
    const original_notes = props.notes as Array<Note>
    const notes = ref(props.notes as Array<Note>)
    watch(props.notes,()=>{
        notes.value=props.notes
    })
    const uis = useUiStore();
    const currentPage = ref(1)

    const currentNote = ref({} as Note)
    const noteFormAction = ref('add' as FormAction)

    const nbrPages = computed(()=>{
        return Math.ceil( notes.value.length/uis.nbrElementsByTables)
    })

    const showerTable = computed(()=>{
        
        const start = (currentPage.value - 1) * uis.nbrElementsByTables
        const end = currentPage.value * uis.nbrElementsByTables - 1
        
        const note2 = notes.value.filter( (value, index)=>(index>=start && index<=end))
        return note2
    })

    

    function launch_filter(){
        notes.value = filterStore.NotesFilter(original_notes)
        currentPage.value = 1
    }
</script>
<template>
    
    <div class="m-5">
        <div class="d-flex justify-content-between">
            <NoteFilter  @launch-filter="launch_filter"/>
            <button class="btn btn-primary" @click="noteFormAction='add'" data-bs-toggle="modal"  :data-bs-target="'#'+uis.noteFormId">Ajouter</button>
            <NoteForm :note="currentNote" :action="noteFormAction" />
            <DeleteNote :note="currentNote"/>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Cocher</th>
                    <th>titre de la note</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-if="notes.length===0">
                <tr>
                    <td :colspan=3 :rowspan=3 class="text-center">
                        la liste est vide
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="note in showerTable" :key="note.id">
                    <td><input type="checkbox"></td>
                    <td><span>{{ note.title }}</span></td>
                    <td @click="currentNote=note;">
                        <button 
                            @click="()=>{
                                 
                                noteFormAction='update'
                                }" 
                            class="btn btn-success mx-2"
                            data-bs-toggle="modal"  :data-bs-target="'#'+uis.noteFormId">Modifier</button>
                        <button class="btn btn-danger mx-2" data-bs-toggle="modal" :data-bs-target="'#'+uis.deleteNoteConfimationForm">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="m-3" >
            <div class="d-flex justify-content-end align-item-center">
                <SelectPage v-if="nbrPages>=1"  v-model:currentPage="currentPage" v-model:nbrPages="nbrPages" />
            </div>
        </div>
    </div>
</template>
<style scoped>
table{
    width: 100%;
    border-collapse: collapse;
}

th,td{
    border-bottom: 2px solid ;
    padding: 1em;
}

tr:nth-child(even){
    background-color: rgb(237, 237, 237);
}

tr:hover{
    background-color: rgb(191, 189, 189);
}


</style>