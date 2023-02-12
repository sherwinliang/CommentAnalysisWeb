<template>
  <el-container>
    <el-main class="sale_main">
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
      this.buildCategoryCharts();
    },
    methods: {
      buildCategoryCharts() {
        let categories = ['饼干','狗粮','椰子油','面粉','咖啡','薯条','爆米花','饮料'];
        let saleVolumn = [9324,342,643,6787,2347,8645,14523,7543];
        this.$refs.dschart.options.xAxis.data = categories;
        this.$refs.dschart.options.series[0].data = saleVolumn;
      }
    },
    data: function () {
      return {
        rangeCount: 5,
        rangeSelections: [5,10,15,20],
        isShow: true,
        polar: {
          title: {
            text: '商品类别销量排行图'
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
            data: ['商品类别']
          },
          xAxis: {
            data: [],
            axisLabel: {
                rotate: 45
            }
          },
          yAxis: {
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: []
          }],
          animationDuration: 3000
        }
      }
    }
  }
</script>
<style>
  .sale_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .sale_main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ffffff;
    margin-top: 20px;
    padding-top: 10px;
  }
</style>
