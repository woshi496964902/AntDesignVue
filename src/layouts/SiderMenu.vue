<template>
  <div style="width:256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      :mode="menuMode"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String
    },
    menuMode: {
      type: String
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    const menuData = this.getMenuList(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuList(data) {
      const menuData = [];
      data.map(item => {
        if (item.name && !item.hideInMenu) {
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenMenu) {
            newItem.children = this.getMenuList(item.children);
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenMenu &&
          item.children
        ) {
          menuData.push(...this.getMenuList(item.children));
        }
      });
      return menuData;
    }
  }
};
</script>
<style scoped></style>
