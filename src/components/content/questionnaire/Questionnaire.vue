<template>
  <div class="container">
    <header>
      <h3>问卷信息管理</h3>
    </header>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button v-b-modal.my-modal1 @click="queryAllTarget">导入问卷</vxe-button>
        <vxe-button v-b-modal.targetlist @click="queryAllTarget">指标管理</vxe-button>
        <b-modal id="targetlist" size="xl" title="指标管理" ok-only>
          <vxe-table
            :loading="targetlistloading"
            :data="targetlist">
            <vxe-table-column type="seq" min-width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="rate" title="Rate"></vxe-table-column>
            <vxe-table-column title="操作" show-overflow>
              <template v-slot="{ row }">
                <vxe-button @click="showDetail(row)" v-b-modal.targetmanage>查看</vxe-button>
              </template>
            </vxe-table-column>
          </vxe-table>

          <b-modal id="targetmanage" size="lg" title="指标列表" ok-only>
            <target-management :target-data-children="targetDataChildren" :mid="maxid"></target-management>
            <template v-slot:modal-footer v-if="{showFooter}">
              <div class="w-100">
                <b-button
                  variant="primary"
                  size="sm"
                  class="float-right"
                  @click="submitTarget"
                >
                  提交
                </b-button>
              </div>
            </template>
          </b-modal>
        </b-modal>
      </template>
    </vxe-toolbar>

    <!--问卷管理-->
    <vxe-table
      border
      resizable
      row-key
      highlight-hover-row
      ref="allques"
      height="500"
      :loading="loading"
      :data="allquestionnaire">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="title" title="课程名"></vxe-table-column>
      <vxe-table-column title="操作" show-overflow>
        <template v-slot="{ row ,index}">
          <vxe-button @click="removeQuestionnaire(row)">删除</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-pager
      background
      :loading="loading"
      :current-page.sync="page5.currentPage"
      :page-size.sync="page5.pageSize"
      :total="page5.totalResult"
      :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
    </vxe-pager>


    <!--导入问卷按钮-->
    <b-modal id="my-modal1" size="xl" title="导入用户信息" ok-only>
      <div class="container111 mb-4">
        {{ upload_file }}
        <input
          type="file"
          accept=".xls,.xlsx"
          class="upload_file"
          @change="readExcel($event)"
        />
      </div>
      <vxe-select v-model="targetTempName" placeholder="选择指标模板" class="mb-3">
        <vxe-option v-for="num in targetlist" :key="num.id" :value="num" :label="`${num.name}`"></vxe-option>
      </vxe-select>
        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="submitnaire"
            >
              提交
            </b-button>
          </div>
        </template>

      <!--导入的问卷详情-->
      <vxe-grid
        border
        resizable
        show-overflow
        keep-source
        ref="questions"
        :loading="loading"
        :data="userMessage"
        :edit-config="{trigger: 'manual', mode: 'row'}">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="content" title="问题"></vxe-table-column>
        <vxe-table-column field="name" title="指标名称"></vxe-table-column>
        <vxe-table-column field="rate" title="权重"></vxe-table-column>
        <vxe-table-column title="操作" width="160">
          <template v-slot="{ row,index }">
            <vxe-button v-b-modal.targetvalue @click="addtarget(row,index)">添加指标</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-grid>
      <b-modal id="targetvalue" size="lg" title="指标列表">
        <target-value :target-temp-tree="targetTempTree" :user-message="userMessage"
                      @changeuserMessage="changeuserMessage"></target-value>
      </b-modal>
    </b-modal>

  </div>
</template>

<script>
import XLSX from "xlsx";
import TargetManagement from "components/content/target/TargetManagement";
import TargetValue from "components/content/target/TargetValue";

