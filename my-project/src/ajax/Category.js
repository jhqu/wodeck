import Category from '@/data/Category'

export default {
  getCateList(cb){
    setTimeout( () => {
      cb(Category.data)
    },10)

  }
}
