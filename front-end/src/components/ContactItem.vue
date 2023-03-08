<template>
  <li>
    <RouterLink :to="contactLink">
      <div class="contact">
        <span
          :style="{ backgroundImage: `url(${props.avatar})` }"
          class="contact__photo"
        ></span>
        <span>
          <h3>{{ props.username }}</h3>
          <h4>{{ props.phone }}</h4>
        </span>
      </div>
    </RouterLink>

    <!-- <BaseButton link :to="contactContactLink">Contatta</BaseButton> -->
  </li>
</template>

<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
  id: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  email: { type: String },
  phone: { type: String },
  avatar: { type: String },
});
const route = useRoute();
const contactLink = `${route.path}/${props.id}`;
</script>

<style scoped>
li {
  background-color: white;
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 10px;
  transition: all 0.2s;
}
li:hover {
  transform: scale(105%);
}

h3 {
  font-size: 2rem;
}

h3,
h4 {
  margin-top: 2rem;
}

div {
  margin: 0.5rem 0 0;
}

.contact {
  display: flex;
}
.contact__photo {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: lightgrey;
  background-size: cover;
  background-position: bottom;
  margin: 2rem;
  font-size: 3rem;
}
a,
a:active,
a:visited {
  text-decoration: none;
  color: grey;
}
</style>
