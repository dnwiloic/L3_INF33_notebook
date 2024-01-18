<script setup lang="ts">
import {ref, computed, type Ref, watch} from 'vue'
const currentPage = defineModel('currentPage') as Ref<number>
const nbrPages = defineModel('nbrPages') as Ref<number>

const showerIndexPage = computed(()=>{
    let pageTabe = []
    const min = 1
    const max = nbrPages.value

    if(max === min) return []
    if( max === min+1)  return [min, min+1]
    if(currentPage.value === min && (currentPage.value +2) <= max)
        pageTabe = [currentPage.value,currentPage.value+1,currentPage.value+2];
    else if(currentPage.value === max &&  currentPage.value-2 >= min)
        pageTabe  = [currentPage.value-2,currentPage.value-1 ,currentPage.value];
    else
        pageTabe  = [currentPage.value-1,currentPage.value,currentPage.value+1]

    return pageTabe
})


watch(currentPage, ()=>{
    console.log(currentPage.value);
})
</script>
<template >
    <div v-if="nbrPages>=2">
        <button class="btn changePage" @click="currentPage--" :disabled="currentPage===1">Prev</button>
        <button class="btn changePage" v-for="i in (showerIndexPage as Array<number>)" @click="currentPage=i" :class="currentPage===i?'current':''" :key="''+i">
            {{ i }} 
        </button>
        <button class="btn changePage" @click="currentPage++" :disabled="currentPage===nbrPages">Next</button>
    </div>
</template>
<style scoped>
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