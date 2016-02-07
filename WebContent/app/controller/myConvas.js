
var W_inner=400;
var H_inner=500;


var PADDLE_WIDTH = H_inner/10;
var PADDLE_HEIGHT = Math.round(H_inner/60);

//Offset of the paddle up from the bottom 
var PADDLE_Y_OFFSET = 80;
var level=1;
//Number of bricks per row */
var NBRICKS_PER_ROW ;

// Number of rows of bricks */
var NBRICK_ROWS ;


// Separation between bricks */
var BRICK_SEP = Math.round(H_inner/150);

// Width of a brick */
var BRICK_WIDTH ;

// Height of a brick */
var BRICK_HEIGHT = W_inner/50;


var BALL_RADIUS =10;

// Offset of the top brick row from the top */
var BRICK_Y_OFFSET = H_inner/500*60;

// Number of turns */
var NTURNS = 3; 
var c;
var s;
var paddle;
var bal;
var snd ; 
var failure;
var win;
var myTimer;
var isStarted;
var lives=3;
var point=0;
var isMadal1;
var isMadal2;
var isMadal3;

function nextLevel(level){
NBRICKS_PER_ROW=10;
NBRICK_ROWS=10;
 if(level==1){
   
}else if(level==2){
	NBRICKS_PER_ROW--;
}else if(level==3){
	NBRICKS_PER_ROW++;
	NBRICK_ROWS++;
}else if(level==4){
	
	NBRICKS_PER_ROW=19;
	NBRICK_ROWS=17;
}

BRICK_WIDTH =
	  Math.floor((W_inner - (NBRICKS_PER_ROW - 1) * BRICK_SEP) / NBRICKS_PER_ROW);


}

