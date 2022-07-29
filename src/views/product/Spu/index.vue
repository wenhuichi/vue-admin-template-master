<template>
  <div>
    <!-- 三级联动的区域 -->
    <el-card style="margin: 10px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0"></CategorySelect>
    </el-card>
    <!-- Spu展示和修改以及添加sku的区域 -->
    <el-card>
      <!-- spu展示 -->
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加Spu</el-button></el-button>
      <el-table style="width: 100%" border :data="records">

        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center">
       
        </el-table-column>

          <el-table-column
          prop="spuName"
          label="Spu名称"
          width="width">
        </el-table-column>

          <el-table-column
          prop="description"
          label="Spu描述"
          width="width">
        </el-table-column>

          <el-table-column
          prop="prop"
          label="操作"
          width="width">
          <template slot-scope="{ row, $index }" >
            <!-- 用hint组件来代替 -->
           <hint-button type="success" icon="el-icon-plus" size="mini" @click="addSku(row)"></hint-button>
           <hint-button type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)"></hint-button>
           <hint-button type="info" icon="el-icon-info" size="mini" @click="handler(row)"></hint-button>
           <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="deleteSpu(row)">
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
          
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页器区域
           -->
       <el-pagination
       style="text-align:center"
         :current-page="page"
         :page-sizes="[3, 5, 10]"
        :page-size="3"
        @current-change="handleCurrentChange"
         @size-change="handleSizeChange"
         layout="prev, pager, next, jumper,->, sizes,total "
         :total="23">
        </el-pagination>
      </div>
      <!-- spu修改 -->
      <SpuFrom v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuFrom>
      <!-- sku添加 -->
      <SkuFrom v-show="scene == 2" ref="sku" @changeScenes="changeScenes"></SkuFrom>
    </el-card>

        <!-- 对话框区域 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <!-- table展示sku列表-->
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
//引入子组件
import SpuFrom from "./SpuForm";
import SkuFrom from "./SkuForm";

export default {
  name: "Spu",
  components: {
    SpuFrom,
    SkuFrom,
  },

  data() {
    return {
      //各级分类的Id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //获取数据时候的初始化数据
      page: 1, //分页器当前第几页
      limit: 3, //每一页的数据的条数
      //Spu列表的数据
      records: [],
      total: 0, //分页器总共条数 1添加修改spu 2添加sku
      //切换场景
      scene: 0,
      //控制对话框的显示与隐藏
      dialogTableVisible: false,
      spu: {},
      skuList: [], //存储的是SKU列表的数据
      loading: true,
    };
  },
  methods: {
    //三级分类自定义事件的回调
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      }
      if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      }
      if (level == 3) {
        this.category3Id = categoryId;
        //发请求获取平台数据
        this.getSpuList();
      }
    },
    //获取Spu数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      //解构参数
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //分页面的点击第几页回调
    handleCurrentChange(page) {
      this.page = page;
      // 再次获取新的Spu列表
      this.getSpuList(page);
    },
    //分页器一页显示条数的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加spu按钮的回调
    addSpu() {
      //切换为场景为1
      this.scene = 1;
      //通知子组件SpuForm发请求---两个
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改某一个Spu
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    //spu子组件的自定义事件
    changeScene({ scene, flag }) {
      //flag这个形参为了区分保存按钮是添加还是修改
      //切换结构（场景）
      this.scene = scene;
      //子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    //删除spu的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        //代表SPU个数大于1删除的时候停留在当前页，如果SPU个数小于1 回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加SKU按钮的回调
    addSku(row) {
      //切换场景为2
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求------三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //sku添加模块通知父组件切换场景
    changeScenes(scene) {
      this.scene = scene;
    },
    //查看SKU的按钮的回调
    async handler(spu) {
      //点击这个按钮的时候，对话框可见的
      this.dialogTableVisible = true;
      //保存spu信息
      this.spu = spu;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        //loading隐藏
        this.loading = false;
      }
    },

    //关闭对话框的回调
    close(done) {
      //loading属性再次变为真
      this.loading = true;
      //清除sku列表的数据
      this.skuList = [];
      //管理对话框
      done();
    },
  },
};
</script>

<style>
</style>