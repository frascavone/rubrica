<template>
  <h4 v-if="contactsStore.contactAdded">Contatto aggiunto correttamente</h4>
  <h4 v-if="contactsStore.contactUpdated">Contatto modificato correttamente</h4>
  <h4 v-if="contactsStore.contactDeleted">Contatto eliminato correttamente</h4>

  <BaseDialog
    :show="!!contactsStore.error"
    title="ERRORE!"
    :fixed="false"
    @close="
      () => {
        contactsStore.error = null;
        contactsStore.isLoading = false;
      }
    "
  >
    <p>{{ contactsStore.error }}</p>
  </BaseDialog>

  <BaseCard>
    <div class="controls">
      <BaseButton mode="outline" @click="contactsStore.loadContacts"
        >Aggiorna</BaseButton
      >
      <BaseButton @click="showForm">Aggiungi</BaseButton>
    </div>
    <ContactForm style="margin: 0 auto" v-if="contactsStore.formIsVisible"
      >Form aggiunta contatto</ContactForm
    >
    <div v-if="contactsStore.isLoading">
      <BaseSpinner />
    </div>
    <ul class="contact-list" v-else-if="contactsStore.hasContacts">
      <ContactItem
        v-for="contact in contactsStore.contacts"
        :key="contact.id"
        :id="contact.id"
        :firstName="contact.firstName"
        :lastName="contact.lastName"
        :username="contact.username"
        :email="contact.email"
        :phone="contact.phone"
        :avatar="contact.avatar"
      ></ContactItem>
    </ul>
    <h3 v-else>Nessun contatto trovato.</h3>
  </BaseCard>
</template>

<script setup>
import ContactItem from '../components/contactItem.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseCard from '../components/BaseCard.vue';
import { useContactsStore } from '../store';
import BaseSpinner from '../components/BaseSpinner.vue';
import BaseDialog from '../components/BaseDialog.vue';
import { onMounted } from 'vue';
import ContactForm from './ContactForm.vue';

const emits = defineEmits(['showForm']);
const contactsStore = useContactsStore();
onMounted(contactsStore.loadContacts);

const showForm = () => {
  contactsStore.formIsVisible = !contactsStore.formIsVisible;
};
</script>

<style scoped>
.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
@media screen and (max-width: 34.06rem) {
  .contact-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media screen and (max-width: 83.11rem) and (min-width: 50.31rem) {
  .contact-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 83.12rem) {
  .contact-list {
    grid-template-columns: repeat(5, 1fr);
  }
}

.controls {
  display: flex;
  justify-content: space-around;
}

h4 {
  margin-top: 0;
  padding: 1rem;
  background-color: green;
  color: white;
}
</style>