function addPaddle(){
	nextLevel(3);
	c= document.getElementById("myCanvas");
	c1= document.getElementById("canvas2");
	s=new canvasState(c,c1);
	paddle=new shape((W_inner-PADDLE_WIDTH)/2, (H_inner-PADDLE_Y_OFFSET), PADDLE_WIDTH, PADDLE_HEIGHT,"black","Paddle");
	
    paddle.draw(s.ctx);
    document.addEventListener("click",function(e) {

        var x = e.clientX;
        var y = e.clientY;

		var rect = c.getBoundingClientRect();
		x=Math.round((e.clientX-rect.left)/(rect.right-rect.left)*c.width);
		y= Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*c.height);


		$('#myModal').on('shown.bs.modal', function() {
			isMadal1=true;

		})
		$('#signInModal').on('shown.bs.modal', function() {
			isMadal2=true;
		})
		$('#resetPasswordModal').on('shown.bs.modal', function() {
			isMadal3=true;
		})
		$('#myModal').on('hidden.bs.modal', function () {
			isMadal1=false;

		})
		$('#signInModal').on('hidden.bs.modal', function () {
			isMadal2=false;
		})
		$('#resetPasswordModal').on('hidden.bs.modal', function () {
			isMadal3=false;
		})

        if((!isMadal1&&!isMadal2&&!isMadal3)&&x>=0&&x<=s.width&&y>=0&&y<=s.height){
        	start();
        }


    });

    document.addEventListener("mousemove",  function(event) {myFunction(event)});
	
	function myFunction(e){
		;
		var rect = c.getBoundingClientRect();
	var x = e.clientX;
    var y = e.clientY;
	
   // x -= rect.left;
		//x -= c.offsetLeft;
		x=Math.round((e.clientX-rect.left)/(rect.right-rect.left)*c.width);
		y= Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*c.height);

    if(y>=0&&y<= s.height){
		if(x>=0&&x<=s.width-PADDLE_WIDTH){
			paddle.moveTo(s.ctx,x,paddle.y);


		}
		else if(x<0){
			paddle.moveTo(s.ctx,0,paddle.y);
		}
		else {
			paddle.moveTo(s.ctx,s.width-PADDLE_WIDTH,paddle.y);


		}
		if(!isStarted&&bal){

			bal.ball.moveTo(s.ctx,paddle.x+PADDLE_WIDTH/2,paddle.y-BALL_RADIUS);

		}

	}

	
	
}
	
}
function creatBricks(){
	s.removeAll();
	var i,j,color;
	if(level==1){
		for(var i=0;i<NBRICKS_PER_ROW;i++)
	  for(var j=0;j<NBRICK_ROWS;j++){
		  var color;
		  var colors=["red","orange","yellow","green","cyan"];
		  color=colors[Math.floor(Math.random() * 5)];
		  if(Math.floor(Math.random() * 10<=5))
		  	continue;
		  var sp=W_inner-((BRICK_WIDTH+BRICK_SEP)*NBRICKS_PER_ROW-BRICK_SEP);
	
		  var x=(BRICK_WIDTH+BRICK_SEP)*i+Math.floor(sp/2);
		  var y=BRICK_Y_OFFSET+(BRICK_HEIGHT+BRICK_SEP)*j;
		  var brick=new shape(x,y,BRICK_WIDTH,BRICK_HEIGHT,color,"Rect")
		  s.addShape(brick);
		  //s.removeShape(brick);
		 
	  }

	}else if(level==2){
		for(j=0;j<NBRICKS_PER_ROW;j++)
	  for(i=0;i<NBRICK_ROWS;i++){
		  if(i==0){
            if(j==2||j==7){
               color="yellow";
            }else{
            	continue;
            }
		   }
		   if(i==1){
            if(j==1||j==3||j==6||j==8){
               color="yellow";
            }else{
            	continue;
            }
           }	
           if(i==2){
            if(j==0||j==9){
               color="yellow";
            }else if(j==1||j==2||j==7||j==8){
            	color="orange";
            }else if(j==4||j==5){
                 color="yellow";
            }else{
            	continue;
            }
            	
            
           }
           if(i==3){
            if(j==0||j==1||j==2||j==7||j==8||j==9){
               color="cyan";
            }else if(j==3||j==6){
            	color="orange";
            }else{
            	continue;
            }
            	
            
           }
           if(i==4){
            if(j==0||j==1||j==2||j==7||j==8||j==9){
               color="blue";
            }else if(j==3||j==6){
            	color="yellow";
            }else{
            	color="red";
            }
            	
            
           }
            if(i==5){
            if(j==1||j==8||j==4||j==5){
               color="yellow";
            }else if(j==3||j==6){
            	color="blue";
            }else if(j==2||j==7){
                  color="green";
            }else{
            	continue;
            }
            	
            
           }
            if(i==6){
            if(j==4||j==5){
               color="blue";
            }else if(j==3||j==6){
            	color="green";
            }else if(j==2||j==7){
                  color="yellow";
            }else{
            	continue;
            }
            	
            
           }
            if(i==7){
            if(j==4||j==5){
               color="green";
            }else if(j==3||j==6){
            	color="yellow";
            }
            else{
            	continue;
            }
            	
            
           }


           if(i==8){
            if(j==4||j==5){
               color="yellow";
            }else{
            	continue;
            }
           }  
		  var sp=W_inner-((BRICK_WIDTH+BRICK_SEP)*NBRICKS_PER_ROW-BRICK_SEP);
	
		  var x=(BRICK_WIDTH+BRICK_SEP)*j+Math.floor(sp/2);
		  var y=BRICK_Y_OFFSET+(BRICK_HEIGHT+BRICK_SEP)*i
		  var brick=new shape(x,y,BRICK_WIDTH,BRICK_HEIGHT,color,"Rect")
		  s.addShape(brick);
		  //s.removeShape(brick);
		 
	  }
	}else if(level==3){
		for(j=0;j<NBRICKS_PER_ROW;j++)
	  for(i=0;i<NBRICK_ROWS;i++){
		  if(i==0||i==10){
           color="orange";
		   }else if(i==1||i==9){
		   	  if(j==0||j==10){
		   	  	 color="orange";
		   	  	}else{
		   	  		continue;
		   	  	}

		   } else if(i==5){
		   	 continue;
		   }else{
               if(j==0||j==10){
		   	  	 color="orange";
		   	  	}else if(j%2==0){
		   	  		color="green";

		   	  	}else
		   	  	{
		   	  		continue;
		   	  	}

		   }
		   
           
		  var sp=W_inner-((BRICK_WIDTH+BRICK_SEP)*NBRICKS_PER_ROW-BRICK_SEP);
	
		  var x=(BRICK_WIDTH+BRICK_SEP)*j+Math.floor(sp/2);
		  var y=BRICK_Y_OFFSET+(BRICK_HEIGHT+BRICK_SEP)*i;
		  var brick=new shape(x,y,BRICK_WIDTH,BRICK_HEIGHT,color,"Rect")
		  s.addShape(brick);
		  //s.removeShape(brick);
	}
		 
	  

	}else{
       for(j=0;j<NBRICKS_PER_ROW;j++)
	  for(i=0;i<NBRICK_ROWS;i++){
	  	  if(j==3||j==7||j==11||j==15||i==8){
	  	  	continue;
	  	  }
		  if(i==0){
		  	color="red";
            if(j==2||j==3||j==6||j==7||j==11||j==12||j==14||j==15||j==17){
               continue;
            }
		   }
		   if(i==1){
		   	color="orange";
            if(j==1||j==5||j==9||j==10||j==13||j==17){
               continue;
            }
           }	
           if(i==2){
		   	color="yellow";
            if(j==1||j==5||j==9||j==10||j==13||j==17){
               continue;
            }
           }	
           if(i==3){
		   	color="gold";
            if(j==2||j==6||j==10||j==18){
               continue;
            }
           }
           if(i==4){
		   	color="green";
            if(j==2||j==6||j==10||j==18){
               continue;
            }
           }	
           if(i==5){
		   	color="cyan";
            if(j==1||j==5||j==9||j==10||j==13||j==17){
               continue;
            }
           }
           if(i==6){
		   	color="blue";
            if(j==1||j==5||j==9||j==10||j==13||j==17){
               continue;
            }
           }
           if(i==7){
		   	color="purple";
            if(j==2||j==5||j==13||j==17){
               continue;
            }
           }			
            
           if(i==9){
		   	color="red";
            if(j==5||j==8||j==10||j==12||j==13||j==14){
               
            }else{
            	continue;
            }
           }	 	
            if(i==10){
		   	color="orange";
            if(j==4||j==6||j==8||j==10||j==13){
               
            }else{
            	continue;
            }
           }
           if(i==11){
		   	color="yellow";
            if(j==4||j==6||j==8||j==10||j==13){
               
            }else{
            	continue;
            }
           }
           if(i==12){
		   	color="gold";
            if(j==4||j==6||j==8||j==10||j==13){
               
            }else{
            	continue;
            }
           }
            if(i==13){
		   	color="green";
            if(j==4||j==6||j==8||j==10||j==13){
               
            }else{
            	continue;
            }
           }
           if(i==14){
		   	color="cyan";
            if(j==4||j==6||j==8||j==10||j==13){
               
            }else{
            	continue;
            }
           }
           if(i==15){
		   	color="blue";
            if(j==4||j==6||j==8||j==10||j==13){
               
            }else{
            	continue;
            }
           }
           if(i==16){
		   	color="purple";
            if(j==5||j==8||j==9||j==10||j==13){
               
            }else{
            	continue;
            }
           }
		  var sp=(W_inner-((BRICK_WIDTH+BRICK_SEP)*NBRICKS_PER_ROW-BRICK_SEP));

		  var x=(BRICK_WIDTH+BRICK_SEP)*j+Math.floor(sp/2);

		  var y=BRICK_Y_OFFSET+(BRICK_HEIGHT+BRICK_SEP)*i;
		  
		  var brick=new shape(x,y,BRICK_WIDTH,BRICK_HEIGHT,color,"Rect");
		  s.addShape(brick);

	      } 
	  }
	
}


