<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cFrom">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cFrom.category1Id"
          @change="handler1"
          :disabled:="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cFrom.category2Id"
          @change="handler2"
          :disabled:="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cFrom.category3Id"
          @change="handler3"
          :disabled:="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      //各级级分类的数据
      list1: [],
      list2: [],
      list3: [],
      //收集选中的分类的id
      cFrom: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props: ["show"],
  mounted() {
    //获取一级分类的数据
    this.reqCategory1List();
  },
  methods: {
    //获取一级分类的数据的方法
    async reqCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      console.log(result);
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    //各级分类select事件的回调
    async handler1() {
      //清除数据
      this.list2 = [];
      this.cFrom.category2Id = "";
      this.list3 = [];
      this.cFrom.category3Id = "";

      //拿到一级分类的id
      const { category1Id } = this.cFrom;
      //给父组件传递id
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let result = await this.$API.attr.reqCategory2list(category1Id);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    async handler2() {
      //清除数据

      this.list3 = [];
      this.cFrom.category3Id = "";
      //拿到一级分类的id
      const { category2Id } = this.cFrom;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let result = await this.$API.attr.reqCategory3list(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    handler3() {
      const { category3Id } = this.cFrom;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>

<style>
</style>