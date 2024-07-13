import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
  color: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  // computed: {
  //   totalBears: number;
  // };

  totalBears: () => number;

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

// export const useBearStore = create<BearState>()((set, get) => ({
//   blackBears: 10,
//   polarBears: 5,
//   pandaBears: 3,

//   bears: [{ id: 1, name: 'Oso #1', color: 'black' }],

//   computed: {
//     get totalBears(): number {
//       return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
//     },
//   },

//   increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
//   increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
//   increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),

//   doNothing: () => set((state) => ({ bears: [...state.bears] })),
//   addBear: () =>
//     set((state) => ({ bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}`, color: 'black' }] })),
//   clearBears: () => set({ bears: [] }),
// }));

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 3,

      bears: [{ id: 1, name: 'Oso #1', color: 'black' }],

      // computed: {
      //   get totalBears(): number {
      //     return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
      //   },
      // },

      totalBears: () => get().blackBears + get().polarBears + get().pandaBears + get().bears.length,

      increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
      increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),

      doNothing: () => set((state) => ({ bears: [...state.bears] })),
      addBear: () =>
        set((state) => ({ bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}`, color: 'black' }] })),
      clearBears: () => set({ bears: [] }),
    }),
    {
      name: 'bears-store',
    }
  )
);
