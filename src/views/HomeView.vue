<script setup lang="ts">
  import { computed, onMounted,ref } from 'vue';
  import { useUserStore } from '@/stores/user';

import { useTagsStore } from '@/stores/tags';

  const tagStore = useTagsStore()
  const user = useUserStore();
  const side_nav = ref()
  const showFontBlack=ref(false)
  function toggleActive(domElt: HTMLElement|null){
    if(!domElt) return
    if(domElt.classList.contains('active')){
      domElt.classList.remove('active')
    }
    else{
      domElt.classList.add('active')
    }

    showFontBlack.value = side_nav.value && side_nav.value.classList.contains('active')
  }


  onMounted(()=>{
    side_nav.value = document.getElementById("side_nav")
    document.querySelectorAll(".btn-close").forEach(elt=>{
      console.log(elt.tagName)
      elt.addEventListener('click', function(event){
        toggleActive(document.getElementById(elt.getAttribute('to-close')))
      })
    })
    document.querySelectorAll(".open-btn").forEach(elt=>{
      
      elt.addEventListener('click', function(event){
        toggleActive(document.getElementById(elt.getAttribute('to-open')))
      })
    })

    const sideItems = document.querySelectorAll('.sidebar ul li')
    sideItems.forEach( elt => {
      elt.addEventListener('click',function(event){
        console.log('click')
        document.querySelector(".sidebar ul li.active")?.classList.remove("active")
        elt?.classList.add("active")
      })
    })
  })
</script>

<template>
  <main>
    <div :class="!showFontBlack?'d-none':'d-block'" class="btn-close" to-close="side_nav" id="side_nav_font">

    </div>
    <div class="main-container d-flex">
      <div class="sidebar" id="side_nav">
        <div class="header-box px-3 pt-3 pb-4 d-flex justify-content-between">
          <h1 class="fs-4">
            <span class="bg-white text-dark rounder shadow px-2 mx-2">Nt</span>
            <span class="">Note</span>
          </h1>
          <button class="btn d-lg-none d-block btn-close px-1 py-0 text-white" to-close="side_nav">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>

        <ul class="list-unstyled px-2">
          <li class="active" >
            
            <RouterLink :to="{name:'accueil'}" class="text-decoration-none px-2 py-2 d-block nav-lk">
              <font-awesome-icon icon="fa-solid fa-house" /> 
              Accueil
            </RouterLink>
          </li>
          <li class="">
            
            <RouterLink :to="{name:'all_notes'}" class="nav-lk text-decoration-none px-2 py-2 d-block">
               <font-awesome-icon icon="fa-solid fa-clipboard" />
               Notes
            </RouterLink>
          </li>
          <li class="">
            
            <RouterLink :to="{name:''}" class="text-decoration-none px-2 py-2 d-block nav-lk"> 
              <font-awesome-icon icon="fa-solid fa-star" />
              Favories
            </RouterLink>
          </li>
          <li class="">
            
            <RouterLink :to="{name:'categories'}" class="text-decoration-none nav-lk px-2 py-2 d-block d-flex justify-content-between">
              
              <span> <font-awesome-icon icon="fa-solid fa-layer-group" /> Categorie</span>
              <span class="bg-dark rounded-pill text-white py-0 px-2"> {{ tagStore.userTags.length }} </span>
               
            </RouterLink>
          </li>
          <li class="">
            
            <RouterLink :to="{name:'eval_config'}" class="text-decoration-none nav-lk px-2 py-2 d-block"> 
              <font-awesome-icon icon="fa-solid fa-dna" />
              Evaluation
            </RouterLink>
          </li>
        </ul>
        <hr class="h-color mx-3">
        <ul class="list-unstyled px-2">
          <li>
             <a  class="text-decoration-none nav-lk px-2 py-2 d-block " data-bs-toggle="collapse" href="#user_menu_profile" role="button" aria-expanded="false" aria-controls="collapseExample">
              <span><font-awesome-icon icon="fa-solid fa-user-large" /></span>
              <span>{{ user.user.name }}</span>
            </a>
          </li>

            <li><RouterLink :to="{name:''}" class="text-decoration-none nav-lk px-2 py-2 d-block" href="#">
              <span><font-awesome-icon icon="right-from-bracket" /></span>
              Se deconnecter
            </RouterLink></li>
          
        </ul>
        
      </div>

      <div class="content">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="d-flex container-fluid justify-content-between">
            <button class="navbar-toggler open-btn" type="button" to-open="side_nav" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="d-none d-lg-block ">
              <p>Bienvenu {{ user.user.name }}</p>
            </div>
              <div class=" d-sm-none " >
                <button class="btn open-btn" to-open="global_search">
                  <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
                
              </div>
              <div id="global_search" >
                <div class="d-flex" role="search">
                  <div class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  </div>
                </div>
              </div>
          
          </div>
          
        </nav>

        <div>
          <RouterView/>
        </div>
      </div>
    </div>
  </main>
  
</template>

<style scoped>


#side_nav {
  background: white;
  min-width: 15em;
  padding: 1em;
  transition: all 0.5s;
}

#side_nav_font{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(20, 20, 20, 0.3);
  height: 100vh;
  width: 100vw;
  z-index: 2;
}

.content{
  min-height: 100vh;
  width: 100%;;
}

hr.h-color{
  color: black;
}

.sidebar li.active{
  background: black;
  border-radius: 0.5em;
}

.sidebar li.active .nav-lk, .sidebar li.active .nav-lk:hover{
   color: white !important;
}

.sidebar li .nav-lk{
  color: black !important;
}

.profile_drop{
  margin-inline: 3em;
}

@media (max-width: 576px) {
  #global_search{
  display: none;
  transition: all 0.5s;
}

#global_search.active{
  display: block;
}
}


@media (max-width: 992px){
  #side_nav{
    margin-left: -16em;
    position: fixed;
    min-height: 100vh;
    z-index: 3;
  }

  #side_nav.active{
     margin-left: 0;
  }
}

</style>
