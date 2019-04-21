<template>
    <div id="login">
        <h1>Login</h1>
        <b-form-input v-model="input.username" placeholder="Username"></b-form-input>
        <br/>
        <b-form-input v-model="input.password" placeholder="Password" type="password"></b-form-input>
        <br/>
        <b-button variant="primary" v-on:click="login()">Submit</b-button>

    </div>
</template>

<script>
    /* eslint-disable no-console */
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                var enteredUsername = this.input.username;
                var enteredPassword = this.input.password;
                var flag = 0;
                if(enteredUsername !== "" && enteredPassword !== "") {
                    this.$parent.mockAccount.forEach((element) => {
                        if (enteredUsername === element.username && enteredPassword === element.password) {
                            this.$emit("authenticated", true)
                            this.$router.replace({name: "secure"})
                            flag = 1
                        }
                    });
                    if (flag === 0 ) {
                        alert("The username or password does not match!!")
                    }
                }
                else {
                    alert("Please enter username and password")
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>