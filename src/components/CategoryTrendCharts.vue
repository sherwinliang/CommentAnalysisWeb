<template>
  <el-container>
    <el-header class="trend_header">
        商品类别：
      <el-select
        v-model="category"
        filterable
        placeholder="请选择"
        :reserve-keyword="true"
        @change="buildTrendCharts">
        <el-option
          v-for="item in categorySelections"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="analysisTrend" :loading="isLoading">{{btnTxt}}</el-button>
    </el-header>
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
      this.initcategorySelections();
    },
    methods: {
      buildTrendCharts() {
        let years = ['2017','2018','2019','2020','2021'];
        let avgScores = [];
        if(this.category == '饼干'){
            avgScores = [4.1, 3.2, 3.5 ,4.6, 4.9];
        } else if (this.category == '狗粮'){
            avgScores = [1.1, 3.3, 4.1 ,3.6, 4.4];
        } else if (this.category == '椰子油'){
            avgScores = [4.1, 3.2, 3.5 ,4.6, 1.9];
        } else if (this.category == '面粉'){
            avgScores = [3.1, 3.2, 2.7 ,3.6, 3.6];
        } else if (this.category == '咖啡'){
            avgScores = [2.3, 1.2, 2.5 ,2.5, 4.9];
        } else if (this.category == '薯条'){
            avgScores = [4.3, 2.2, 3.7 ,4.8, 4.9];
        } else if (this.category == '爆米花'){
            avgScores = [4.5, 4.5, 1.4 ,4.6, 4.9];
        } else if (this.category == '饮料'){
            avgScores = [4.8, 2.2, 3.2 ,4.6, 4.9];
        }
        this.$refs.dschart.options.xAxis.data = years;
        this.$refs.dschart.options.series[0].data = avgScores;
        this.isShow=true;
      },
      analysisTrend(){
        this.isLoading = true;
        this.btnTxt = "分析中...";        
        getRequest("/analysis/trend").then(resp=> {
          if (resp.data.status=='success') {
            this.$message({type: resp.data.status, message: resp.data.msg});
          } else {
            this.$message({type: 'error', message: '分析失败!'});
          }
          this.isLoading = false;
          this.btnTxt = "分析";          
        }, resp=> {
          this.$message({type: 'error', message: '数据加载失败!'});
          this.isLoading = false;
          this.btnTxt = "分析";          
        });
      },
      initcategorySelections(){
        this.categorySelections = ['饼干','狗粮','椰子油','面粉','咖啡','薯条','爆米花','饮料'];
      }
    },
    data: function () {
      return {
        btnTxt: "分析",
        isLoading: false,        
        isShow: false,
        category: "",
        categorySelections: [],
        polar: {
          title: {
            text: '商品类别年度趋势图'
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
