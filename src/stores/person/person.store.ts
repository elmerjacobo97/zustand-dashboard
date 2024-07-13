import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { firebaseStorage } from '../storages/firebase.storage';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface PersonActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & PersonActions, [['zustand/devtools', never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value: string) => set({ lastName: value }, false, 'setLastName'),
});

export const usePersonStore = create<PersonState & PersonActions>()(
  devtools(
    persist(storeApi, {
      name: 'person-store',
      // storage: customSessionStorage,
      storage: firebaseStorage,
    })
  )
);
