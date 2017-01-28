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
var renderImages = compose(Impure.setHtml('body'), trace('url'), images)
var app = compose(Impure.getJSON(renderImages), url)
app("resident evil");
