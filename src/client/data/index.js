export const slogan = '7哥(7km), 前端填坑记'
export const getPageMeta = (title='')=>{
    const obj = {
        title: `${title} -- km7 突破web前端开发`,
        metas: [
            {
                name: 'keywords',
                content: 'km7, web前端突破, web前端, 突破web前端, 突破前端开发, 大前端'
            },
            {
                name: 'description',
                content: '突破web前端开发, km7的前端开发日志, 记录前端开发中的重难点, 突破前端开发'
            }
        ]
    }
    return obj
}