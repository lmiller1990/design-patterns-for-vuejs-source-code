<template>
  <tab-container v-model:activeTabId="activeTabId">
    <tab tabId="1" data-test="1">Tab #1</tab>
    <tab tabId="2" data-test="2">Tab #2</tab>

    <tab-content tabId="1">Content #1</tab-content>
    <tab-content tabId="2">Content #2</tab-content>
  </tab-container>
</template>

<script>
import { ref } from 'vue'

import { 
  Tab,
  TabContent,
  TabContainer
}  from './tab-container.js'

export default {
  components: {
    Tab,
    TabContainer,
    TabContent
  },

  setup() {
    return {
      activeTabId: ref('1')
    }
  }
}
</script>
