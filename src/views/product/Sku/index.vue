<template>
  <div>
    <el-table style="width: 100%" :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.isSale == 0"
            @click="sale(row)"
            type="success"
            icon="el-icon-sort-down"
            size="mini"
          ></el-button>
          <el-button
            v-else
            @click="cancel(row)"
            type="success"
            icon="el-icon-sort-up"
            size="mini"
          ></el-button>
          <el-button type="primary" icon="el-icon-edit"  @click="edit" size="mini"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-danger" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器区域    
     -->
    <el-pagination
       @current-change="getSkuList"
      @size-change="handleSizeChange"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="show" size = "50%" :show-close=false>
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>

            <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>

            <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}} 元</el-col>
      </el-row>

            <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
        <template>
          <el-tag type="success" v-for="(attr) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px">{{attr.attrId}}-{{attr.valueId}}</el-tag>
        </template>
        </el-col>
      </el-row>

            <el-row>
        <el-col :span="5">商品属性</el-col>
        <el-col :span="16">
          <div class="block">
        <span class="demonstration">默认 Hover 指示器触发</span>
        <el-carousel height="150px">
         <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
        </el-col>
      </el-row>
   </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 10, //代表当前页面有几条数据
      records: [], //存储SKU列表的数据
      total: 0, //存储分页器一共展示的数据
      skuInfo: {}, //存储SKU信息
      show: false,//抽屉的显示与隐藏
    };
  },
  mounted() {
    //获取列表数据的方法
    this.getSkuList();
  },
  methods: {
    //发请求获取列表数据
    async getSkuList(pages = 1 ) {
      this.page = pages
      //解构出默认的参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //分页器每一页展示多少条数据
    handleSizeChange(limit){
      //修改参数发请求
      thi.limit = limit
      this.getSkuList()
    },
    //上架的点击回调
    async sale(row){
      let result = await this.$API.sku.reqSale(row.id)
      if(result.code == 200){
        row.isSale = 1
        this.$message({type:"success",message:"上架成功"})
      }
    },
    //下架按钮的点击回调事件
    async cancel(row){
      let result = await this.$API.sku.reqCancel(row.id)
      if(result.code == 200){
        row.isSale = 0
        this.$message({type:"success",message:"下架成功"})
      }
    },
    //编辑按钮的回调
    edit(){
      this.$message({message:'正在开发中'})
    },
    // 获取sku详情的接口
    async getSkuInfo(sku){
      //展示抽屉
      this.show = true
      //发请求
      let result = await this.$API.sku.reqSkuById(sku.id)
      if(result.code == 200){
         this.skuInfo = result.data
      }
    }
  },
};
</script>


<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<style scoped>
   .el-row .el-col-5{
      font-size:18px;
      text-align:right;
   }
   .el-col{
     margin:10px 10px;
   }

   >>>.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>