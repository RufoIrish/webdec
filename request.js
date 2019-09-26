const fs = require('fs');
exports.NumOfRequest = function (res,req,link) {
    fs.appendFile('requestlinks.txt',link+",",function(err){
        if (err) {
            console.log(err)
        }
        fs.readFile('requestlinks.txt',function(err,data){
            if(err) throw err;
             var dataNew = data.toString().split(",");
            var count = dataNew.length - 1;
       
            fs.writeFile('request.txt',count, function(err){
                if (err) throw err;
                console.log('saved!');
            });
        });    
    })
    
  };