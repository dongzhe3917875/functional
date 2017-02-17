function helloWorld(ready) {
	return new Promise(function(resolve, reject) {
		if (ready) {
			resolve("Hello World!");
		} else {
			reject("Good bye!");
		}
	});
}

helloWorld(true).then(function(message) {
	alert(message);
}, function(error) {
	alert(error);
});