<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <!-- 头部区域 -->
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs clas="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>

        <!-- 头部右侧内容 -->
        <div class="right">
          <span @click="setDay">本日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            class="data"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 身体部分 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <!-- 放图表的容器 -->
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6">
            <div>
              <h3>门店{{ title }}排名</h3>
              <ul>
                <li>
                  <span class="rindex">1</span>
                  <span class="rtext">肯德基</span>
                  <span class="rvalue">1241</span>
                </li>
                <li>
                  <span class="rindex">2</span>
                  <span class="rtext">麦当劳</span>
                  <span class="rvalue">1241</span>
                </li>
                <li>
                  <span class="rindex">3</span>
                  <span class="rtext">德克士</span>
                  <span class="rvalue">1241</span>
                </li>
                <li>
                  <span class="rindex1">4</span>
                  <span class="rtext">德克士</span>
                  <span class="rvalue">1241</span>
                </li>
                <li>
                  <span class="rindex1">5</span>
                  <span class="rtext">德克士</span>
                  <span class="rvalue">1241</span>
                </li>
                <li>
                  <span class="rindex1">6</span>
                  <span class="rtext">德克士</span>
                  <span class="rvalue">1241</span>
                </li>
                <li>
                  <span class="rindex1">7</span>
                  <span class="rtext">德克士</span>
                  <span class="rvalue">1241</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      //收集日历的数据
      date: [],
    };
  },
  computed: {
    //计算属性-标题
    title() {
      //重新设置配置项
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  watch: {
    title() {
      console.log("修改配置数据");
      //重新修改图标的配置数据
      //图标配置数据可以再次修改，如果有新的数值，新的数值，没有新的数值，还是用以前的
      this.mycharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.title == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title == "销售额"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
            color: "yellowgreen",
          },
        ],
      });
    },
    listState() {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.listState.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.listState.orderFullYear,
            color: "yellowgreen",
          },
        ],
      });
    },
  },
  methods: {
    //本天
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    //本周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本月
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  mounted() {
    //初始化实例
    this.mycharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.mycharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
        },
      ],
    });
  },
};
</script>

<style>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100% !important;
}
.right {
  position: absolute;
  right: 0px;
}
.data {
  width: 300px !important;
  margin: 0px 20px !important;
}
.right span {
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
li {
  height: 8%;
  padding: 17px 0;
}
.rindex {
  float: left;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rindex1 {
  float: left;
  width: 18px;
  height: 18px;
  text-align: center;
}
.rvalue {
  float: right;
}
.rtext {
  margin-left: 20px;
}
</style>