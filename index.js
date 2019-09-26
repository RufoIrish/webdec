const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
// const router = express.Router();
const request = require('./request');


app.set('view engine', 'pug');
app.set('views', './views');

app.use(function (req, res, next) {
    // console.log(req.originalUrl)
    // this.listOfreq.push(req.originalUrl);


    request.NumOfRequest(res, req, req.originalUrl);
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname,'scripts')));

app.get('/provinces/:provinceName', function (req, res) {

    fs.readFile("./provinces/" + req.params.provinceName + ".json", function (e, data) {
        if (e) {
            console.log(e);
        }
        var newData = JSON.parse(data);
        res.render('index', { sName: newData.shortname, name: req.params.provinceName, image: newData.image[0], image1: newData.image[1], image2: newData.image[2], group: newData.group, population: newData.population, delicacies: newData.delicacies, history: newData.history, result: newData.result });
    });
    // console.log(req.params.provinceName + ".json");
});

app.get('/rate', function (req, res) {
    // console.log(req.query.name);
    fs.readFile("./provinces/" + req.query.name + ".json", function (e, data) {
        if (e) {
            console.log("errrr");
        }
        var prov = JSON.parse(data);
        var rating = 0;
        if ((req.query.rate * 1) != 0) {
            rating = ((req.query.rate * 1) + (prov.result)) / 2;
        } else {
            rating = (req.query.rate * 1) + (prov.result);
        }
        prov.result = rating;

        fs.writeFile("./provinces/" + req.query.name + ".json", JSON.stringify(prov), function (err) {
            if (err) {
                console.log("errrroorrr");
            }
        });
        res.writeHead(202, { 'Content-Type': 'text/plain' });
        res.end(rating.toFixed(2)+"");

    });

});
app.listen(process.env.port || 3006);
console.log('Running at Port 3006');