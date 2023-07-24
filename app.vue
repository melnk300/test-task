<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<style lang="less">
  :root {
    --primary: #333;
    --text: #f1f1f1;
    --accent: #00C155;
    --lighter: #555;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--primary);
    color: var(--text);
  }

  @font-face {
    font-family: "Milky Mania";
    src: local("Milky Mania"),
    url(~assets/MilkyMania.ttf) format("truetype");
  }


  * {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
