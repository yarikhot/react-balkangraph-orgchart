import React, {
  Component,
  FunctionComponent,
  ReactElement,
  ReactChild
} from 'react'
import ReactDOMServer from 'react-dom/server'
import OrgChart from '@balkangraph/orgchart.js'
import isEqual from 'lodash.isequal'

import styles from './styles.module.css'

import OrgChartModel, {
  NodeModel,
  OrgChartOptions
} from './balkangraph-orgchart'

interface NodeType {
  id: string | number
  pid: string | number
  node: string
  [key: string]: string | number
}
interface CardProps {
  event: object
  node: NodeModel
}
interface OrgChartProps {
  nodes: NodeType[]
  defaultTemplate?: string
  onCardClick?: (prop: CardProps) => void
  zoomOutIcon?: string
  zoomInIcon?: string
  config?: OrgChartOptions
  id?: string
  disableNodeMenuButton?: boolean
  className?: string
  nodeHeight?: number
  nodeWidth?: number
  enabledCustomTemplate?: boolean
}

interface ForeignObjectProps {
  width?: number
  height?: number
  className?: string
  children: ReactChild
}

interface GetNodeType {
  component: ReactElement
  width: number
  height: number
}

class OrgChartWrapper extends Component<OrgChartProps> {
  private divRef = React.createRef<HTMLDivElement>()
  private chart: OrgChartModel

  componentDidMount() {
    if (!this.divRef.current) return
    const {
      defaultTemplate = 'ula',
      onCardClick,
      nodes = [],
      enabledCustomTemplate,
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

    if (enabledCustomTemplate) {
      OrgChart.templates.customTemplate.size = [nodeWidth, nodeHeight]
    }

    if (enabledCustomTemplate) {
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

    this.chart = new OrgChart(this.divRef.current, {
      toolbar: {
        zoom: true
      },
      lazyLoading: true,
      nodes: nodes,
      zoom: {
        speed: 50
      },
      ...(enabledCustomTemplate && {
        nodeMenu: undefined,
        menu: undefined,
        enableSearch: false
      }),
      ...config,
      template: 'customTemplate'
    })

    this.chart.on('click', (sender: object, args: CardProps) => {
      if (onCardClick) onCardClick(args)

      return false
    })
  }

  shouldComponentUpdate = (nextProps: OrgChartProps) => {
    return !isEqual(nextProps.nodes, this.props.nodes)
  }

  componentDidUpdate = (prevProps: OrgChartProps) => {
    if (isEqual(prevProps.nodes, this.props.nodes)) return

    if (
      !prevProps.nodes.every(
        ({ id }: NodeType, index) => this.props.nodes[index]?.id === id
      )
    ) {
      this.chart.load(this.props.nodes)
    } else {
      const newNode = this.props.nodes.find(
        (node: NodeType, index) => !isEqual(node, prevProps.nodes[index])
      )

      if (newNode) this.chart.updateNode(newNode)
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

const getNode = ({ component, width, height }: GetNodeType): string =>
  ReactDOMServer.renderToString(
    <SvgForeignObject width={width} height={height}>
      {component}
    </SvgForeignObject>
  )

export { OrgChart as OrgChartConfig, getNode }
export default OrgChartWrapper