function myBall(){
	
	this.vx=randomX();
	this.vy=-4;
	
	this.ball=new shape(paddle.x+PADDLE_WIDTH/2,paddle.y-BALL_RADIUS,BALL_RADIUS*2,BALL_RADIUS*2,"#0000ff","Ball");
	
	
		
	
}
myBall.prototype.moveBall=function (){
	
	var vx=this.vx;
	var vy=this.vy;
	
	if(this.ball.x+vx-BALL_RADIUS<=0){
		
		this.ball.moveTo(s.ctx,	BALL_RADIUS,this.ball.y+vy);
		//snd.play();
		this.vx*=-1;
	}
	else if(this.ball.x+vx>=W_inner-BALL_RADIUS){
		
		this.ball.moveTo(s.ctx,	W_inner-BALL_RADIUS,this.ball.y+vy);
		//snd.play();
		this.vx*=-1;
	}else if (this.ball.y+vy-BALL_RADIUS<=0){
		this.ball.moveTo(s.ctx,	this.ball.x+vx,BALL_RADIUS);
		this.vy*=-1;
		//snd.play();
		
	}else if (this.ball.y+vy>=H_inner-BALL_RADIUS-10){
		
		this.ball.moveTo(s.ctx,	this.ball.x+vx,H_inner-BALL_RADIUS);
		this.vy*=-1;
		//failure.play();
		lives--;
		s.setLives(lives);
		if(lives==0){

		  stop();
		  lives=3;
		  s.setLives(lives);
		}
		else loseLifeOrGoToNext();

		
	}else if(paddle.contains(this.ball.x-BALL_RADIUS,this.ball.y+BALL_RADIUS)||paddle.contains(this.ball.x+BALL_RADIUS,this.ball.y+BALL_RADIUS)){
		
		this.ball.moveTo(s.ctx,	this.ball.x,paddle.y-BALL_RADIUS-1);
		paddle.draw(s.ctx);
		this.vy=-Math.abs(this.vy);
	} else if(brickCollisions()){
		point+=10;
		s.setScore(point);
		this.vy*=-1;
		if(s.shapes.length==0){
			win.play();
			level++;
			s.setLevel(level);
			if(level>4){
				stop();
			}else{
                loseLifeOrGoToNext();
                nextLevel(level);
                creatBricks();
			}
			
			
		}
		
		
	}
		
	else 
	{
		
		this.ball.moveTo(s.ctx,	this.ball.x+vx,this.ball.y+vy);
	}
		
	
	
	
}


