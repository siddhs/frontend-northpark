<template>
    <div id="secure">
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-brand href="#">Dashboard</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-navbar-nav class="ml-auto">
                    <b-button variant="danger" v-on:click="logout">Logout</b-button>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <div id="heading" style="flex: 1;">
            <h1>Summary-Charts</h1>
            <hr/>
        </div>
        <div style="display: flex; flex-direction: column">
            <div style="width:100%; display: flex; flex-direction: row; flex:1;">
                <div style="flex:1;">

                    <h4>Distribution of tickets based on module filed against</h4>
                    <FiledAgainstChart></FiledAgainstChart>
                    <hr/>
                </div>
                <div style="flex:1;">
                    <h4>Distribution of tickets based on Severity</h4>
                    <SeverityChart></SeverityChart>
                    <hr/>
                </div>
            </div>
            <div style="width:100%; display: flex; flex-direction: row; flex:1;">
                <div style="flex:1;">
                    <PriorityChart></PriorityChart>
                    <hr/>
                </div>
                <div style="flex:1;">
                    <SatisfactionChart></SatisfactionChart>
                    <hr/>
                </div>
            </div>



            <hr/>
            <div id="table">
                <tableComponent></tableComponent>
            </div>
        </div>
    </div>
</template>

<script>
    import FiledAgainstChart from './FiledAgainstChart'
    import tableComponent from './Table'
    import SeverityChart from './SeverityChart'
    import PriorityChart from './PriorityChart'
    import SatisfactionChart from './SatisfactionChart'
    export default {
        name: 'secure',
        data() {
            return {};
        },
        components: {
            FiledAgainstChart,
            tableComponent,
            SeverityChart,
            PriorityChart,
            SatisfactionChart
        },
        methods: {
            logout() {
                this.$emit("authenticated", false)
                this.$router.push("Login")

            }
        }
    }
</script>

<style scoped>
    #table {
        width: 100%;
    }
    #heading {
        text-align: center;
    }
    .chart-container-1 {
        width: 100%;
        background-color: black;
    }
    #firstChart {
        float: left;
    }
    #secondChart {
        float: right;
    }
    #secure {
        width: 100%;
        background-color: #FFFFFF;
        padding-right: 0px;
        padding-left: 0px;
        /*border: 1px solid #CCCCCC;*/
        /*padding: 20px;*/
        /*margin-top: 10px;*/
    }
</style>
