// 平台属性管理模块的请求问价
import request from "@/utils/request"

//获取到一级分类的数据
// export const reqCategory1list = () =>{
//     return request({
//         url:`/admin/product/getCategory1`,
//         method:'get'
//     })
// }
export const reqCategory1List = ()=>request({url:'/admin/product/getCategory1',method:'get'});

//获取二级分类数据接口
export const reqCategory2list = (category1Id) =>{
    return request({
        url:`/admin/product/getCategory2/${category1Id}`,
        method:'get'
    })
}

//获取三级分类数据接口
export const reqCategory3list = (category2Id) =>{
    return request({
        url:`/admin/product/getCategory3/${category2Id}`,
        method:'get'
    })
}

//获取平台属性的接口
export const reqAttrList = (category1Id,category2Id,category3Id) =>{
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get'
    })
}

//添加属性与属性值的接口
export const reqAddOrUpdateAttr = (data) => {
    return request({
        url:`/admin/product/saveAttrInfo`,
        method:'post',
        data
    })
}