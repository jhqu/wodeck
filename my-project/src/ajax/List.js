import List from '@/data/List'
export default {
  getListByCategory(cb,{category}){
    setTimeout(()=>{
     let result = []
      switch(category){
        case '':
          result = List.data
          break
        case '推荐':
          result = List.data.filter(item =>item.isRec)
          break
        case '热点':
          result= List.data.filter(item =>item.isHot)
          break
        case '':
          result = List.data.filter(item =>item.category === category)

      }
      cb(result)
    },10)
  },
getListByKeyword(cb,{keyworkd}){
    setTimeout(()=>{
    cb(list.data.filter(item =>item.title.indexOf(keyworkd)>-1))
    },10)

}
}
