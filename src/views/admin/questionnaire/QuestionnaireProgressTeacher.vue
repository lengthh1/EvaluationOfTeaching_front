<template>
  <!--  老师  学院 问卷名 开始时间  结束时间 -->
  <div>
    <vxe-table
      stripe
      :data="progressQuestionnaires"
      :tooltip-config="{contentMethod: showTooltipMethod, enterable: true}"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="title" title="问卷名" show-overflow="tooltip"></vxe-table-column>
      <vxe-table-column field="name" title="学院"></vxe-table-column>
      <vxe-table-column field="begin_time" title="开始时间" show-overflow="tooltip"
                        :formatter="formatterTime"></vxe-table-column>
      <vxe-table-column field="end_time" title="结束时间" show-overflow="tooltip"
                        :formatter="formatterTime"></vxe-table-column>
      <vxe-table-column field="pro" title="进度"></vxe-table-column>
      <vxe-table-column title="操作">
        <template v-slot="{ row }">
          <vxe-button @click="dataAnalysis(row)">查看数据统计</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <b-modal id="progressing" size="lg" hide-footer title="进度">
      <div>总分：{{ total }} 得分：{{ score }}</div>
      <v-chart class="pro" :options="option"/>
      <v-chart class="pro2" :options="option2"/>
    </b-modal>
  </div>
</template>

<script>
import XEUtils from "xe-utils";

export default {
  name: "QuestionnaireProgressTeacher",
  data() {
    return {
      progressQuestionnaires: [],
      option: {},
      option2: {},
      total: 0,
      score: 0
    }
  },
  mounted() {
    this.progressQuestionnaires = this.$store.state.admin.evaluation.teacherAllList
  },
  beforeUpdate() {
    this.progressQuestionnaires = this.$store.state.admin.evaluation.teacherAllList
  },
  methods: {
    showTooltipMethod({type, column, row, items, _columnIndex}) {
      // 重写默认的提示内容
      if (column.property == 'begin_time' || column.property == 'end_time') {
        return '时间：' + row[column.property]
      }
      if (column.property === 'title') {
        return '问卷名：' + row[column.property]
      }
    },
    formatterTime({cellValue, row, column}) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
    },
    dataAnalysis(row) {
      this.option = {
        title: {
          text: '人数统计',
          left: 'center',
          align: 'right'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          top: 30,
          data: ['不满意', '有点差', '一般般', '满意', '非常满意']
        },
        grid: {
          left: '3%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          {
            name: '不满意',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          }, {
            name: '有点差',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          }, {
            name: '一般般',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          }, {
            name: '满意',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          }, {
            name: '非常满意',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: []
          }]
      }
      this.$store.dispatch("admin/indicator/getDetail", {id: row.index_root_id})

      // 展示数据分析
      // 进行人数统计
      this.$store.dispatch("admin/evaluation/getTeacherDetail", row.id)
        .then(res => {
          let leg = ['不满意', '有点差', '一般般', '满意', '非常满意']
          res.forEach(item => {
            // 这里对图标进行初始化
            if (!this.option.yAxis.data.includes(item.qsId)) {
              this.option.yAxis.data.push(item.qsId)
            }
            // 遍历进行统计每个问题不同等级进行人数统计
            this.option.series.forEach(ops => {
              if (ops.name == leg[parseInt(item.answer) - 1]) {
                if (ops.data[this.option.yAxis.data.indexOf(item.qsId)] == null) {
                  ops.data[this.option.yAxis.data.indexOf(item.qsId)] = 1
                } else {
                  ops.data[this.option.yAxis.data.indexOf(item.qsId)]++
                }
              }
            });
          })
          this.option2 = {
            series: {
              type: 'sunburst',
              // highlightPolicy: 'ancestor',
              data: [],
              radius: [0, '90%'],
              label: {
                rotate: 'radial'
              }
            }
          };
          // 获取指标 制作第二个图标
          this.option2.series.data = this.$store.getters["admin/generateDiagramData"](this.$store.getters["admin/indicator/getTndicatorTree"].children, res)
          this.total = this.$store.getters["admin/getScore"](this.$store.getters["admin/getTotal"](this.$store.getters["admin/indicator/getTndicatorTree"].children, res))
          this.score = this.$store.getters["admin/getScore"](this.$store.getters["admin/generateDiagramData"](this.$store.getters["admin/indicator/getTndicatorTree"].children, res))

        }).then(res => {
        this.$bvModal.show("progressing")
      })
    }
  }
}
</script>

<style scoped>

</style>
