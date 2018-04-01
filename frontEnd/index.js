function myfunction () {
	var message=document.getElementsByName("message");
	for (var i = 0; i < message.length; i++) {
  	  	console.log(message[i].value);
	}
}