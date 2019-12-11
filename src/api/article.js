import api from '../axios'
// 获取分类
export const getCategory = params => api.fetchGet('article/get_category', params)
// 获取文章列表
export const getArtcle = params => api.fetchGet('article/get_artcle', params)
// 获取文章详情
export const getArtcleDetails = params => api.fetchGet('article/get_artcleDetails', params)
// 搜索文章
export const searchArtcle = params => api.fetchGet('article/search_artcle', params)
// 添加子分类
export const addSubclass = params => api.fetchPost('article/add_subclass', params)
// 发布文章
export const addArtcle = params => api.fetchPost('article/add_artcle', params)
// 删除文章
export const deleteArticle = params => api.fetchPost('article/delete_article', params)
