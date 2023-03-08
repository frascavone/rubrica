<template>
  <BaseCard>
    <div class="contact">
      <div
        :style="{ backgroundImage: `url(${selectedContact.avatar})` }"
        class="contact__photo"
      ></div>
      <h2>{{ selectedContact.username }}</h2>

      <h3>📞 {{ selectedContact.phone }}</h3>
      <h3>📧 {{ selectedContact.email }}</h3>
      <BaseButton mode="outline">modifica</BaseButton>
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
// import { onBeforeMount } from 'vue';

const contactsStore = useContactsStore();
const selectedContact = contactsStore.contacts.find(
  (contact) => contact.id === props.id
);

const props = defineProps({ id: String });
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
  margin: 1rem 0 2rem;
}
.contact__photo {
  background-size: cover;
  background-position: left;
  min-height: 20rem;
}
</style>
