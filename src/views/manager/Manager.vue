<template>
<div>
<header>
  <NavBar></NavBar>
</header>
  <div id="nav_manager-user">
    <b-breadcrumb>
      <b-breadcrumb-item @click="user" href="#home">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
        用户管理
      </b-breadcrumb-item>
      <b-breadcrumb-item href="#foo">管理员</b-breadcrumb-item>
      <b-breadcrumb-item href="#bar">教师</b-breadcrumb-item>
      <b-breadcrumb-item active>学生</b-breadcrumb-item>

      <b-breadcrumb-item id="UserManager_right" @click="Examination1" href="#home">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
        指标管理
      </b-breadcrumb-item>
      <b-breadcrumb-item href="#foo">题目管理</b-breadcrumb-item>
      <b-breadcrumb-item active @click="ClassMana">班级管理</b-breadcrumb-item>
    </b-breadcrumb>
  </div>
  <div id="nav_manager-department">
    <b-breadcrumb>
      <b-breadcrumb-item @click="department" href="#home">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
        院系管理
      </b-breadcrumb-item>
      <!--<b-breadcrumb-item href="#bar">老师管理</b-breadcrumb-item>-->
      <b-breadcrumb-item @click="ClassMana">班级管理</b-breadcrumb-item>
      <b-breadcrumb-item @click="Curriculum">课程管理</b-breadcrumb-item>
    </b-breadcrumb>
  </div>
  <div id="nav_manager_subject">
    <b-breadcrumb>
      <b-breadcrumb-item  @click="Question" href="#home">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
        问卷管理
      </b-breadcrumb-item>
      <b-breadcrumb-item href="#foo">创建问卷</b-breadcrumb-item>
      <b-breadcrumb-item href="#bar">老师管理</b-breadcrumb-item>
    </b-breadcrumb>
  </div>
  <div>
    <MessCard v-if="isUser"></MessCard>
    <DepartmentCard v-if="isDepartment"></DepartmentCard>
    <Examination v-if="isExamination"></Examination>
    <Questionnaire v-if="isQuestion"></Questionnaire>
    <ClassManager v-if="isClassManager"></ClassManager>
    <Curriculum v-if="isCurriculum"></Curriculum>
  </div>
<!--  <div class="show"></div>-->
  <footer>
    <Footer></Footer>
  </footer>
</div>
</template>
<script>
  import NavBar from "components/content/nav/NavBar";
  import Footer from "components/content/footer/Footer";
  import BreadcrumbNav from "components/common/breadcrumbnav/BreadcrumbNav";
  import MessCard from "components/content/messcard/MessCard";
  import DepartmentCard from "components/content/departmentcard/DepartmentCard";
  import Examination from "components/content/examination/Examination";
  import Questionnaire from "components/content/questionnaire/Questionnaire";
  import ClassManager from "components/content/classmanager/ClassManager";
  import Curriculum from "components/content/curriculum/Curriculum";
  export default {
    name: "Manager",
    components:{
      NavBar,
      Footer,
      BreadcrumbNav,
      MessCard,
      DepartmentCard,
      Examination,
      Questionnaire,
      ClassManager,
      Curriculum
    },
    data() {
      return {
        isUser:true,
        isDepartment:false,
        isExamination:false,
        isQuestion:false,
        isClassManager:false,
        isCurriculum:false,
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      user(){
        this.isUser = true;
        this.isDepartment = false;
        this.isExamination = false;
        this.isQuestion = false;
        this.isClassManager = false;
        this.isCurriculum = false;
      },
      department(){
        this.isUser = false;
        this.isDepartment = true;
        this.isExamination = false;
        this.isQuestion = false;
        this.isClassManager = false;
        this.isCurriculum = false;
      },
      Examination1(){
        this.isUser = false;
        this.isDepartment = false;
        this.isExamination = true;
        this.isQuestion = false;
        this.isClassManager = false;
        this.isCurriculum = false;
      },
      Question(){
        this.isUser = false;
        this.isDepartment = false;
        this.isExamination = false;
        this.isQuestion = true;
        this.isClassManager = false;
        this.isCurriculum = false;
      },
      ClassMana(){
        this.isUser = false;
        this.isDepartment = false;
        this.isExamination = false;
        this.isQuestion = false;
        this.isClassManager = true;
        this.isCurriculum = false;
      },
      Curriculum(){
        this.isUser = false;
        this.isDepartment = false;
        this.isExamination = false;
        this.isQuestion = false;
        this.isClassManager = false;
        this.isCurriculum = true;
      }

    }
  }

</script>
<style  scoped="scoped">
.show{
  padding-bottom: 56.25rem  /* 900/16 */;
}
header{
  background-color: #0a408a;
  margin-bottom: 1.25rem  /* 20/16 */;
}
#nav_manager-user,#nav_manager_subject,#nav_manager-department{
  width: 80%;
  color: black;
  margin:0 auto;
}
#UserManager_right{
  text-align: right;
  margin-left: 15.625rem  /* 250/16 */;
}
</style>
