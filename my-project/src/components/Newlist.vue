<template>
<div class="container">
<!--  搜索框-->
  <div class="header">
    <div class="search-box" @click="toSearch">
      <i class="fa fa-search"></i>
      <span>搜索</span>

    </div>
    <i class="fa fa-qrcode icom-qrcode"></i>
  </div>
  <ul class="tab-list">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab-item">
<!--      :class="{'is-active': index === activeTabIndex}"-->
<!--      @click="toggleTab(tab, index)"-->
      {{ tab }}
    </li>
  </ul>
  <ul class="news-list">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="news-item">
      <div class="news-media">
        <img class="news-thumbnail" :src="item.thumbnail">
        <div class="news-profile">
          <p>{{item.title}}</p>
          <p class="news-mark">
<!--            <Badge v-if="item.isHot" text="热点"></Badge>-->
            <span>{{item.source}}</span>
            <span>{{item.time}}</span>
          </p>
        </div>

      </div>
    </li>
  </ul>
<!--  练习-->
  <div>
    <h2>count: {{msgTop}}</h2>
    <h2>ten time: {{tenTimesCount}}</h2>
    <button @click="addCountAsync(10)"> add Count2</button>
    <button @click="addCount(20)">add Count1</button>

  </div>
</div>
</template>

<script>

import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

    export default {
        name: "Newlist",
        data (){
            return {
                msg:'newlist',
                formatterDateTime:'20200520095847',
                msgTop:''
            }
        },
        mounted(){  //默认显示数据显示在 mounted 钩子函数


            // this.$ajax({
            //     method:'post',
            //     url: 'api/AdminAPI/GetCode',
            //     data:{
            //         type:'农户编号'
            //     },
            //
            //
            // }).then(response=>{
            //         debugger
            //     let _data=response.data
            // })
            this.$nextTick(function () {
                this.getListByCategory({
                    category:'推荐'
                })
                this.getCateList()

            })
        },
        created(){




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

       /*     getJSON('/api?Dy=10').then(function(json) {

                console.log('Contents: 123' + json);
            }, function(error) {
                console.error('出错了', error);
            });*/




        },
        computed:{ //计算更改都在computed

            ...mapState('counter',['count']),
            ...mapGetters('counter',['tenTimesCount']),
            ...mapGetters('List',['list']),
            ...mapGetters('Category',['categories']),
            tabs(){
                return ['推荐','热点'].concat(this.categories)
            }
        },
        methods:{
          ...mapMutations('counter',['addCount']),
          ...mapActions('counter',['addCountAsync']),
          ...mapActions('List',['getListByCategory']),
          ...mapActions('Category',['getCateList']),
          toSearch () {
              this.$router.push('/search')
          },


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
  .search-box {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 50px);
    line-height: 32px;
    background-color: #fff;
    border-radius: 5px;
    padding-left: 10px;
  }
  .search-box>i {
    color: #707070;
  }
  .icon-qrcode {
    vertical-align: middle;
    line-height: 32px;
    color: #fff;
    font-size: 20px;
    padding-left: 8px;
  }
  .tab-list {
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
  }
  .tab-item {
    box-sizing: border-box;
    display: inline-block;
    width: 14%;
    line-height: 32px;
    color: #222;
    font-size: 14px;
    text-align: center;
  }
  .tab-item.is-active {
    color: #d33d3e;
  }
  .news-list {
    list-style: none;
    height: calc(100% - 80px);
    overflow-y: auto;
  }
  .news-item {
    overflow: hidden;
    padding: 12px 8px;
    border-bottom: 1px solid #e8e8e8;
  }
  .news-media {
    overflow: hidden;
    position: relative;
  }
  .news-thumbnail {
    float: left;
    width: 100px;
    padding-right: 8px;
  }
  .news-profile {
    overflow: hidden;
  }
  .news-mark {
    margin-top: 5px;
    font-size: 12px;
    color: #a9a9a9;
  }
</style>
