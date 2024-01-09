import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import UserModel from '@/API/user_model'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: 'Loic',
    birthday: '2003=10-12',
    id: 12
  })
  
  const signIn = async (email:string, password:string) => {
    const user_model = new UserModel()
    let message=null;
    const res = await user_model.signIn(
      {user_name:email,
      password:password});
    if(res.ok){
      res.json()
      .then( usr => {
        user.value=usr;
        message="success"
      })
      .catch(err=>{message=err})
    }else{
      message = "Une erreur est survenu veuillew reaisseyer"
      
    }
    return message
  }

  const signUp = async (email:string, password:string) =>{
    const user_model = new UserModel()
    let message=null;
    const res = await user_model.create(
      {user_name:email,
      password:password});
    if(res.ok){
      res.json()
      .then( usr => {
        user.value=usr;
        message="success"
      })
      .catch(err=>{message=err})
    }else{
      message = "Une erreur est survenu veuillew reaisseyer"
      
    }
    return message
  }

  return { user, signIn, signUp }
})
