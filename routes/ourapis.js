var im = require('imagemagick');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var clock = require('clockmodule');


var localClock = require('./mymodule');

/* GET users listing. */
router.get('/',drawSingleColoredTile, squareWithGradient ,writeHour,writeMinute,firstSquareOnLeft,secondSquareOnLeft, outputimage);
// NO TEXT
//router.get('/',drawSingleColoredTile, squareWithGradient ,writeHour,writeMinute,firstSquareOnLeft,secondSquareOnLeft, outputimage);
// TEXT ON TOP
//router.get('/',drawSingleColoredTile, squareWithGradient, writeTextOnTop ,writeHour,writeMinute,firstSquareOnLeft,secondSquareOnLeft, outputimage);
// TEXT ON BOTTOM
//router.get('/',drawSingleColoredTile, squareWithGradient, writeTextOnBottom() ,writeHour,writeMinute,firstSquareOnLeft,secondSquareOnLeft, outputimage);



// router.get('/',drawSingleColoredTile, squareWithGradient, writeTextOnTop , outputimage);
// drawSingleColoredTile,useTiles

router.get('/clock', printClock);

router.get('/clock2', printClock2);

router.get('/clock3', secondClock);

router.get('/date', date);

function getTotalDate(timezone){
    const currDate = new Date();
    const date = new Date(`${currDate} ${timezone}`);
    var hour = date.getHours();
    if(hour < 10){
        hour = '0'+hour.toString();
    }
    var minute = date.getMinutes();
    if(minute < 10){
        minute = '0'+minute.toString();
    }

    var totalDate = hour + '\n' + minute;
    return totalDate;
}

async function secondClock(req,res){
    var data = await localClock.secondClock(
        width = '32', height = '32',
        timezone = 'GMT+2',
        backgroundColorFirst = '#8a2be2', backgroundColorSecond = '#0000FF', color = '#ffffff');
    res.writeHead(200, {'Content-Type' : 'image/png'});
    res.end(data);
}

async function printClock2(req,res){
    var result = await localClock.drawBackground();
//    result = "IL valore del risultato è " + result;
//    res.send(result);
    res.writeHead(200, {'Content-Type' : 'image/png'});
    res.end(result);
}

function date(req, res){
    var timezone = 'GMT+10';
    const currDate = new Date();
    const date = new Date(`${currDate} ${timezone}`);
    console.log(currDate);
    console.log(date);
    res.send(date);
}

async function printClock(req, res){
   /* var data = await localClock.drawClock(
        width = '256', height = '256',
        timezone = 'GMT+2',
        backgroundColorFirst = '#8a2be2', backgroundColorSecond = '#0000FF', color = '#ffffff',
        positionYTitle = 'BOTTOM', title = 'TEN'); */

    var data = await localClock.drawClock(
        width = '16', height = '16',
        timezone = 'GMT+2',
        backgroundColorFirst = '#8a2be2', backgroundColorSecond = '#0000FF', color = '#ffffff');

    res.writeHead(200, {'Content-Type' : 'image/png'});
    res.end(data);
}



var secondColor = '#0000FF';
var firstColor = '#8a2be2';
var textColor = '#ffffff';
var width = '256';
var height = '256';
var tileSize = '18';
var fontSize = '135';
var textXonTop = '+0';
var textYonTop = '+15';
var textXonBottom = '+0';
var textYonBottom = '+35';
var textXonHour = '+0';
var textYonHour = '+15';
var textXonMinute = '+0';
var textYonMinute = '+50';
var textXonFirstPoint = '+20';
var textYonFirstPoint = '-20';
var textXonSecondPoint = '+20';
var textYonSecondPoint = '+20';
var textValue = 'TENTEN';
var hourValue = '20';
var minuteValue = '30';



router.get('/cacca', function(req, res, next) {
    res.send(
        '<form method="POST" action="/ourapis/cacca">' +
        '<input type="text" name="username" placeholder="nome"> ' +
        '<input type="submit"> ' +
        '</form>'
    );
});

function executeRequest(req,res){
    drawSingleColoredTile(req.backgroundColor, outputimage);
}

