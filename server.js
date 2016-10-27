var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.resolve("./")));

function renderMetaData(viewname){
	console.log(viewname);
	var data = JSON.parse(fs.readFileSync('views/metadata.json', 'utf-8'));
	if(data){
		return { 
			dir: viewname,
			title: data.views[viewname].metadata.title, 
			description: data.views[viewname].metadata.description,
			keywords: data.views[viewname].metadata.keywords,
			robots: data.views[viewname].metadata.robots,
			pragma: data.views[viewname].metadata.pragma,
		}
	}
}

app.get('/', function(req,res){
	//console.log(req.url);
	//console.log(req.originalUrl.split("/")[1]);
	res.render('index', renderMetaData('home'));
});

app.get('/profile', function(req,res){
	res.render('index', renderMetaData('profile'));
});

app.get('/another', function(req,res){
	res.render('index', renderMetaData('another'));
});

app.get('*', function(req,res){
	//res.status(404).send('server 404; we can also throw to our application level error handler from a server side 404');
	//res.render('index', renderMetaData('error'));
	res.status(404).render('index', renderMetaData('error'));
});

var port = process.env.PORT || 3001;
var server = app.listen(port, function(){
	console.info('Listening on port:', port);
});