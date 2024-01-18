<script setup lang="ts">
    import {onMounted, ref} from 'vue'
    import '../../assets/form.css'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
    const router = useRouter()
    const userStore =  useUserStore()
    const formData = ref({
        email: '',
        password: '',
    })

    const submit = async () => {
        const res = await userStore.signIn(
            formData.value.email,
            formData.value.password
        )
        if(res)
            router.push({name:'accueil'})
    
    }
   
</script>

<template>
    <div class="greetings">
      <form>
        <div>
            <div>
                <h2>Se connecter</h2>
                <p class="notice" >Vous n'avez pas encore de compte ? Creez en <a href="/register">ici</a></p>
            </div>
            <div>
                <div class="mb-3">
                    <label for="email" class="required-label form-label">Adresse mail</label>
                    <input type="email" id="email" name="email" v-model="formData.email" class="form-control" required placeholder="mon.mail@gmail.com"/>
                </div>
                <div class="mb-3">
                    <label for="password" class="required-label form-label">Mot de passe</label>
                    <input type="password" id="password" name="password" class="form-control" v-model="formData.password" required/>
                </div>
            </div>
            <div>
                <button type="button" @click="submit" class="btn btn-primary">Valider</button>
            </div>
        </div>
      </form>
    </div>
  </template>