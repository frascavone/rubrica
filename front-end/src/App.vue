<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
}
html {
  font-family: 'Montserrat', sans-serif;
  font-size: 62.5%;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
}
#app {
  font-size: 1.25rem;
  color: gray;
}
</style>
