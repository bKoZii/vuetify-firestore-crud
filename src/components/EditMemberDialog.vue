<template>
  <v-btn
    class="text-none"
    size="small"
    text="Edit"
    prepend-icon="mdi-account-edit"
    border
    flat
    @click="dialog = true"
  >
  </v-btn>
  <v-dialog v-model="dialog" max-width="40rem">
    <v-card prepend-icon="mdi-account-edit" title="Edit Member">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6" md="4">
            <v-select
              :items="['Mr.', 'Mrs.', 'Ms.']"
              label="Name Title*"
              required
              variant="outlined"
              v-model="editedMember.title"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="First name*"
              required
              variant="outlined"
              v-model="editedMember.fName"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Last name*"
              required
              variant="outlined"
              v-model="editedMember.lName"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" sm="6">
            <v-text-field
              label="Email*"
              required
              variant="outlined"
              v-model="editedMember.email"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" sm="6">
            <v-text-field
              label="Phone Number*"
              type="phone"
              required
              variant="outlined"
              v-model="editedMember.phoneNum"
            ></v-text-field>
          </v-col>

          <v-checkbox label="Verified" v-model="editedMember.isVerified"></v-checkbox>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-btn
          color="primary"
          text="Save"
          variant="tonal"
          @click="updateData()"
          :disabled="isMemberUnchanged"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="success"> Member Updated </v-snackbar>
</template>
<script setup lang="ts">
  import { IMember } from '@/interface/MemberInterface'
  import { updateMember } from '@/services/FirebaseService'
  import { Timestamp } from 'firebase/firestore'
  import { computed, ref } from 'vue'

  const dialog = ref(false)
  const snackbar = ref(false)
  const timeout = ref(2000)
  const memberProp = defineProps<{
    member: IMember
  }>()
  const editedMember = ref({ ...memberProp.member })
  const oldMember = ref({ ...editedMember.value })
  defineExpose({ editedMember })

  const updateData = async () => {
    dialog.value = false
    editedMember.value.dateEdited = Timestamp.now().toMillis().toString()
    try {
      await updateMember(memberProp.member.id, editedMember.value).then(() => {
        snackbar.value = true
      })
    } catch (e: any) {
      console.error(e.message)
    }
  }

  const isMemberUnchanged = computed(() => {
    return JSON.stringify(editedMember.value) === JSON.stringify(oldMember.value)
  })
</script>
