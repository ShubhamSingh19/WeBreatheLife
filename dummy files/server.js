var express = require('express');
var app = express();
var exec = require('child_process').exec;
app.use(express.json({limit: '500mb', parameterLimit: 1000000}));       // to support JSON-encoded bodies
app.use(express.urlencoded({limit: '500mb', parameterLimit: 1000000})); // to support URL-encoded bodies
var path = require('path');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Ritik');
mongoose.connection.on('connected',()=>{
				console.log('connected to database');
			});

app.get('/', function(req, res, next){
  res.sendFile((path.join(__dirname+'/dataAQI.html')));
});

var schema = new mongoose.Schema({ name: 'string',
   latitude: 'Number',
   longitude: 'Number'
}, {strict: false});
var ex = mongoose.model('data', schema);
app.post('/addData', function(req, res, next){
  console.log(req.body);
  console.log(req.body.e);
  console.log('doing');
  ex.create(req.body.e, function(error, results){
    if(error) throw error;
    else{
      console.log(results);
      res.send('1');
    }
  });
});

var from  = 'Gajuwaka';
var to = 'Nalgonda';
var pollute = 'pm10';
exec('python abcde1.py \"'+from+'\" \"'+to+'\" \"'+pollute+'\"', function(error, stdout, stderr){
   if(error) throw error;
   else{
		 var ans2 = "";
		 var ans3 = stdout;
		 var i = 0;
		 var ritik = "" ;
		 ans3 = ans3.replace(/'/g,' ');
		 ans3 = ans3.replace(/,/g,' ');
		 for(i=2;i<ans3.length;i++)
		 {
			 if((ans3[i]>="a" && ans3[i]<="z") || (ans3[i]>="A" && ans3[i]<="Z") || ans3[i]==" ")
			 {
				 ritik = ans3[i] ;
				 ans2 = ans2+ritik ;
			 }
		 }
		 var count=0;
		 var ishan=""
		 for(j=0;j<ans2.length;j++)
		 {
			 if(ans2[j]!=" ")
			 {
				 ishan+=ans2[j];
			  }
				else if(ans2[j]==" ")
				{
					if((ans2[j+1]>="a" && ans2[j+1]<="z") || (ans2[j+1]>="A" && ans2[j+1]<="Z"))
					{
						ishan+=" ";
					}
				}
		 }
		 array1 = ishan.split(" ");
		 console.log(array1);
		 for(i=0;i<array1.length;i++)
		 {
			 //jobhivar = array1[i];
		 }
     console.log(stderr);
   }
 });

app.listen('5000', function(){
  console.log('running');
});
