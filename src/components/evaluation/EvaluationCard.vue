<script setup lang="ts">
import { useTestStore } from '@/stores/test';
import {ref} from 'vue';
const testStore = useTestStore()

</script>
<template>
    <div id="question-card">
        <div class="question-card-form">
            <div class="mb-3">
                <label for="note-title" class="col-form-label"> {{ testStore.currentNote.question }}</label>
                <input type="text" class="form-control" id="note-title"
                        v-model="testStore.currentNote.user_response"
                >
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>