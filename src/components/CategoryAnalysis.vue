<template>
  <el-container>
    <el-header class="product_order_header">
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="querySalesByCategory">查询</el-button>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="analysisSalesByCategory" :loading="isLoading">{{btnTxt}}</el-button>
    </el-header>
    <el-main class="product_order_main">
      <el-table
        ref="multipleTable"
        :data="categorySales"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="55" align="left">
        </el-table-column>
        <el-table-column
          label="商品种类"
          prop="category"
          width="200" align="left">
        </el-table-column>
        <el-table-column
          label="销售量"
          prop="saleVolumn"
          width="120" align="left">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  import {deleteRequest} from '../utils/api'
  import {getRequest} from '../utils/api'
  export default{
    methods: {
      querySalesByCategory(){
        let _this = this;
        getRequest("/comments/category-sales").then(resp=> {
          _this.categorySales = resp.data.data;
        }, resp=> {
          if (resp.response.status == 403) {
            _this.$message({
              type: 'error',
              message: resp.response.data
            });
          }
        });
      },
    analysisSalesByCategory(){
        this.isLoading = true;
        this.btnTxt = "分析中...";        
        getRequest("/analysis/category-sales").then(resp=> {
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
    },
    mounted: function () {
      this.querySalesByCategory();
    },
    data(){
      return {
        btnTxt: "分析",
        isLoading: false,
        categorySales: []
      }
    }
  }
</script>
<style>
  .product_order_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .product_order_main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    margin-top: 20px;
    padding-top: 10px;
  }
</style>
