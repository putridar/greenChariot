import WelcomePage from './components/WelcomePage.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Survey from './components/Survey.vue'


export default [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignUp, name: "signup" },
  { path: '/signin', component: SignIn, name: "signin" },
  { path: '/survey', component: Survey, name: "survey", props: true},

]