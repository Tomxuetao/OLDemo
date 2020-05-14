import { getWidth, getTopLeft, applyTransform } from 'ol/extent'
import WMTS from 'ol/tilegrid/WMTS'
import { WMTS as WMTSSource } from 'ol/source'
import TileLayer from 'ol/layer/Tile'
import { get as getProjection, getTransform } from 'ol/proj'

/**
 * @description 获得一个OpenLayers框架下的ol/layer/Tile类型天地图图层
 * @param {options} Object 初始化参数
 * @param {options.type} String 与官方名称相同的图层类型
 * @param {options.proj} String 与官方名称相同的投影类型
 * @param {options.key} String 开发者秘钥
 */
export function getTiandituLayer (options) {
  const layers = {
    ibo: 'ibo',
    cta: 'cta',
    ter: 'ter',
    cia: 'cia',
    img: 'img',
    cva: 'cva',
    vec: 'vec'
  }
  const projs = {
    4490: 'EPSG:4490',
    900913: 'EPSG:900913'
  }
  const matrixSets = {
    c: 'c',
    w: 'w'
  }
  const projection = getProjection(projs[options.proj])
  const projectionExtent = projection.getExtent()
  const origin = projectionExtent ? getTopLeft(projectionExtent) : [-180, 90]
  const fromLonLat = getTransform('EPSG:4326', projection)
  const width = projectionExtent ? getWidth(projectionExtent) : getWidth(applyTransform([-180, -90, 180, 90], fromLonLat))
  const resolutions = []
  const matrixIds = []
  for (let z = 1; z < 19; z++) {
    resolutions[z] = width / (256 * Math.pow(2, z))
    matrixIds[z] = z
  }

  return new TileLayer({
    source: new WMTSSource({
      url: 'http://t0.tianditu.gov.cn/' + layers[options.type] + '_' + matrixSets[options.proj] + '/wmts?tk=' + options.key,
      layer: layers[options.type],
      version: '1.0.0',
      matrixSet: matrixSets[options.proj],
      format: 'tiles',
      projection: projection,
      requestEncoding: 'KVP',
      style: 'default',
      tileGrid: new WMTS({
        origin: origin,
        resolutions: resolutions,
        matrixIds: matrixIds
      })
    })
  })
}
