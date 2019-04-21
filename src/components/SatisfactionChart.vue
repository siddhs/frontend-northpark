<template>
    <div class="satisfaction-chart" id="satisfactionChart"></div>
</template>

<script>
    import axios from 'axios';
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import material from '@amcharts/amcharts4/themes/material';
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(material);

    export default {
        name: 'SatisfactionChart',

        mounted() {
            let satisfactionChart = am4core.create("satisfactionChart", am4charts.PieChart3D);
            satisfactionChart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            satisfactionChart.legend = new am4charts.Legend();

            satisfactionChart.data = [];

            var series = satisfactionChart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "satisfaction";
            series.dataFields.category = "satisfactionType";

            axios
                .get('http://localhost:3000/ticket/satisfactionchart')
                .then(response => satisfactionChart.data = response.data)
        }
    }
</script>

<style scoped>
    .satisfaction-chart {
        width: 100%;
        height: 400px;
    }
</style>