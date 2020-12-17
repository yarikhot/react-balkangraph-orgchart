import React from 'react'

import OrgChart, { getNode, OrgChartConfig } from 'react-balkangraph-orgchart'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { nodes } from '../constants'

const scope = { OrgChart, getNode, nodes, OrgChartConfig }

const code = `
 <OrgChart
    onCardClick={(object) => console.log(object)}
    nodes={nodes}
    className='org-chart-container'
    id='my-custom-id-1'
    config={{
      toolbar: {
        zoom: true,
      },
      lazyLoading: true,
      align: OrgChartConfig.ORIENTATION,
      showXScroll: OrgChartConfig.scroll.visible,
      showYScroll: OrgChartConfig.scroll.visible,
      mouseScrool: OrgChartConfig.action.ctrlZoom,
      orientation: OrgChartConfig.orientation.left_top,
      scaleInitial: 0.8,
      enableSearch: false,
      nodeMenu: false,
      columns: 100,
      zoom: {
        speed: 50,
      },
      collapse: {
        level: 1,
        allChildren: false,
      },
      nodeBinding: { 
        img_0: "avatar",
        field_0: "name",
        field_1: "role"
       }
    }}
  />
`

const CustomConfig = () => (
  <LiveProvider code={code} scope={scope}>
    <LiveEditor className='live-editor' />
    <LiveError />
    <LivePreview className='live-preview' />
  </LiveProvider>
)

export default CustomConfig