function randomX(){
	
	var a=Math.floor(Math.random()*3+1);
	var b=Math.floor(Math.random()*2);
	if(b===1)
		return a;
	else 
		return -a;
	
	
	
	
}

function brickCollisions(){
	
	  for(var i=0;i<s.shapes.length;i++){
	       
	       if(s.shapes[i].contains(bal.ball.x-BALL_RADIUS,bal.ball.y+BALL_RADIUS)||
		   s.shapes[i].contains(bal.ball.x+BALL_RADIUS,bal.ball.y+BALL_RADIUS)||
		   s.shapes[i].contains(bal.ball.x-BALL_RADIUS,bal.ball.y-BALL_RADIUS)||
		   s.shapes[i].contains(bal.ball.x+BALL_RADIUS,bal.ball.y-BALL_RADIUS)){
		   s.shapes[i].remove(s.ctx);
		   s.shapes.splice(i, 1);
		  console.log(s.shapes.length);
		  return true;
		
	     }
		 
      }
	  return false;
	  
	
	
}
function start(){



	if(!isStarted){
	myTimer =setInterval(function (){bal.moveBall();},10);
	isStarted=true;
	}
	
	
	
}

function loseLifeOrGoToNext(){

isStarted=false;
clearInterval(myTimer);
	bal.ball.moveTo(s.ctx,paddle.x+PADDLE_WIDTH/2,paddle.y-BALL_RADIUS);



}


function stop(){
	clearInterval(myTimer);
	
	bal.ball.remove(s.ctx);
    bal=new myBall();
   bal.ball.draw(s.ctx);
   s.removeAll();
   level=1;
   nextLevel(level);
   creatBricks();
	isStarted=false;
	bal.ball.moveTo(s.ctx,paddle.x+PADDLE_WIDTH/2,paddle.y-BALL_RADIUS);

}






function shape(x,y,width,height,color,type){
	
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.color=color;
	this.type=type;
	
}
shape.prototype.setLocation=function(x,y){
	this.x=x;
	this.y=y;
	
	
}
shape.prototype.contains = function(mx, my) {
  
  return  (this.x <= mx) && (this.x + this.width >= mx) &&
          (this.y <= my) && (this.y + this.height >= my);
}
shape.prototype.draw = function(ctx) {
	
  ctx.fillStyle = this.color;
  if(this.type==="Rect"||this.type==="Paddle"){
	  ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.width, this.height);
	   ctx.closePath();
  }
  if(this.type==="Ball"){
	 // var image=new Image();
	 // var x=this.x;
	  //var y=this.y;
	  //var width=this.width;
	  //var height=this.height;
	   //this.image=new Image();
	//this.image.src="Ball.ico";
	//var image=this.image;
	// this.image.onload = function() {
		 
		
		
		ctx.beginPath();
      ctx.arc(this.x,this.y,BALL_RADIUS,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();
	  
	 
  
	 
	

  }  
  

}
shape.prototype.remove=function(ctx){
	var x=this.x;
	var y=this.y;
	var width=this.width;
	var height=this.height;
	//if(this.type=="Ball"){
	//this.image.onload = function() {
		 
		
		
		
     // ctx.clearRect(x, y, width, height);
		 
	  
	 
    //};
	//}
	//else
	if(this.type=="Ball")
	 ctx.clearRect(x-BALL_RADIUS, y-BALL_RADIUS, width, height);	
   else
	 ctx.clearRect(x, y, width, height);
      
	  
	  
	   
	 
    
	   
	  
	
}
shape.prototype.moveTo=function(ctx,dx,dy){
	
	
	this.remove(ctx);
	this.setLocation(dx,dy);
	this.draw(ctx);
	
}
function canvasState(canvas,canvas1){
    this.canvas=canvas;
	this.canvas1=canvas1;
	this.width = canvas.width;
    this.height = canvas.height;
	this.width1 = canvas1.width;
	this.height2 = canvas1.height;
	this.ctx=canvas.getContext('2d');
	this.ctx1=canvas1.getContext('2d');
	this.shapes=[];
	
	
	
	
}
canvasState.prototype.addShape=function(shape){
	
	 this.shapes.push(shape);
	 shape.draw(this.ctx);
	
}

