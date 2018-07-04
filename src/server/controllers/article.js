import {responseData} from '../utils'


const generateList = (category)=>{
    const list = [
        {
            title: 'tes1',
            createTime: '2018-06-01 08:00:32'
        },
        {
            title: 'tes1',
            createTime: '2018-06-01 08:00:32'
        },
        {
            title: 'tes2',
            createTime: '2018-06-01 08:00:32'
        }
    ]
    list.forEach(item=>{
        item.title = `${category} - ${item.title}`
    })
    return list
}

export const articleList = (req,res)=>{
    const list = generateList(req.params.category)
    res.json(responseData(200,list))
}


export const articleDetail = (req,res)=>{
   let {id} = req.params;

   res.send(responseData(200,{id}))
}