// positionYTitle --> True top, False bottom
function startingPoint(width = '256', height = '256', timezone = 'GMT+1', textSize = '135',
                       backgroundColorFirst = '#8a2be2', backgroundColorSecond = '#0000FF', color = '#ffffff',
                       positionYTitle, title){

    



}




function drawSingleColoredTile(req,res, next){
    var color = req.body.backgrountColor;
//    var finalColor = color ? color : '#8a2be2';
    var finalColor = '#ffffff';
    var args = [
        '-size',
        tileSize + 'x' + tileSize,
        'xc:' + finalColor,
/*        '-bordercolor',
        'black',
        '-border',
        '1', */
        'tile.png'
    ];
    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}

/*function useTiles(req,res,next){

    var args = [
        'tile.png',
        '-set',
        'option:distort:viewport',
        '250x250+0+0',
        '-virtual-pixel',
        'tile',
        '-filter',
        'point',
        '-distort',
        'SRT',
        '0',
        'final1.png'
    ];
    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });

} */

function squareWithGradient(req, res, next){
    var args = [
        '-size',
        width + 'x' + height ,
        'gradient:' + firstColor + '-' + secondColor,
        'final1.png'
    ];
    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}

function writeTextOnTop(req,res,next){
    var fontsize = '85';
    var args = [
        'final1.png',
        // Questa è la grandezza del font
        '-pointsize',
        fontsize,
        '-gravity',
        'north',
        '-background',
        'transparent',
        //     '-splice',
        //     '0x64',
        '-font',
        //      'Calculator',
        'Digital-7',
        '-fill',
        textColor,
        '-annotate',
        textXonTop + textYonTop,
        textValue,
        'final1.png'
    ];

    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}

function writeTextOnBottom(req,res,next){
    var fontsize = '85';
    var args = [
        'final1.png',
        // Questa è la grandezza del font
        '-pointsize',
        fontsize,
        '-gravity',
        'south',
        '-background',
        'transparent',
        //     '-splice',
        //     '0x64',
        '-font',
        //      'Calculator',
        'Digital-7',
        '-fill',
        textColor,
        '-annotate',
        textXonBottom+ textYonBottom,
        textValue,
        'final1.png'
    ];

    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}

function writeHour(req,res,next){
    var fontsize = '135';
    var args = [
        'final1.png',
        // Questa è la grandezza del font
        '-pointsize',
        fontsize,
        '-gravity',
        'north',
        '-background',
        'transparent',
   //     '-splice',
   //     '0x64',
        '-font',
  //      'Calculator',
        'Digital-7',
      
        '-fill',
        textColor,
        '-annotate',
        textXonHour+textYonHour,
        hourValue,
        'final2.png'
    ];

    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}

function writeMinute(req,res,next){
    var fontsize = '135';
    var args = [
        'final2.png',
        // Questa è la grandezza del font
        '-pointsize',
        fontsize,
        '-gravity',
        'south',
        '-background',
        'transparent',
        //     '-splice',
        //     '0x64',
        '-font',
        //      'Calculator',
        'Digital-7',
        '-fill',
        textColor,
        '-annotate',
        textXonMinute + textYonMinute,
        minuteValue,
        'final3.png'
    ];

    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}

function firstSquareOnLeft(req,res,next){
    var args = [
        'final3.png',
        'tile.png',
        '-gravity',
        'west',
        '-geometry',
        textXonFirstPoint + textYonFirstPoint,
        '-composite',
        'final4.png'
    ];
    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}

function secondSquareOnLeft(req,res,next){
    var args = [
        'final4.png',
        'tile.png',
        '-gravity',
        'west',
        '-geometry',
        textXonSecondPoint + textYonSecondPoint,
        '-composite',
        'final.png'
    ];
    im.convert(args, function(err, stdout){
        if(err) console.log(err);
        console.log("stdout", stdout);
        next();
    });
}
 

/*
        '-font',
        '-helvetica',
 */

function outputimage(req,res){
    fs.readFile('final.png', function(err,data){
       if(err) throw err;
       res.writeHead(200, {'Content-Type' : 'image/png'});
       res.end(data);
    });
}

router.post('/cacca', function(req, res, next) {


    var result = 'Username: ' + req.body.username;

    res.send(result);
});

module.exports = router;
