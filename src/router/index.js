import Vue from 'vue'
import VueRouter from 'vue-router'
import Manager from "views/manager/Manager";
import Mess from "views/mess/Mess";
import MessCard from "components/content/messcard/MessCard";
import UserManager from "components/content/usermanager/UserManager";
import CourseManager from "components/content/coursemanager/CourseManager";
import ClassMana from "components/content/classmana/ClassMana";
import PinTeacher from "components/content/pinteacher/PinTeacher";
import Test from "components/content/test/Test";
import BeThclass from "components/content/bethclass/BeThclass";

const Login = () => import('views/login/Login.vue');
const Index = () => import('views/index/Index.vue');
const Limits = () => import('views/limits/Limits.vue')
const StudentQuestionnaireFinish = () => import('views/student/StudentQuestionnaireFinish')
const QuestionnaireManager = () => import('views/admin/questionnaire/QuestionnaireManager')
const QuestionnaireProgress = () => import('views/admin/questionnaire/QuestionnaireProgress')
const QuestionnaireProgressStudent = () => import('views/admin/questionnaire/QuestionnaireProgressStudent')
const QuestionnaireProgressTeacher = () => import('views/admin/questionnaire/QuestionnaireProgressTeacher')
const QuestionnaireIssue = () => import('views/admin/questionnaire/QuestionnaireIssue')
const TeacherQuestionnaireFinishStatistics = () => import('views/teacher/TeacherQuestionnaireFinishStatistics')
const TeacherQuestionnaireFinish = () => import('views/teacher/TeacherQuestionnaireFinish')
const TeacherQuestionnaireFinishToStudent = () => import('views/teacher/TeacherQuestionnaireFinishToStudent')
const TeacherQuestionnaireFinishToTeacher = () => import('views/teacher/TeacherQuestionnaireFinishToTeacher')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '首页'
    }

  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager
  },
  {
    path: '/usermanager',
    name: 'UserManager',
    component: UserManager
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/bethclass',
    name: 'BeThclass',
    component: BeThclass
  },
  {
    path: '/pinteacher',
    name: 'PinTeacher',
    component: PinTeacher
  },
  {
    path: '/classmana',
    name: 'ClassMana',
    component: ClassMana
  },
  {
    path: '/coursemanager',
    name: 'CourseManager',
    component: CourseManager
  },
  {
    path: '/messcard',
    name: 'MessCard',
    component: MessCard
  },
  {
    path: '/mess',
    name: 'Mess',
    component: Mess
  },
  {
    path: '/limits',
    name: 'Limits',
    component: Limits
  },
  {
    path: '/questionnaireManager',
    name: 'QuestionnaireManager',
    component: QuestionnaireManager
  },
  {
    path: '/questionnaireProgress',
    name: 'QuestionnaireProgress',
    component: QuestionnaireProgress,
    children: [
      {
        path: 'student/:data',
        name:'QuestionnaireProgressStudent',
        component:QuestionnaireProgressStudent
      },
      {
        path: 'teacher/:data',
        name:'QuestionnaireProgressTeacher',
        component:QuestionnaireProgressTeacher
      }
    ]
  },
  {
    path: '/questionnaireIssue',
    name: 'QuestionnaireIssue',
    component: QuestionnaireIssue
  },
  {
    path: '/teacherQuestionnaireFinish',
    name: 'TeacherQuestionnaireFinish',
    component: TeacherQuestionnaireFinish
  },
  {
    path: '/teacherQuestionnaireFinishStatistics',
    name: 'TeacherQuestionnaireFinishStatistics',
    component: TeacherQuestionnaireFinishStatistics,
    children: [
      {
        path: 'student',
        name:'TeacherQuestionnaireFinishToStudent',
        component:TeacherQuestionnaireFinishToStudent
      },
      {
        path: 'teacher',
        name:'TeacherQuestionnaireFinishToTeacher',
        component:TeacherQuestionnaireFinishToTeacher
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
