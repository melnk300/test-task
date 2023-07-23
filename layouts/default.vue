<script setup lang="ts">

</script>

<template>
  <div class="page">
    <header>
      <nav>
        <ul class="navigation">
          <li class="logo"><NuxtLink to="/">**ck and Morty</NuxtLink></li>
          <li><NuxtLink to="/">characters</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">

  header {
    width: 1200px;
    margin: 0 auto;
  }

  .logo {

    a {
      font-family: "Milky Mania", serif ;
      font-size: 1.6em;
      color: var(--accent);
    }
  }

  .navigation {
    margin: 20px 0;
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: space-between;
    list-style: none;
  }
</style>