var fs =require('fs');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.static('public'));

app.listen(3000);

//body-parser
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// multer
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(reg, file, cb) {
		cb(null, 'public/img');
	},
	filename: function(reg, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	}
})

var upload = multer({storage: storage}).single('imageFile');

app.get('/', function(req, res){
	res.render('mainpage', {data: array});
});

app.get('/admin', function(req, res){
	res.render('addProduct');
});

app.post('/upload', urlencodedParser, function (req, res){
	upload(req, res, function (err){
		var name = req.body.name;
		var description = req.body.description;
		var videoID = req.body.videoID;
		var image = req.file.filename;

		array.push(new Product(name, description, videoID, image));
		res.redirect('/');
	})
});

app.get('/remove/:i', function (req, res){
	var i = req.params.i;
	fs.unlink('./public/img/{$array[i].image}', function() {
		res.redirect('/');
	})
	array.splice(i, 1);
});

app.get('/edit/:i', function (req, res) {
	res.render('edit', {data: array[req.params.i]})
});

var Product = function(name, description, videoID, image){
	this.name = name;
	this.description = description;
	this.videoID = videoID;
	this.image = image;
}
var array = [];
