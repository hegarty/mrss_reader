ora_js = {};

ora_js.AWS = require('aws-sdk');
ora_js.AWS.config.update({accessKeyId: 'AKIAIXWFTTMHQKL6TPUA', secretAccessKey: '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'});
ora_js.AWS.config.update({region: 'us-east-1'});

ora_js.dynamodb = new ora_js.AWS.DynamoDB();
ora_js.s3 = new ora_js.AWS.S3();

ora_js.usw = new ora_js.AWS.S3({region: 'us-east-1'});

var pg = require("pg");
ora_js.cn = "pg://postgres:sheba1810@th.ora.tv:5432/oratv_dev";

//ora_js.feedparser = require('feedparser');

ora_js.request = require('request');

var express = require('express');
app = express();
//app.use(express.bodyParser());
//app.use(express.favicon(__dirname + '/public/favicon.ico'));

app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

var server = app.listen(1810);
console.log('Listening on port 1810 ');

app.use(express.static(__dirname + '/public'));

var util	= require('./routes/util.js');
var reader 	= require('./routes/reader.js')(app);
