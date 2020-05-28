<template>
   <div class="container">
     <div>{{imgUrl}}</div>
     <div class="header">

       <i class="fa fa-angle-left icon-return" @click=""></i>
       <div class="search-box">
         <i class="fa fa-search"></i>&nbsp;&nbsp;
         <label for="search" v-show="false"></label>
         <input
           id="search"
           type="text"
           placeholder="请输入关键字..."
           class="ipt-search"
           v-model="keyword">
       </div>
       <span class="btn-search" @click="toResult">搜&nbsp;索</span>
     </div>
     <div class="content">
       <div class="banner-title" v-if="recordKeywords.length">
         <span>历史记录</span>
         <i class="fa fa-trash btn-banner" @click="removeRecord">清除缓存</i>
       </div>
       <ul class="keyword-list">
         <li v-for="(item,index) in recordKeywords"
             :key="index"
             class="keyword-item one-line"
         >{{item}}</li>
       </ul>
     </div>
     <div class="search-banner">
       <div class="banner-title">
         <span>猜你想搜的</span>
         <i
           class="fa btn-banner"
           :class="{ 'fa-eye': isVisible, 'fa-eye-slash': !isVisible }"
           @click="toggleVisible">隐藏</i>
       </div>
       <ul class="keyword-list" v-if="isVisible">
         <li
           v-for="(keyword, index) in recKeywords"
           :key="index"
           class="keyword-item one-line"
           @click="toResultByRecord(keyword)">{{ keyword }}</li>
       </ul>
     </div>

   </div>
</template>

<script>
    export default {
        name: "SearchNew",
        data(){
         return{
             keyword:'',
             imgUrl:'555',
             recordKeywords:[],
             isVisible:true,
             recKeywords: [ '5G', '华为新机', '滴滴', '恒大全面大降价', '中国最厉害的后卫', '德安东尼', '应采儿', '黄磊', '冯绍峰', '赵丽颖', '地中海' ],
         }
        },
        created(){
             /* function timeout(ms) {
                  return new Promise((resolve, reject)=>{
                      setTimeout(resolve,ms,'done') //setTimeout 三个参数第一个是 必须 是一个代码窜，也可以是一个函数
                                                  //第二个超时分钟数 第三个可选参数
                  });
              }
              timeout(1000).then((value)=>{
                  console.log(value)
              })
            let promise = new Promise(function (resolve, reject) {
                console.log('promies');
                resolve();
            })
            promise.then(()=>console.log('resolved.'));
            console.log('hi')*/
             //异步加载图片例子
            const getJSON = function(url) {
                const promise = new Promise(function(resolve, reject){
                    const handler = function() {
                        if (this.readyState !== 4) {
                            return;
                        }
                        if (this.status === 200) {
                            resolve(this.response);
                        } else {
                            reject(new Error(this.statusText));
                        }
                    };
                    const client = new XMLHttpRequest();
                    client.open("GET", url);
                    client.onreadystatechange = handler;
                    client.responseType = "json";
                    client.setRequestHeader("Accept", "application/json");
                    client.send();

                });

                return promise;
            };

            getJSON("/src/data/List.json").then(function(json) {
                console.log('Contents: ' + json);
            }, function(error) {

                console.error('出错了', error);
            });
        },
        mounted () {
          this.$nextTick(function () {

              this.getRecord()


          })
        },
        methods:{
            loadImagAsync(url){
                return new Promise(function (resolve, reject) {
                    const image = new Image();
                    image.onload = function () {
                        resolve(image)
                        return this.imgUrl = url

                    }
                    image.onerror = function () {
                        reject(new Error('count not load '+url))

                    }
                }).then(()=>this.imgUrl = url)
            },
             getRecord (){

                 let record = window.localStorage.getItem('ztRecord')
                 if(record){
                     this.recordKeywords = JSON.parse(record).keywords
                 }
             },
             setRecord (){
                 //debugger
                window.localStorage.setItem('ztRecord', JSON.stringify({
                    keywords: this.recordKeywords
                }))
             },
            removeRecord(){
                 this.recordKeywords = []
                 window.localStorage.removeItem('ztRecord')
            },
            toResult(){
                //debugger
                 if(this.keyword){  //findIndex 返回数组中满足提供测试函数的第一个元素的索引或者返回-1
                     if(this.recordKeywords.findIndex(item =>item===this.keyword)===-1){
                       this.recordKeywords.push(this.keyword),
                       this.setRecord()
                     }
                 } this.$router.push({path:'/result', query:{keyword:this.keyword}})
            },
            toResultByRecord(keyword){
                 this.$router.push({path:'/result',query:{keyword}})

            },
            toggleVisible(){
                 this.isVisible = !this.isVisible
            }
        }
    }
</script>

<style scoped>
  .container {
    height: 100%;
  }
  .header {
    padding: 8px 15px;
    background-color: #d33d3e;
    overflow: hidden;
  }
  .icon-return {
    text-align: center;
    vertical-align: middle;
    color: #fff;
    font-size: 26px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 10px;
  }
  .search-box {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 100px);
    line-height: 32px;
    background-color: #fff;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .search-box>i {
    color: #707070;
  }
  .ipt-search {
    width: calc(100% - 26px);
    border: none;
    outline: none;
    line-height: 32px;
  }
  .btn-search {
    display: inline-block;
    vertical-align: middle;
    line-height: 32px;
    padding-left: 10px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
  }
  .content {
    height: calc(100% - 48px);
    overflow-y: auto;
  }
  .search-banner {
    margin-top: 20px;
  }
  .banner-title {
    padding-left: 15px;
    padding-right: 15px;
    line-height: 32px;
    color: #777;
  }
  .btn-banner {
    float: right;
    line-height: 32px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .keyword-list {
    overflow: hidden;
    list-style: none;
    margin-top: 10px;
  }
  .keyword-item {
    box-sizing: border-box;
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 28px;
    display: inline-block;
    width: 50%;
    color: #333;
    border-bottom: 1px solid #e8e8e8;
  }
  .keyword-item:nth-child(2n - 1) {
    border-right: 1px solid #e8e8e8;
  }
  .keyword-item:nth-child(1),
  .keyword-item:nth-child(2) {
    border-top: 1px solid #e8e8e8;
  }
  .one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: nowrap;
  }
</style>
