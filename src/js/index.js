//swiper
var swiper = new Swiper('.swiper-container', {
    autoplay: true
});
//batter-scroll
var Bscroll = new BScroll('.section', {
    probeType: 2
});
//ajax
ajax({
    url: '/api/init',
    success: function(data) {
        var datas = JSON.parse(data).data;
        render(datas);
    }
});

var con = document.querySelector('.con');

//渲染初始化
function render(data) {
    var html = '';
    data.forEach(function(file) {
        html += `<div class="opt">
                            <h6><img src="${file.img}"></h6>
                            <div>
                                <h5>${file.name}</h5>
                                <p>[${file.add}]${file.type}</p>
                                <p class="price">${file.price}元</p>
                            </div>
                        </div>`
    });
    con.innerHTML = html;
}
//滚动触发
Bscroll.on('scroll', function() {
    if (this.y > 44) {
        $('.pullDown').html('--停止下拉刷新--').addClass('flip');
    } else if (this.y > 10) {
        $('.pullDown').html('--下拉刷新--').removeClass('flip');
    } else if (this.y + 44 < this.maxScrollY) {
        $('.pullUp').html('--释放加载更多--').addClass('flip');
    } else if (this.y + 10 < this.maxScrollY) {
        $('.pullUp').html('--上拉刷新--').removeClass('flip');
    }
});
//滚动结束之后触发
Bscroll.on('scrollEnd', function() { //scrollEnd  touchEnd
    if ($('.pullUp').hasClass('flip')) {
        pullUp();
        $('.pullUp').html('--上拉加载--').removeClass('flip');
    } else if ($('.pullDown').hasClass('flip')) {
        pullDown();
        $('.pullDown').html('--下拉刷新--').removeClass('flip');
    }
})

function pullUp() { //上拉加载
    console.log('pullUp');
    ajax({
        url: '/api/inits',
        success: function(data) {
            var datas = JSON.parse(data).data;
            console.log(datas);
            render(datas);
        }
    });
    Bscroll.refresh();
}

function pullDown() { //下拉刷新
    console.log('pullDown');
    con.innerHTML = '';
    ajax({
        url: '/api/init',
        success: function(data) {
            var datas = JSON.parse(data).data;
            render(datas);
        }
    });
    Bscroll.refresh();
}