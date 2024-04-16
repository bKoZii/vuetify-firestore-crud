<template>
  <v-btn
    @click="dialog = true"
    class="text-none"
    size="small"
    text="Delete"
    prepend-icon="mdi-delete"
    variant="outlined"
    color="red-accent-2"
  >
  </v-btn>
  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="400" prepend-icon="mdi-account-remove" title="Delete Member">
      <v-card-text>
        Are you sure you want to delete this Member?
        <p class="text-blue-grey">
          {{ member.title + ' ' + member.fName + ' ' + member.lName }}
        </p>
      </v-card-text>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancel" @click="dialog = false"></v-btn>
        <v-btn text="Delete" color="red" variant="tonal" @click="delMember()"></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="DeleteSnackbar" :timeout="timeout" color="success">
    Member Added
  </v-snackbar>
</template>

<script setup lang="ts">
  import { IMember } from '@/interface/MemberInterface'
  import { deleteMember } from '@/services/FirebaseService'
  import { ref, toRefs } from 'vue'

  const DeleteSnackbar = ref(false)
  const timeout = ref(2000)
  const dialog = ref(false)
  const mRef = defineProps<{
    member: IMember
  }>()
  const { member } = toRefs(mRef)

  const delMember = async () => {
    dialog.value = false
    try {
      await deleteMember(member.value.id).then(() => {
        DeleteSnackbar.value = true
      })
    } catch (e: any) {
      console.error('Error Deleting Member: ', e)
    }
  }
</script>
