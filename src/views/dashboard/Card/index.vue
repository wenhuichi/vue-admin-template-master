<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%
                <svg
                  t="1658846021074"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3924"
                  width="12"
                  height="12"
                >
                  <path
                    d="M896 467.2l-362.666667-341.333333c-2.133333-2.133333-6.4-4.266667-8.533333-6.4-4.266667-2.133333-6.4-2.133333-10.666667-2.133334s-8.533333 0-10.666666 2.133334c-4.266667 2.133333-6.4 4.266667-8.533334 6.4l-362.666666 341.333333c-12.8 12.8-12.8 32-2.133334 44.8 12.8 12.8 32 12.8 44.8 2.133333l309.333334-290.133333V874.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V224L853.333333 514.133333c6.4 6.4 14.933333 8.533333 21.333334 8.533334 8.533333 0 17.066667-4.266667 23.466666-10.666667 12.8-12.8 10.666667-32-2.133333-44.8z"
                    p-id="3925"
                    fill="#1afa29"
                  ></path></svg
              ></span>
              &nbsp;&nbsp;
              <span
                >日同比&nbsp;&nbsp;19.96%
                <svg
                  t="1658846135443"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4969"
                  width="12"
                  height="12"
                >
                  <path
                    d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861c12.7 14.7 35.5 14.7 48.3 0L868 478.5c4.5-5.2 0.8-13.2-6-13.2z"
                    p-id="4970"
                    fill="#d81e06"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88468">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span>日访问量1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer">
              <span>转化率 64%</span>
            </template></Detail
          >
        </el-card></el-col
      >
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="70%">
            <template slot='charts'>
              <progressCharts></progressCharts>
               </template>
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;56.67%
                <svg
                  t="1658846021074"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3924"
                  width="12"
                  height="12"
                >
                  <path
                    d="M896 467.2l-362.666667-341.333333c-2.133333-2.133333-6.4-4.266667-8.533333-6.4-4.266667-2.133333-6.4-2.133333-10.666667-2.133334s-8.533333 0-10.666666 2.133334c-4.266667 2.133333-6.4 4.266667-8.533334 6.4l-362.666666 341.333333c-12.8 12.8-12.8 32-2.133334 44.8 12.8 12.8 32 12.8 44.8 2.133333l309.333334-290.133333V874.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V224L853.333333 514.133333c6.4 6.4 14.933333 8.533333 21.333334 8.533334 8.533333 0 17.066667-4.266667 23.466666-10.666667 12.8-12.8 10.666667-32-2.133333-44.8z"
                    p-id="3925"
                    fill="#1afa29"
                  ></path></svg
              ></span>
              &nbsp;&nbsp;
              <span
                >日同比&nbsp;&nbsp;19.96%
                <svg
                  t="1658846135443"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4969"
                  width="12"
                  height="12"
                >
                  <path
                    d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861c12.7 14.7 35.5 14.7 48.3 0L868 478.5c4.5-5.2 0.8-13.2-6-13.2z"
                    p-id="4970"
                    fill="#d81e06"
                  ></path></svg
              ></span> </template
          ></Detail> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail/index.vue";
import lineCharts from "./lineCard/index.vue";
import barCharts from "./barCharts/index.vue";
import progressCharts from "./progressCharts/index.vue";
export default {
  name: "Card",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts,
  },
};
</script>

<style>
</style>