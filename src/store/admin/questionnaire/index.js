import myAxios from "../../../network/request";
import post from "../../util";
import qs from 'qs'
export default {
  namespaced:true,
  state:{
    questionnaireAll:[],
    allCourse:[],
    allInstitute:[]
  },
  mutations:{
    updateQuestionnaireAll(state,data){
      state.questionnaireAll = data
    },
    updateAllCourse(state,data){
      state.allCourse = data
    },
    updateAllInstitute(state,data){
      state.allInstitute = data
    }
  },
  actions:{
    loadGetAllNaire({commit}){
      return myAxios.post("admin/questionnaire/all/0/100")
        .then(res =>{
          commit("updateQuestionnaireAll",res.data)
          console.log("get questionnaireAll",res.data)
          return true
        }).catch(err =>{
          console.log(err)
          return false
        })
    },
    deleteQuestionnaireById({commit},id){
      console.log("deleteid",id)
      return myAxios.post("admin/questionnaire/delete", qs.stringify({"qnId":id}))
        .then(res =>{
          console.log("deleteQuestionnaire success",res)
          return true
        }).catch(err =>{
          console.log(err)
          return false
        })
    },
    queryAllCourse({commit}){
      // 查询所有课程
      return myAxios.post("admin/cct/query",qs.stringify({name:""}))
        .then(res =>{
          console.log("admin/course/query",res.data)
          commit("updateAllCourse",res.data)
          return true
        }).catch(err =>{
          console.log(err)
          return false
        })
    },
    queryAllInstitute({commit}){
      // 查询所有学院
      return myAxios.post("admin/institute/query",qs.stringify({name:null}))
        .then(res =>{
          console.log("admin/institute/all",res.data)
          commit("updateAllInstitute",res.data)
          return true
        }).catch(err =>{
          console.log(err)
          return false
        })
    },
    issueQuestionnaire({commit},data){
      // console.log(data)
      let list = []
      if (data.status == 0){
      //  发布至学院
        data.naires.forEach(item =>{
          let obj = {
            qnId: item.id,
            inId:data.selected.id,
            beginTime:new Date(data.startTime).valueOf(),
            endTime:new Date(data.endTime).valueOf()
          }
          list.push(obj)
        })
        console.log(list)
       return  post("admin/questionnaire/release/institute", list, res => {
          console.log("发布问卷",res)
         return true
        })
      }
      else if(data.status == 1){
        // 发布至班级
        console.log("data",data)
        data.naires.forEach(item =>{
          let obj = {
            midId: data.selected.id,
            qnId:item.id,
            beginTime:new Date(data.startTime).valueOf(),
            endTime:new Date(data.endTime).valueOf()
          }
          list.push(obj)
        })
        console.log(list)
        return  post("admin/questionnaire/release/course", list, res => {
          console.log("发布问卷",res)
          return true
        })
      }else {
        console.log("发布失败")
        return false
      }


    }

  },
  modules:{
  },
  getters:{}
}
