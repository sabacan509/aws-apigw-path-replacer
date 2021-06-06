
<template id="item-template">
  <li>
    <div
      v-bind:class="{bold: isFolder, rsc_name: true, highlight: isSelected}"
      v-on:click="select"
      draggable="true"
      v-on:dragstart="dragstart(item, $event)"
      v-on:dragover="dragover(item, $event)"
      v-on:dragend="dragend()"
      >
      {{ item.pathPart }}
    </div>
    <ul>
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        v-bind:key="index"
        v-bind:item="child"
        @select-resource="$emit('select-resource', $event)"
        @drag-handler="$emit('drag-handler', $event)"
        @drag-over-handler="$emit('drag-over-handler', $event)"
        @drag-end-handler="$emit('drag-end-handler', $event)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',

  props: {
    item: Object
  },
  data: function () {
    return {
      selectFlg: false
    }
  },
  computed: {
    // isFolder: function () {
    //   return this.item.children &&
    //     this.item.children.length
    // },
    isSelected: function() {
      return this.item.selectFlg;
    }
  },
  methods: {
    // toggle: function () {
    //   if (this.isFolder) {
    //     this.isOpen = !this.isOpen
    //   }
    // },
    dragstart: function() {
      // console.log("drag: " + this.item.id);
      this.$emit('drag-handler', this.item)
    },
    // dragenter: function(e) {
    //   console.log("drag-enter: " + this.item.id);
    //   this.$emit('drag-enter-handler', this.item)
    // },
    dragover: function() {
      // console.log("drag-over: " + this.item.id);
      this.$emit('drag-over-handler', this.item)
    },
    dragend: function() {
      // console.log("drag-end: " + this.item.id);
      this.$emit('drag-end-handler')
    },
    // dragleave: function(e) {
    //   console.log("drag-leave: " + this.item.id);
    //   this.$emit('drag-leave-handler', this.item)
    // },
    select: function() {
      this.$emit('select-resource', this.item)
    },
    // makeFolder: function () {
    //   if (!this.isFolder) {
    //     this.$emit('make-folder', this.item)
    //     this.isOpen = true
    //   }
    // }
  }
}
</script>

<style scoped>
.rsc_name {
  font-size: 1.4rem;
  text-align: left;
  width: 20rem;
}
.add {
  font-size: 1.4rem;
  text-align: left;
}
.highlight {
  background-color: #99cfff;
}
</style>
