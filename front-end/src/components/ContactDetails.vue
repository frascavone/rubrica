<template>
  <BaseCard>
    <div class="contact">
      <div
        :style="{ backgroundImage: `url(${selectedContact.avatar})` }"
        class="contact__photo"
      ></div>

      <h2>{{ selectedContact.username }}</h2>
      <form
        v-if="isEditing.val"
        @submit.prevent="
          submitForm({
            id: props.id,
            email: email.val,
            phone: phone.val,
          })
        "
      >
        <div>
          <label for="phone">📞</label>
          <input
            id="phone"
            type="tel"
            v-model.number="phone.val"
            @focus="clearValidity(phone)"
          />
          <p v-if="!phone.isValid">Questo campo non può essere vuoto</p>
        </div>
        <div>
          <label for="email">📧</label>
          <input
            id="email"
            type="text"
            v-model.trim="email.val"
            @focus="clearValidity(email)"
          />
          <p v-if="!email.isValid">Questo campo non può essere vuoto</p>
        </div>
        <BaseButton v-if="isEditing.val" mode="outline" @click="toggleForm"
          >annulla</BaseButton
        >
        <BaseButton v-if="isEditing.val" mode="confirm" type="submit"
          >conferma</BaseButton
        >
      </form>
      <div style="text-align: center" v-else>
        <h3>📞 {{ selectedContact.phone }}</h3>
        <h3>📧 {{ selectedContact.email }}</h3>
        <BaseButton mode="outline" @click="toggleForm">modifica</BaseButton>
      </div>
      <BaseButton link to="/contacts" mode="outline">indietro</BaseButton>
      <BaseButton mode="delete" @click="contactsStore.deleteContact(props.id)"
        >cancella</BaseButton
      >
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../components/BaseCard.vue';
import BaseButton from '../components/BaseButton.vue';
import { useContactsStore } from '../store';
import { reactive } from 'vue';
const props = defineProps({ id: String });

const contactsStore = useContactsStore();
const selectedContact = contactsStore.contacts.find(
  (contact) => contact.id === props.id
);

const email = reactive({ val: '', isValid: true });
const phone = reactive({ val: '', isValid: true });

let formIsValid = reactive({ val: true });

const clearValidity = (input) => {
  input.isValid = true;
};

const updateData = {};
const isEditing = reactive({ val: false });
const toggleForm = () => {
  isEditing.val = !isEditing.val;
};

const validateForm = (data) => {
  if (data.email === '') {
    email.isValid = false;
    formIsValid.val = false;
  }
  if (!data.phone || data.phone < 0) {
    phone.isValid = false;
    formIsValid.val = false;
  }
  return true;
};

const submitForm = (data) => {
  console.log(data);
  validateForm(data);
  if (!formIsValid.val) return;
  contactsStore.updateContact(data);
  contactsStore.contactUpdated = true;
  setTimeout(() => {
    contactsStore.contactUpdated = false;
  }, 3000);
};
</script>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
}
h2 {
  padding: 1rem;
  background-color: cadetblue;
  color: white;
  border-radius: 0 0 10px 10px;
}
h3 {
  margin: 1rem;
}
.contact__photo {
  background-size: cover;
  background-position: left;
  min-height: 20rem;
}
input {
  margin: 1rem;
}
</style>
