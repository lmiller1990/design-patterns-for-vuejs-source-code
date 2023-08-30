<template>
  <TabContainer v-model="activeTabId">
    <Tab tabId="1" data-testid="tab-1">Tab #1</Tab>
    <Tab tabId="2" data-testid="tab-2">Tab #2</Tab>

    <TabContent tabId="1">Content #1</TabContent>
    <TabContent tabId="2">Content #2</TabContent>
  </TabContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { 
  Tab,
  TabContent,
  TabContainer
}  from './tabs.js'

const activeTabId = ref('1')
</script>

<style>
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
</style>