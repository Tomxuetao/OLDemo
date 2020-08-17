<template>
  <div id="map" :style="{height: documentClientHeight - 50 + 'px'}">
    <div id="popup" class="popup-wrapper">
      <div class="popup-content">
        <div class="popup-left">
          <i class="el-icon-circle-plus-outline"></i>
          <span style="margin-left: 4px">添加信息</span>
        </div>
        <div class="popup-right">
          <i class="el-icon-s-promotion"></i>
          <span style="margin-left: 4px">我要导航</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { defaults as defaultControl } from 'ol/control'
import { GeoJSON } from 'ol/format'
import { Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import { Stroke, Style, Icon } from 'ol/style'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Overlay from 'ol/Overlay'
import pointIcon from '@/assets/images/point-icon.png'

export default {
  name: 'main-vuemap',
  data () {
    return {
      globalOverlay: null
    }
  },
  computed: {
    documentClientHeight: {
      get () {
        return this.$store.state.common.documentClientHeight
      }
    }
  },

  beforeCreate () {
    console.log('子组件 ---> beforeCreate')
  },

  created () {
    console.log('子组件 ---> created')
  },

  beforeUpdate () {
    console.log('子组件 ---> beforeUpdate')
  },

  updated () {
    console.log('子组件 ---> updated')
  },

  beforeMount () {
    console.log('子组件 ---> beforeMount')
  },

  beforeDestroy () {
    console.log('子组件 ---> beforeDestroy')
  },

  destroyed () {
    console.log('子组件 ---> destroyed')
  },

  mounted () {
    console.log('子组件 ---> mounted')
    this.$nextTick(() => {
      this.initMapHandle()
      this.loadGeoJsonHandle()
      this.loadFeaturesHandle()
    })
  },

  methods: {
    // 添加天地图影像地图、以及对应的标注
    initMapHandle () {
      this.$root.globalMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            name: 'label',
            source: new XYZ({
              url: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=0e5a7dcc3e949b960e26ddb66165eff8'
            })
          }),
          new TileLayer({
            name: 'vector',
            source: new XYZ({
              url: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=0e5a7dcc3e949b960e26ddb66165eff8'
            })
          })
        ],
        view: new View({
          center: [120.27, 30.79],
          zoom: 18,
          maxZoom: 18,
          minZoom: 4,
          projection: 'EPSG:4326'
        }),
        controls: defaultControl({
          attribution: false,
          zoom: false,
          rotate: false
        })
      })
      this.globalOverlay = new Overlay({
        element: document.getElementById('popup'),
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      this.$root.globalMap.addOverlay(this.globalOverlay)
      this.$root.globalMap.on('pointermove', evt => {
        this.$root.globalMap.getTargetElement().style.cursor = this.$root.globalMap.hasFeatureAtPixel(evt.pixel) ? 'pointer' : ''
      })
    },

    // 加载矢量数据 -- 1：地图加载出来的代码方式
    loadGeoJsonHandle (url = 'http://121.43.146.20:6350/geoserver/wfs', layerName = 'xian_shp:demo_data') {
      const vectorSource = new VectorSource({
        format: new GeoJSON(),
        url: function (extent) {
          return (
            'http://121.43.146.20:6350/geoserver/wfs?service=WFS&' +
                'version=1.1.0&request=GetFeature&typename=xian_shp:demo_data&' +
                'outputFormat=application/json&srsname=EPSG:4326&' +
                'bbox=' +
                extent.join(',') +
                ',EPSG:4326'
          )
        },
        strategy: bboxStrategy
      })
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: '#fe0000',
            width: 1.5
          })
        })
      })
      this.$root.globalMap.addLayer(vectorLayer)
    },

    // 加载自有数据实现点击事件 2：加载已创建的坐标点的代码方式；
    loadFeaturesHandle () {
      const dataArrayList = [
        [120.235691, 30.739334],
        [120.221570, 30.717561],
        [120.21444120503466, 30.672902891154],
        [120.23536898531381, 30.739556717707547],
        [120.22121557685341, 30.717720550132302],
        [120.21405989183191, 30.672801736468443],
        [120.23407951139716, 30.737467782319566],
        [120.2253084385289, 30.723724296464127],
        [120.21505180588683, 30.670096493370014],
        [120.22001435218853, 30.657728470565928],
        [120.22832279161061, 30.729087108553774],
        [120.21011782006491, 30.69670431676474],
        [120.21830032103506, 30.661790427453877],
        [120.2963736868111, 30.807814778969316],
        [120.26787170265007, 30.781977575886884],
        [120.2948960408329, 30.806414218808705],
        [120.29277359308523, 30.805503939744188],
        [120.3049225863154, 30.81900767526414],
        [120.2982027475523, 30.809421828432225],
        [120.29016048254978, 30.8039559601021],
        [120.28827977068292, 30.80234562608419],
        [120.27714076645184, 30.7934453761915],
        [120.29826883686975, 30.809357180328437],
        [120.29198600324716, 30.804829502548614],
        [120.22105796352328, 30.717459148954664],
        [120.211500753954, 30.70127696464471],
        [120.2114966521498, 30.70126513271091],
        [120.21252085689893, 30.676987829449942],
        [120.26518704519438, 30.777323875991296]
      ]
      const featureArray = []
      dataArrayList.forEach(item => {
        const tempFeature = new Feature({
          geometry: new Point(item),
          // 可以存放一些业务数据
          data: {
            name: '123'
          }
        })
        tempFeature.setStyle(new Style({
          image: new Icon({
            crossOrigin: 'anonymous',
            imgSize: [32, 55],
            anchor: [0.5, 0],
            src: pointIcon
          })
        }))
        featureArray.push(tempFeature)
      })
      const vectorSource = new VectorSource()
      vectorSource.addFeatures(featureArray)
      const vectorLayer = new VectorLayer({
        source: vectorSource
      })

      const customFeature = new Feature()
      // 可以换一个不同颜色图标
      customFeature.setStyle(new Style({
        image: new Icon({
          crossOrigin: 'anonymous',
          imgSize: [32, 55],
          anchor: [0.5, 0],
          src: pointIcon
        })
      }))

      vectorSource.addFeature(customFeature)

      this.$root.globalMap.addLayer(vectorLayer)
      this.$root.globalMap.on('singleclick', event => {
        const { pixel, coordinate } = event
        vectorLayer.getFeatures(pixel).then(features => {
          if (features.length) {
            if (features[0]) {
              const selectedFeature = features[0]
              console.log(selectedFeature)
              this.globalOverlay.setPosition(selectedFeature.getGeometry().getCoordinates())
            }
          } else {
            this.globalOverlay.setPosition(undefined)
            // 点击地图设置图钉
            customFeature.setGeometry(new Point(coordinate))
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 2px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -120px;
  min-width: 240px;

  .popup-content {
    display: flex;
    height: 32px;
    line-height: 32px;
    cursor: pointer;

    .popup-left, .popup-right {
      flex: 1;
      text-align: center;
      font-size: 16px;
      color: rgba(0, 0, 255, 1.0)
    }
  }
}

.popup-wrapper:after, .popup-wrapper:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.popup-wrapper:after {
  border-top-color: white;
  border-width: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.popup-wrapper:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
