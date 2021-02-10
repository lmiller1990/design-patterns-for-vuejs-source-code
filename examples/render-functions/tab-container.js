import { h } from 'vue'

const withTabId = (content) => ({
  props: {
    tabId: {
      type: String,
      required: true
    }
  },
  ...content
})

export const TabContent = withTabId({
  render() {
    return h(this.$slots.default)
  }
})

export const Tab = withTabId({
  render() {
    return h('div', h(this.$slots.default))
  }
})

export const TabContainer = {
  props: {
    activeTabId: String
  },


  emits: ['update:activeTabId'],

  render() {
    const $slots = this.$slots.default()
    const tabs = $slots
      .filter(slot => slot.type === Tab)
      .map(tab => {
        return h(
          tab,
          {
            class: {
              tab: true,
              active: tab.props.tabId === this.activeTabId
            },
            onClick: () => {
              this.$emit('update:activeTabId', tab.props.tabId)
            }
          }
        )
      })

    const content = $slots.find(slot => 
      slot.type === TabContent &&
      slot.props.tabId === this.activeTabId
    )

    return [
      h(() => h('div', { class: 'tabs' }, tabs)),
      h(() => h('div', { class: 'content' }, content)),
    ]
  }
}

const style = `
.tabs {
  display: flex;
}

.tab {
  border: 1px solid;
  cursor: pointer;
  padding: 10px;
  width: 100px;
  text-align: center;
}

.tab:first-child {
  border-right: none;
}

.active {
  color: blue;
  border-bottom: 5px solid blue;
}

.content {
  margin: 10px;
  font-size: 1.5rem;
}
`
