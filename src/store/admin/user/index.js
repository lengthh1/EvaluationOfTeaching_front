import myAxios from "../../../network/request";
import qs from 'qs'
import post from "@/store/util";
export default {
  state:{
    userForm: [],
    loginStatus: '',
    q:[]
  },
  mutations:{
    updateLoginForm(state,data){
      state.userForm = data
    },
    updateLoginStatus(state,data){
      state.loginStatus = data
    },

  },
  actions:{

    query({commit},username){
      console.log(username);
      let devAccount={
        username: '10100114',
      }
      // console.log(11111);
     /* '2020100108'*/
      return myAxios
        .post('admin/user/query', qs.stringify({code:username}))
        .then(res=>{
          commit('updateLoginForm',res.data)
          return 'success'
          /*return res.data*/
        }).catch(err=>{
          console.log(err)
          return err
        })
    },
    allTeacher({commit}){
      // console.log(11111);
      /* '2020100108'*/
      return myAxios
        .post('admin/user/allTeacher')
        .then(res=>{
          console.log(res.data);
          commit('updateLoginForm',res.data)
          return 'success'
          /*return res.data*/
        }).catch(err=>{
          console.log(err)
          return err
        })
    },
  }
}
