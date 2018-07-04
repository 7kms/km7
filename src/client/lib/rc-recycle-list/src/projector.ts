/**
 *  Projector.
 *  used for calculate anchor and new items
 */
import { InfiniteScroller, Archive } from "./scroller"
import * as Util from './util'

export class Projector {
  public startIndex = 0
  public endIndex = 0
  public anchorItem = { index: 0, offset: 0 }

  private callback: Callback
  private guesstimatedItemCountPerPage: number
  private displayCount: number
  private scrollerDom: HTMLDivElement | Window
  private upperHeight: number = 0

  constructor(
    public scroller: InfiniteScroller,
    public items: any[],
    public averageHeight: number,
    public cachedItemRect = [] as Cache[]
  ) {
    this.scrollerDom = scroller.divDom
    this.guesstimatedItemCountPerPage = Math.ceil(Util.getClientHeight(this.scrollerDom) / averageHeight)
    this.displayCount = this.guesstimatedItemCountPerPage + 3
    this.endIndex = this.startIndex + this.displayCount - 1
  }
  reset(){
    this.cachedItemRect = [];
    this.startIndex = 0;
    this.endIndex = this.startIndex + this.displayCount - 1
  }

  public next(items?: any[]) {
    if (items) this.items = items
    if(!this.items.length){
      this.reset();
      this.callback([], 0, 0, false);
      return;
    }
    const projectedItems = this.items.slice(this.startIndex, this.endIndex + 1)
    // if(!projectedItems.length)return;
    const startItem = this.cachedItemRect[this.startIndex]
    // console.log(this.startIndex,this.endIndex + 1, this.cachedItemRect.length)
    // there are two case should adjust: 1、resize。2、quickly slipping。
    const needAdjustment = startItem ? false : true
    const upperPlaceholderHeight = startItem ? startItem.top : this.upperHeight

    const cachedItemRectLength = this.cachedItemRect.length
    const endIndex = cachedItemRectLength === 0 ? this.endIndex : cachedItemRectLength
    const bottomCountDelta = this.items.length - endIndex
    const unCachedItemCount = bottomCountDelta < 0 ? 0 : bottomCountDelta
    const lastCachedItemRect = this.cachedItemRect[cachedItemRectLength - 1]
    const lastCachedItemRectBottom = lastCachedItemRect ? lastCachedItemRect.bottom : 0
    const lastItemRect = this.endIndex >= cachedItemRectLength ? this.cachedItemRect[cachedItemRectLength - 1] : this.cachedItemRect[this.endIndex]
    const lastItemRectBottom = lastItemRect ? lastItemRect.bottom : 0
    const underPlaceholderHeight = lastCachedItemRectBottom - lastItemRectBottom + unCachedItemCount * this.averageHeight
    this.callback(projectedItems, upperPlaceholderHeight, underPlaceholderHeight, needAdjustment)
  }
  public initFromArchive(archiveObj: Archive){
    let {startIndex,endIndex,underPlaceholderHeight,upperPlaceholderHeight,anchorItem} = archiveObj;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.anchorItem = anchorItem;
    const projectedItems = this.items.slice(this.startIndex, this.endIndex + 1)
    this.callback(projectedItems, upperPlaceholderHeight, underPlaceholderHeight, false)
  }

  /**
   * hands up, viewport down.
   */
  public up = (scrollTop: number) => {
   
    // const scrollTop =  Util.getScrollTop(this.scrollerDom)
    const anchorItemRect = this.cachedItemRect[this.anchorItem.index]
    // console.log(anchorItemRect,this.anchorItem.index,this.cachedItemRect)
    // if(!anchorItemRect){
    //   console.log(this.anchorItem.index, this.cachedItemRect)
    // }
    if (scrollTop > anchorItemRect.bottom) {

      const nextAnchorItem = this.cachedItemRect.find(item => item ? item.bottom > scrollTop : false)
      if (nextAnchorItem) {
        const nextAnchorIndex = nextAnchorItem.index
        this.startIndex = nextAnchorIndex > 2 ? nextAnchorIndex - 3 : 0
        this.endIndex = this.startIndex + this.displayCount - 1
        this.anchorItem.index = nextAnchorIndex
        this.anchorItem.offset = nextAnchorItem.top
      } else {
        // when you slide quicly, the scrollTop is larger than the last cached item.bottom
        // estimate the new start index
        // console.log('slide quicly >>>>>>> scrollTop > lastCachedItem.bottom')
        const cachedItemLength = this.cachedItemRect.length
        const unCachedDelta = scrollTop - this.cachedItemRect[cachedItemLength - 1].bottom
        const guesstimatedUnCachedCount = Math.ceil(unCachedDelta / this.averageHeight)
        const gusetStartIndex = this.endIndex + guesstimatedUnCachedCount - 3
        if(this.items[gusetStartIndex]){
          this.startIndex = this.endIndex + guesstimatedUnCachedCount - 3
          this.endIndex = this.startIndex + this.displayCount - 1
        }
       
        // this.cachedItemRect.length = 0
        this.upperHeight = scrollTop
      }
      this.next()
    }
  }

  /**
   * hands down, viewport up ↓.
   */
  public down = (scrollTop: number) => {
    // const scrollTop =  Util.getScrollTop(this.scrollerDom)
    if (scrollTop < this.anchorItem.offset) {
      const startItem = this.cachedItemRect[this.startIndex]
      const nextAnchorItem = this.cachedItemRect.find(item => item ? item.bottom > scrollTop : false)
      // when the viewport reach the upper border, 3 more items are prepare to render.
      const nextStartIndex = Math.max(nextAnchorItem.index - 3,0)
      if (this.cachedItemRect[nextStartIndex]) {
        this.startIndex = nextStartIndex
        this.endIndex = this.startIndex + this.displayCount - 1
        this.anchorItem.index = nextAnchorItem.index
        this.anchorItem.offset = nextAnchorItem.top
      } else {
        // when the new startIndex is not cached
        // estimate n
        // console.log('new startIndex is not cached')
        // console.log('slide quicly >>>>>>> scrollTop < firstCachedItem.bottom')
        const guesstimatedAnchorIndex = Math.ceil(scrollTop/ this.anchorItem.offset * this.anchorItem.index) - 1
        // this.startIndex = guesstimatedAnchorIndex > 2 ? guesstimatedAnchorIndex - 3 : guesstimatedAnchorIndex
        this.startIndex = Math.max( guesstimatedAnchorIndex - 3, 0)
        this.endIndex = this.startIndex + this.displayCount - 1
        // this.cachedItemRect.length = 0
        this.upperHeight = this.scroller.state.upperPlaceholderHeight
      }
      this.next()
    }
  }

  public subscribe(callback: Callback) {
    this.callback = callback
  }
}

export type Callback = (projectedItems: any[], upperPlaceholderHeight: number, underPlaceholderHeight: number, needAdjustment: boolean) => void
export type Cache = { index: number, top: number, bottom: number, height: number }
