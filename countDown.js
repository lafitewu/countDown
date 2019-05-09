/*
    by:lafitewu
    creatTime: 2018.08.14
    qq:863512936
    v: 1.0

	update: 2019.05.09  v1.2
	--- 2018.08.22新增callback回调函数
	--- 2018.08.23新增默认回调函数&&压缩版修护
	--- 2019.05.09新增days参数，是否开启天数倒计时 && 新增unit对象可修改默认“:”连接展示，同时每个元素新增样式，可自己修改样式属性

    ps:
    $(".main").countDown({
		times: '2018/8/20 18:00:00',  //必填'2018/8/13 18:00:00或者 2(两分钟) 
		days: true, //天数显示
        ms: false,   //毫秒是否开启
		Hour: true,   //小时是否开启
		unit: {
			days: ':',
			hour: ':',
			min: ':',
			second: ':'
		}
    },callback);

	callback是倒计时完成后的回调函数。
	注意：当天数开关开启时，小时开关也将自动开启
*/

$.fn.countDown = function(options,callback) {
	var _self = this;
	var defaults={
		times: '', //必填参数
		days: true, //天数显示
		Hour: true, // 小时显示 
		ms: false, //毫秒开关
		msValue: 90, //毫秒间隔
		unit: {
			days: ':',
			hour: ':',
			min: ':',
			second: ':'
		}
    };
    var endOptions=$.extend(defaults,options,callback);
    function demo() {
        console.log("倒计时结束");
    }
    var Fn = callback || demo;
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
				this.days = parseInt(this.time_diff/(1000 * 60 * 60 * 24));
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
			// 特殊值处理
			special:function(e,de) {
				if(e == undefined) {
					return e = de;
				}else {
					return e;
				}
			},
    		showText:function() {
    			if(endOptions.ms) {
					if(endOptions.days) {
						_self.html('<span class="Days_val">' + this.AddZero(this.days) + '</span>' + '<span class="Days_unit">' + this.special(endOptions.unit.days,':') + '</span>' + '<span class="Hour_val">' + this.AddZero(this.Hours%24) + '</span>' + '<span class="Hour_unit">' + this.special(endOptions.unit.hour,":") + '</span>' + '<span class="Min_val">' + this.AddZero(this.Minutes%60) + '</span>' + '<span class="Min_unit">' + this.special(endOptions.unit.min,':') + '</span>' + '<span class="Second_val">' + this.AddZero(this.Seconds.toFixed(3)) + '</span>' + '<span class="second_unit">' + this.special(endOptions.unit.second,'') + '</span>');
					}else {
						if(endOptions.Hour) {
							_self.html('<span class="Hour_val">' + this.AddZero(this.Hours) + '</span>' + '<span class="Hour_unit">' + this.special(endOptions.unit.hour,":") + '</span>' + '<span class="Min_val">' + this.AddZero(this.Minutes%60) + '</span>' + '<span class="Min_unit">' + this.special(endOptions.unit.min,':') + '</span>' + '<span class="Second_val">' + this.AddZero(this.Seconds.toFixed(3)) + '</span>' + '<span class="second_unit">' + this.special(endOptions.unit.second,'') + '</span>');
						}else {
							_self.html('<span class="Min_val">' + this.AddZero(this.Minutes%60) + '</span>' + '<span class="Min_unit">' + this.special(endOptions.unit.min,':') + '</span>' + '<span class="Second_val">' + this.AddZero(this.Seconds.toFixed(3)) + '</span>' + '<span class="second_unit">' + this.special(endOptions.unit.second,'') + '</span>');
						}
					}
 				}else {
					if(endOptions.days) {
						_self.html('<span class="Days_val">' + this.AddZero(this.days) + '</span>' + '<span class="Days_unit">' + this.special(endOptions.unit.days,":") + '</span>' + '<span class="Hour_val">' + this.AddZero(this.Hours%24) + '</span>' + '<span class="Hour_unit">' + this.special(endOptions.unit.hour,":") + '</span>' + '<span class="Min_val">' + this.AddZero(this.Minutes%60) + '</span>' + '<span class="Min_unit">' + this.special(endOptions.unit.min,":") + '</span>' + '<span class="Second_val">' + this.AddZero(parseInt(this.Seconds)) + '</span>' + '<span class="second_unit">' + this.special(endOptions.unit.second,"") + '</span>');
					}else {
						if(endOptions.Hour) {
							_self.html('<span class="Hour_val">' + this.AddZero(this.Hours) + '</span>' + '<span class="Hour_unit">' + this.special(endOptions.unit.hour,":") + '</span>' + '<span class="Min_val">' + this.AddZero(this.Minutes%60) + '</span>' + '<span class="Min_unit">' + this.special(endOptions.unit.min,":") + '</span>' + '<span class="Second_val">' + this.AddZero(parseInt(this.Seconds)) + '</span>' + '<span class="second_unit">' + this.special(endOptions.unit.second,"") + '</span>');
						}else {
							_self.html('<span class="Min_val">' + this.AddZero(this.Minutes%60) + '</span>' + '<span class="Min_unit">' + this.special(endOptions.unit.min,":") + '</span>' + '<span class="Second_val">' + this.AddZero(parseInt(this.Seconds)) + '</span>' + '<span class="second_unit">' + this.special(endOptions.unit.second,"") + '</span>');
						}
					}
 				}

 				// 倒计时结束触发
 				if(this.Hours <= 0 && this.Minutes <= 0 && this.Seconds <= 0) {
                    Fn();
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