export const getScrollTop = (element: HTMLDivElement | Window)=>{
    if(element == window){
        return window.scrollY
    }else{
        return (element as HTMLDivElement).scrollTop
    }
}

export const setScrollTop = (element: HTMLDivElement | Window, scrollTop: number)=>{
    if(element == window){
        window.scrollTo(0,scrollTop);
    }else{
        (element as HTMLDivElement).scrollTop  = scrollTop
    }
}


export const getClientWidth = (element: HTMLDivElement | Window)=>{
    if(element == window){
        return window.innerWidth;
    }else{
        return (element as HTMLDivElement).scrollTop
    }
}

export const getClientHeight = (element: HTMLDivElement | Window)=>{
    if(element == window){
        return window.innerHeight;
    }else{
        return (element as HTMLDivElement).clientHeight
    }
}