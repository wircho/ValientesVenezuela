import express from 'express';
var http 					= require('http');
var https 					= require('https');
var bodyParser 				= require('body-parser');
var cookieParser 			= require('cookie-parser');
var session      			= require('express-session');
var mongoose 				= require('mongoose');
var MongoStore 				= require('connect-mongo')(session);
var moment 					= require('moment');
const app 					= express();
var path 					= require('path');
var formidable 				= require('formidable');
var fs 						= require('fs');
const aws 					= require('aws-sdk');
const querystring 			= require('querystring');
import {
//Utilities
  pad,
  def,
  fallback,
  nullFallback,
  err,
  errstr,
  errdict,
  geterr,
  errored,
  projf,
  projff,
//Concurrency Utilities
  Maybe,
//Object utilities
  mutate,
  remove,
  rotate,
  loop
} from 'wircho-utilities';
import {
  QueryItem,
  URLComponents,
  RequestBackEndHelpers,
  RequestHelpers,
  Request,
  request,
  Twitter
} from 'wircho-web-utilities';

//Settings
RequestHelpers.use(RequestBackEndHelpers);

//Babel+Webpack
app.use('/', express.static('public'));

//Request Test (Reddit)
app.get('/reddit/hot', function(req,res) {
	request("GET","https://www.reddit.com/hot.json","json").onLoad(function(data) {
		res.json(data);
	}).onError(function(error) {
		res.json(errdict(error));
	}).send();
});

//Server
app.listen(process.env.PORT || 8080);