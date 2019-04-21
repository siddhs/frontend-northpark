<template>
    <div class="priority-chart" id="priorityChart"></div>
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
        name: 'PriorityChart',

        mounted() {
            let pchart = am4core.create("priorityChart", am4charts.PieChart);

            pchart.hiddenState.properties.opacity = 0;
            pchart.data = [];

            let series = pchart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "priorityCount";
            series.dataFields.radiusValue = "priorityCount";
            series.dataFields.category = "priorityType";
            series.slices.template.cornerRadius = 6;
            series.colors.step = 3;

            series.hiddenState.properties.endAngle = -90;

            pchart.legend = new am4charts.Legend();

            axios
                .get('http://localhost:3000/ticket/prioritychart')
                .then(response => pchart.data = response.data);
        }
    }
</script>

<style scoped>
    .priority-chart {
        width: 100%;
        height: 400px;
    }
</style>