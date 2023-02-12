<template>
  <el-container>
    <el-header class="trend_header">
        商品ID：
      <el-select
        v-model="productId"
        filterable
        placeholder="请选择"
        :reserve-keyword="true"
        @change="buildTrendCharts">
        <el-option
          v-for="item in productSelections"
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
  import ECharts from 'vue-echarts/components/ECharts.vue'
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
      this.initProductSelections();
    },
    methods: {
      buildTrendCharts() { 
        var _this = this;
        _this.isShow = false;
        getRequest("/analysis/score-years?productId="+_this.productId).then(resp=> {
          if (resp.data.years) {
            _this.isShow = true;
            _this.$refs.dschart.options.xAxis.data = resp.data.years;
            _this.$refs.dschart.options.series[0].data = resp.data.avgScores;
          } else {
            _this.$message({type: 'error', message: '该产品ID无数据!'});
          }
        }, resp=> {
          _this.$message({type: 'error', message: '数据加载失败!'});
        });
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
      initProductSelections(){
        getRequest("/analysis/product/list").then(resp=> {
          if (resp.data.status=='success') {
            this.productSelections = resp.data.data;
          } else {
            this.$message({type: 'error', message: resp.data.msg});
          }
        }, resp=> {
          this.$message({type: 'error', message: '数据加载失败!'});
        });
      }
    },
    data: function () {
      return {
        btnTxt: "分析",
        isLoading: false,        
        isShow: false,
        productId: "",
        productSelections: [],
        polar: {
          title: {
            text: '商品评分趋势图'
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
            data: []
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
