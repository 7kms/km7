/**
 * Scroller.
 * a component to render data base on the paramater(upperHeight, newItems, underHeight) that received from Projector.
 * scroller also has an adjustment strategy to adjust upperHeight.
 */
import * as React from "react"
import { findDOMNode } from 'react-dom'
import { Projector, Cache } from "./projector"
import { Item } from "./item"
import * as Util from './util'

export type Props<T= {}> = {
  cache?: Cache[],
  containerHeight: number
  itemAverageHeight: number
  className?: string
  items: T[]
  itemKey: string
  initialScrollTop?: number
  loadingItem?: React.ReactNode
  onRenderCell: (item?: T, index?: number) => React.ReactNode
  onDestroy?: (obj:Archive) => void
  archiveObj?: Archive
  onScroll?: (dom: HTMLDivElement) => void
  onEnd?: () => void
  useWindow?: Boolean
}

export type Archive = {
  startIndex: number
  endIndex: number
  underPlaceholderHeight: number
  upperPlaceholderHeight: number
  scrollTop: number
  anchorItem:{
    index: number
    offset: number
  }
}

export type State = {
  projectedItems: any[]
  upperPlaceholderHeight: number
  underPlaceholderHeight: number
}

export class InfiniteScroller extends React.Component<Props, State> {
  public static defaultProps = {
    initialScrollTop: 0,
    onScroll: () => { },
    onEnd: () => { }
  }
  public state: State = { projectedItems: [], underPlaceholderHeight: 0, upperPlaceholderHeight: 0 }
  public divDom: HTMLDivElement | Window
  public upperContentDom: HTMLDivElement
  public needAdjustment = false
  public isAdjusting = false

  private hasBottomTouched = true
  private scrollTop = 0
  private projector: Projector
  private width: number
  private resizing = false
  private needScrollChange = false

  /**
   * tell projector to project while got asynchronous data
   * @param nextProps 
   */
  public componentWillReceiveProps(nextProps: Props) {
    this.hasBottomTouched = false
    this.projector.next(nextProps.items)
  }

  private onresize = () => {
    let newWidth = Util.getClientWidth(this.divDom)
    if(this.state.projectedItems && this.state.projectedItems.length && newWidth !== this.width){
      this.width = newWidth
      this.resizing = true
      this.projector.cachedItemRect.length = 0
      this.needAdjustment = true
      this.isAdjusting = false
      this.setState({})
    }
  }
  public componentDidUpdate() {
    if (this.needAdjustment) {
      if (this.isAdjusting) {
        this.isAdjusting = false
        this.needAdjustment = false
        return
      }
      this.adjustUpperPlaceholderHieght()
    }
    if(this.needScrollChange){
      this.needScrollChange = null;
      Util.setScrollTop(this.divDom,this.props.archiveObj.scrollTop);
    }
  }

  /**
   * first mount: get the native dom
   */
  public componentDidMount() {
    if(this.props.useWindow){
      this.divDom = window;
    }else{
      this.divDom = findDOMNode(this) as HTMLDivElement;
    }
    this.width = Util.getClientWidth(this.divDom);
    this.projector = new Projector(this, this.props.items, this.props.itemAverageHeight, this.props.cache)
    this.projector.subscribe((projectedItems, upperPlaceholderHeight, underPlaceholderHeight, needAdjustment) => {
      if (projectedItems.length && underPlaceholderHeight < Util.getClientHeight(this.divDom) && !this.hasBottomTouched) {
        this.hasBottomTouched = true
        this.props.onEnd!()
      }
      this.needAdjustment = needAdjustment
      this.setState({ projectedItems, upperPlaceholderHeight, underPlaceholderHeight })
    })

    // tell projector to project synchronous data
    if (this.props.items.length > 0) {
      this.hasBottomTouched = false
      if(this.props.archiveObj){
        this.projector.initFromArchive(this.props.archiveObj)
        this.needScrollChange = true;
      }else{
        this.projector.next()
      }
    }else{
      this.props.onEnd!()
    }
    if(this.props.useWindow){
      window.addEventListener('scroll',this.onScroll);
    }else{
      this.divDom.addEventListener('scroll',this.onScroll)
    }
    window.addEventListener("resize", this.onresize);
  }

  componentWillUnmount(){
    let {startIndex,endIndex,anchorItem,scroller:{scrollTop,state:{underPlaceholderHeight,upperPlaceholderHeight}}} = this.projector;
    // console.log(this.projector)
    if(this.props.onDestroy){
      let archiveObj = {startIndex,endIndex,underPlaceholderHeight,upperPlaceholderHeight,anchorItem,scrollTop}
      this.props.onDestroy(archiveObj)
    }
    if(this.props.useWindow){
      window.removeEventListener('scroll',this.onScroll);
    }else{
      this.divDom.removeEventListener('scroll',this.onScroll)
    }
    window.removeEventListener('resize',this.onresize);
  }

