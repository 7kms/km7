export default (template,pageInfo)=>{
    const {title,meta,link} = pageInfo.helmet;
    const html = template
    .replace(/<title>.*<\/title>/,title.toString() + meta.toString() + link.toString())
    .replace(/<title>.*<\/title>/,title.toString() + meta.toString() + link.toString())
    .replace('{{injectHtml}}',pageInfo.html)
    .replace('{{injectScript}}',`window.__PRELOADED_STATE__ = ${JSON.stringify(pageInfo.finalState).replace(/</g, '\\u003c')}`)
    return html
}