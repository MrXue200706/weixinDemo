Page({
    data:{
        newsList:[]
    },
    //封装一个获取新闻列表的函数
    getNewsList(url,callback){
        let that=this;
        let requestTask=wx.request({
            url:url,
            header:{
                "content-type":"json"
            },
            success:function(res){
                let list=res.data.message;
                let newsList=[];//============================
                for(var i=0;i<list.length;i++){
                    newsList.push(list[i]);
                }

                //使用page对象的setData函数给静态属性赋值========
                that.setData({
                    newsList:newsList
                })
                
            },
            complete:function(){
                //请求完成后结束请求
                requestTask.abort();
            }
        });
        //处理回调函数
        callback && callback();
    },
    onReady(){
        this.getNewsList("http://vue.studyit.io/api/getnewslist")
    },

    //下来刷新页面
    onPullDownRefresh(){
        this.getNewsList(
            "http://vue.studyit.io/api/getnewslist",
            //页面请求完成后取消下拉刷新
            () =>wx.stopPullDownRefresh()
        )
    }
})