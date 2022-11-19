import axios from 'axios';
import create from 'zustand';
import { Person } from '../types/people';

type PeopleStore = {
  people: Person[];
  initPeople: () => void;
  addPerson: (person: Person) => void;
  removePerson: (person: Person) => void;
  updatePerson: (person: Person) => void;
};

export const usePeopleStore = create<PeopleStore>((set) => ({
  people: [],
  initPeople: async () => {
    const peopleData = await axios.get('/people');
    if (Array.isArray(peopleData.data)) {
      set((state) => ({
        people: peopleData.data,
      }));
    }
  },
  addPerson: async (person) => {
    set((state) => ({
      people: [...state.people, person],
    }));
  },
  removePerson: (person) => {
    set((state) => ({
      people: state.people.filter((p) => p.id !== person.id),
    }));
  },
  updatePerson: (person) => {
    set((state) => ({
      people: state.people.map((p) => {
        if (p.id === person.id) return person;
        return p;
      }),
    }));
  },
}));
