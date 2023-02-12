<template>
  <el-container>
    <el-header class="trend_header">
        商品类别：
      <el-select
        v-model="category"
        filterable
        placeholder="请选择"
        :reserve-keyword="true"
        @change="buildPercentageCharts">
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
      buildPercentageCharts() {
        let mockData = [];
        let goodPercentage = 1;
        if(this.category == '饼干'){
            goodPercentage = 0.51;
        } else if (this.category == '狗粮'){
            goodPercentage = 0.37;
        } else if (this.category == '椰子油'){
            goodPercentage = 0.75;
        } else if (this.category == '面粉'){
            goodPercentage = 0.84;
        } else if (this.category == '咖啡'){
            goodPercentage = 0.44;
        } else if (this.category == '薯条'){
            goodPercentage = 0.38;
        } else if (this.category == '爆米花'){
            goodPercentage = 0.81;
        } else if (this.category == '饮料'){
            goodPercentage = 0.67;
        } else if (this.category == '全部商品'){
            goodPercentage = 0.73;
        }
        mockData = [{value: goodPercentage, name: '好评'}, {value: 1-goodPercentage, name: '差评'}];
        this.$refs.dschart.options.series[0].data = mockData;
        this.$refs.dschart.options.title.text = this.category+'评论占比分析图';
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
            text: '评论占比分析图',
            left: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [{
            name: '评论占比分析图',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 0.91, name: '好评'},
                {value: 0.09, name: '差评'}
            ]
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
