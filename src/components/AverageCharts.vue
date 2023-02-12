<template>
  <el-container>
    <el-main class="trend_main">
      <div
        v-show="isShow" style="display: flex;height: 400px;width: 100%;align-items: center;justify-content: center;">
        <chart ref="dschart" :options="polar" style="margin-top: 20px"></chart>
      </div>
    </el-main>
  </el-container>
</template>

<style>
</style>
<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'

  import 'echarts/lib/component/polar'

  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  import 'echarts/theme/dark'
  import 'echarts/lib/chart/bar'

  import {getRequest} from '../utils/api'
  export default{
    components: {
      'chart': ECharts
    },
    mounted() {
      this.buildAverageCharts();
    },
    methods: {
      buildAverageCharts() { 
        this.$refs.dschart.options.xAxis.data = ['kindle','coffee','bread','rice','Coconut','Cola','apple','smart phone'];
        this.$refs.dschart.options.series[0].data = [4.3,4.1,3.8,3.6,2.4,1.9,4.9,4.9];
      }
    },
    data: function () {
      return {
        isShow: true,
        productId: "",
        productSelections: [],
        polar: {
          title: {
            text: '商品平均分分析图'
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {
                readOnly: false
              },
              magicType: {
                type: ['line', 'bar']
              },
              restore: {},
              saveAsImage: {}
            }
          },
          tooltip: {},
          legend: {
            data: ['年份']
          },
          xAxis: {
            data: [],
            axisLabel: {
                rotate: 45
            }
          },
          yAxis: {
            axisLabel: {formatter:function(value, index){
              return value.toFixed(1);
            }}
          },
          series: [{
            name: '平均评分',
            type: 'line',
            data: []
          }],
          animationDuration: 3000
        }
      }
    }
  }
</script>
<style>
  .trend_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .trend_main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ffffff;
    margin-top: 20px;
    padding-top: 10px;
  }
</style>
