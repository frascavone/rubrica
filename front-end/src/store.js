import { defineStore } from 'pinia';
import { faker } from '@faker-js/faker';
import { router } from './router';

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    isLoading: false,
    isEditing: false,
    error: null,
    contactAdded: false,
    contactUpdated: false,
    contactDeleted: false,
    formIsVisible: false,
  }),
  actions: {
    async loadContacts() {
      this.$state.isLoading = true;
      try {
        const res = await fetch(`http://localhost:3000/users`);

        const users = await res.json();

        if (!res.ok) {
          const error = new Error(data.message || 'Caricamento dati fallito');
          throw error;
        }
        this.$state.isLoading = false;
        const contacts = [];

        for (const key in users) {
          const contact = {
            id: users[key].id,
            firstName: users[key].firstName,
            lastName: users[key].lastName,
            username: users[key].username,
            email: users[key].email.toLowerCase(),
            phone: users[key].phone,
            avatar: users[key].avatar,
          };
          contacts.push(contact);
        }
        this.$state.contacts = contacts;
      } catch (error) {
        this.$state.error = error.message || 'Ops, qualcosa è andato storto';
      }
    },
    async addContact(formData) {
      const contactData = {
        id: faker.datatype.uuid(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email.toLowerCase(),
        phone: `+39 ${formData.phone.toString()}`,
        avatar:
          'https://lh3.googleusercontent.com/TWVQZDj8WCdDcnyvvxFeEH0nJiGod_gTmPyQsMXZhFNEDdJXW2NtgIRrEfSEPn1H9CMvSZpjN41a8Qinq14I7wwgqOUjOay2f_yxOBM',
      };
      try {
        const res = await fetch(`http://localhost:3000/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        });
        if (!res.ok) {
          const error = new Error(data.message);
          throw error;
        }
      } catch (error) {
        this.$state.error = error.message;
      }

      this.loadContacts();
      this.$state.formIsVisible = false;
    },
    async deleteContact(contactId) {
      // DELETE request to http://localhost:3000/api/users/ contactId ...
      try {
        const res = await fetch(`http://localhost:3000/users/${contactId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          const error = new Error(data.message);
          throw error;
        }
      } catch (error) {
        this.$state.error = error.message;
      }
      const selectedContactIndex = this.$state.contacts.findIndex(
        (el) => el.id === contactId
      );
      this.$state.contacts.splice(selectedContactIndex, 1);
      router.replace('/users');
      this.$state.contactDeleted = true;
      setTimeout(() => {
        this.$state.contactDeleted = false;
      }, 5000);
      this.loadContacts();
    },
    async updateContact(formData) {
      // PATCH request to http://localhost:3000/api/users/contactId ...

      const changes = {
        email: formData.email.toLowerCase(),
        phone: formData.phone.toString(),
      };
      try {
        const res = await fetch(`http://localhost:3000/users/${formData.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(changes),
        });
        if (!res.ok) {
          const error = new Error(data.message);
          throw error;
        }
      } catch (error) {
        this.$state.error = error.message;
      }
      this.$state.contactUpdated = true;
      setTimeout(() => {
        this.$state.contactUpdated = false;
      }, 5000);
      this.loadContacts();
      router.replace('/users');
    },
  },
  getters: {
    hasContacts: (state) =>
      !state.isLoading && state.contacts && state.contacts.length > 0,
    // filteredContacts: (state) =>
    //   state.contacts.filter((contact) => {
    //     if (state.activeFilters.italiano && contact.areas.includes('italiano'))
    //       return true;
    //     if (state.activeFilters.storia && contact.areas.includes('storia'))
    //       return true;
    //     if (
    //       state.activeFilters.geografia &&
    //       contact.areas.includes('geografia')
    //     )
    //       return true;
    //     if (
    //       state.activeFilters.matematica &&
    //       contact.areas.includes('matematica')
    //     )
    //       return true;
    //     if (state.activeFilters.scienze && contact.areas.includes('scienze'))
    //       return true;
    //     else return false;
    //   }),
  },
});
