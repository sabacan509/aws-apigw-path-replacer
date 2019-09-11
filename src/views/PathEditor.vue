<template>
  <div>
    <center>
      <router-link to="/">Logout</router-link> |
      <router-link to="/howto">How to use</router-link>
    </center>
    <div>
      <div class="def-header">
        Selected Region: <br/>
        <input type="text" v-bind:value="$store.state.regionId" readonly/>
        <span class="reload" v-on:click="reloadAPIs"><font-awesome-icon icon="redo" /><font class="smtx">reload</font></span>
      </div>
      <!-- API List Area -->
      <div class="left-pain">
        <div class="spacer"/>
        <div class="def-header">
          API List:
        </div>
        <div v-for="(item, index) in $store.state.apiList" :key="index">
          <div v-on:click="selectAPI(item.id, item.name)" class="API-selector" v-bind:class="{'selected-api' : isSelect(item.id)}">{{item.name}}</div>
        </div>
      </div>
      <!-- Resource Display Area -->
      <div class="right-pain" v-on:dragenter="releaseDragInfo()">
        <h2>{{selectedAPIName}}</h2>
        <ul id="resouce-pain">
          <TreeItem
            class="item"
            :item="this.resourceTree"
            @select-resource="selectResource"
            @drag-handler="dragHandler"
            @drag-over-handler="dragOverHandler"
            @drag-end-handler="dragEndHandler"
          ></TreeItem>
        </ul>
      </div>
      <div style="clear:both">&nbsp;</div>
    </div>
    <Drawer :direction="'right'" :exist="true" ref="RscDrawer">
      <div style="text-align: center">
        <div>Resource: {{selectedResource.pathPart}}</div>
        <div>ID: {{selectedResource.id}}</div>
        <hr/>
        <input type="text" v-model.trim="pathPartInputCtrl">
        <br/>
        <br/>
        <button v-on:click="updateResourceName">Change Resouce Name</button>
      </div>
    </Drawer>
    <ModalDialog v-if="this.showModal" @ok="selectOK" @close="showModal = false">
      <h3 slot="header">Change Resource Position</h3>
    </ModalDialog>
  </div>
</template>

<script>
import axios from 'axios'
import TreeItem from '@/components/TreeItem.vue'
import Drawer from '@/components/Drawer.vue'
import ModalDialog from '@/components/ModalDialog.vue'

