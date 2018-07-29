var express= require('express');
var app= express();
var path =require('path');
var bodyPaser=require('body-parser');
var multer =require('multer');
var jimp =require('jimp');


var imgname;
var storage = multer.diskStorage({
	destination: './assets/uploads',
	filename: function (req, file, callback) {
         imgname=Date.now();
        callback(null,imgname+'.jpg');
	}
});


var upload = multer({ storage : storage }).single('meme');

var server=app.listen(3000);
app.set('view engine','ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyPaser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render('index',{});
});

app.post('/upload',function(req,res,next){
   
    upload(req,res,function(err) {
        
        let h,w;
        var image=new jimp('assets/uploads/'+imgname+'.jpg',function(err,i){
            w=i.bitmap.width;
            h=i.bitmap.height;
            
            res.render('some',{'data':imgname,'text':req.body,'h':h,'w':w});
        });
        
		
	 });
    
        
    
    
    
});