<template>
  <div>
    <el-card>
      <CategorySelect @getCategoryId="getCategoryId" :show="!isshowtable"/>
    </el-card>
    <el-card style="margin-top: 20px">
      <!-- 展示表格区域 -->
      <div v-show="isshowtable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 属性展示区域 -->
        <el-table style="width: 100%" :data="attrList" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>

          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>

          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row}">
              <el-tag
                type="success"
                style="margin: 0 20px"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>

              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或者修改属性 -->
      <div v-show="!isshowtable">
        <el-form :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isshowtable = true">取消</el-button>

        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>

          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                size="mini"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="tolook(row)"
                @keyup.native.enter="tolook(row)"
                :ref="$index"
              ></el-input>
              <span v-else @click="toEdit(row, $index)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确认要删除${row.valueName}?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
        <el-button @click="isshowtable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //获取到的要展示的数据
      attrList: [],
      //控制table表格的显示
      isshowtable: true,
      //收集新增属性或者修改属性用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      },
    };
  },
  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      console.log(level);
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
        
      }
      if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } 
      if(level == 3) {
        this.category3Id = categoryId;
        //发请求获取平台数据
         this.getAttrList();
      }
    },
    //获取平台数据的请求
    async getAttrList() {
      //发请求获取数据
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
      // console.log( result);
    },
    //添加属性值的回调
    addAttrValue() {
      //向属性值里的数组添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        //输入模式和查看模式,每一个属性值的模式切换
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性按钮的回调
    addAttr() {
      //切换属性值列表的显示与隐藏
      this.isshowtable = false;
      //清除以前的数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: this.category3Id, //三级分类的id给服务器
        categoryLevel: 3, //因为服务器也需要区分几级id
      };
    },
    //修改某一个属性的回调函数
    updateAttr(row) {
      //将属性展示列表隐藏
      this.isshowtable = false;
      //将选中的属性传递过去
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag自动，但是会发现视图不会跟着变化（因为flag不是响应式数据）
        //因为Vue无法探测普通的新增 property,这样书写的属性并非响应式属性（数据变化视图跟这边）
        //第一个参数:对象  第二个参数:添加新的响应式属性  第三参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },
    //失去焦点的事件
    tolook(row) {
      // 如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      //新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row最新新增的属性值【数组的最后一项元素】
        //判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      // row：形参是当前用户添加的最新的属性值
      // 当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },
    //点击span获取使input获取焦点
    toEdit(row, index) {
      row.flag = true;
      //获取input节点，实现自动聚焦
      //需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘与重拍耗时间的
      //点击span的时候，重绘重拍一个input它是需要耗费事件，因此我们不可能一点击span立马获取到input
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        //获取相应的input表单元素实现聚焦
        this.$refs[index].focus();
      });
    },
    //气泡确认框的确定按钮的回调
    deleteAttrValue(index) {
      //当前删除不需要发请求
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //点击保存按钮的回调，添加或者修改属性名
    async addOrUpdateAttr() {
      //整理参数,不应空，去掉flag
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //判断属性值是不是空
          if (item.valueName != "") {
            //删除flag属性
            delete item.flag;
            return true;
          }
        }
      );
      try {
        //发请求
        let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.isshowtable = true
        this.$message({type:'success',message:'保存成功'})
        //再次获取数据
        this.getAttrList()
      } catch (error) {
        this.$message('保存失败')
      }
    },
  },
};
</script>

<style>
</style>