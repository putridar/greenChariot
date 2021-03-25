import WelcomePage from './components/WelcomePage.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Survey from './components/Survey.vue'
import Survey1 from './components/Survey1.vue'
import Survey2 from './components/Survey2.vue'
import Dashboard from './components/Dashboard.vue'
import Challenges from './components/Challenges.vue'
import SocialMedia from './components/SocialMedia.vue'
import SocialMediaChallenge from './components/SocialMediaChallenge.vue'
import Submission from './components/LinkSubmission.vue'
import Verify from './components/VerifyPhoto.vue'
import Success from './components/SubmissionSuccess.vue'
import GreenShops from './components/greenshops.vue'
import Scoopcode from './components/Scoopcode.vue'
import registershop from './components/RegisterShop.vue'
import DashboardShop from './components/DashboardShop.vue'
import SignInShop from './components/SignInShop.vue'
import GreenCollectiveCode from './components/greencollectivecode.vue'

export default [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignUp, name: "signup" },
  { path: '/signin', component: SignIn, name: "signin" },
  { path: '/survey', component: Survey, name: "survey", props: true},
  { path: '/survey1', component: Survey1, name: "survey1", props: true},
  { path: '/survey2', component: Survey2, name: "survey2", props: true},
  { path: '/Dashboard', component: Dashboard, name: "Dashboard", props: true},
  { path: '/challenges', component: Challenges, name: "challenges", props: true},
  { path: '/socialmedia', component: SocialMedia, name: "socialmedia", props: true },
  { path: '/socialmediachallenge', component: SocialMediaChallenge, name: "socialmediachallenge", props: true },
  { path: '/submission', component: Submission, name: "submission", props: true },
  { path: '/verify', component: Verify, name: "verify", props: true },
  { path: '/success', component: Success, name: "success", props: true },
  {path: '/greenshops',component:GreenShops,name:"greenshops"},
  {path: '/scoopcode',component:Scoopcode,name:"scoopcode"},
  { path: '/registershop', component: registershop, name: "registershop", props: true },
  { path: '/dashboardShop', component: DashboardShop, name: "dashboardShop", props: true },
  { path: '/signinShop', component: SignInShop, name: "signinShop", props: true },
  {path:'/greencollectivecode',component:GreenCollectiveCode,name:'greencollectivecode'}
]