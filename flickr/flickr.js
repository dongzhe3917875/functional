$(document).ready(function() {
	var Impure = {
		getJSON: curry((callback, url) => $.getJSON(url, callback)),
		setHtml: curry((set, html) => $(set).html(html))
	}
	var trace = curry((tag, item) => {
		console.log(tag, item)
		return item
	})
	var prop = curry((property, obj) => obj[property])
	var map = curry((f, x) => x.map(f))
	var url = term => 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?'
	// var app = compose(Impure.getJSON(trace("response")), url);

	// app("cats");
	var img = function (url) {
	  return $('<img />', { src: url });
	};
	var mediaUrl = compose(prop('m'), prop('media'))
	var srcs = compose(map(mediaUrl), prop('items'))
	var images = compose(map(img), srcs)
	// srcs 与images合并
	var combineImg = compose(map(img), map(mediaUrl), prop('items'))
	// 再次组合率
	var finalImg = compose(map(compose(img, mediaUrl)), prop('items'))
	// var renderImages = compose(Impure.setHtml('.bodyimage'), trace('url'), images)
	var renderImages = compose(Impure.setHtml('.bodyimage'), trace('url'), finalImg)

	var app = compose(Impure.getJSON(renderImages), url)
	app("resident evil");
	var generate = function (text) {
		zhText = encodeURI(text);
		var html = '';
		html = html + "<audio autoplay=\"autoplay\">"
		html = html + "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text="+ zhText +"\" type=\"audio/mpeg\">"
		html = html + "<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text="+ zhText +"\">"
		html = html + "</audio>"
		console.log(html)
		return html
	}
	var renderAudios = compose(Impure.setHtml('.bodyaudio'), trace('html'), generate)
	renderAudios("哈哈哈")
})
