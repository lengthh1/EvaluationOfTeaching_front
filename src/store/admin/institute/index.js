import myAxios from "../../../network/request";
import post from "../../util";
import qs from 'qs'
const baseUrl = 'admin/institute/'
export default {
  namespaced:true,
  state:{
    query:[],
    creations:[]
  },
  mutations:{
    updateQuery(state,data){
      state.query = data
    },
    addCreations(state,data){
      state.creations = data
    }
  },
  actions:{
    loadQuery({commit},condition){
      return post(baseUrl+'query',qs.stringify(condition),res=>{
        commit('updateQuery',res.data)
      })
    },
    create({state},init){
      // console.log(init);
      return post(baseUrl+'create',init,res=>{
        console.log('success');
        return res.data
      })
    },
    query({commit},classname){
      // console.log(classname + '1111');
      return post(baseUrl+'query',qs.stringify(classname),res=>{
        console.log('success');
        console.log(res.data);
        commit('updateQuery',res.data)
        return res.data
      })
    },

  },
  modules:{},
  getters:{}
}