  public render() {
    let style = {};
    if(!this.props.useWindow){
      style = { overflow: "scroll" as "scroll", WebkitOverflowScrolling: "touch", overflowAnchor: "none", height: this.props.containerHeight }
    }
    return (
      <div className={this.props.className || ""}  style={style}>
        <div ref={div => this.upperContentDom = div!} style={{ height: this.state.upperPlaceholderHeight }}></div>
        {
          this.state.projectedItems.map((item, index) =>{
          let itemIndex=this.projector.startIndex + index
          return <Item
                  key={this.props.itemKey ? item[this.props.itemKey] : itemIndex}
                  projector={this.projector}
                  item={item}
                  needAdjustment={this.needAdjustment}
                  itemIndex={itemIndex}
                  upperPlaceholderHeight={this.state.upperPlaceholderHeight}
                  onRenderCell={this.props.onRenderCell}
              />
          })
        }
        <div style={{ height: this.state.underPlaceholderHeight }}></div>
        {this.props.loadingItem ? this.props.loadingItem  : null}
      </div>
    )
  }

  /**
   * if upperHeight is guesstimated(needAdjustment = true), we need to adjust upperHeight. this is step:
   * first next. project new sliced items. change needAdjustment to true.
   * first render. tell Item to update cache.
   * first didupdate. adjust upperHeight.
   * second render. update cache upon the correct upperHeight.
   * second didupdate. nothing happeded.
   */
  public adjustUpperPlaceholderHieght() {
    this.isAdjusting = true
    const cachedItemRect = this.projector.cachedItemRect
    const anchor = this.projector.anchorItem
    const cachedAnchorItem = cachedItemRect[anchor.index]
    const startItem = this.projector.cachedItemRect[this.projector.startIndex]
    const finalHeight = this.computeUpperPlaceholderHeight(cachedAnchorItem, startItem.top)
    const upperPlaceholderHeight = startItem.index === 0 ? 0 : finalHeight < 0 ? 0 : finalHeight
    const scrollTop = Util.getScrollTop(this.divDom)

    this.setState({ upperPlaceholderHeight }, () => {
      if (startItem.index > 0) {
        if (this.resizing) {
          // console.log('resizing ========= ',scrollTop - finalHeight)
          const currentAnchor = this.projector.cachedItemRect[this.projector.startIndex + 3]
          const anchorDelta = anchor.offset - currentAnchor.top
          const nextScrollTop = Util.getScrollTop(this.divDom) - anchorDelta
          // keep scrollTop within anchor item.
          if (nextScrollTop < currentAnchor.top) {
            Util.setScrollTop(this.divDom,currentAnchor.top)
          } else if (nextScrollTop > currentAnchor.bottom) {
            Util.setScrollTop(this.divDom,currentAnchor.bottom)
          } else {
            Util.setScrollTop(this.divDom,nextScrollTop)
          }
          this.resizing = false
        } else {
          if (finalHeight < 0) {
            // console.log('setScrollTop ========= ',scrollTop - finalHeight)
            Util.setScrollTop(this.divDom,scrollTop - finalHeight)
          }
        }
      } else {
        if(!this.props.useWindow){
           // https://popmotion.io/blog/20170704-manually-set-scroll-while-ios-momentum-scroll-bounces/
          ((this.divDom as HTMLDivElement).style as any)["-webkit-overflow-scrolling"] = "auto"
          Util.setScrollTop(this.divDom,scrollTop - finalHeight);
          ((this.divDom as HTMLDivElement) as any)["-webkit-overflow-scrolling"] = "touch"
        }
      }
      let newAnchorIndex = Math.min(this.projector.startIndex + 3, this.projector.cachedItemRect.length-1);
      
      this.projector.anchorItem = newAnchorIndex > 0 ? { index: newAnchorIndex, offset: this.projector.cachedItemRect[newAnchorIndex].top } : { index: 0, offset: 0 };
      // console.log(this.projector.anchorItem,Util.getScrollTop(this.divDom))
      // this.projector.anchorItem = { index: this.projector.startIndex + 3, offset: this.projector.cachedItemRect[this.projector.startIndex + 3].top }

    })
  }


  /**
   * if sliding direction is down, before height minus the height you just slipped.
   * if sliding direction is up, scrollTop minus buffer height.
   * @param cache cached anchor position
   * @param height upperHeight
   * 
   */
  public computeUpperPlaceholderHeight(cache: Cache, height: number): number {
    const projector = this.projector
    const scrollTop = Util.getScrollTop(this.divDom)

    const prevStartIndex = projector.anchorItem.index > 2 ? projector.anchorItem.index - 3 : 0
    const scrollThroughItemCount = prevStartIndex - projector.startIndex
    const prevStartItem = projector.cachedItemRect[prevStartIndex]
    const upperHeight = scrollThroughItemCount < 0 ? scrollTop : prevStartItem ? this.state.upperPlaceholderHeight : scrollTop
    const endIndex = prevStartItem ? prevStartIndex : projector.startIndex + 3
    const scrollThroughItem = projector.cachedItemRect.slice(projector.startIndex, endIndex)
    const scrollThroughItemDistance = scrollThroughItem.reduce((acc, item) => acc + item.height, 0)
    return upperHeight - scrollThroughItemDistance
  }

  public onScroll = () => {
    if(!this.state.projectedItems.length)return;
    const newScrollTop = Util.getScrollTop(this.divDom)
    this.props.onScroll!(this.divDom as any)
    if (newScrollTop < this.scrollTop) {
      // scroll down, viewport up
      this.projector.down(newScrollTop)
    } else if (newScrollTop > this.scrollTop) {
      // scroll up, viewport down
      this.projector.up(newScrollTop)
    }
    this.scrollTop = newScrollTop
  }
}
