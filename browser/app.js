var socket = io(window.location.origin); 
socket.on('connect',function(){
	whiteboard.on('draw',function(start,end,strokeColor){
		socket.emit('draw',start,end,strokeColor);

	})
	whiteboard.on('clear',function(){
		socket.emit('clear'); 
	})
}); 
socket.on('draw', function(start, end, strokeColor){
	whiteboard.draw(start, end, strokeColor, false);
})
socket.on('drawAll', function(drawingsArr){
	drawingsArr.forEach(function(drawData){
		whiteboard.draw.apply(null, drawData);
	});
})
socket.on('clearAll',function(drawingsArr){
	console.log('clear all called'); 
	drawingsArr.forEach(function(drawData){
		whiteboard.draw(drawData[0],drawData[1],"white",false);
	})

})