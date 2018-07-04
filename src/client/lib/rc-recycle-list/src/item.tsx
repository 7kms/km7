import * as React from "react"
import { findDOMNode } from 'react-dom';
import { Projector } from "./projector"

export type Props = {
  item: any,
  itemIndex: number,
  onRenderCell: (item?: any, index?: number) => React.ReactNode
  upperPlaceholderHeight: number,
  needAdjustment: boolean
  projector: Projector
}

export class Item extends React.Component<Props> {
  public dom: Element
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.needAdjustment) {
      this.setCache(nextProps, nextProps.itemIndex)
    }
  }

  public shouldComponentUpdate(nextProps: Props) {
    return this.props.itemIndex !== nextProps.itemIndex ? true : false
  }

  public componentDidMount() {
    this.dom = findDOMNode(this);
    let index = String(this.props.itemIndex)
    this.setCache(this.props, this.props.itemIndex)
  }
  // public render() {
  //   return <div ref={div => this.dom = div!}>
  //     {this.props.onRenderCell(this.props.item, this.props.itemIndex)}
  //   </div>
    
  // }
  render(){
    return this.props.onRenderCell(this.props.item, this.props.itemIndex)
  }

  public setCache = (props: Props, itemIndex: number) => {
    const { projector, upperPlaceholderHeight, needAdjustment } = props
    const cachedItemRect = projector.cachedItemRect
    const curItem = cachedItemRect[itemIndex]
    if(curItem && !needAdjustment){
      return;
    }
    const prevItem = cachedItemRect[itemIndex - 1]
    const rect = this.dom.getBoundingClientRect()
    // console.log(cachedItemRect.length,itemIndex)
    // if(cachedItemRect.length != itemIndex){
    //   console.log(JSON.stringify(projector.cachedItemRect))
    // }
    if (prevItem) {
      // if previous item exists, use prevItem.bottom as the upperHeight
      const bottom = prevItem.bottom + rect.height
      const top = prevItem.bottom
      cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height }
    } else {
      // if previous item doesn't exist, it's the first item, so upperHeight equals upperPlaceholderHeight
      const bottom = upperPlaceholderHeight + rect.height
      const top = upperPlaceholderHeight
      cachedItemRect[itemIndex] = { index: itemIndex, top, bottom, height: rect.height }
    }
  }
}

