
    var urlPre = "http://cors.itxti.net/?",
        url1 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=",
        url2 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=",
        url3 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";
    var isbind = 0;

    //获取车次列表
    var getTrainList = function () {

        //数据校验
        if ( $("#search-begin").val() && $("#search-end").val() ) {

            var searchButton = $(this);
            searchButton.button("option", "disabled", true);

            $.mobile.loading("show");

            var _data = {};
            var _url = url1;
            
            _data.StartStation = $("#search-begin").val();
            _data.ArriveStation = $("#search-end").val();
            
            $.get(urlPre + _url, _data,
                    function (data) {
                        $("#list").html("");
                        var list = $("#list");
                        var timeTables = $(data).find("TimeTable");

                        var _arr = [];
                        timeTables.each(function (index, obj) {
                            var i = index;
                            if (i > 10) return false; //只载入前10条

                            var that = $(this);
                            if (that.find("FirstStation").text() == "数据没有被发现") {
                                alert("数据没有被发现！");
                                return false;
                            }

                            _arr.push('<li><a href="#" data-no="' + that.find("TrainCode").text() + '">' +
                                    '<h2>' + that.find("TrainCode").text() + '次</h2>' +
                                    '<p>' + that.find("FirstStation").text() + ' - ' + that.find("LastStation").text() + '</p>' +
                                    '<p>用时：' + that.find("UseDate").text() + '</p>' +
                                    '<p class="ui-li-aside">' + that.find("StartTime").text() + ' 开</p>' +
                                    '</a></li>');

                        });

                        if (_arr.length > 0) {
                            list.html(_arr.join(""));
                            list.listview("refresh");
                        }

                        $.mobile.loading("hide");

                        searchButton.button("option", "disabled", false);
                    });
        } else {
            alert("请输入发车站和终点站！");
        }
    };

    var getTrainListByTrainCode = function(){
        //alert(2);
        var trainCode = $('#search-num').val();
        if( trainCode!='' ) {
            var $searchNumBtn = $(this);
            $searchNumBtn.button("option","disabled",true);

            $.mobile.loading('show');
            var _url = url2;
            
            $.get(urlPre + _url, {TrainCode:trainCode},
                    function (data) {
                        $("#list").html("");
                        var $listByTrainCode = $("#list-bytraincode");
                        var timeTables = $(data).find("TimeTable");

                        var _arr = [];
                        timeTables.each(function (index, obj) {
                            var i = index;
                            if (i > 10) return false; //只载入前10条

                            var that = $(this);
                            if (that.find("FirstStation").text() == "数据没有被发现") {
                                alert("数据没有被发现！");
                                return false;
                            }

                            _arr.push('<li><a href="#" data-no="' + that.find("TrainCode").text() + '">' +
                                    '<h2>' + that.find("TrainCode").text() + '次</h2>' +
                                    '<p>' + that.find("FirstStation").text() + ' - ' + that.find("LastStation").text() + '</p>' +
                                    '<p>用时：' + that.find("UseDate").text() + '</p>' +
                                    '<p class="ui-li-aside">' + that.find("StartTime").text() + ' 开</p>' +
                                    '</a></li>');

                        });

                        if (_arr.length > 0) {
                            $listByTrainCode.html(_arr.join(""));
                            $listByTrainCode.listview("refresh");
                        }

                        $.mobile.loading("hide");

                        $searchNumBtn.button("option", "disabled", false);
                    });
                     
        }else {
            alert("请输入车次！");
        }
    };

    var isAjax=false

    //获取详情
    var getInfoByTrainCode = function () {

        $.mobile.loading("show");



        var trainCode = $(this).data('no');
        
        if(isAjax) return;
        isAjax=true

        $.get(urlPre + url3,
                {
                    TrainCode: trainCode
                },
                function (data) {
                    isAjax=false
                    $("#detail").find(".ui-content h2").html(trainCode + "次");
                    var tbody = $("#detail").find(".ui-content tbody");
                    tbody.html("");

                    $(data).find("TrainDetailInfo").each(function (index, obj) {
                        var tr = $("<tr></tr>");
                        var that = $(this);
                        tr.html('<td>' + that.find("TrainStation").text() + '</td>' +
                                '<td>' + that.find("ArriveTime").text() + '</td>' +
                                '<td>' + that.find("StartTime").text() + '</td>');
                        tbody.append(tr);
                    });

                    $.mobile.loading("hide");

                    $.mobile.changePage("#detail");
                });

    };

    $('#search-submit-detail').on('touchend',function(){
        //alert(1);
        var trainCode = $('#search-num').val();
        if( trainCode != '' ) {
            var searchButton = $(this);
            searchButton.button("option", "disabled", true);

            $(this).data('no',trainCode);
            getInfoByTrainCode.call( this );

        } else {
            alert('请输入车次！');
        }
    });

    //绑定事件
    var bindEvent = function () {
        $("#search-submit").on("touchend", getTrainList);
        $("#search-submit-bytraincode").on("touchend", getTrainListByTrainCode);        
        $("#list").on("touchend", "a", getInfoByTrainCode);
        $("#list-bytraincode").on("touchend", "a", getInfoByTrainCode);
    };

    $(document).on("pageshow", "#index", function () {
        if (isbind) return
        isbind = 1;
        bindEvent();
    });

  /*  $(document).on("pageshow", "#byTrainCode", function () {
        bindEvent();
    });

     $(document).on("pageshow", "#detail", function () {
        bindEvent();
    });*/