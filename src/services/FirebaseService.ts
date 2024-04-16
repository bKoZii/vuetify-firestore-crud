import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { env } from '@/env/env'

export const firebaseApp = initializeApp(env.firebase)

const db = getFirestore(firebaseApp)
export const memberRef = collection(db, 'members-test') // Your FireStore name here
export const addMember = async (data: Object): Promise<string> => {
  try {
    await addDoc(memberRef, data)
    return 'Add Member Completed'
  } catch (e: any) {
    throw new Error('Error adding document: ' + e.message)
  }
}

export const deleteMember = async (id?: string): Promise<string> => {
  try {
    await deleteDoc(doc(memberRef, id))
    return 'Delete Completed'
  } catch (e: any) {
    console.error('Error deleting document: ', e)
    throw new Error('Error: ' + e.message)
  }
}

export const updateMember = async (id: any, data: any): Promise<string> => {
  try {
    await updateDoc(doc(memberRef, id), data)
    return 'Update Completed'
  } catch (e: any) {
    console.error('Error Updating document: ', e)
    throw new Error('Error: ' + e.message)
  }
}
