<template>
  <div class="test container">
    <header>
      <h3>课程管理</h3>
      <b-button style="margin-top: 15px" v-b-modal.my-modal1 @click="showModal2"
                variant="outline-primary">添加课程
      </b-button>
      <b-button style="margin-top: 15px;margin-left: 10px" v-b-modal.my-modal4  variant="outline-success">批量导入
      </b-button>
      <!--搜索框-->
      <div class="seach_course">
        <b-form inline>
          <label class="sr-only">Name</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="coursename"
            placeholder="Jane Doe"
          ></b-input>
          <label class="sr-only">Username</label>
          <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input id="inline-form-input-username" placeholder="Username"></b-input>
          </b-input-group>

          <b-button variant="primary" @click="serchCourse()">Seach</b-button>
        </b-form>
      </div>
    </header>

    <div class="single-member effect-1" v-for="(item,index) in ClassData">
      <div class="member-image">
        <!--<img src="" width="150" height="80" alt="">-->
        <div id="img">{{ ClassData[index].id }}</div>
      </div>
      <div class="member-info">
        <h4>{{ ClassData[index].name }}</h4>
        <h5>PinYing</h5>
        <!--<p style="color: #2a91d8" @click="test(index)">所有班级</p>-->

        <b-button-group id="dosomeThing">
          <b-button v-b-modal.my-modal style="width: 60px" variant="outline-primary" @click="showModal(index)">
            <b-icon icon="tools"></b-icon>
          </b-button>
          <b-button v-b-tooltip.hover @click="showModal3(item)" title="查看所有班级" style="width: 60px"
                    variant="outline-primary">
            <b-icon icon="person-fill"></b-icon>
          </b-button>

          <b-button style="width: 60px" variant="outline-primary">
            <b-icon @click="test()" icon="inbox-fill"></b-icon>
          </b-button>
        </b-button-group>
      </div>
    </div>

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

      <b-modal size="lg" id="my-modal2" hide-footer title="ALl Students Message">
        <b-button variant="outline-primary" @click="addTeacherToClass()">添加</b-button>
        <b-modal id="addCourseToTeacher" title="添加老师和班级" hide-footer>

          <vxe-form :data="fromData" @submit="addTeacherToClassBtn">
            <vxe-form-item title="老师" field="teacher">
              <template v-slot>
                <vxe-select v-model="fromData.teacher" placeholder="请选择授课老师" clearable>
                  <vxe-option v-for="item in allTeacher" :key="item.id" :value="item" :label="item.name"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="班级" field="clazz">
              <template v-slot>
                <vxe-select v-model="fromData.clazz" placeholder="请选择授课班级" clearable>
                  <vxe-option v-for="item in allClazz" :key="item.id" :value="item" :label="item.name"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" span="24">
              <template v-slot>
                <vxe-button type="submit" status="primary">基本表单</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </b-modal>
        <vxe-table
          border
          show-footer
          class="mytable-scrollbar"
          :data="currentCourseAllData"
          height="400"
        >
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="teacherName" title="老师" ></vxe-table-column>
          <vxe-table-column field="className" title="班级" ></vxe-table-column>
        </vxe-table>
      </b-modal>
    </div>

    <!--添加班级-->
    <b-modal ref="my-modal1" hide-footer title="课程信息管理">
      <div class="d-block text-center">
        <vxe-form
          ref="xForm"
          class="my-form2"
          title-align="right"
          title-width="100"
          :data="formData2"
          :rules="formRules2"
          @submit="submitEvent3(index)"
          @reset="resetEvent">
          <vxe-form-item title="课程名" field="code" span="24">
            <template v-slot="scope">
              <vxe-input v-model="coName" id="classId" placeholder="请输入课程名" clearable
                         @input="$refs.xForm.updateStatus(scope)"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item style="margin-left: 45px"  title="是否为专业课" field="code" span="24">
            <template v-slot="scope">
              <vxe-radio-group v-model="is_major">
                <vxe-radio-button label="true" content="是"></vxe-radio-button>
                <vxe-radio-button label="false" content="否"></vxe-radio-button>
              </vxe-radio-group>
            </template>
          </vxe-form-item>
          <vxe-form-item style="margin-left: 45px"  title="是否为公开课" field="code" span="24">
            <template v-slot="scope">
              <vxe-radio-group v-model="is_public">
                <vxe-radio-button label="true" content="是"></vxe-radio-button>
                <vxe-radio-button label="false" content="否"></vxe-radio-button>
              </vxe-radio-group>
            </template>
          </vxe-form-item>
          <vxe-form-item align="center" span="24">
            <template v-slot>
              <vxe-button type="submit" @click="create()" status="primary">提交信息</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal111">Close Me</b-button>
    </b-modal>

    <b-modal ref="my-modal" hide-footer title="课程信息管理">
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
          <!-- <vxe-form-item title="班级id" field="name" span="24">
             <template v-slot="scope">
               <vxe-input v-model="formData2.name" placeholder="请输入名称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
             </template>
           </vxe-form-item>-->
          <vxe-form-item title="课程名" field="code" span="24">
            <template v-slot="scope">
              <vxe-input v-model="formData2.classname" placeholder="请输入班级号" clearable
                         @input="$refs.xForm.updateStatus(scope)"></vxe-input>
            </template>
          </vxe-form-item>


          <vxe-form-item align="center" span="24">
            <template v-slot>
              <vxe-button type="submit" status="primary">提交信息</vxe-button>
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
  created() {
    this.$store
      .dispatch('admin/course/query', {name: this.coursename})
      .then(result => {
        if (result === 'success')
          console.log('this' + '  ' + 'success');
        this.ClassData = this.$store.state.admin.course.query;
        // console.log(this.$store.state.admin.course.query);
        /*  this.ClassData = this.$store.state.admin.user.userForm;*/
      }).then(() => {
      /*this.$router.push('index')*/
    })
  },
  name: "Curriculum",
  methods: {
    serchCourse() {
      console.log(this.coursename);
      this.$store
        .dispatch('admin/course/query', {name: this.coursename})
        .then(result => {
          if (result === 'success')
            console.log('this' + '  ' + 'success');
          this.ClassData = this.$store.state.admin.course.query;
          // console.log(this.$store.state.admin.course.query);
          /*  this.ClassData = this.$store.state.admin.user.userForm;*/
        }).then(() => {
        /*this.$router.push('index')*/
      })
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
          console.log(ws);
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
            .dispatch('admin/course/create', this.userMessage)
            .then(result => {
              if (result === 'success')
                console.log(3333333);
              this.$XModal.message({ message: '导入成功', status: 'success' })
              /*this.tableData = this.$store.state.admin.user.userForm;*/
            }).then(() => {
            /*this.$router.push('index')*/
          })
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
    create() {
      console.log('test');
    },
    showModal3(item) {
      // console.log("item",item)
      this.currentRowCourse = item
      this.$store.dispatch("admin/course/queryCCT", item.id)
        .then(res => {
          this.currentCourseAllData = this.$store.state.admin.course.currentCCT
          console.log(this.$store.state.admin.course.currentCCT)
          this.$bvModal.show('my-modal2');
        })
    },
    addTeacherToClass() {
      //  添加课程到老师到班级
      this.fromData.teacher = ''
      this.fromData.clazz = ''
      this.$store.dispatch("admin/users/queryAllTeacher")
        .then(res => {
          this.allTeacher = this.$store.state.admin.users.allTeacher
          this.$store.dispatch("admin/class/query", "")
            .then(res => {
              this.allClazz = this.$store.state.admin.class.query
            })
        })
      // console.log(this.allClazz,this.allTeacher)
      this.$bvModal.show('addCourseToTeacher');
    },
    addTeacherToClassBtn() {
      this.$store.dispatch("admin/insertInfo/segment/course/submit",
        Array({
          courseId: this.currentRowCourse.id,
          claId: this.fromData.clazz.id,
          thId: this.fromData.teacher.id
        }))
        this.$store.dispatch("admin/course/queryCCT", this.currentRowCourse.id)
        .then(res => {
          this.currentCourseAllData = this.$store.state.admin.course.currentCCT
          this.$bvModal.hide('addCourseToTeacher');
          // this.$bvModal.show('my-modal2');
        })

      // console.log(this.fromData, this.currentRowCourse)
    },
    showModal2(index) {
      this.$refs['my-modal1'].show();
    },
    showModal(index) {
      console.log(index);
      this.$refs['my-modal'].show();
      this.formData2.classname = this.ClassData[index].name;
      console.log(this.formData2);
    },
    submitEvent2(index) {
      setTimeout(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
        this.$XModal.message({message: '保存成功', status: 'success'})

        console.log(index);
      }, 1000)
    },
    hideModal111() {
      this.$refs['my-modal'].hide()
    },
    submitEvent3(index) {
      console.log('is_major',this.is_major,'is_public',this.is_public);
      setTimeout(() => {
        this.$refs['my-modal1'].toggle('#toggle-btn')
        this.$XModal.message({message: '保存成功', status: 'success'})
        console.log(this.formData2.classname);
        let courseMessage = [{
          name:this.coName,
          is_major:this.is_major,
          is_public:this.is_public
        }];
        console.log(courseMessage);
        // 给后端发请求
        this.$store
          .dispatch('admin/course/create', courseMessage)
          .then(result => {
            if (result === 'success')
              console.log(3333333);
          }).then(() => {

        })
      }, 1000)
    },
    searchEvent() {
      this.$XModal.message({message: '查询事件', status: 'info'})
    },
    resetEvent() {
      this.$XModal.message({message: '重置事件', status: 'info'})
    },
    test(index) {
      console.log(this.ClassData[index].code[0]);
    }
  },

  data() {
    return {
      coName:'',
      is_major:'',
      is_public:'',
      coursename: '',
      perPage: 15,//每页数据条数
      currentPage: 1,
      userMessage: [],//存放导入的数据
      currentCourseAllData: [],
      currentRowCourse: '',
      allClazz: [],
      allTeacher: [],
      formData2: {
        classname: '',
        id: '',
      },
      fromData: {
        teacher: '',
        clazz: ''
      },
      formRules2: {
        name: [
          {required: true, message: '请输入名称'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符'}
        ],
        /*code: [
          { required: true, message: '请输入学号' }
        ],*/
        password: [
          {required: true, message: '请输入密码'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符'}
        ]
      },

      ClassData: [
        {
          id: 1,
          name: '数据库从删库到跑路',
        },
        {
          id: 2,
          name: 'Android从入门到改行',
        },
        {
          id: 3,
          name: 'C#从入门到放弃',
        },
        {
          id: 4,
          name: 'Java从精通到陌生',
        },
        {
          id: 5,
          name: 'JS全栈从入门到单身狗',

        },
        {
          id: 6,
          name: 'SQl Serve从没入门就放弃',
        },
        {
          id: 7,
          name: 'C语言从入门到看开',
        }
      ],
    }
  }
}
</script>

<style scoped>
.seach_course {
  margin-top: 0.9375rem  /* 15/16 */;
}

/*滚动条整体部分*/
.mytable-scrollbar div::-webkit-scrollbar {
  width: 0.625rem  /* 10/16 */;
  height: 0.625rem  /* 10/16 */;
}

/*滚动条的轨道*/
.mytable-scrollbar div::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}

