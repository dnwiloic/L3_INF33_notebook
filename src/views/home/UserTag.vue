<script setup lang="ts">
import TagForm from '@/components/forms/TagForm.vue';
import SelectPage from '@/components/note/SelectPage.vue';
import { useTagsStore } from '@/stores/tags';
import { useUiStore } from '@/stores/ui';
import { computed, ref} from 'vue';

const uis = useUiStore();
const tagStore = useTagsStore()
const currentPage = ref(1)
const currentTag = ref({content:''})
const addPriority = ref(true)

const tags = computed(()=>{
    return tagStore.userTags
})

const nbrPages = computed(()=>{
        return Math.ceil( tags.value.length/uis.nbrElementsByTables)
})

const showerTable = computed(()=>{
        
    const start = (currentPage.value - 1) * uis.nbrElementsByTables
    const end = currentPage.value * uis.nbrElementsByTables - 1
    
    return tags.value.filter( (value, index)=>(index>=start && index<=end))
     
})

</script>
<template>
    <div class="m-5">
        <div class="d-flex justify-content-end">
            <TagForm :tag="currentTag" v-model:addPriority="addPriority" />
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Selectionner</th>
                    <th>titre de la categories</th>
                    <th>Nombre de note liée</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-if="tagStore.userTags.length===0">
                <tr>
                    <td :colspan=3 :rowspan=3 class="text-center">
                        la liste est vide
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="tag in showerTable" :key="tag.id" >
                    <td><input type="checkbox"></td>
                    <td><span>{{ tag.content }}</span></td>
                    <td>{{ }}</td>
                    <td>
                        <button 
                            @click="()=>{currentTag=tag; addPriority=false}" 
                            class="btn btn-success mx-2"
                            data-bs-toggle="modal"  data-bs-target="#tag_form">Modifier</button>
                        <button class="btn btn-danger mx-2">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="m-3" >
            <div class="d-flex justify-content-end align-item-center">
                <SelectPage v-if="nbrPages>=1" v-model:currentPage="currentPage" v-model:nbrPages="nbrPages" />
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