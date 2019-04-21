<template>
  <div id="app">
    <div id="nav">
      <!--<router-link v-if="authenticated" to="/login" v-on:click.native="logout()">Logout</router-link>-->
    </div>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: [
                    {
                    username: "a",
                    password: "a"
                },
                    {
                        username: "rick",
                        password: "rick2018"
                    },
                    {
                        username: "nick",
                        password: "nick2018"
                    },
                    {
                        username: "paul",
                        password: "paul2018"
                    }]
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "Login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>

<style>
  body {
    background-color: #F0F0F0;
  }
  h1 {
    padding: 0;
    margin-top: 0;
  }
  #app {
    /*width: 1024px;*/
      width: 100%;
    margin: auto;
  }
</style>