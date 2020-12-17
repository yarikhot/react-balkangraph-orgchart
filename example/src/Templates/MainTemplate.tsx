import React from 'react'

import OrgChart from 'react-balkangraph-orgchart'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { nodes } from '../constants'

const scope = { OrgChart, nodes }

const code = `
<OrgChart
  onCardClick={(object) => console.log(object)}
  nodes={nodes}
  className='org-chart-container'
  id='my-custom-id-2'
  config={{
    nodeBinding: { 
      img_0: "avatar",
      field_0: "name",
      field_1: "role"
     }
  }}
/>
`

const MainTemplate = () => (
  <LiveProvider code={code} scope={scope}>
    <LiveEditor className='live-editor' />
    <LiveError />
    <LivePreview className='live-preview' />
  </LiveProvider>
)

export default MainTemplate
