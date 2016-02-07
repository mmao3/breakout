angular.module('app').service('GetTime', function () {
    this.getUTC=function(cb){
        window.myCallback=function(json) {
      var index= json.dateString.indexOf("GMT");
      cb(json.dateString.substring(0,index));
       //console.log(date.getFullYear());
       //console.log(date.getMonth());
       //console.log(date.getDate());
       //console.log(date.getHours());
       //console.log(date.getMinutes());
       //console.log(new Date(json.dateString.substring(0,index)).getTime());

      //var old="July 2, 2015 1:1:40"
      // var now=json.dateString.substring(0,index);
      // console.log(now);
      // console.log(old);
      // console.log(that.getTimeInterval(old,now));

    };

    	var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
     script.src = "http://www.timeapi.org/utc/now.json?callback=myCallback";
      head.appendChild(script);
       

       }
    this.getTimeInterval=function(old,now){
        var date1=new Date(old).getTime();
        var date2=new Date(now).getTime();
        var diff=(date2-date1)/1000/60;
        if(diff<2){
            return "1 minute"
        }else if(diff<60){
            return Math.round(diff)+" minutes"
        }else if(diff<60*2){
            return "1 hour"
        }else if(diff<60*24){
            return Math.round(diff/60)+" hours";
        }else if(diff<60*24*2){
            return "1 day";
        }else if(diff<60*24*30){
            return Math.round(diff/60/24)+" days";
        }else if(diff<60*24*30*2){
            return "1 month";
        }else if(diff<60*24*30*12){
            return  Math.round(diff/60/24/30)+" months"
        }else if(diff<60*24*30*12*2){
            return "1 year";
        }else {
            return Math.round(diff/60/24/30/12)+" years";
        }




    }



})