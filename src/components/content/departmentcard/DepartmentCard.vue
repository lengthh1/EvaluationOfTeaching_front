<template>
  <div class="test">
    <header>
      <h3>学院信息管理</h3>
      <b-button  v-b-modal.my-modal4 style="display: inline;margin-top: 20px;
      margin-left: 15px;
      " variant="outline-success">批量导入</b-button>
      <div class="seach_class">
        <b-form inline>
          <label class="sr-only">Name</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Jane Doe"
          ></b-input>
          <label class="sr-only">Username</label>
          <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input id="inline-form-input-username" placeholder="Username"></b-input>
          </b-input-group>
          <b-button variant="primary">Seach</b-button>
        </b-form>
      </div>
    </header>

    <div class="single-member effect-1" v-for="(item,index) in DepartmentData">
      <div class="member-image">
        <!--<img src="" width="150" height="80" alt="">-->
        <div id="img">{{DepartmentData[index].id}}</div>
      </div>
      <div class="member-info">
        <h4>{{ DepartmentData[index].name }}</h4>
        <h5>PinYing</h5>
        <!--<p style="color: #2a91d8" @click="test(index)">所有班级</p>-->

        <b-button-group id="dosomeThing">
          <b-button  v-b-modal.my-modal style="width: 60px" variant="outline-primary" @click="showModal(index)">
            <b-icon  icon="tools"></b-icon>
          </b-button>
          <b-button v-b-tooltip.hover title="查看所辖班级" v-b-modal.my-modal2 @click="showModal3(index)" style="width: 60px" variant="outline-primary">
            <b-icon icon="person-fill"></b-icon>
          </b-button>

          <b-button style="width: 60px" variant="outline-primary">
            <b-icon @click="test()" icon="inbox-fill"></b-icon>
          </b-button>
        </b-button-group>
      </div>
    </div>
    <!--导入学院信息-->
    <b-modal id="my-modal4" size="xl" title="导入用户信息">
      <div class="container111">
        {{ "导入" }}
        <input
          type="file"
          accept=".xls,.xlsx"
          class="upload_file"
          @change="readExcel($event)"
        />
      </div>
      <div class="overflow-auto">
        <!-- <p class="mt-3">问卷总数: {{ currentPage }}</p>-->
        <!--<p class="mt-3">题目</p>-->
        <b-table
          id="my-table"
          :items="userMessage"
          :per-page="perPage"
          :current-page="currentPage"
          small
        ></b-table>

        <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </b-modal>

    <div>
      <b-modal ref="my-modal2" hide-footer title="ALl Class Message">
        <vxe-table
          border
          show-footer
          class="mytable-scrollbar"
          height="400"
          :data="ClassData">
          <vxe-table-column type="seq" width="50%" fixed="left"></vxe-table-column>
          <vxe-table-column field="classname"  title="ClassName" width="50%"></vxe-table-column>
        </vxe-table>
      </b-modal>
    </div>

    <b-modal ref="my-modal" hide-footer title="学院信息管理">
      <div class="d-block text-center">
        <vxe-form
          ref="xForm"
          class="my-form2"
          title-align="right"
          title-width="100"
          :data="formData2"
          :rules="formRules2"

          @submit="submitEvent2(index)"
          @reset="resetEvent">
          <vxe-form-item title="学院名称" field="name" span="24">
            <template v-slot="scope">
              <vxe-input v-model="formData2.name" placeholder="请输入名称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="学院号" field="code" span="24">
            <template v-slot="scope">
              <vxe-input v-model="formData2.code" placeholder="请输入学号" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item align="center" span="24">
            <template v-slot>
              <vxe-button type="submit"  status="primary">基本表单</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal111">Close Me</b-button>
    </b-modal>
  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
