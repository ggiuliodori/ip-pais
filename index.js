const express = require("express");
const path = require('path');

var geoip = require('geoip-lite');


const app = express();
const bodyParser = require("body-parser");
const portService = 3030;

//archivos static::  la carpeta raiz donde el navegador obtendra sus recuros
app.use(express.static(path.join(__dirname,'public')));



// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);




app.get('/getpais.json', function (req, res) {
  console.log("input=" + req.headers['x-real-ip']);
  var ip = req.headers['x-real-ip'];

  if ( !(ip && ip.length>8) ) {
	  res.json({IP: '0.0.0.0', country:"US", status:"error"});
	  return;
  }	

  var lindex = ip.lastIndexOf(':');
  if (lindex>0 ) {
	  ip = ip.substring(lindex+1,100);
  }
  
  var geo = geoip.lookup(ip);
  if (geo) geo = geo.country;
  res.json({IP: ip, country:geo, status:"ok"});
});

app.listen(portService, () => {
  console.log("Server is running on port "+portService);
});