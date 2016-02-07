/**
 * Created by MAO on 9/12/2015.
 */
angular.module('app').service('Util', function () {
    this.getRandom=function(length){
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

    }
    this.validateEmail=function(email){
    	if(!email)
    		return false;
    	email=email.trim();
        var reg= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         return email.search(reg)>=0?true:false;
     }
    this.validateUsername=function(username){
    	if(!username)
    		return false;
        var reg=/^\w+$/;
        if(username.trim().length<5||username.search(reg)==-1)
            return false;
        else
            return true;
    }
    this.validatePassword=function(password){
    	if(!password)
    		return false;
        var reg=/^\w+$/;
        if(password.trim().length<6||password.search(reg)==-1)
            return false;
        else
            return true;
    }



})