import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import UserModel from '@/API/user_model'
import type User from '@/interfaces/user'

export const useUserStore = defineStore('user', () => {
  const log_user = localStorage.getItem('user') || '{}'
  const user = ref(JSON.parse(log_user) as User|undefined)
  const isAuthentificate =ref((user.value && user.value.id && true))
  
  const signIn = async (email:string, password:string) => {
    
    const user_model = new UserModel()
    let message=null;
    try{
        const res = await user_model.signIn(
          {
            email: email,
            password: password});
            if(res.ok){
              user.value = await res.json()
              localStorage.setItem('user', JSON.stringify(user))
              isAuthentificate.value = true 
              message="success"
              }console.log(user.value)
              return true
              
      }catch(err){
        return false
      }
    
    
  }

  const signUp = async (userInfo: User) =>{
    const user_model = new UserModel()
    let message=null;
    
    try{
      const res = await user_model.create(userInfo);
      if(res.ok){
        user.value = await res.json()
        localStorage.setItem('user', JSON.stringify(user))
        isAuthentificate.value = true 
        message="success"
        }console.log(user.value)
        return true    
      }catch(err){
        return false
      }
  }

  const logOut = () => {
    user.value = undefined
    isAuthentificate.value=false
    localStorage.removeItem('user')
  }

  return { user, isAuthentificate, signIn, signUp, logOut }
})
