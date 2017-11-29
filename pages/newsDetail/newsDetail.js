Page({
    data:{
        newsDetail:{},
        id:''
    },

    //封装一个获取详情的函数
    getNewsDetail(url,id,calback){
        let that=this;
        wx.request({
            url:url+id,
            header:{
                "content-type":"json"
            },
            success:function(res){
                // console.log(res.data.message[0])
                let newsDetail={};//========================
                newsDetail=res.data.message[0];

                //修改静态数据里的newsDetail=====================
                that.setData({
                    newsDetail:newsDetail
                })
            }
        })
    },
    onLoad(option){
        //地址栏传来的参数在option里面直接可以获取
        let id=option.id;
        //修改静态里面的id=========================
        this.setData({
            id:id
        })
    },
    onReady(){
        this.getNewsDetail("http://vue.studyit.io/api/getnew/",this.data.id)
    }
})