var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var moment = require('moment');
var bodyParser = require("body-parser");
var request = require("request");
var lat;
var lng;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', from : '', to: '', pollute: ''});
});
router.get('/aqi', function(req, res, next) {
  res.render('aqi', { title: 'Express', arrCity:[], from: '', to:'' });
});
router.get('/news', function(req, res, next) {
  res.render('news', { title: 'Express',aqi:'', p_city:'', date: '', cat: '', dp:'', pm25:'' , pm25f:'', unit2: '', pm25s: '', pm25a: '', pm10f: '', pm10:'', pm10s:'', pm10a:'', cof:'', co:'', unit1:'', cos:'', coa:'', nf:'', no2:'', no2s:'', no2a:'', of:'' , o3:'', o3s:'', o3a:'', sf:'', so2:'', so2s:'', so2a:'', gp:'', e:'', pw:'', act:'', c:'', ld:'', hd:''});
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});
router.get('/offers', function(req, res, next) {
  res.render('offers', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
}

router.post("/prediction",function(req,res){
  var date=req.body.d;
  if(date==null){
    var dd=new Date();
    date="dd.getMonth()+1"+"/"+"dd.getDate()"+"/"+"dd.getFullYear()";
  }
  date = new Date(date);
  date = convertDate(date);
  console.log(date);
  // date = new Date(date);
  // date = moment(date, 'DD-MM-YYYY');
  // console.log(date);
  var url1="https://maps.googleapis.com/maps/api/geocode/json?address=";
  var url2=",IN&key=AIzaSyBZ1d-vhJFZUo0ikKQvLTR83nv3Y0o9YaI";

  var url3="https://api.breezometer.com/air-quality/v2/current-conditions?lat=";
  var url4="&lon=";
  var url5="&key=a521ca6b073c4b279ce6cd08a5c3101b&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information";
  var cof;
  var nf;
  var of;
  var sf;
  var pm25f;
  var pm10f;

  var unit1;
  var unit2;
  var co;
  var cos;
  var coa;

  var no2;
  var no2s;
  var no2a;

  var o3;
  var o3s;
  var o3a;

  var so2;
  var so2s;
  var so2a;

  var pm10;
  var pm10s;
  var pm10a;

  var pm25;
  var pm25s;
  var pm25a;

  var gp;
  var e;
  var ld;
  var hd;
  var act;
  var pw;
  var c;

  var cat;
  var dp;

  var p_city=req.body.p_c;
  if(!p_city){
    p_city="Noida"
  }
  request(url1+p_city+url2,function(error,response,body){
    if(!error && response.statusCode==200){
      var data1=JSON.parse(body)
      lat=data1["results"][0]["geometry"]["location"]["lat"];
      lng=data1["results"][0]["geometry"]["location"]["lng"];
      // console.log(lat);
      // console.log(lng);
    }
    else{
      res.send("OOOPS!! Something went wrong while fetching location....");
    }
    });
    request(url3+lat+url4+lng+url5,function(error,response,body){
    if(!error && response.statusCode==200){
      data1=JSON.parse(body)
      console.log(lat);
      console.log(lng);
      co =data1["data"]["pollutants"]["co"]["concentration"]["value"];
      no2 =data1["data"]["pollutants"]["no2"]["concentration"]["value"];
      o3 =data1["data"]["pollutants"]["o3"]["concentration"]["value"];
      so2 =data1["data"]["pollutants"]["so2"]["concentration"]["value"];
      pm25 =data1["data"]["pollutants"]["pm25"]["concentration"]["value"];
      pm10 =data1["data"]["pollutants"]["pm10"]["concentration"]["value"];


      cos=data1["data"]["pollutants"]["co"]["sources_and_effects"]["sources"];
      coa=data1["data"]["pollutants"]["co"]["sources_and_effects"]["effects"];

      no2s=data1["data"]["pollutants"]["no2"]["sources_and_effects"]["sources"];
      no2a=data1["data"]["pollutants"]["no2"]["sources_and_effects"]["effects"];

      o3s=data1["data"]["pollutants"]["o3"]["sources_and_effects"]["sources"];
      o3a=data1["data"]["pollutants"]["o3"]["sources_and_effects"]["effects"];

      so2s=data1["data"]["pollutants"]["so2"]["sources_and_effects"]["sources"];
      so2a=data1["data"]["pollutants"]["so2"]["sources_and_effects"]["effects"];

      pm25s=data1["data"]["pollutants"]["pm25"]["sources_and_effects"]["sources"];
      pm25a=data1["data"]["pollutants"]["pm25"]["sources_and_effects"]["effects"];

      pm10s=data1["data"]["pollutants"]["pm10"]["sources_and_effects"]["sources"];
      pm10a=data1["data"]["pollutants"]["pm10"]["sources_and_effects"]["effects"];

      unit1=data1["data"]["pollutants"]["co"]["concentration"]["units"];
      unit2=data1["data"]["pollutants"]["pm10"]["concentration"]["units"];
      gp=data1["data"]["health_recommendations"]["general_population"];
      e=data1["data"]["health_recommendations"]["elderly"];
      ld=data1["data"]["health_recommendations"]["lung_diseases"];
      hd=data1["data"]["health_recommendations"]["heart_diseases"];
      act=data1["data"]["health_recommendations"]["active"];
      pw=data1["data"]["health_recommendations"]["pregnant_women"];
      c=data1["data"]["health_recommendations"]["children"];

      cat=data1["data"]["indexes"]["baqi"]["category"];
      dp=data1["data"]["indexes"]["baqi"]["dominant_pollutant"];

      cof=data1["data"]["pollutants"]["co"]["full_name"];
      nf=data1["data"]["pollutants"]["no2"]["full_name"];
      of=data1["data"]["pollutants"]["o3"]["full_name"];
      sf=data1["data"]["pollutants"]["so2"]["full_name"];
      pm25f=data1["data"]["pollutants"]["pm25"]["full_name"];
      pm10f=data1["data"]["pollutants"]["pm10"]["full_name"];
      // console.log(pw);
    }
    else{
      res.send("OOOPS!! Something went wrong during fetching other data and recommendations....");
    }
  });
  exec('python ../MLData/project.py \"'+date+'\" \"'+p_city+'\"', function(error, stdout, stderr){
     if(error) throw error;
     else{
  		 var aqis = "";
  		 var aqir = stdout;
       var temp ;
  		 for(i=0;i<aqir.length;i++)
  		 {
  			 if(aqir[i]>="0" && aqir[i]<="9")
  			 {
  				 temp = aqir[i] ;
  				 aqis = aqis + temp ;
  			 }
         else if(aqir[i]==".")
         {
           break;
         }
  		 }
       res.render("news",{aqi:aqis, p_city:p_city, date: date, co:co, no2:no2, o3:o3, so2:so2 , pm25:pm25, pm10:pm10, gp:gp, e:e, ld:ld, hd:hd, act:act, pw:pw, c:c, unit1:unit1, unit2:unit2, cat:cat, dp:dp, cof:cof, sf:sf, of:of, nf:nf, pm25f:pm25f, pm10f:pm10f, cos:cos, coa:coa, no2s:no2s, no2a:no2a, so2s:so2s, so2a:so2a, o3s:o3s, o3a:o3a, pm25s:pm25s, pm25a:pm25a, pm10s:pm10s, pm10a:pm10a});
     }
   });
});
router.post("/addpoints",function(req,res){
  var city=[];
  var arrSD=[];
  var array1=[];
  var from = req.body.sr;
  var to= req.body.dn;
  var pollute = req.body.p;
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
       for (var i = 0; i < array1.length; i++) {
         city[i]=array1[i]
       }
       console.log(city[0]);
       if(!city[0]){
         var tempCity = [];
         tempCity.push(from+", IN");
         tempCity.push(to+", IN");
         res.render("aqi",{arrCity:tempCity, from: from, to:to});
       }
       else{
         res.render("aqi",{arrCity:city, from: from, to:to});
       }
       console.log(city[0])
     }
   });
});
module.exports = router;
