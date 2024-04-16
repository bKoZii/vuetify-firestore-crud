<template>
  <v-btn prepend-icon="mdi-account-plus" variant="elevated" color="primary" @click="dialog = true"
    >Add New Member</v-btn
  >
  <v-dialog v-model="dialog" width="40rem">
    <v-card prepend-icon="mdi-account-plus" title="Add New Member">
      <form @submit.prevent="sendData">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="['Mr.', 'Mrs.', 'Ms.']"
                label="Name Title*"
                variant="outlined"
                v-model="title.value.value as string | null | undefined"
                :error-messages="title.errorMessage.value"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="First name*"
                variant="outlined"
                v-model="fName.value.value"
                :error-messages="fName.errorMessage.value"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Last name*"
                variant="outlined"
                v-model="lName.value.value"
                :error-messages="lName.errorMessage.value"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Email*"
                variant="outlined"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="12">
              <v-text-field
                label="Phone Number*"
                type="phone"
                variant="outlined"
                v-model="phoneNum.value.value"
                :error-messages="phoneNum.errorMessage.value"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancel" variant="plain" @click="cancelForm"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            type="submit"
            :disabled="isMemberDataEmpty"
          ></v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="success"> Member Added </v-snackbar>
</template>
<script setup lang="ts">
  import { IMember } from '@/interface/MemberInterface'
  import { addMember } from '@/services/FirebaseService'
  import { Timestamp } from 'firebase/firestore'
  import { useField, useForm } from 'vee-validate'
  import { computed, ref } from 'vue'

  const dialog = ref(false)
  const snackbar = ref(false)
  const timeout = ref(2000)
  const member = ref<IMember>({ isVerified: false } as IMember)

  const isMemberDataEmpty = computed(() => {
    return Object.values(member.value).every(
      (value) => value === undefined || value === null || value === '' || value === 0
    )
  })

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      fName(value: string) {
        if (value?.length >= 2) return true

        return 'Name needs to be at least 2 characters.'
      },
      lName(value: string) {
        if (value?.length >= 2) return true

        return 'Name needs to be at least 2 characters.'
      },
      phoneNum(value: string) {
        if (value?.length > 0 && /[a-z.-]+/.test(value)) return 'Please Enter Only Number'
        else if (value?.charAt(0) != '0') return 'Phone Number need to start with 0'
        else if (value?.length > 10) return 'Phone number needs to be 10 digits.'
        else if (value?.length > 9 && /[0-9-]+/.test(value)) return true
        return 'Phone number needs to be 10 digits.'
      },
      email(value: string) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Must be a valid e-mail.'
      },
      title(value: string) {
        if (value) return true

        return 'Select your Name Title.'
      },
    },
  })

  const fName = useField('fName')
  const lName = useField('lName')
  const title = useField('title')
  const email = useField('email')
  const phoneNum = useField('phoneNum')

  const cancelForm = () => {
    handleReset()
    dialog.value = false
  }
  const sendData = handleSubmit(async (value) => {
    member.value = { ...member.value, ...value, dateAdded: Timestamp.now().toMillis().toString() }
    dialog.value = false
    try {
      await addMember(member.value).then(() => {
        snackbar.value = true
      })
    } catch (e: any) {
      console.error('Error Adding Member: ', e)
    }
  })
</script>
