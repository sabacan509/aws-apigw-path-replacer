<template>
  <div>
    <div>
      <div>
        <div class="exp">
          1. Let's create "IAM user"(having AmazonAPIGatewayAdministrator previredge)!
        </div>
        <a v-bind:href="this.$store.getters.urlIAMManual" target="_blank">Simple procedure</a><br/>
        <a v-bind:href="this.$store.getters.urlIAM" target="_blank">Goto AWS Console</a>
      </div>
      <div class="spacer"/>
      <div>
        <transition>
          <div class="exp" v-bind:class="{'warn-style': !profileExists}">
            2. Check AWS credentials profile
            <span class="err-text" style="margin-left: 10px" v-if="!this.profileExists">* Please correct</span>
          </div>
        </transition>
        <div v-if="this.profileExists">Profile check OK</div>
        <div v-if="this.messageForProfileCheck">
          {{messageForProfileCheck}}<br/>
          <a v-bind:href="this.$store.getters.urlCredentialManual" target="_blank">Set AWS Profile [aws_apigw_path_replacer]</a>
        </div>
      </div>
      <div class="spacer"/>
      <div>
        <transition>
          <div class="exp" v-bind:class="{'warn-style': !validRegion}">
            3. Set your AWS region and Login.
            <span class="err-text" style="margin-left: 10px" v-if="!this.validRegion">* Please correct</span>
          </div>
        </transition>
        <div v-if="this.messageForValidRegionCheck">
          {{messageForValidRegionCheck}}
        </div>
      </div>
      <div class="entry-layout">
        <p>
          Region:
        </p>
        <input type="text" id="region_id" class="" placeholder="ap-northeast-1" ref="regionId" v-on:change="updateState"/>
      </div>

      <div style="text-align: center; width:320px">
        <div style="height:1rem">&nbsp;</div>
        <button v-on:click="login" class="lg-button" v-bind:disabled="loginDisable">Login</button>
      </div>
      <div>{{resp}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    resp: String
  },
  data: function() {
    return {
      profileExists: true,
      validRegion: true,
      messageForProfileCheck: "",
      messageForValidRegionCheck: "",
      regionId: "",
      loginDisable: true
    }
  },
  created: function() {
    this.profileCheck();
  },
  methods: {
    updateState: function() {
      let regionId = "";
      if (this.$refs.regionId) {
        regionId = this.$refs.regionId.value;
      }
      this.loginDisable = !(this.profileExists && regionId.length > 0);
    },

    profileCheck: function() {
      axios.get('/profile-check').then((response) => {
        let jsonData = response.data;
        if (jsonData['error']) {
          this.profileExists = false;
          this.messageForProfileCheck = jsonData['error'];
        }
        else {
          this.profileExists = true;
          this.messageForProfileCheck = "";
        }
      }, (error) => {
        this.profileExists = false;
        console.log(error);
        this.messageForProfileCheck = "Connection Error. Please check express server status. ";
      });
    },

    login: function() {
      let regionId = this.$refs.regionId.value;
      this.$store.state.regionId = regionId;

      axios.get('/apiget?regionId=' + this.$store.state.regionId).then((response) => {
        let jsonData = response.data;

        let apiList = [];
        for (let i=0; i < jsonData.items.length; i++) {
          let item = jsonData.items[i];
          apiList.push(item);
        }
        this.$store.state.apiList = apiList;
        if (apiList.length > 0) {
          this.$store.state.loginFlg = true;
        }
        
        this.validRegion = true;
        this.messageForValidRegionCheck = "";

        this.$router.push('pathEditor');

      }, (error) => {
        console.log(error);
        this.validRegion = false;
        this.messageForValidRegionCheck = "Region error or incorrect credential!";
      });
    }
  }
}
</script>

<style scoped>
  p {
    width: 12rem;
  }
  div {
    text-align: left;
  }
  .exp {
    background-color: #eee;
    width: 100%;
    margin-bottom: 0.2rem;
  }
  .warn-style {
    background-color: #fcc;
  }
  .err-text {
    color: #ff0000;
  }
  .entry-layout {
    display: flex;
    flex-direction: row;
  }
  .long-input {
    width: 30rem;
    max-width: 320px;
  }

</style>