export default {

  name: "Questionnaire",
  computed: {
    rows() {
      return this.userMessage.length
    }
  },
  data() {
    return {
      loading: false,
      showFooter: false,
      isTeaching: true,/*状态：正在评教*/
      notTeaching: false,
      submitLoading: false,
      perPage: 15,//每页数据条数
      currentPage: 1,
      userMessage: [],//存放导入的数据
      allquestionnaire: [],
      selectRow: null,
      showEdit: false,
      upload_file: "导入",
      targetTempName: "",
      targetTempTree: [],
      fatherTarget: [],
      targetlist: [],
      targetlistloading:false,
      targetDataChildren: [],
      maxid: 0,
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 300
      }
    }
  },
  watch: {
    targetTempName(val, oldval) {
      // console.log(val,oldval)
      this.$store.dispatch("admin/indicator/getTemp", val)
        .then(res => {
          // console.log(res)
          this.targetTempTree = Array(this.$store.getters["admin/indicator/getTndicatorTempTree"])
          // console.log(this.targetTempTree)
        })

    },

  },
  created: function () {
    // 请求所有问卷
    this.$store
      .dispatch("admin/questionnaire/loadGetAllNaire")
      .then(res => {
        this.allquestionnaire = this.$store.state.admin.questionnaire.questionnaireAll
        // console.log(res)
      })

  },
  components: {
    TargetManagement,
    TargetValue
  },
  methods: {
    /*修改问卷*/
    editRowEvent(row) {
      this.$refs.xTable.setActiveRow(row)
    },

    /*删除问卷*/
    removeQuestionnaire(row) {
      this.$XModal.confirm('您确定要删除该数据?').then(type => {
        if (type === 'confirm') {
          console.log(row.id)
          this.$store
            .dispatch("admin/questionnaire/deleteQuestionnaireById",row.id)
            .then(res =>{
              this.$refs.allques.remove(row)
              console.log(res);
            })
        }
      })
    },

    /*查看指标详细*/
    showDetail(row) {
      this.$store.dispatch("admin/indicator/getDetail", row)
        .then(res => {
          this.targetDataChildren = Array(this.$store.getters["admin/indicator/getTndicatorTree"])
          this.maxid = res
        })

    },
    // 查询所有指标
    queryAllTarget(){
      this.targetlistloading = true
      this.$store
        .dispatch("admin/indicator/getAll")
        .then(res => {
          this.targetlist = this.$store.state.admin.indicator.indicatorAll
          this.targetlistloading = false
          // console.log(res)
        })
    },
    // 添加、删除指标后进行提交操作
    submitTarget() {
      this.$store.dispatch("admin/indicator/createIndicator", this.targetDataChildren)
        .then(res => {
          if (res){
            // console.log("创建指标完成")
            // 创建文件完成 查询所有问卷
            this.$XModal.message({ message: '创建指标完成', status: 'success' })
            this.queryAllTarget();
          }else {
            // console.log("创建指标失败")
            this.$XModal.message({ message: '创建指标失败', status: 'warning' })
          }
          // 关闭模态框
          this.$bvModal.hide('targetmanage')
        })
    },
    // 更新导入问卷的表格数据
    changeuserMessage(data) {
      this.userMessage = []
      this.userMessage = data
    },
    // 添加指标
    addtarget(row, index) {
      this.$store.commit("admin/indicator/updateCurrentRow", row)

    },
    // 提交问卷
    submitnaire() {
      let questionnaire = {
        title: this.upload_file,
        indexRootId: this.targetTempTree[0].id,
        questions: this.userMessage
      }
      // console.log(this.userMessage)
      this.$store.dispatch("admin/indicator/createQuestionnaire", questionnaire)
        .then(res => {
          if (res) {
            // console.log("success");
            this.$XModal.message({ message: '导入问卷成功', status: 'success' , iconStatus: 'fa fa-thumbs-up'})
            this.$bvModal.hide('my-modal1');
            this.$store
              .dispatch("admin/questionnaire/loadGetAllNaire")
              .then(res => {
                this.allquestionnaire = this.$store.state.admin.questionnaire.questionnaireAll
                // console.log(res)
              })
          } else
            this.$XModal.message({ message: '导入问卷失败', status: 'error' })
            // console.log("fail")
        })
    },


    /*读取文件*/
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
        // let str = files[0].name
        that.upload_file = files[0].name.split(".")[0];
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
          this.$store.commit("admin/indicator/clearCurrent") // 清空指标
          console.log("---userMessage");
          console.log(this.userMessage)
          that.lists = [];
          // 从解析出来的数据中提取相应的数据
          ws.forEach(item => {
            that.lists.push({
              username: item["name"],
              phone_number: item["code"]
            });
          });
          // 给后端发请求
          /*提交数据*/
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },

  }
}
</script>

<style scoped>
.container111 {
  border: none;
  border-radius: 0.25rem  /* 4/16 */;
  background-color: #409eff;
  height: 2.1875rem  /* 35/16 */;
  width: 9.375rem  /* 150/16 */;
  margin-top: 0.5rem  /* 8/16 */;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.9375rem  /* 15/16 */;
  min-width: 5rem  /* 80/16 */;
  *zoom: 1;
}

.upload_file {
  font-size: 1.25rem  /* 20/16 */;
  opacity: 0;
  position: absolute;
  filter: alpha(opacity=0);
  width: 3.75rem  /* 60/16 */;
}

/*.test{*/
/*  width: 80%;*/
/*  margin: 10px auto;*/
/*}*/
.my-red {
  color: red;
}

.my-green {
  color: green;
}

.my-domain.vxe-input {
  height: 2.125rem  /* 34/16 */;
  width: 18.75rem  /* 300/16 */;
}

.my-domain.vxe-input >>> .vxe-input--prefix {
  width: 3.75rem  /* 60/16 */;
  height: 2rem  /* 32/16 */;
  top: 0.0625rem  /* 1/16 */;
  text-align: center;
  border-right: 0.0625rem  /* 1/16 */ solid #dcdfe6;
  background-color: #f5f7fa;
}

.my-domain.vxe-input >>> .vxe-input--inner {
  padding-left: 4.5rem  /* 72/16 */;
  border: 0.0625rem  /* 1/16 */ solid #dcdfe6;
}

.my-search.vxe-input {
  height: 2.125rem  /* 34/16 */;
  width: 18.75rem  /* 300/16 */;
}

.my-search.vxe-input >>> .vxe-input--suffix {
  width: 3.75rem  /* 60/16 */;
  height: 2rem  /* 32/16 */;
  top: 0.0625rem  /* 1/16 */;
  text-align: center;
  border-left: 0.0625rem  /* 1/16 */ solid #dcdfe6;
  background-color: #f5f7fa;
  cursor: pointer;
}

.my-search.vxe-input >>> .vxe-input--inner {
  padding-right: 4.5rem  /* 72/16 */;
  border: 0.0625rem  /* 1/16 */ solid #dcdfe6;
}
</style>
