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
	    }
        else if(d === -1 && e === -1){
            setTimeout(function() {
                drawBear.play(d);
            }, 2000);
            e *= -1;
        }
  	});
    
  	var drawFace = new Vivus('drawFaceImg', {type:'delayed', duration:300, delay:180, start: 'autostart'}, function(c){
        d *= -1;
        console.log("First d = " + d);
        if(d === -1 && e === 1){
            setTimeout(function() {
                drawFace.play(d);
            }, 2000);
            e *= -1;
    	}  
        else if ( d === 1 && e === -1){
            setTimeout(function(){
                drawBear.play(d);
            },800);
        }
  	});
    
    var drawHoliday = new Vivus('drawHolidayImg', {type:'delayed', duration:300, delay:180, start:'autostart'});
});


