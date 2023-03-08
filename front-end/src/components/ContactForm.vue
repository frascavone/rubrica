<template>
  <form
    @submit.prevent="
      submitForm({
        firstName: firstName.val,
        lastName: lastName.val,
        email: email.val,
        phone: phone.val,
      })
    "
  >
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Nome</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @focus="clearValidity(firstName)"
      />
      <p v-if="!firstName.isValid">Questo campo non può essere vuoto</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Cognome</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @focus="clearValidity(lastName)"
      />
    </div>
    <p v-if="!lastName.isValid">Questo campo non può essere vuoto</p>

    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Email</label>
      <input
        type="text"
        id="email"
        v-model.trim="email.val"
        @focus="clearValidity(email)"
      />
      <p v-if="!email.isValid">Questo campo non può essere vuoto</p>
    </div>
    <div class="form-control" :class="{ invalid: !phone.isValid }">
      <label for="phone">Telefono</label>
      <input
        type="tel"
        id="phone"
        v-model.number="phone.val"
        @focus="clearValidity(phone)"
      />
      <p v-if="!phone.isValid">Questo campo non può essere vuoto</p>
    </div>

    <span v-if="!formIsValid.val">
      Per favore correggi gli errori e ricompila il modulo
    </span>
    <div class="submit">
      <BaseButton>Crea Contatto</BaseButton>
    </div>
  </form>
</template>

<script setup>
import BaseButton from './BaseButton.vue';
import { useContactsStore } from '../store';
import { reactive } from 'vue';
const contactsStore = useContactsStore();

const firstName = reactive({ val: '', isValid: true });
const lastName = reactive({ val: '', isValid: true });
const email = reactive({ val: '', isValid: true });
const phone = reactive({ val: '', isValid: true });

let formIsValid = reactive({ val: true });

const clearValidity = (input) => {
  input.isValid = true;
};

const validateForm = (data) => {
  if (data.firstName === '') {
    firstName.isValid = false;
    formIsValid.val = false;
  }
  if (data.lastName === '') {
    lastName.isValid = false;
    formIsValid.val = false;
  }
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
  validateForm(data);
  if (!formIsValid.val) return;
  contactsStore.addContact(data);
  contactsStore.contactAdded = true;
  setTimeout(() => {
    contactsStore.contactAdded = false;
  }, 3000);
};
</script>

<style scoped>
form {
  font-size: 1.5rem;
  max-width: 40rem;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

h3 {
  margin: 0.5rem 0;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
  background-color: rgb(255, 200, 194);
}
p {
  color: red;
}
#areas {
  display: flex;
}
.submit {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
