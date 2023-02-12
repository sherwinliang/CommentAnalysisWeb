<template>
  <el-container>
    <el-header class="sale_header">
        销量排行前：<el-select v-model="rangeCount" size="medium"  style="width: 200px" @change="buildSaleCharts">
          <el-option v-for="item in rangeSelections" :key="item" :label="item" :value="item" >
          </el-option>
        </el-select>
        <el-button type="primary" size="medium" style="margin-left: 10px" @click="analysisSales" :loading="isLoading">{{btnTxt}}</el-button>
    </el-header>
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
      this.buildSaleCharts();
    },
    methods: {
      buildSaleCharts() { 
        var _this = this;
        _this.isShow = false;
        getRequest("/analysis/sale-volumn?rangeCount="+_this.rangeCount).then(resp=> {
          if (resp.data.productIds) {
            _this.isShow = true;
            _this.$refs.dschart.options.xAxis.data = resp.data.productIds;
            _this.$refs.dschart.options.series[0].data = resp.data.saleVolumns;
          } else {
            _this.$message({type: 'error', message: '查无数据!'});
          }
        }, resp=> {
          _this.$message({type: 'error', message: '数据加载失败!'});
        });
      },
      analysisSales(){
        this.isLoading = true;
        this.btnTxt = "分析中...";
        getRequest("/analysis/sales").then(resp=> {
          if (resp.data.status=='success') {
            this.$message({type: resp.data.status, message: resp.data.msg});
          } else {
            this.$message({type: 'error', message: '查无数据!'});
          }
          this.isLoading = false;
          this.btnTxt = "分析";
        }, resp=> {
          this.$message({type: 'error', message: '数据加载失败!'});
          this.isLoading = false;
          this.btnTxt = "分析";          
        });
      }
    },
    data: function () {
      return {
        rangeCount: 5,
        rangeSelections: [5,10,15,20],
        isShow: false,
        btnTxt: "分析",
        isLoading: false,
        polar: {
          title: {
            text: '商品销量排行图'
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
            data: ['商品']
          },
          xAxis: {
            data: [],
            axisLabel: {
                rotate: 30
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
