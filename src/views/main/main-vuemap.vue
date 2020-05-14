<template>
    <div id="map" :style="{height: documentClientHeight - 50 + 'px'}"></div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { defaults as defaultControl } from 'ol/control'
import { transform } from 'ol/proj'

export default {
  name: 'main-vuemap',
  computed: {
    documentClientHeight: {
      get () {
        return this.$store.state.common.documentClientHeight
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initMapHandle()
    })
  },

  methods: {
    initMapHandle () {
      this.$root.globalMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            name: 'vector',
            source: new XYZ({
              url: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=0e5a7dcc3e949b960e26ddb66165eff8'
            })
          }),
          new TileLayer({
            name: 'label',
            source: new XYZ({
              url: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=0e5a7dcc3e949b960e26ddb66165eff8'
            })
          })
        ],
        view: new View({
          center: transform([114.641628, 34.070339], 'EPSG:4326', 'EPSG:3857'),
          zoom: 4,
          maxZoom: 18,
          minZoom: 4,
          projection: 'EPSG:3857'
        }),
        controls: defaultControl({
          attribution: false,
          zoom: false,
          rotate: false
        })
      })
    }
  }
}
</script>
