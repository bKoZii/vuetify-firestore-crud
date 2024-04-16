<template>
  <v-card>
    <v-data-iterator :items="member" :items-per-page="6" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2" color="teal-darken-4">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 30rem"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
          <v-spacer />
          <AddMemberModal />
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense v-auto-animate>
            <v-col v-for="item in items" :key="item.raw.id" cols="12" lg="4" md="6" sm="6">
              <v-card class="py-3" variant="tonal" color="teal-lighten-2">
                <v-list-item subtitle="Member" class="mb-2">
                  <template v-slot:append>
                    <div v-if="item.raw.isVerified == true">
                      <v-tooltip text="Verified Member" location="top">
                        <template v-slot:activator="{ props }">
                          <v-icon
                            icon="mdi-check-circle"
                            color="green-lighten-1"
                            v-bind="props"
                          ></v-icon>
                        </template>
                      </v-tooltip>
                    </div>
                    <div v-else>
                      <v-tooltip text="Not Verified Member" location="top">
                        <template v-slot:activator="{ props }">
                          <v-icon
                            icon="mdi-alert-circle"
                            color="orange-darken-1"
                            v-bind="props"
                          ></v-icon>
                        </template>
                      </v-tooltip>
                    </div>
                  </template>

                  <template v-slot:title>
                    <p class="mb-2">
                      {{ item.raw.title + ' ' + item.raw.fName + ' ' + item.raw.lName }}
                    </p>
                  </template>
                </v-list-item>

                <v-list density="compact" lines="one">
                  <v-list-item prepend-icon="mdi-email" :subtitle="item.raw.email" />
                  <v-list-item prepend-icon="mdi-phone" :subtitle="item.raw.phoneNum" />
                </v-list>

                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex flex-column">
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                      <v-icon icon="mdi-clock-plus-outline" start></v-icon>

                      <div class="text-truncate">
                        {{ new Date(parseInt(item.raw.dateAdded)).toLocaleString() }}
                      </div>
                    </div>
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                      <v-icon icon="mdi-clock-edit-outline" start></v-icon>

                      <div class="text-truncate">
                        {{
                          item.raw.dateEdited
                            ? new Date(parseInt(item.raw.dateEdited)).toLocaleString()
                            : 'No Data'
                        }}
                      </div>
                    </div>
                  </div>

                  <div>
                    <EditMemberDialog :member="item.raw" />
                    <DeleteDialog :member="item.raw" />
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
          <!-- <div class="mx-2 text-caption">Total Member : {{ member?.length }}</div> -->
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>
<script setup lang="ts">
  import { defineAsyncComponent, ref, toRefs } from 'vue'
  import { IMember } from '../interface/MemberInterface'
  const AddMemberModal = defineAsyncComponent(() => import('./AddMemberModal.vue'))
  const DeleteDialog = defineAsyncComponent(() => import('./DeleteDialog.vue'))
  const EditMemberDialog = defineAsyncComponent(() => import('./EditMemberDialog.vue'))

  const search = ref('')
  const mProp = defineProps<{
    member: IMember[]
  }>()

  const { member } = toRefs(mProp)
</script>
