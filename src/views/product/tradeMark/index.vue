<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <!-- border添加边框 lable 显示的是标题
    width列的宽度 align 标题的对其方式-->
    <el-table style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center">
      </el-table-column>

      <el-table-column prop="prop" label="品牌名称" width="width">
      </el-table-column>

      <el-table-column prop="prop" label="品牌LOGO" width="width">
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>

    </el-table>
    
      <!-- 分页器
        current-page:代表的是当前第几页
        total：代表分页器一共需要展示数据条数
        page-size：代表的是每一页需要展示多少条数据
        page-sizes：代表可以设置每一页展示多少条数据
        layout：可以实现分页器布局
        pager-count:按钮的数量  如果 9  连续页码是7
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination
      style="margin-top:20px;textAlign:center"
        :current-page="6"
        :total="99"
        :page-size="3"
        :page-sizes="[3, 5, 10]"
        layout="prev, pager, next, jumper,->,sizes,total"
      >
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 分页器第几页
      page:1,
      // 当前页面展示的条数
      limit:3,
      //总共数据条数
      total:0,
      // 列表展示的数据
      list:[]
    }
  },
  mounted(){
    //获取列表数据的方法
    this.getPageList()
  },
  methods:{
    async getPageList(){
      console.log('11112');
      // 结构出参数
      const {page,limit} = this
      //获取品牌列表的接口
      let result = await this.$API.trademark.reqTradeMarkList({page,limit})
      if(result.code == 200){
        this.total = result.data.total
        this.list = result.data.records
      }
    }
  }
};
</script>

<style>
</style>