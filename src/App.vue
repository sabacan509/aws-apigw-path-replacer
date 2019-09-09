<template>
  <div id="app">
    <div id="nav">
      <div class="title">
        <img alt="Vue logo" src="./assets/logo.png" style="width:40px"/>
        <span style="font-size:20pt">AWS APIGateway Path Replacer GUI</span>
      </div>
    </div>
    <router-view/>
    <footer>
      <a v-bind:href="this.$store.getters.urlGithub" target="_blank">
        {{this.$store.getters.footerString}}
      </a>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 10px;
  min-height: 100vh;
  position: relative;
  padding-bottom: 25px;
  box-sizing: border-box;
}
footer {
    width: 100%;
    background-color: #89c7de;
    color: #fff;
    text-align: left;
    height: 25px;
    padding: 5px 0 5px 10px;
    position: absolute;
    left: 0px;
    bottom: 0px;
}
.logo {
  width: 80px;
}
.title {
  text-align: left;
  width: 100%;
}
ul {
  list-style-type: square;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 20px;
  cursor: pointer;
}
button {
  font-size: 14pt;
  padding: 1rem;
  border-radius: 5px;
  color: #eee;
  background-color: #333;
}
button.lg-button {
  font-size: 14pt;
  padding: 1rem;
  border-radius: 5px;
  color: #eee;
  background-color: #333;
  width: 12rem;
}
button:disabled {
  background-color: #ccc;
}
input {
  font-size: 14pt;
  padding: 0.5rem;
  border-radius: 5px;

}
input::-webkit-input-placeholder {
	color: #ccc;
}
input::-moz-placeholder {
	color: #ccc;
}
input:-ms-input-placeholder {
	color: #ccc;
}
.spacer {
  content: "&nbsp";
  height: 1rem;
}
.smtx {
  font-size: 0.8rem;
}
</style>
