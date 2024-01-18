<script setup lang="ts">
import {ref} from 'vue'
import '../../assets/form.css'
import { useCounterStore } from '@/stores/counter';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
const formData = ref({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirm_password: '',
})

const submit = async () => {
    if(formData.value.password === formData.value.confirm_password)
    {
        const res = await userStore.signUp({
            user_name: formData.value.nom + formData.value.prenom,
            email: formData.value.email,
            password: formData.value.password,
            })
        if(res)
        router.push({name:'accueil'})
    }
}
</script>

<template>
    <div class="greetings">
      <form>
        <div>
            <div>
                <h2>Créer un compte</h2>
                <p class="notice">Vous avez déjà un compte ? Connectez vous <a href="/login">ici</a></p>
            </div>
            <div>
                <div class="mb-3">
                    <label for="nom" class="required-label form-label">Nom</label>
                    <input type="text" id="nom" name="nom" class="form-control" v-model="formData.nom" required placeholder="Votre nom"/>
                </div>
                <div class="mb-3">
                    <label for="prenom" class=" form-label">Prenom</label>
                    <input type="text" id="prenom" name="prenom" class="form-control" v-model="formData.prenom" placeholder="Votre prenom"/>
                </div>
                <div class="mb-3">
                    <label for="mail" class="required-label form-label">Adresse mail</label>
                    <input type="email" id="mail" name="mail" class="form-control" v-model="formData.email" required placeholder="mon.mail@gmail.com"/>
                </div>
                <div class="mb-3">
                    <label for="password" class="required-label form-label">Mot de passe</label>
                    <input type="password" id="password" name="password" class="form-control" v-model="formData.password" required/>
                </div>
                <div class="mb-3">
                    <label for="confirm_password" class="required-label form-label">Confirmation du mot de passe</label>
                    <input type="password" id="confirm_password" name="confirm_password" class="form-control" v-model="formData.confirm_password" required/>
                </div>
            </div>
            <div>
                <button type="button" @click="submit" class="btn btn-primary">Valider</button>
            </div>
        </div>
      </form>
    </div>
  </template>