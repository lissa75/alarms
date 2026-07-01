
import { create } from "zustand";

const alarmUIStore = create((set)=>({
    isLoading :false,
    error:null,
    setIsLoading:(isLoading)=>set({isLoading}),
    setError:(error)=>set({error})
}))


