<script setup lang="ts">
import  {ref, computed} from 'vue'
import {useUiStore} from '../../stores/ui'
import NoteFilter from '../forms/NoteFilterForm.vue';
import NoteForm from '../forms/NoteForm.vue';
import { useFilterStore } from '@/stores/filter';
import type Note from '@/interfaces/note';


    const filterStore = useFilterStore()
    const props = defineProps(['notes'])
    const original_notes = props.notes as Array<Note>
    const notes = ref(props.notes as Array<Note>)
    const uis = useUiStore();
    const currentPage = ref(1)

    const nbrPages = computed(()=>{
        return Math.ceil( notes.value.length/uis.nbrElementsByTables)
    })

    const showerTable = computed(()=>{
        
        const start = (currentPage.value - 1) * uis.nbrElementsByTables
        const end = currentPage.value * uis.nbrElementsByTables - 1
        
        const note2 = notes.value.filter( (value, index)=>(index>=start && index<=end))
        return note2
    })

    const showerIndexPage = computed(()=>{
        if(nbrPages.value === 0){
            return [0]
        }
        if(currentPage.value===1)
            return [currentPage.value,currentPage.value+1,currentPage.value+2];
        else if(currentPage.value === nbrPages.value)
            return [currentPage.value-2,currentPage.value-1 ,currentPage];
        else
            return [currentPage.value-1,currentPage.value,currentPage.value+1]
    })

    function launch_filter(){
        notes.value = filterStore.NotesFilter(original_notes)
    }
</script>
<template>
    
    <div class="m-5">
        <div class="d-flex justify-content-between">
            <NoteFilter  @launch-filter="launch_filter"/>
            <button class="btn btn-primary" data-bs-toggle="modal" @mouseover="currentNote=null" :data-bs-target="'#'+uis.noteFormId">Ajouter</button>
            <NoteForm :note="{}" />
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
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div class="m-3" >
            <div class="d-flex justify-content-end align-item-center">
                <button class="btn changePage" @click="currentPage--" :disabled="currentPage===1">Prev</button>
                <button class="btn changePage" v-for="i in showerIndexPage" @click="currentPage=i" :class="currentPage===i?'current':''" :key="''+i">
                    {{ i }} 
                </button>
                <button class="btn changePage" @click="currentPage++" :disabled="currentPage===nbrPages">Next</button>
            </div>
        </div>
    </div>
</template>
<style>
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

.changePage{
    border: 1px solid rgb(52, 87, 193);
    padding: 0.7em;
    background-color: aliceblue;
}

.changePage.current{
    background-color: blue;
    color: white;
}
</style>