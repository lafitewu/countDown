$.fn.countDown = function(options) {
	var _self = this;
	var defaults={
		txt: '我是默认的值',
		times: '', //必填参数
		Hour: true, // 分钟显示 
		ms: false, //毫秒开关
		msValue: 90 //毫秒间隔
    };
    var endOptions=$.extend(defaults,options);

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
 					clearInterval(this.ClearIn);
 				}
    		},
    		countFn:function() {
 				// var that = this;
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