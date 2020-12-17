# react-balkangraph-orgchart

> A react wrapper for balkangraph-orgchart

[![NPM](https://img.shields.io/npm/v/react-balkangraph-orgchart.svg)](https://www.npmjs.com/package/react-balkangraph-orgchart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-balkangraph-orgchart
```

## Usage with default template

```tsx
import React, { Component } from 'react'

import MyComponent from 'react-balkangraph-orgchart'
import 'react-balkangraph-orgchart/dist/index.css'

import avatar from 'src/assets/avatar.svg'

const nodes = [{ id: 1, name: 'Andriy', pid: 0, avatar, role: 'CEO' },
  { id: 2, name: 'Yarik', pid: 1, avatar, role: 'Developer' },
  { id: 3, name: 'Sasha', pid: 1, avatar, role: 'Developer' },
  { id: 4, name: 'Oleh', pid: 1, avatar, role: 'Designer' }]

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
}
```
## Usage with custom template

For getting your custom node you should use the `getNode` function 
```tsx 
getNode({ component, width, height })

types = {
  component: ReactElement
  width: number
  height: number
}
```

```tsx
import React, { Component } from 'react'

import MyComponent from 'react-balkangraph-orgchart'
import 'react-balkangraph-orgchart/dist/index.css'

import avatar from 'src/assets/avatar.svg'

const nodes = [{ id: 1, name: 'Andriy', pid: 0, avatar, role: 'CEO' },
  { id: 2, name: 'Yarik', pid: 1, avatar, role: 'Developer' },
  { id: 3, name: 'Sasha', pid: 1, avatar, role: 'Developer' },
  { id: 4, name: 'Oleh', pid: 1, avatar, role: 'Designer' }]

const nodeSize = { height: 142, width: 348 }

<OrgChart
  customTemplate
  onCardClick={(object) => console.log(object)}
  nodes={nodes.map(({ id, pid, name, avatar, role }) => ({
    id,
    pid,
    node: getNode({
      ...nodeSize,
      component: (
        <div className='org-chart-item'>
          <img src={avatar} alt='' className='tmlt-img' />
          <div className='tmlt-container'>
            <h1 className='tmlt-name'>{name}</h1>
            <span className='tmlt-role'>{role}</span>
          </div>
        </div>
      )
    })
  }))}
  className='org-chart-container'
  id='my-custom-id-1'
  nodeHeight={nodeSize.height}
  nodeWidth={nodeSize.width}
  config={{
    nodeBinding: { node: 'node' },
    mouseScrool: OrgChartConfig.action.ctrlZoom
  }}
/>
}
```

## OrgChart Props

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
| defaultTemplate |  string  |                 ula                  | The name of default UI view (related with https://balkangraph.com/OrgChartJS/Demos/Templates) |
|   onCardClick   | function |                   -                  | Callback for click event on card item |
|      nodes      |  array   |                   []                 | List of nodes |
|   zoomOutIcon   |  string  |                   -                  | Svg minus button in string format |
|   zoomInIcon    |  string  |                   -                  | Svg plus button in string format |
|     config      |  object  |                   {}                 | The configuration of org chart (second argument for ```tsx new OrgChart(domNode, config) ```, https://balkangraph.com/OrgChartJS/Docs/GettingStarted)  |
|       id        |  string  |                tree                  | `id` of org chart wrapper  |
|    className    |  string  |                   -                  | `className` of org chart wrapper  |
|   nodeHeight    |  number  |                   -                  | Height of node (only for custom template) |
|   nodeWidth     |  number  |                   -                  | Width of node (only for custom template)  |
|  customTemplate |  boolean |               false                  | The flag that changes default node to your custom (HTML) node (paste your `react` component to `node` key in nodes object list)  |

## License

MIT © [yarikhot](https://github.com/yarikhot)
