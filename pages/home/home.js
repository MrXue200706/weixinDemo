var app = getApp();//可以使用全局实例对象了
Page({
  data: {
    text: 'home',
    imgUrls:[]
  },

  //封装请求图片的函数,需要一个回调函数
  getImgs(url,callback){
    const _this=this;
    var requestTask= wx.request({
      url:url,
      header:{
        'content-type':'json'
      },
      success:function(res){
        // console.log(res.data.message[0].img)
        let imgs=res.data.message;

        let imgUrls=[]//=====================

        for(var i=0;i<imgs.length;i++){
          imgUrls.push(imgs[i].img)
        };

        //这是个坑，重新赋值一定要用setData()方法=============
        _this.setData({
          imgUrls:imgUrls
        })
      },
      complete:function(){
        //请求完成后结束请求
        requestTask.abort();
      }
    });

    //回调函数需要调用才会执行==================防止不传回调时报错
    callback && callback();
  },

  //页面准备好后开始请求数据，类似created()函数
  onReady(){
    this.getImgs('http://vue.studyit.io/api/getLunbo')
  },

  //下拉刷新页面
  onPullDownRefresh(){
    this.getImgs('http://vue.studyit.io/api/getLunbo',function(){
      //页面完成渲染后取消下拉刷新
      wx.stopPullDownRefresh();
    })
  }
})