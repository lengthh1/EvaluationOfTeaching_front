<template>
<div>
  <nav-bar></nav-bar>
  <manager-setting :manager="manager"></manager-setting>
  <div class="container mt-3 mb-5">
    <header>
      <h3>评教老师结果</h3>
    </header>
    <vxe-table
      stripe
      :data="questionnaire"
      @cell-click="showDetail"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="title" title="问卷名"></vxe-table-column>
      <vxe-table-column field="beEvaUsers[0].name" title="评教的老师"></vxe-table-column>
    </vxe-table>

    <student-questionnaire :finishedlist="detailData" :teacher="rowData"></student-questionnaire>
  </div>

  <div style="height: 400px"></div>
  <Footer></Footer>

</div>
</template>

<script>
import NavBar from "components/content/nav/NavBar";
import Footer from "components/content/footer/Footer";
import ManagerSetting from "components/common/Manager/ManagerSetting";
import StudentQuestionnaire from "components/common/function/StudentQuestionnaire";

export default {
  name: "StudentQuestionnaireFinish",

  data() {
    return {
      manager: [{name: "您已评教的问卷"}],
      questionnaire: [],
      rowData:'',
      detailData:""
    }
  },
  created() {
    this.$store.dispatch("evaluation/getFinishedList").then(res => {
      if (res) {
        this.questionnaire = this.$store.state.evaluation.questionnairefinishedList
      }
    })
  },
  methods:{
    showDetail({ row }){
      // this.rowData = null;
      // this.detailData = null;
      this.$store.dispatch("evaluation/getFinishQuestionnaireDetail",row.id)
        .then(res =>{
          if (res) {
            this.detailData = this.$store.state.evaluation.finishedDetail
            console.log(this.detailData)

            this.rowData = {
              title : row.title,
              teacherName:row.beEvaUsers[0].name,
              institute:row.beEvaUsers[0].institute.name
            }
            console.log(row)
            this.$bvModal.show("studentQuestionnaire")
          }
        })
    }
  },
  components: {
    NavBar,
    Footer,
    ManagerSetting,
    StudentQuestionnaire
  }
}
</script>

<style scoped>

</style>
