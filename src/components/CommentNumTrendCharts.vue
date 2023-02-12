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
        let mockNum = [];
        if(this.category == '饼干'){
            mockNum = [4086, 3576, 5321 ,7658, 5112];
        } else if (this.category == '狗粮'){
            mockNum = [1832, 2526, 2221 ,2531, 3241];
        } else if (this.category == '椰子油'){
            mockNum = [4261, 7123, 7632 ,7223, 6934];
        } else if (this.category == '面粉'){
            mockNum = [3542, 3672, 4742 ,4832, 3984];
        } else if (this.category == '咖啡'){
            mockNum = [2521, 3251, 2673 ,4273, 3284];
        } else if (this.category == '薯条'){
            mockNum = [4856, 5643, 5332 ,2462, 5274];
        } else if (this.category == '爆米花'){
            mockNum = [13232, 12245, 13462 ,9869, 8854];
        } else if (this.category == '饮料'){
            mockNum = [1934, 2425, 1784 ,2432, 2159];
        } else if (this.category == '全部商品'){
            mockNum = [315121, 426728, 367831 ,445221, 425539];
        }
        this.$refs.dschart.options.xAxis.data = years;
        this.$refs.dschart.options.series[0].data = mockNum;
        this.$refs.dschart.options.title.text = this.category+'评论数变化趋势图';
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
        this.categorySelections = ['全部商品','饼干','狗粮','椰子油','面粉','咖啡','薯条','爆米花','饮料'];
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
            text: '评论数变化趋势图'
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
              return value.toFixed(0);
            }}
          },
          series: [{
            name: '评论数量',
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
