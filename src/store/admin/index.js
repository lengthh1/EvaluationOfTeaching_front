import myAxios from "../../network/request";
import post from "../util";
import power from "./power";
import clazz from './class'
import student from './student'
export default {
  namespaced: true,
  mutations:{

  },
  state:{},
  actions:{},
  modules:{
    power,
    'class': clazz,
    student
  },
  getters:{}
}