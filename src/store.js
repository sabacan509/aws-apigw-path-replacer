import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    regionId: '',
    apiList: Array,
    loginFlg: false
  },
  mutations: {

  },
  getters: {
    isLoggedIn: (state) => {
      return state.loginFlg;
    },
    urlIAM: () => {
      // AWS Console URL For IAM User Edit
      return 'https://console.aws.amazon.com/iam/home?region=ap-northeast-1/users#/users';
    },
    urlIAMManual: () => {
      // IAM Setting Manual Page For This App.
      return 'https://sabacan509.github.io/aws_apigw_path_replacer_man/preuse_manual.html';
    },
    urlCredentialManual: () => {
      return 'https://sabacan509.github.io/aws_apigw_path_replacer_man/credential_manual.html';
    },
    footerString: () => {
      return '@GitHub'
    },
    urlGithub: () => {
      return 'https://github.com/sabacan509/aws-apigw-path-replacer'
    }
  },
  actions: {
  }
})
