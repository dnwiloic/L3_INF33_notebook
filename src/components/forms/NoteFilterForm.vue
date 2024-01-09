<script setup lang="ts">
import {ref} from 'vue'
import {useFilterStore} from "@/stores/filter"
import SelectTags from "../forms/SelectTags.vue";
import type FilterOption from "@/interfaces/filter";
import { note_statut } from '@/interfaces/note_status_enum';

const emit = defineEmits(['launch-filter'])
const filterStore = useFilterStore()
const tes =ref([])
const filterParams = ref(filterStore.NoteFilterParam)
filterParams.value.statut = []
filterParams.value.created_date = {
    debut:'',
    fin:''
}

const filtrer = ()=>{
    
    filterStore.setNoteFilterPaams(filterParams.value)
    emit('launch-filter')
}

</script>
<template>
<button class="btn btn-secondary border border-primary" data-bs-toggle="modal"  data-bs-target="#note_filter_form">Filtrer</button>
 <div class="modal fade" id="note_filter_form" tabindex="-1" aria-labelledby="note_filter_form" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Filtrer</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="mb-3">
                        <input class="form-check-input" type="checkbox"  id="favorite" v-model="filterParams.favorite">
                        <label for="favorite" class="col-form-label">Favorie </label>
                    </div>
                    <div class="mb-3">
                        <label for="note-title" class="col-form-label">Titre:</label>
                        <input type="text" class="form-control" id="note-title" v-model="filterParams.title">
                    </div>
                    <div class="mb-3">
                        <label for="content-text" class="col-form-label">Contenu</label>
                        <textarea class="form-control" id="content-text" v-model="filterParams.content"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="question-text" class="col-form-label">Question</label>
                        <textarea class="form-control" id="question-text" v-model="filterParams.question"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="response-text" class="col-form-label">Response</label>
                        <textarea class="form-control" id="response-text" v-model="filterParams.response"></textarea>
                    </div>
                    <div class="mb-3">
                        <div class="col-form-label">Statut</div>
                        <div class="d-flex justify-content-between">
                            <div class="radio_eval">
                                <input id="non_aquis_radio" type="checkbox" :value="note_statut.not_aquied" v-model="filterParams.statut" class="form-check-input" >
                                <label for="non_aquis_radio" class="form-label">Non acquis</label>
                            </div >
                            <div class="radio_eval">
                                <input id="en_cours_radio"  type="checkbox" :value="note_statut.in_aquisition" v-model="filterParams.statut" class="form-check-input" >
                                <label for="en_cours_radio" class="form-label">En Cours d'Acquis</label>
                            </div>
                            <div class="radio_eval">
                                <input id="aquis_radio" type="checkbox" :value="note_statut.aquied" v-model="filterParams.statut" class="form-check-input" >
                                <label for="aquis_radio" class="form-label"> Acquis</label>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="date" class="col-form-label">Date de creation</label>
                        <div class="d-flex justify-content-between">
                            <div class="">
                                <label for="date_debut" class="form-label">Du</label>
                                <input id="date_debut" type="date" v-model="filterParams.created_date!.debut"  class="form-control" >
                            </div >
                            <div class="">
                                <label for="date_fin" class="form-label">Au</label>
                                <input id="date_fin" v-model="filterParams.created_date!.fin" type="date" class="form-control" >
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <SelectTags />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" @click="filtrer" class="btn btn-primary" data-bs-dismiss="modal">Valider</button>
            </div>
        </div>
  </div>
</div>
</template>
<style scoped>
</style>