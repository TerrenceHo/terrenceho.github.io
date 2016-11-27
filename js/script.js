var e = 1;
$(document).ready(function(){
	var d = 1;
    var drawBear = new Vivus('drawBearImg', {type:'delayed', duration: 300, delay:180,start:'manual'});
    
  	var drawFace = new Vivus('drawFaceImg', {type:'delayed', duration:300, delay:180, start: 'autostart'}, function(c){
        d *= -1;
        console.log("First d = " + d);
        if(d == 1 && e == 1){
            setTimeout(function(){
                drawFace.play(d)
            },800);
            console.log("d = " + d);
            console.log("e = " + e);
	    }
        else if(d == -1 && e == 1){
            drawFace.play(d);
            console.log("d = " + d);
            console.log("e = " + e);
            e *= -1;
    	}  
        else if ( d == 1 && e == -1){
            setTimeout(function(){
                drawBear.play(d)
            },800);
            console.log("d = " + d);
            console.log("e = " + e);
        }
        else if(d == -1 && e == -1){
            drawBear.reset();
            drawBear.finish();
            drawBear.play(d);
            console.log("d = " + d);
            console.log("e = " + e);
            e *= -1;
        }
  	});
});




//$(document).ready(function(){
//	var d = 1;
//    var drawBear = new Vivus('drawBearImg', {type:'delayed', duration: 500, delay:180,start:'autostart'},
//    function(c){
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
//  	var drawFace = new Vivus('drawFaceImg', {type:'delayed', duration:500, delay:180, start: 'autostart'}, function(c){
//        d *= -1;
//        if(d == 1){
//            setTimeout(function(){
//                drawFace.play(d)
//            },800);
//	    }
//        else if(d == -1){
//            drawFace.play(d);
//    	}
//  	});
//});