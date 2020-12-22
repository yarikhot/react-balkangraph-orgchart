import React from 'react'

import OrgChart, { getNode, OrgChartConfig } from 'react-balkangraph-orgchart'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { nodes } from '../constants'

const scope = { OrgChart, getNode, nodes, OrgChartConfig }

const code = `
 <OrgChart
    enabledCustomTemplate
    onCardClick={(object) => console.log(object)}
    nodes={nodes.map(({ id, pid, name, avatar, role }) => ({
      id,
      pid,
      node: getNode({
        width: 348,
        height: 142,
        component: <div className="org-chart-item">
        <img src={avatar} alt="" className="tmlt-img"/>
        <div className="tmlt-container">
          <h1 className="tmlt-name">{name}</h1>
          <span className="tmlt-role">{role}</span>
        </div>
      </div>
      })
    }))}
    className='org-chart-container'
    id='my-custom-id-1'
    nodeHeight={142}
    nodeWidth={348}
    config={{
      nodeBinding: { node: 'node' },
      mouseScrool: OrgChartConfig.action.ctrlZoom,
    }}
  />
`

const CustomTemplate = () => (
  <LiveProvider code={code} scope={scope}>
    <LiveEditor className='live-editor' />
    <LiveError />
    <LivePreview className='live-preview' />
  </LiveProvider>
)

export default CustomTemplate
