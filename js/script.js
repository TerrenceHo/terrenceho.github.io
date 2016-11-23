$(document).ready(function(){
	var d = 1;
    var e = 1;
    var drawBear = new Vivus('drawBearImg', {type:'delayed', duration: 400, delay: 180,start:'autostart'},
    function(c){
        d *= -1;
        if(d == 1 && e == 1){
            setTimeout(function(){
                drawBear.play(d)
            },800);
	    }
        else if(d == -1 && e == 1){
            drawBear.play(d);
    	}
    });
    
  	var drawFace = new Vivus('drawFaceImg', {type: 'delayed', duration: 400, delay: 180, start: 'autostart'}, function(c){
        d *= -1;
        if(d == 1 && e == 1){
            setTimeout(function(){
                drawFace.play(d)
            },800);
	    }
        else if(d == -1 && e == 1){
            drawFace.play(d);
    	}
        else if(d == 1 && e == -1){
            setTimeout(function(){
            drawBear.play(d)
            },800);
        }
        else if (d==-1 && e == -1){
            drawBear.play(d);
        }
  	});
});