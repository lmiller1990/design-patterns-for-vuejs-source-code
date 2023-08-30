import { reactive, readonly, inject } from "vue";

interface User {
  id: number
  name: string;
}

interface State {
  users: User[];
}

export class Store {
  #state: State = { users: [] };

  constructor(state: State) {
    this.#state = reactive(state);
  }

  getState() {
    return readonly(this.#state);
  }

  addUser(user: Omit<User, 'id'>) {
    const id = this.#state.users.length === 0 ? 1 : Math.max(...this.#state.users.map(user => user.id)) + 1
    this.#state.users.push({ id, ...user });
  }

  removeUser(user: User) {
    this.#state.users = this.#state.users.filter(
      (u) => u.name !== user.name
    );
  }
}

export function useStore(): Store {
  return inject("store") as Store;
}

export const store = new Store({
  users: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bobby" },
    { id: 3, name: "Candice" },
    { id: 4, name: "Darren" },
    { id: 5, name: "Evelynn" },
  ],
});
