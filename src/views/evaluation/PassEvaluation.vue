<script setup lang="ts">
import EvaluationCard from '@/components/evaluation/EvaluationCard.vue';
import {ref } from 'vue'

</script>
<template>
    <div>
        <EvaluationCard />
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
<style scoped>

</style>