import { reactive, readonly, inject } from 'vue'

export class Store {
  #state = {}

  constructor(state) {
    this.#state = reactive(state)
  }

  getState() {
    return readonly(this.#state)
  }

  addUser(user) {
    this.#state.users.push(user)
  }

  removeUser(user) {
    this.#state.users = this.#state.users.filter(u =>
      u.name !== user.name
    )
  }
}

export const store = new Store({
  users: [
    { name: 'Alice' },
    { name: 'Bobby' },
    { name: 'Candice' },
    { name: 'Darren' },
    { name: 'Evelynn' },
  ]
})

export function useStore() {
  return inject('store')
}
