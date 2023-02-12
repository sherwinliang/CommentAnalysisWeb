<template>
  <div>
    <div>
      <transition name="slide-fade">
        <div
          style="
            border: 1px solid #409eff;
            border-radius: 5px;
            box-sizing: border-box;
            padding: 5px;
            margin: 10px 0px;
          "
        >
          <el-row>
            <el-col :span="5">
              商品ID:
              <el-input
                placeholder="请输入商品ID"
                style="width: 130px"
                size="mini"
                v-model="searchValue.productId"
              ></el-input>
            </el-col>
            <el-col :span="5">
              用户ID:
              <el-input
                placeholder="请输入用户ID"
                style="width: 130px"
                size="mini"
                v-model="searchValue.userId"
              ></el-input>
            </el-col>
            <el-col :span="8">
              评分:
              <el-select
                v-model="searchValue.score"
                placeholder=" 评分"
                size="mini"
                style="width: 130px"
              >
                <el-option
                  v-for="item in scoreSelections"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="10">
              时间:
              <el-date-picker
                v-model="searchValue.beginDateScope"
                type="daterange"
                size="mini"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-button
                size="mini"
                icon="el-icon-search"
                type="primary"
                @click="initComments()"
                >搜索</el-button
              >
              <el-button
                size="mini"
                icon="el-icon-plus"
                type="primary"
                @click="showAddCommentView"
                >添加评论</el-button
              >
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                :loading="isLoading"
                @click="filterCommentData"
                >{{filterLoadingMsg}}</el-button
              >
            </el-col>
          </el-row>
        </div>
      </transition>
    </div>
    <div style="margin-top: 10px">
      <el-table
        :data="comments"
        stripe
        border
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
        <el-table-column label="编号" fixed width="50">
            <template slot-scope="scope">{{scope.$index+(page-1)*size+1}}</template>
        </el-table-column>
        <el-table-column
          prop="productId"
          fixed
          align="left"
          label="商品ID"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" align="left" width="100">
        </el-table-column>
        <el-table-column
          prop="profileName"
          label="用户档案名"
          align="left"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="helpfulnessNumerator"
          width="90"
          align="left"
          label="有效计数"
        >
        </el-table-column>
        <el-table-column
          prop="helpfulnessDenominator"
          width="80"
          align="left"
          label="总计数"
        >
        </el-table-column>
        <el-table-column prop="score" width="50" label="评分">
        </el-table-column>
        <el-table-column prop="time" width="120" label="时间">
          <template slot-scope="scope">{{ scope.row.time | formatDateTime}}</template>
        </el-table-column>
        <el-table-column prop="summary" width="150" label="概述">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="text" label="详情">
        </el-table-column>
        <el-table-column fixed="right" width="100" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="showEditCommentView(scope.row)"
              style="padding: 3px"
              size="mini"
              >编辑</el-button
            >
            <el-button
              @click="deleteComment(scope.row)"
              style="padding: 3px"
              size="mini"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
      <div>
        <el-form :model="comment" :rules="rules" ref="commentForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="商品ID:" prop="productId">
                <el-input
                  :disabled="noEdit"
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  v-model="comment.productId"
                  placeholder="请输入商品ID"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :disabled="noEdit" label="用户ID:" prop="userId">
                <el-input
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  v-model="comment.userId"
                  placeholder="请输入用户ID"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                :disabled="noEdit"
                label="用户档案名:"
                prop="profileName"
              >
                <el-input
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  v-model="comment.profileName"
                  placeholder="请输入用户档案名"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="评论有用计数:" prop="helpfulnessNumerator">
                <el-input
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  v-model="comment.helpfulnessNumerator"
                  placeholder="请输入认为评论有用的计数"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评论总计数:" prop="helpfulnessDenominator">
                <el-input
                  size="mini"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  v-model="comment.helpfulnessDenominator"
                  placeholder="请输入评论总计数"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评分:" prop="score">
                <el-select
                  v-model="comment.score"
                  placeholder="请选择评分"
                  size="mini"
                  style="width: 150px"
                >
                  <el-option
                    v-for="item in scoreSelections"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="评论日期:" prop="time">
                <el-date-picker
                  v-model="comment.time"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 150px"
                  placeholder="评论日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="评论概述:" prop="summary">
                <el-input
                  size="mini"
                  style="width: 400px"
                  prefix-icon="el-icon-edit"
                  v-model="comment.summary"
                  placeholder="请输入评论概述"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="评论详情:" prop="text">
                <el-input
                  size="mini"
                  type="textArea"
                  style="width: 700px;"
                  prefix-icon="el-icon-edit"
                  max-length="200"
                  v-model="comment.text"
                  placeholder="请输入评论详情"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postRequest } from "../utils/api";
