import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login"
import SecureComponent from "./components/secure"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "Login"
            }
        },
        {
            path: "/Login",
            name: "Login",
            component: LoginComponent
        },
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        }
    ]
})