/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar div::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 0.3125rem  /* 5/16 */;
  border: 0.0625rem  /* 1/16 */ solid #F1F1F1;
  box-shadow: inset 0 0 0.375rem  /* 6/16 */ rgba(0, 0, 0, .3);
}

.mytable-scrollbar div::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}

.mytable-scrollbar div::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}

/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar div::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}

.mt-3 {
  height: 2.1875rem  /* 35/16 */;
}

.member-info p {
  margin-top: -0.9375rem  /* -15/16 */;
}

b-icon {
  width: 15.625rem  /* 250/16 */;
}

body {
  font-family: Lato, 'Open Sans', sans-sarif;
  font-size: 1rem  /* 16/16 */;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.Uname {
  color: #2a8bcb;
}

.test {
  /*width: 80%;*/
  height: 81.25rem  /* 1300/16 */;
  margin: 0 auto;
}

/*= common css to all effects =*/
.single-member {
  margin-left: -1.25rem  /* -20/16 */;
  width: 17.5rem  /* 280/16 */;
  height: 15.625rem  /* 250/16 */;
  float: left;
  margin: 0.625rem  /* 10/16 */ 2.5%;
  margin-top: 2.5rem  /* 40/16 */;
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

h3 {
  font-size: 1.5rem  /* 24/16 */;
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

.social-touch a {
  display: inline-block;
  width: 1.6875rem  /* 27/16 */;
  height: 1.625rem  /* 26/16 */;
  vertical-align: middle;
  margin: 0 0.125rem  /* 2/16 */; /*background-image: url(../img/logo.png);*/
  background-repeat: no-repeat;
  opacity: 0.7;
  transition: 0.3s;
}

.social-touch a:hover {
  opacity: 1;
  transition: 0.3s;
}

.icon-colored .fb-touch {
  background-position: 0 -1.6875rem  /* -27/16 */;
}

.icon-colored .tweet-touch {
  background-position: -2.1875rem  /* -35/16 */ -1.6875rem  /* -27/16 */;
}

.icon-colored .linkedin-touch {
  background-position: -4.4375rem  /* -71/16 */ -1.6875rem  /* -27/16 */;
}

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

body, html {
  font-size: 100%;
  padding: 0;
  margin: 0;
}

a {
  color: rgba(255, 255, 255, 0.6);
  outline: none;
  text-decoration: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

a:hover, a:focus {
  color: #74777b;
  text-decoration: none;
}

#dosomeThing {
  height: 2.1875rem  /* 35/16 */;
}

/*= effect-1 css =*/
.effect-1 {
  border-radius: 0.3125rem  /* 5/16 */ 0.3125rem  /* 5/16 */ 0 0;
  padding-bottom: 2.5rem  /* 40/16 */;
}

.effect-1 .member-image {
  border: 0.125rem  /* 2/16 */ solid #fff;
  background: #1b6aaa;
  border-radius: 3.75rem  /* 60/16 */ 0;
  display: inline-block;
  margin-top: -4.5rem  /* -72/16 */;
  overflow: hidden;
  transition: 0.3s;
}

.effect-1 .social-touch {
  background-color: #e13157;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0.3125rem  /* 5/16 */;
  overflow: hidden;
  padding: 0.3125rem  /* 5/16 */ 0 0;
  width: 100%;
  transition: 0.3s;
}

.effect-1 .member-image #img {
  transition: 0.3s;
  height: 1.875rem  /* 30/16 */; /*background-color: #2a91d8;*/
  border-radius: 3.75rem  /* 60/16 */ 0;
}

.effect-1:hover .member-image {
  border-color: #e13157;
  transition: 0.3s;
  border-radius: 50%;
}

.effect-1:hover .social-touch {
  padding: 0.375rem  /* 6/16 */ 0;
  height: 2.375rem  /* 38/16 */;
  transition: 0.3s;
}

/*= effect-1 css end =*/

/*= Media Query
=============== */
@media only screen and (max-width: 61.25rem  /* 980/16 */) {
  .row {
    width: 100%;
    margin: 3.125rem  /* 50/16 */ 0;
  }

  .team-members {
    text-align: center;
  }

  .single-member {
    float: none;
    display: inline-block;
    vertical-align: bottom;
  }
}

/*= Media Query End
=================== */
@media screen and (max-width: 81.25rem  /* 1300/16 */) {
  .single-member {
    width: 15.625rem  /* 250/16 */;
  }
}

/*宽度小于500px时 绿色*/
</style>
