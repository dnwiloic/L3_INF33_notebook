import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import UserModel from '@/API/user_model'
import type User from '@/interfaces/user'
import { toast } from 'vue3-toastify';


export const useUserStore = defineStore('user', () => {
  const log_user = localStorage.getItem('user') || '{}'
  const user = ref(JSON.parse(log_user) as User|undefined)
  const isAuthentificate =ref((user.value && user.value.id && true))
  
  const signIn = async (email:string, password:string) => {
    
    const user_model = new UserModel()
    try{
        const res = await user_model.signIn(
          {
            email: email,
            password: password});
            if(res.ok){
              user.value = await res.json()
              localStorage.setItem('user', JSON.stringify(user))
              isAuthentificate.value = true 
              toast.success("Connexion réussite"); 
              return true
            }else{
              toast.error("Echec de la connexion: Vérifiez vos informations et reéssayez.");
            }
      }catch(err){
        toast.error("Echec de la connexion: Vérifiez votre réseau.");
        return false
      }
    
    
  }

  const signUp = async (userInfo: User) =>{
    const user_model = new UserModel()
    
    try{
      const res = await user_model.create(userInfo);
      if(res.ok){
        user.value = await res.json()
        localStorage.setItem('user', JSON.stringify(user))
        isAuthentificate.value = true 
        toast.success("Votre compte à été créé."); 
        return true
      }
      toast.error("Echec : Vérifiez vos informations et reéssayez.");
      return false
      }catch(err){
        toast.error("Echec de la connexion: Vérifiez votre réseau.");
        return false
      }
  }

  const logOut = () => {
    user.value = undefined
    isAuthentificate.value=false
    localStorage.removeItem('user')
    toast.info("Vous êtes maintenant déconnecté.");
  }

  return { user, isAuthentificate, signIn, signUp, logOut }
})
