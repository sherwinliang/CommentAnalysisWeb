<template>
  <el-container>
    <el-header class="product_order_header">
        评分排行前：<el-select v-model="rangeCount" size="medium"  style="width: 200px" >
          <el-option v-for="item in rangeSelections" :key="item" :label="item" :value="item" >
          </el-option>
        </el-select>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="queryOrderedProducts">查询</el-button>
    </el-header>
    <el-main class="product_order_main">
      <el-table
        ref="multipleTable"
        :data="products"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="55" align="left">
        </el-table-column>
        <el-table-column
          label="商品ID"
          prop="productId"
          width="200" align="left">
        </el-table-column>
        <el-table-column
          label="平均评分"
          prop="avgScore"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="最高评分"
          prop="maxScore"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="最低评分"
          prop="minScore"
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
      queryOrderedProducts(){
        let _this = this;
        getRequest("/analysis/range?rangeCount="+_this.rangeCount).then(resp=> {
          _this.products = resp.data.data;
        }, resp=> {
          if (resp.response.status == 403) {
            _this.$message({
              type: 'error',
              message: resp.response.data
            });
          }
        });
      }
    },
    mounted: function () {
      this.queryOrderedProducts();
    },
    data(){
      return {
        rangeCount: 20,
        rangeSelections: [10,20,30,40,50],
        products: []
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
