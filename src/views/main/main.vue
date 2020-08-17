<template>
    <div class="site-wrapper" :class="{ 'site-sidebar--fold': sidebarFold }">
        <template>
            <main-navbar></main-navbar>
            <main-sidebar></main-sidebar>
            <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
                <main-vuemap></main-vuemap>
                <main-content v-if="!$store.state.common.contentIsNeedRefresh"></main-content>
            </div>
        </template>
    </div>
</template>

<script>
import MainNavbar from './main-navbar'
import MainSidebar from './main-sidebar'
import MainContent from './main-content'
import MainVuemap from './main-vuemap'

export default {
  provide () {
    return {
      // 刷新
      refresh () {
        this.$store.commit('common/updateContentIsNeedRefresh', true)
        this.$nextTick(() => {
          this.$store.commit('common/updateContentIsNeedRefresh', false)
        })
      }
    }
  },
  components: {
    MainNavbar,
    MainSidebar,
    MainContent,
    MainVuemap
  },

  beforeCreate () {
    console.log('父组件 ---> beforeCreate')
  },

  created () {
    console.log('父组件 ---> created')
  },

  beforeUpdate () {
    console.log('父组件 ---> beforeUpdate')
  },

  updated () {
    console.log('父组件 ---> updated')
  },

  beforeMount () {
    console.log('父组件 ---> beforeMount')
  },

  beforeDestroy () {
    console.log('父组件 ---> beforeDestroy')
  },

  destroyed () {
    console.log('父组件 ---> destroyed')
  },

  mounted () {
    console.log('父组件 ---> mounted')
    this.resetDocumentClientHeightAndWidth()
  },
  computed: {
    documentClientHeight: {
      get () {
        return this.$store.state.common.documentClientHeight
      },
      set (val) {
        this.$store.commit('common/updateDocumentClientHeight', val)
      }
    },
    sidebarFold: {
      get () {
        return this.$store.state.common.sidebarFold
      }
    }
  },
  methods: {
    resetDocumentClientHeightAndWidth () {
      this.documentClientHeight = document.documentElement.clientHeight
      window.onresize = () => {
        this.documentClientHeight = document.documentElement.clientHeight
      }
    }
  }
}
</script>
