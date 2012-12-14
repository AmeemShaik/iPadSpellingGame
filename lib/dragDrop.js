$.fn.draggable = function() {	   
	    //a variable to  
        var offset = null;

		//function to handle a touch start
        var start = function(e) {
      	  //prevent default handling
          e.preventDefault();
          var id = $(this).attr("id");
          
          //stop the jquery transit transition and set the position
		  var matrix = $("#"+id).css("-webkit-transform");
		  var values = matrix.split('(')[1].split(')')[0].split(',');
		  this.style['WebkitTransition'] = null;
		  $("#"+id).css({"x":values[4]+"px"});
	      $("#"+id).css({"y":values[5]+"px"});
	      
	      //find the x and y location at which you clicked on
          var orig = e.originalEvent;
          var pos = $(this).position();
          //set the offset variable to the respective locations
          offset = {
            x: orig.changedTouches[0].pageX - pos.left,
            y: orig.changedTouches[0].pageY - pos.top
          };
      
        };
        
        var move = function(e) {
          e.preventDefault();
          var orig = e.originalEvent;
          $(this).css({
            y: orig.changedTouches[0].pageY - offset.y,
            x: orig.changedTouches[0].pageX - offset.x
          });
        };
        
        // create an event to signal a drop over the droppable
		var dropEvt = document.createEvent('Event');
		// define that the event name is `build`
		dropEvt.initEvent("dropped", true, true);
		
        //check to see if its over the droppable container
        //if so, fire an event
        var stop = function(e){
        	var orig = e.originalEvent;
        	var dragLocation = 
        	{
        		x: orig.changedTouches[0].pageX,
            	y: orig.changedTouches[0].pageY
        	}
			var dropLocation = $("#droppable").position();
			var width = $("#droppable").width();
        	var height = $("#droppable").height();
        	//is the letter over the droppable
			if(
				(dragLocation.x > dropLocation.left)&&
				(dragLocation.x < (dropLocation.left + width))&&
				(dragLocation.y > dropLocation.top)&&
				(dragLocation.y < (dropLocation.top + height)))
				{
					//if so, fire the dropped event
					this.dispatchEvent(dropEvt);
				}
        };

        
        $(this).on("touchstart", start);
        $(this).on("touchmove", move);
        $(this).on("touchend", stop);
};