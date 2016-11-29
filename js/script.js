//$(document).ready(function(){
//    var e = 1;
//	var d = -1;
//    
////    var drawBear = new Vivus('drawBearImg', {type:'delayed', duration: 300, delay:180});
////    drawBear.stop();
////    drawBear.reset();
////    drawBear.play(1,function(){
////        drawBear.play(-1);
////    });
////    drawBear.finish();
////    drawBear.play(-1);
//    var drawBear = new Vivus('drawBearImg', {type:'delayed', duration: 300, delay:180,start:'manual'});
//    
//  	var drawFace = new Vivus('drawFaceImg', {type:'delayed', duration:300, delay:180, start: 'manual'}); 
//    
//    setTimeout(function(){
//        drawFace.play();
//    }, 3000);
//    drawFace.stop();
////    drawFace.play(d);
//});




//
//$(document).ready(function(){
//	var d = 1;
//    var e = 1;
//    var drawBear = new Vivus('drawBearImg', {type:'delayed', duration: 300, delay:180,start:'manual'}, function(){
//        console.log("drawing bear");
//    });
//    
//  	var drawFace = new Vivus('drawFaceImg', {type:'delayed', duration:300, delay:180, start: 'autostart'}, function(c){
//        d *= -1;
//        console.log("First d = " + d);
//        if(d === 1 && e === 1){
//            setTimeout(function(){
//                drawFace.play(d);
//            },800);
//            console.log("d = " + d);
//            console.log("e = " + e);
//	    }
//        else if(d === -1 && e === 1){
//            drawFace.play(d);
//            console.log("d = " + d);
//            console.log("e = " + e);
//            e *= -1;
//    	}  
//        else if ( d === 1 && e === -1){
//            setTimeout(function(){
//                drawBear.play(d);
//            },800);
//            console.log("drawing bear");
//            console.log("d = " + d);
//            console.log("e = " + e);
//        }
//        else if(d === -1 && e === -1){
//            drawBear.play(d);
//            console.log("d = " + d);
//            console.log("e = " + e);
//            e *= -1;
//        }
//  	});
//});




$(document).ready(function(){
	var d = 1;
    var e = 1;
    var drawBear = new Vivus('drawBearImg', {type:'delayed', duration: 300, delay:180,start:'manual'}, 
                             function(c){
        d *= -1;
        console.log("First d = " + d);
        if(d === 1 && e === 1){
            setTimeout(function(){
                drawFace.play(d);
            },800);
            console.log("d = " + d);
            console.log("e = " + e);
	    }
        else if(d === -1 && e === -1){
            drawBear.play(d);
            console.log("d = " + d);
            console.log("e = " + e);
            e *= -1;
        }
  	});
    
  	var drawFace = new Vivus('drawFaceImg', {type:'delayed', duration:300, delay:180, start: 'autostart'}, function(c){
        d *= -1;
        console.log("First d = " + d);
        if(d === -1 && e === 1){
            drawFace.play(d);
            console.log("d = " + d);
            console.log("e = " + e);
            e *= -1;
    	}  
        else if ( d === 1 && e === -1){
            setTimeout(function(){
                drawBear.play(d);
            },800);
            console.log("drawing bear");
            console.log("d = " + d);
            console.log("e = " + e);
        }
  	});
});


//$(document).ready(function(){
//	var d = 1;
//    var drawBear = new Vivus('drawBearImg', {start:'autostart', speed:300}, function(c){
//        d *= -1;
//        if(d == 1){
//            setTimeout(function(){
//                drawBear.play(d)
//            },800);
//            console.log(d);
//	    }
//        else if(d == -1){
//            drawBear.play(d);
//            console.log(d);
//    	}
//    });
//    
//  	var drawFace = new Vivus('drawFaceImg', {start:'autostart', speed:300}, function(c){
//        d *= -1;
//        if(d == 1){
//            setTimeout(function(){
//                drawFace.play(d)
//            },800);
//            console.log(d);
//	    }
//        else if(d == -1){
//            drawFace.play(d);
//    	}
//  	});
//    
//});
//
