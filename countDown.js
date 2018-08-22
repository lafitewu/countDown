/*
    by:lafitewu
    time: 2018.08.14
    qq:863512936
    v: 1.0


    ps:
    $(".main").countDown({
        times: '2018/8/20 18:00:00',  //必填'2018/8/13 18:00:00或者 2(两分钟) 
        ms: false,   //毫秒是否开启
        Hour: true   //小时是否开启
    },callback);

    callback是倒计时完成后的回调函数。
*/

$.fn.countDown = function(options,callback) {
	var _self = this;
	var defaults={
		times: '', //必填参数
		Hour: true, // 小时显示 
		ms: false, //毫秒开关
		msValue: 90 //毫秒间隔
    };
    var endOptions=$.extend(defaults,options,callback);

    if(!endOptions.times) {
    	console.error("times值必填");
    }else {
    	function timeFn() {
    		if(typeof(endOptions.times) == 'number') {
    			this.End_time = new Date().getTime()+endOptions.times*60*1000;
    		}else {
    			this.End_time = new Date(endOptions.times).getTime();
    		}
    	}
    	timeFn.prototype = {
    		Init:function() {
    			this.time = new Date().getTime();
    			this.time_diff = (this.End_time - this.time);
    			this.Hours = parseInt(this.time_diff/(1000 * 60 * 60));
    			this.Minutes = parseInt(this.time_diff/(1000 * 60));
    			this.Seconds = (this.time_diff/1000)%60;
    			this.showText();
    		},
    		AddZero:function(x) {
    			if(x < 10) {
    				return x = "0"+x;
    			}else {
    				return x
    			}
    		},
    		showText:function() {
    			if(endOptions.ms) {
					if(endOptions.Hour) {
    					_self.text(this.AddZero(this.Hours) + ":" + this.AddZero(this.Minutes%60)+":"+this.AddZero(this.Seconds.toFixed(3)));
    				}else {
    					_self.text(this.AddZero(this.Minutes%60)+":"+this.AddZero(this.Seconds.toFixed(3)));
    				}
 				}else {
 					if(endOptions.Hour) {
    					_self.text(this.AddZero(this.Hours) + ":" +this.AddZero(this.Minutes%60)+":"+this.AddZero(parseInt(this.Seconds)));
    				}else {
    					_self.text(this.AddZero(this.Minutes%60)+":"+this.AddZero(parseInt(this.Seconds)));
    				}
 				}

 				// 倒计时结束触发
 				if(this.Hours <= 0 && this.Minutes <= 0 && this.Seconds <= 0) {
 					console.log("倒计时结束");
                    callback();
 					clearInterval(this.ClearIn);

 				}
    		},
    		countFn:function() {
 				if(endOptions.ms) {
 					// bind(this)用于内部this指向
 					this.ClearIn = setInterval(this.Init.bind(this),endOptions.msValue);
 				}else {
 					this.ClearIn = setInterval(this.Init.bind(this),1000);
 				}
    			
    		},
    		start:function() {
    			this.Init();
    			this.countFn();
    		}
    	}
    	var game = new timeFn().start();
    }
}