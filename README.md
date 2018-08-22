# countDown.js #

## 简单介绍 ##
一款基于jquery的倒计时插件，
采用prototype原型实现封装。
## 插件用法 ##
	//引入jq和插件
	<script src="jquery-3.1.1.min.js"></script>
	<script src="countDown.js"></script>

    $(".main").countDown({
        times: '2018/8/20 18:00:00',  //必填'2018/8/13 18:00:00或者 2(两分钟) 
        ms: false,   //毫秒是否开启
        Hour: true   //小时是否开启
    },callback);
参数说明：
	times: 必填。 两种形式可选('2018/8/20 18:00:00'和 number) number代表分钟。 比如3，则代表3分钟倒计时。
	Hour: boolean 默认true  小时开关
	ms: boolean  默认false  毫秒开关
	msValue: number  默认90，当ms为true时生效。
	callback  function  是倒计时完成后的回调函数。

## 作者&&插件简介 ##
name: laftiewu <br>
qq: 863512936 <br>
v：1.0 <br>
creatTime: 2018.08.14 <br>
update: 2018.08.22 <br>
2018.08.22新增callback回调函数
   