export default {
  name: 'PathEditor',
  components: {
    TreeItem,
    Drawer,
    ModalDialog
  },
  data: function() {
    return {
      selectedApiId: String,
      selectedAPIName: '',
      resourceTree: Object,
      selectedResource: {
        id: String,
        name: String
      },
      pathPartInput: '',
      recipientItem: Object,
      draggingItem: Object,
      showModal: Boolean,
    }
  },
  created: function(){
    this.footer1 = "";
    this.resourceTree = {};
    this.recipientItem = null;
    this.draggingItem = null;
    this.showModal = false;
  },
  computed: {
    pathPartInputCtrl: {
      get () {
        return this.pathPartInput
      },
      set (value) {
        this.pathPartInput = value
      }
    }
  },
  methods: {
    selectResource: function(item) {
      if(this.$refs.RscDrawer.active){
				this.$refs.RscDrawer.close();
			}else{
        updateTreeState(this.resourceTree, "select", item);
        this.selectedResource.id = item.id;
        this.selectedResource.pathPart = item.pathPart;
        this.pathPartInput = item.pathPart;
				this.$refs.RscDrawer.open();
			}
    },

    selectAPI: function(apiId, apiName) {
      // console.log("apiID: " + apiId);
      let q = "regionId=" + this.$store.state.regionId;
      q += "&restApiId=" + apiId;
      axios.get('/resources?' + q).then((response) => {
        let jsonData = response.data;
        let treeData = createResourceTree(jsonData.items);
        this.resourceTree = treeData;
        this.selectedApiId = apiId;
        this.selectedAPIName = apiName;
      }, (error) => {
        console.log(error);
        alert("Date Get Error");
      });
    },

    isSelect: function(apiId) {
      return this.selectedApiId == apiId;
    },

    reloadAPIs: function() {
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
        
        this.selectedAPIName = '';
        this.resourceTree = {};
        // this.$router.replace({path: this.$router.currentRoute.path});
        
      }, (error) => {
        console.log(error);
        alert("Login Error!");
      });
    },

    // rename resource name, the trigger is resource click
    updateResourceName: function() {
      let resourceId = this.selectedResource.id;

      let q = "regionId=" + this.$store.state.regionId;
      q += "&restApiId=" + this.selectedApiId;
      q += "&resourceId=" + resourceId;
      q += "&op=replace";
      q += "&path=/pathPart";
      q += "&value=" + this.pathPartInput;
      axios.put('/resources/' + resourceId + '?' + q).then((response) => {
        console.log(response);
        this.selectAPI(this.selectedApiId);
				this.$refs.RscDrawer.close();
      }, (error) => {
        console.log(error);
        alert("Error");
      });
    },

    // replace resource position, the trigger is drag & drop 
    replaceResourcePosition: function() {
      let resourceId = this.draggingItem.id;
      let parentId = this.recipientItem.id;

      let q = "regionId=" + this.$store.state.regionId;
      q += "&restApiId=" + this.selectedApiId;
      q += "&resourceId=" + resourceId;
      q += "&op=replace";
      q += "&path=/parentId";
      q += "&value=" + parentId;
      axios.put('/resources/' + resourceId + '?' + q).then((response) => {
        this.selectAPI(this.selectedApiId);
				this.$refs.RscDrawer.close();
      }, (error) => {
        console.log(error);
        alert("Error");
      });
    },

    dragHandler: function(draggingItem) {
      this.draggingItem = draggingItem;
    },
    dragOverHandler: function(recipientItem) {
      this.recipientItem = recipientItem;
    },
    dragEndHandler: function() {
      if (this.draggingItem && this.recipientItem) {
        if (this.draggingItem != this.recipientItem) {
          this.showModal = true;
        }
      }
    },
    releaseDragInfo: function() {
      this.recipientItem = null;
    },
    selectOK: function() {
      this.showModal = false;
      this.replaceResourcePosition();
    }

  }
}

function createResourceTree(listdata)
{
  let topOfTree = null;
  for (let i=0; i < listdata.length; i++) {
    let rsc = listdata[i];
    if (rsc.path == '/') {
      topOfTree = {
        id: rsc.id,
        pathPart: rsc.path,
        path: rsc.path,
        selectFlg: false,
        children: []
      };
    }
  }
  buildTree(topOfTree, listdata);
  return topOfTree;
}

function buildTree(obj, listdata)
{
  let parentId = obj.id;
  for (let i=0; i < listdata.length; i++) {
    let rsc = listdata[i];
    if (!('parentId' in rsc)) continue;
    if (rsc.parentId == parentId) {
      let child = {
        id: rsc.id,
        pathPart: rsc.pathPart,
        path: rsc.path,
        selectFlg: false,
        children: []
      };
      obj.children.push(child);
      buildTree(child, listdata);
    }
  }
}

function updateTreeState(obj, type, targetItem)
{
  if (obj == targetItem) {
    if (type == "select") {
      obj.selectFlg = true;
    }
  } else {
    obj.selectFlg = false;
  }
  for (let i=0; i < obj.children.length; i++) {
    updateTreeState(obj.children[i], type, targetItem);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  color: #eee;
  background-color: #666;
  border-radius: 5px;
  font-size: 14pt;
  padding: 8px;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.left-pain {
  float: left;
  border: 1 solid #666;
  min-width: 20rem;
}
.right-pain {
  float: left;
  padding-left: 10px;
}

.def-header {
  text-align: left;
  font-size: 1.4rem;
}
.API-selector {
  font-size: 1.6rem;
  background-color: #eee;
  color: #666;
  margin: 5px 0px 5px 0px;
  padding: 5px 0px 5px 0px;
  text-align: center;
  width: 20rem;
}
.selected-api {
  background-color: #ffcccc;
}
.reload {
  cursor: pointer;
  color: #9966ff;
  margin-left: 10px;
}
</style>