name: "DepartmentCard",
  created() {
    this.$store
      .dispatch('admin/institute/query',{name:''})
      .then(result => {
        if (result==='success')
          console.log('this' + '  ' + 'success');
        this.DepartmentData = this.$store.state.admin.institute.query;
        console.log(this.$store.state.admin.institute.query);
        /*  this.ClassData = this.$store.state.admin.user.userForm;*/
      }).then(()=>{
      /*this.$router.push('index')*/
    })
  },
  methods:{
  s(){
    console.log(this.classname);
  },
    hideModal111(){
      this.$refs['my-modal'].hide();
    },
    showModal(index){
      this.formData2.name = this.DepartmentData[index].name;
      this.$refs['my-modal'].show();
    },
    showModal3(){
      this.$refs['my-modal2'].show();
      this.$store
        .dispatch('admin/users/queryAllTeacher')
        .then(result => {
          if (result==='success')
            console.log('this' + '  ' + 'success');
          this.DepartmentData = this.$store.state.admin.institute.query;
          console.log(this.$store.state.admin.institute.query);
          /*  this.ClassData = this.$store.state.admin.user.userForm;*/
        }).then(()=>{
        /*this.$router.push('index')*/
      })
    },
    test(index){
      console.log(this.DepartmentData[index].code[0]);
    },
    submit_form() {
      // 给后端发送请求，更新数据
      console.log("假装给后端发了个请求...");
    },
    readExcel(e) {
      // 读取表格文件
      let that = this;
      const files = e.target.files;
      if (files.length <= 0) {
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message({
          message: "上传格式不正确，请上传xls或者xlsx格式",
          type: "warning"
        });
        return false;
      } else {
        // 更新获取文件名
        that.upload_file = files[0].name;
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容

          this.userMessage = ws;
          console.log(this.userMessage);
          that.lists = [];
          // 从解析出来的数据中提取相应的数据
          ws.forEach(item => {
            that.lists.push({
              username: item["name"],
              phone_number: item["code"]
            });
          });
          // 给后端发请求
          this.$store
            .dispatch('admin/institute/create',this.userMessage)
            .then(result => {
              if (result==='success')
                console.log(3333333);
              this.tableData = this.$store.state.admin.user.userForm;
            }).then(()=>{
            /*this.$router.push('index')*/
          })
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    }

  },

  data(){
    return{
      perPage: 15,//每页数据条数
      currentPage: 1,
      userMessage:[],//存放导入的数据
      ClassData:[
        {
          id:1,
          classname: '1790001',
        },
        {
          id:2,
          classname: '1790002',
        },
        {
          id:3,
          classname: '1790003',
        },
        {
          id:4,
          classname: '1790004',
        },
        {
          id:5,
          classname: '1790005',

        },
        {
          id:6,
          classname: '1790006',
        }
      ],
      formData2 : {
        name: '',

      },
      formRules2: {
        name: [
          { required: true, message: '请输入名称' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        code: [
          { required: true, message: '请输入学号' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ]
      },
      submitEvent2 (index) {

        setTimeout(() => {

          this.$refs['my-modal'].toggle('#toggle-btn')
          this.$XModal.message({ message: '保存成功', status: 'success' })
          console.log(index);
        }, 1000)
      },
      searchEvent () {
        this.$XModal.message({ message: '查询事件', status: 'info' })
      },
      resetEvent () {
        this.$XModal.message({ message: '重置事件', status: 'info' })
      },
      DepartmentData:[
        {
          id:1,
          name: '软件工程',
          code: ['1790005','1790005','1790008'],
          teacher:'王麻子'
        },
        {
          id:2,
          name: '计算机科学技术',
          code: ['1790006,1790008'],
          teacher:'李四'
        },
        {
          id:3,
          name: '数据库设计',
          code: ['1790005'],
          teacher:'张三'

        },

        {
          id:6,
          name: '数字媒体艺术',
          code: ['1790006'],
          teacher:'张三'
        }
      ],
    }
  }
}
</script>

<style scoped>
.seach_class{
  margin-top: 1.25rem  /* 20/16 */;
}
.member-info p{
  margin-top: -0.9375rem  /* -15/16 */;
}
b-icon{
  width: 15.625rem  /* 250/16 */;
}
body{
  font-family:Lato,'Open Sans', sans-sarif;
  font-size:1rem  /* 16/16 */;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.Uname{
  color: #2a8bcb;
}
.test {
  width: 80%;
  height: 81.25rem  /* 1300/16 */;
  margin:0 auto;
}
/*= common css to all effects =*/
.single-member{
  width: 17.5rem  /* 280/16 */;
  float: left;
  margin: 1.875rem  /* 30/16 */ 2.5%;
  background-color: #fff;
  text-align: center;
  position: relative;
}
.member-image #img {
  max-width: 100%;
  vertical-align: middle;
  padding-left: 1.5625rem  /* 25/16 */;
  padding-right: 1.5625rem  /* 25/16 */;
  color: white;
}
h3 {font-size: 1.5rem  /* 24/16 */;
  font-weight: normal;
  margin: 0.625rem  /* 10/16 */ 0 0;
  text-transform: uppercase;
}
h5 {
  font-size: 1rem  /* 16/16 */;
  font-weight: 300;
  margin: 0 0 0.9375rem  /* 15/16 */;
  line-height: 1.375rem  /* 22/16 */;
}
p {
  font-size: 0.875rem  /* 14/16 */;
  font-weight: 300;
  line-height: 1.375rem  /* 22/16 */;
  padding: 0 1.875rem  /* 30/16 */;
  margin-bottom: 0.625rem  /* 10/16 */;
}
.social-touch a{
  display: inline-block;
  width: 1.6875rem  /* 27/16 */;
  height: 1.625rem  /* 26/16 */;
  vertical-align: middle;
  margin: 0 0.125rem  /* 2/16 */; /*background-image: url(../img/logo.png);*/
  background-repeat: no-repeat;
  opacity: 0.7;
  transition: 0.3s;
}
.social-touch a:hover{
  opacity: 1;
  transition: 0.3s;
}
.icon-colored .fb-touch{background-position: 0 -1.6875rem  /* -27/16 */;}
.icon-colored .tweet-touch{background-position: -2.1875rem  /* -35/16 */ -1.6875rem  /* -27/16 */;}
.icon-colored .linkedin-touch{background-position: -4.4375rem  /* -71/16 */ -1.6875rem  /* -27/16 */;}
/*= common css to all effects end =*/

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

[class^="icon-"], [class*=" icon-"] {
  font-family: 'icomoon';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, html { font-size: 100%; 	padding: 0; margin: 0;}
a{ color: rgba(255, 255, 255, 0.6);outline: none;text-decoration: none;-webkit-transition: 0.2s;transition: 0.2s;}
a:hover,a:focus{color:#74777b;text-decoration: none;}


/*= effect-1 css =*/
.effect-1{border-radius: 0.3125rem  /* 5/16 */ 0.3125rem  /* 5/16 */ 0 0; padding-bottom: 2.5rem  /* 40/16 */;}
.effect-1 .member-image {border: 0.125rem  /* 2/16 */ solid #fff; background: #1b6aaa; border-radius: 3.75rem  /* 60/16 */ 0; display: inline-block; margin-top: -4.5rem  /* -72/16 */; overflow: hidden; transition: 0.3s;}
.effect-1 .social-touch{background-color: #e13157; position: absolute; left: 0; bottom: 0; height: 0.3125rem  /* 5/16 */; overflow: hidden; padding: 0.3125rem  /* 5/16 */ 0 0; width: 100%; transition: 0.3s;}
.effect-1 .member-image #img{transition: 0.3s; height:1.875rem  /* 30/16 */; /*background-color: #2a91d8;*/ border-radius: 3.75rem  /* 60/16 */ 0;}
.effect-1:hover .member-image{border-color: #e13157; transition: 0.3s; border-radius: 50%;}
.effect-1:hover .social-touch{padding: 0.375rem  /* 6/16 */ 0; height: 2.375rem  /* 38/16 */; transition: 0.3s;}
/*= effect-1 css end =*/

/*= Media Query
=============== */
@media only screen and (max-width: 61.25rem  /* 980/16 */){
  .row{width: 100%; margin: 3.125rem  /* 50/16 */ 0;}
  .team-members{text-align: center;}
  .single-member{float: none; display: inline-block; vertical-align: bottom;}
}
/*= Media Query End
=================== */
@media screen and (max-width:81.25rem  /* 1300/16 */){
  .single-member{
    width: 15.625rem  /* 250/16 */;
  }
}/*宽度小于500px时 绿色*/
</style>
