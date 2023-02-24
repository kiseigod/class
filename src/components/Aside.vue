<template>
   <el-menu 
   default-active="1-4-1" 
   class="el-menu-vertical-demo" 
   background-color="rgb(250, 217, 223)"
   text-color="black"
   active-text-color="#ffd04b"
   :collapse="isCollapse"
   >
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item :index="item.path + ''" v-for="item in noChilden" :key="item.path" @click="clickMenu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span> 
    </el-menu-item>
    <el-submenu :index="item.path + ''" v-for="item in hasChilden" :key="item.path" >
        <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path" >
            <el-menu-item :index="`${subIndex}-${subIndex}`" @click="clickMenu(subItem)">
              <i :class="'el-icon-' + subItem.icon"></i>
              {{subItem.label}}
            </el-menu-item>
        </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: []
    };
  },
  computed: {
    noChilden() {
      return this.asyncMenu.filter(item => !item.children)
    },
    hasChilden() {
        return this.asyncMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({
          name:item.name
      })
        this.$store.commit('selectMenu',item)
      }
  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
    h3{
      color: rgb(12, 10, 10);
      text-align: center;
      line-height: 60px;
    }
  }
</style>
