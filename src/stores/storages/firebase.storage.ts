import { createJSONStorage, StateStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-4b5b9-default-rtdb.firebaseio.com/zustand';

export const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) => res.json());
      // console.log('data', data);

      return JSON.stringify(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: value,
    }).then((res) => res.json());

    // console.log('data', data);
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log('removeItem', name);
    return null;
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
