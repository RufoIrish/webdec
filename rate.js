var fs= require('fs');
exports.getrate= function(req){
    fs.readFile("./provinces/" + req.query.name + ".json", function (e, data) {
        if (e) {
            console.log("errrr");
        }
        var prov = JSON.parse(data);
        var rating = 0;
        if ((req.query.rate * 1) != 0) {
            rating = (((req.query.rate * 1) + (prov.result)) / 2);
        } else {
            rating = (req.query.rate * 1) + (prov.result);
        }
        prov.result = rating;
    
        fs.writeFile("./provinces/" + req.query.name + ".json", JSON.stringify(prov), function (err) {
            if (err) {
                console.log("errrroorrr");
            }
        });
        return rating.toFixed(2);
    });
}
