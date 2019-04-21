<template>
    <div class="severity-chart" id="severityChart"></div>
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
        name: 'SeverityChart',

        mounted() {
            let sevChart = am4core.create("severityChart", am4charts.PieChart);

            sevChart.data = [];

            // Add and configure Series
            let pieSeries = sevChart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "count";
            pieSeries.dataFields.category = "type";
            pieSeries.innerRadius = am4core.percent(50);
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;

            let rgm = new am4core.RadialGradientModifier();
            rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
            pieSeries.slices.template.fillModifier = rgm;
            pieSeries.slices.template.strokeModifier = rgm;
            pieSeries.slices.template.strokeOpacity = 0.4;
            pieSeries.slices.template.strokeWidth = 0;

            sevChart.legend = new am4charts.Legend();
            sevChart.legend.position = "right";

            axios
                .get('http://localhost:3000/ticket/severitychart')
                .then(response1 => sevChart.data = response1.data);

        }
    }
</script>

<style scoped>
    .severity-chart {
        width: 100%;
        height: 400px;
    }
</style>