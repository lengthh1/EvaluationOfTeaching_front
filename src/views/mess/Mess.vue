<template>
    <div>
      <header>
        <Nav></Nav>
      </header>
      <div id="nav_manager-department">
        <b-breadcrumb>
          <b-breadcrumb-item @click="toIndex()" href="#home">
            <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
            首页
          </b-breadcrumb-item>
          <!--<b-breadcrumb-item href="#bar">老师管理</b-breadcrumb-item>-->
          <b-breadcrumb-item @click="">个人信息</b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <UserMess></UserMess>

      <footer>
        <Footer></Footer>
      </footer>
    </div>

</template>
<script>
import Nav from "components/content/nav/NavBar";
import Questionnaire from "components/content/questionnaire/Questionnaire";
import XLSX from "xlsx";
import UserMess from "components/content/usermess/UserMess";
import Footer from "components/content/footer/Footer";
  export default {

    methods:{
      toIndex(){
        this.$router.push('./index');
      },
    },
    name: "Mess",
    components:{
      Nav,
      Questionnaire,
      UserMess,
      Footer
    },
    data() {
      return {
        perPage: 15,//每页数据条数
        currentPage: 1,
        userMessage:[],//存放导入的数据
        classname:'',
        upload_file: "",
        lists: [],
        tableData:{
          id:1,
          sex:"男",
          age: 18,
          height: 175,
          code: '179000505',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      }
    }
  }
</script>

<style scoped>
header{
  background-color: #0a408a;
  margin-bottom: 1.25rem  /* 20/16 */;
}
  table {
    width: 70%;
    margin: 0.625rem  /* 10/16 */ auto;
    font-weight: normal;
  }
  table th{
    width: 33.3%;
    height: 3.125rem  /* 50/16 */;
    text-align: left;
  }
  table tr{
    margin-top: 3.125rem  /* 50/16 */;
  }
  .msg tr th span{
    color: #b1b1b1;
  }
#nav_manager-department {
  width: 80%;
  margin: 0 auto;
}
</style>
