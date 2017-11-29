Page({
    data:{
        pageindex:1,
        goodsList:[],
        next:false
    },

    //封装获取商品的函数
    getGoodsList(url,pageindex,callback){
        let that=this;
        let requestTask= wx.request({
            url:url+pageindex,
            header:{
                "content-type":"json"
            },
            success:function(res){
                console.log(res.data.message.length);
                //判断是否有数据回来，没有就是最后一页
                if(res.data.message.length==0){
                    let next=true;
                    that.setData({
                        next:next
                    });
                    return;
                }

                let goodsList=that.data.goodsList;
                //数组要用...解开后才能正常push进去======================
                goodsList.push(...res.data.message);
                //给静态属性赋值=======================
                that.setData({
                    goodsList:goodsList
                })
            },

            //请求完成后清除请求
            complete:function(){
                requestTask.abort();
            }
        });
        //回调处理
        callback && callback();
    },

    onLoad(){},
    onReady(){
        let that=this;
        this.getGoodsList(
            "http://vue.studyit.io/api/getgoods/?pageindex=",
            that.data.pageindex
        )
    },

    //下拉刷新
    onPullDownRefresh(){
        let that=this;
        this.getGoodsList(
            "http://vue.studyit.io/api/getgoods/?pageindex=",
            that.data.pageindex,
            //请求完成，停止下拉刷新============================
            () =>wx.stopPullDownRefresh()
        )
    },
    
    //到达底部，请求第二页======================================
    onReachBottom(){
        if(this.data.next==true){
            return;
        }
        this.data.pageindex++;
        let that=this;
        this.getGoodsList(
            "http://vue.studyit.io/api/getgoods/?pageindex=",
            that.data.pageindex
        )
    }
})