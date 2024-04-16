<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container v-auto-animate>
        <div v-if="isCollectionEmpty && showAlert">
          <NoDataAlert />
        </div>
        <DataDisplay :member="memberData" />
      </v-container>
    </v-main>
    <footer>
      <v-footer> Responsive is Not Fully Tested </v-footer>
    </footer>
  </v-app>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
  import { IMember } from './interface/MemberInterface'
  import { useCollection } from 'vuefire'
  import { memberRef } from '@/services/FirebaseService'

  const NoDataAlert = defineAsyncComponent(() => import('./components/NoDataAlert.vue'))
  const DataDisplay = defineAsyncComponent(() => import('./components/DataDisplay.vue'))
  const AppBar = defineAsyncComponent(() => import('./components/AppBar.vue'))

  const memberData = useCollection<IMember>(memberRef)
  const isCollectionEmpty = computed(() => {
    return memberData.value.length === 0
  })

  const showAlert = ref(false)

  onMounted(() => {
    setTimeout(() => {
      showAlert.value = true
    }, 1500)
  })
</script>