canvasState.prototype.removeShape=function(shape){
	
	
	
	    for(var i=0;i<this.shapes.length;i++){
	
	       if(this.shapes[i]==shape){
		   this.shapes[i].remove(this.ctx);
		   this.shapes.splice(i, 1);
		
	     }
		 
      }
	  
	
	
}
canvasState.prototype.removeAll=function(){

   var length=this.shapes.length;
	for(var i=0;i<length;i++){
			this.shapes[i].remove(this.ctx);

		}

	this.shapes=[];
}

canvasState.prototype.elementAt=function(x,y){
	
for(var i=0;i<this.shapes.length;i++){
	
	if(this.shapes[i].contains(x,y))
		return this.shapes[i];
	else
		return null;
}
	
}
canvasState.prototype.moveTo=function (shape,x,y){
	
	shape.moveTo(this.ctx,x,y);
	
}
canvasState.prototype.drawText=function(){
   this.ctx1.font = "14px bold Arial";
   this.ctx1.fillText("LIVES",0,60);
   this.ctx1.fillText("SCORE",60,60);
   this.ctx1.moveTo(50,50);
   this.ctx1.lineWidth=8;
   this.ctx1.lineTo(50,100);
   this.ctx1.stroke();
   this.ctx1.lineWidth=1;
   this.ctx1.font = "normal 14px Arial";
   this.ctx1.fillText("LEVEL",350,60);
}
canvasState.prototype.setLives=function(lives){
   
   this.ctx1.fillStyle="black";
   this.ctx1.font = "bold 30px Arial";
   this.ctx1.clearRect(6,60,35,50);
   this.ctx1.lineWidth=8;
   this.ctx1.fillText(lives,24,100);
   this.ctx1.lineWidth=1;
   this.ctx1.font = "normal 14px Arial";
}
canvasState.prototype.setScore=function(score){
	if(isStarted){
   	this.ctx1.fillStyle="blue";
   }
   else {
     this.ctx1.fillStyle="black";
   } 
   this.ctx1.font = "bold 30px Arial";
   this.ctx1.clearRect(60,60,300,50);
   this.ctx1.lineWidth=8;
   this.ctx1.fillText(score,60,100);
   this.ctx1.lineWidth=1;
   this.ctx1.font = "normal 14px Arial";
}
canvasState.prototype.setLevel=function(level){
   this.ctx1.fillStyle="black";
   this.ctx1.font = "bold 30px Arial";
   this.ctx1.clearRect(360,60,30,50);
   this.ctx1.lineWidth=8;
   this.ctx1.fillText(level,360,100);
   this.ctx1.lineWidth=1;
   this.ctx1.font = "normal 14px Arial";
}
function init() {
	//alert(($("#signInModal").data('bs.modal') || {isShown: false}).isShown);
	//var c= document.getElementById("myCanvas");
	//snd= new Audio("bounce.mp3");
	//alert(snd);
	//snd.play();
	////failure=new Audio("failure.wav");
	//win=new Audio("../../audio/Winning-sound-effect.mp3");
  //var image=new Image();
	//image.onload=function (){
		// ctx.drawImage(image, 100, 100);
		
	//};
 //image.src="Ball.ico";
//var s=new canvasState(c);
//var ball=new shape(50,50,24,24,'red',"Rect");
//ball.draw(s.ctx);
//ball.moveTo(s.ctx,10,10);
//s.addShape(ball);
//s.addShape(new shape(100,100,24,24,'red',"Ball"));
//s.addShape(new shape(180,160,24,24,'red',"Ball"));

//s.removeShape(ball);
//alert(s.elementAt(20,30));
//ball.remove(s.ctx);
//s.remove(ctx);
//s.moveTo(ball,280,280);
addPaddle();
s.drawText();
s.setLevel(level);
s.setScore(point);
s.setLives(lives);
bal=new myBall();
bal.ball.draw(s.ctx);

creatBricks();


}
