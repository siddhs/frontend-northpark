<template>
    <div class="filed-against-chart"  id="filedAgainstChart">
    </div>
</template>

<script>
    import axios from 'axios';
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    am4core.useTheme(am4themes_animated);

    export default {
        name: 'FiledAgainstChart',

        mounted() {
            let chart = am4core.create('filedAgainstChart', am4charts.PieChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.data = [];
            chart.radius = am4core.percent(70);
            chart.innerRadius = am4core.percent(40);
            chart.startAngle = 180;
            chart.endAngle = 360;

            let series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "key";

            series.slices.template.cornerRadius = 10;
            series.slices.template.innerCornerRadius = 7;
            series.slices.template.draggable = true;
            series.slices.template.inert = true;
            series.alignLabels = false;

            series.hiddenState.properties.startAngle = 90;
            series.hiddenState.properties.endAngle = 90;

            chart.legend = new am4charts.Legend();

            axios
                .get('http://localhost:3000/ticket/filedagainst')
                .then(response => chart.data = response.data);

        }
    }
</script>

<style scoped>
    .filed-against-chart {
        width: 100%;
        height: 400px;
    }
</style>