import { putRequest } from "../utils/api";
import { deleteRequest } from "../utils/api";
import { getRequest } from "../utils/api";
export default {
  name: "DataManage",
  data() {
    return {
      searchValue: {
        productId: null,
        userId: null,
        score: null,
        beginDateScope: null,
      },
      noEdit:true,
      isLoading:false,
      filterLoadingMsg:'过滤数据',
      title: "",
      comments: [],
      comment: {},
      loading: false,
      dialogVisible: false,
      total: 0,
      page: 1,
      size: 10,
      scoreSelections: ["1", "2", "3", "4", "5"],
      defaultProps: {
        children: "children",
        label: "name",
      },
      rules: {
        productId: [
          { required: true, message: "请输入商品ID", trigger: "blur" },
        ],
        userId: [{ required: true, message: "请输用户ID", trigger: "blur" }],
        profileName: [
          { required: true, message: "请输入用户档案名", trigger: "blur" },
        ],
        helpfulnessNumerator: [
          { required: true, message: "请输入认为评论有用的计数", trigger: "blur" },
        ],
        helpfulnessDenominator: [
          { required: true, message: "请输入总计数", trigger: "blur" },
        ],
        score: [{ required: true, message: "请输入评分", trigger: "blur" }],
        time: [{ required: true, message: "请输入时间", trigger: "blur" }],
        summary: [
          { required: true, message: "请输入关键字", trigger: "blur" },
        ],
        text: [{ required: true, message: "请输入评论详情", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.initComments();
    this.emptyComment();
  },
  methods: {
    emptyComment() {
      this.comment = {
        id: "",
        productId: "",
        userId: "",
        profileName: "",
        helpfulnessNumerator: 0,
        helpfulnessDenominator: 5,
        score: 5,
        time: new Date(),
        summary: "",
        text: ""
      };
    },
    showEditCommentView(data) {
      this.noEdit = true;
      this.title = "编辑评论";
      this.comment = data;
      this.dialogVisible = true;
    },
    deleteComment(data) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRequest("/comments/delete/" + data.id).then((resp) => {
            if (resp) {
              this.initComments();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    filterCommentData(){
      this.isLoading = true;
      this.filterLoadingMsg = "过滤中..."
      deleteRequest("/analysis/filter").then((resp) => {
        if (resp.data.status=='success') {
          this.$message({type: resp.data.status, message: resp.data.msg});
        } else {
          this.$message({type: 'error', message: '过滤数据异常!'});
        }
        this.isLoading = false;
        this.filterLoadingMsg = "过滤数据";
      }, resp => {
        this.$message({type: 'error', message: '过滤数据异常!'});
        this.isLoading = false;
        this.filterLoadingMsg = "过滤数据";
      });
    },
    doAddComment() {
      if (this.comment.id) {
        this.$refs["commentForm"].validate((valid) => {
          if (valid) {
            //console.log(this.comment);
            this.comment.time=this.$options.filters['formatDateTime'](this.comment.time);
            putRequest("/comments/update/", this.comment).then((resp) => {
              if (resp) {
                this.dialogVisible = false;
                this.initComments();
              }
            });
          }
        });
      } else {
        this.$refs["commentForm"].validate((valid) => {
          if (valid) {
            //console.log(this.comment);
            this.comment.time=this.$options.filters['formatDateTime'](this.comment.time);
            postRequest("/comments/add/", this.comment).then((resp) => {
              if (resp) {
                this.dialogVisible = false;
                this.initComments();
              }
            });
          }
        });
      }
    },
    sizeChange(currentSize) {
      this.size = currentSize;
      this.initComments();
    },
    currentChange(currentPage) {
      this.page = currentPage;
      this.initComments();
    },
    showAddCommentView() {
      this.noEdit = false;
      this.emptyComment();
      this.title = "添加评论";
      this.dialogVisible = true;
    },
    initComments() {
      this.loading = true;
      let url = "/comments/list/?page=" + this.page + "&size=" + this.size;
      if (this.searchValue.productId) {
        url += "&productId=" + this.searchValue.productId;
      }
      if (this.searchValue.userId) {
        url += "&userId=" + this.searchValue.userId;
      }
      if (this.searchValue.score) {
        url += "&score=" + this.searchValue.score;
      }
      if (this.searchValue.beginDateScope) {
        url += "&beginDateScope=" + this.searchValue.beginDateScope;
      }
      getRequest(url).then((resp) => {
        this.loading = false;
        if (resp) {
          this.comments = resp.data.data;
          this.total = resp.data.total;
        }
      });
    },
  },
};
</script>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
