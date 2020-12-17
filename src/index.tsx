import React, { Component, FunctionComponent, ReactElement } from 'react'
import ReactDOMServer from 'react-dom/server'
import OrgChart from '@balkangraph/orgchart.js'
import isEqual from 'lodash.isequal'

import styles from './styles.module.css'

interface NodeType {
  id: string | number
  pid: string | number
  node: string
  [key: string]: string | number
}
interface CardProps {
  event: object
  node: object
}
interface OrgChartProps {
  defaultTemplate?: string
  onCardClick?: (prop: CardProps) => void
  nodes: Array<NodeType>
  zoomOutIcon?: string
  zoomInIcon?: string
  config?: object
  id?: string
  disableNodeMenuButton?: boolean
  className?: string
  nodeHeight?: number
  nodeWidth?: number
  customTemplate?: boolean
}

interface ForeignObjectProps {
  width?: number
  height?: number
  className?: string
  children: any
}

interface GetNodeType {
  component: ReactElement
  width: number
  height: number
}

class OrgChartWrapper extends Component<OrgChartProps> {
  private divRef = React.createRef<HTMLParagraphElement>()

  componentDidMount() {
    const {
      defaultTemplate = 'ula',
      onCardClick,
      nodes = [],
      customTemplate,
      zoomOutIcon,
      zoomInIcon,
      config,
      disableNodeMenuButton,
      nodeHeight,
      nodeWidth
    } = this.props
    const template =
      OrgChart.templates[defaultTemplate] || OrgChart.templates.ula
    OrgChart.templates.customTemplate = { ...template }

    if (disableNodeMenuButton) {
      OrgChart.templates.customTemplate.nodeMenuButton = '' // reduce three dots in bottom right corner
    }

    if (customTemplate) {
      OrgChart.templates.customTemplate.size = [nodeWidth, nodeHeight]
    }

    if (customTemplate) {
      OrgChart.templates.customTemplate.node = '{val}'
    }

    if (zoomOutIcon) {
      //@ts-ignore
      OrgChart.toolbarUI.zoomOutIcon = zoomOutIcon
    }

    if (zoomInIcon) {
      //@ts-ignore
      OrgChart.toolbarUI.zoomInIcon = zoomInIcon
    }

    //@ts-ignore
    this.chart = new OrgChart(this.divRef.current, {
      toolbar: {
        zoom: true
      },
      lazyLoading: true,
      nodes: nodes,
      zoom: {
        speed: 50
      },
      ...(customTemplate && {
        nodeMenu: undefined,
        menu: undefined,
        enableSearch: false
      }),
      ...config,
      template: 'customTemplate'
    })

    //@ts-ignore
    this.chart.on('click', (sender, args: CardProps) => {
      if (onCardClick) {
        onCardClick(args)
      }

      return false
    })
  }

  shouldComponentUpdate = (nextProps: OrgChartProps) => {
    return !isEqual(nextProps.nodes, this.props.nodes)
  }

  componentDidUpdate = (prevProps: OrgChartProps) => {
    if (!isEqual(prevProps.nodes, this.props.nodes)) {
      if (
        !prevProps.nodes.every(
          ({ id }: NodeType, index) => this.props.nodes[index]?.id === id
        )
      ) {
        //@ts-ignore
        this.chart.load(this.props.nodes)
      } else {
        const newNode = this.props.nodes.find(
          (node, index) => !isEqual(node, prevProps.nodes[index])
        )

        //@ts-ignore
        this.chart.updateNode(newNode)
      }
    }
  }

  render() {
    const { id = 'tree', className = '' } = this.props
    return <div id={id} ref={this.divRef} className={className} />
  }
}

const SvgForeignObject: FunctionComponent<ForeignObjectProps> = ({
  width,
  height,
  children
}) => (
  <svg xmlns='http://www.w3.org/2000/svg'>
    <foreignObject x={0} y={0} width={width} height={height}>
      <div className={styles.node}>{children}</div>
    </foreignObject>
  </svg>
)

const getHtmlFromReact = (component: ReactElement) =>
  ReactDOMServer.renderToString(component)

const getNode = ({ component, width, height }: GetNodeType) =>
  getHtmlFromReact(
    <SvgForeignObject width={width} height={height}>
      {component}
    </SvgForeignObject>
  )

export { OrgChart as OrgChartConfig, getNode }
export default OrgChartWrapper
