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
    formIsVisible: false,
  }),
  actions: {
    async loadContacts() {
      this.$state.isLoading = true;
      try {
        const res = await fetch(`http://localhost:3000/api/users`);

        const { users } = await res.json();

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
        email: formData.email,
        phone: `+39 ${formData.phone.toString()}`,
        avatar:
          'https://lh3.googleusercontent.com/TWVQZDj8WCdDcnyvvxFeEH0nJiGod_gTmPyQsMXZhFNEDdJXW2NtgIRrEfSEPn1H9CMvSZpjN41a8Qinq14I7wwgqOUjOay2f_yxOBM',
      };
      const res = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      this.loadContacts();
      if (!res.ok) return;
      this.$state.formIsVisible = false;
    },
    async deleteContact(contactId) {
      // DELETE request to http://localhost:3000/api/users/ contactId ...
      const res = await fetch(`http://localhost:3000/api/users/${contactId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) return;
      const selectedContactIndex = this.$state.contacts.findIndex(
        (el) => el.id === contactId
      );
      this.$state.contacts.splice(selectedContactIndex, 1);
      router.replace('/contacts');
      this.loadContacts();
    },
    async updateContact(formData) {
      // PATCH request to http://localhost:3000/api/users/contactId ...
      const selectedContact = this.$state.contacts.filter(
        (el) => el.id === formData.id
      );

      const updatedContact = { ...selectedContact, formData };

      const res = await fetch(
        `http://localhost:3000/api/users/${formData.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedContact),
        }
      );
      this.loadContacts();
      if (!res.ok) return;
      router.replace('/contacts');
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
