<template>
  <nav class="sidebar">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/services">Services</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.sidebar {
  width: $sidebar-width;
  background-color: $background-color;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 16px 0;
}

.sidebar a {
  text-decoration: none;
  color: $primary-color;
}

.sidebar a:hover {
  text-decoration: underline;
}
</style>
