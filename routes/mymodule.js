var im = require('imagemagick');
var fs = require('fs');


exports.drawClock = drawClock;
exports.secondClock = drawClockCaption;




//  'gradient:' + firstColor + '-' + secondColor,
// gradient:${backgroundColorFirst}-${backgroundColorSecond}
//-background ${backgroundColorFirst}
 


async function drawClockCaption(width, height,
                                timezone,
                                backgroundColorFirst, backgroundColorSecond,
                                color,
                                positionYTitle, title){


    
    // setting default values
    if(!backgroundColorFirst){
        backgroundColorFirst = '#8a2be2';
    }

    if(!backgroundColorSecond){
        backgroundColorSecond = '#0000FF';
    }

    if(!color){
        color = '#ffffff';
    }
    

    var boolPosition = checkInputs(width, height,
        timezone,
        backgroundColorFirst, backgroundColorSecond,
        color,
        positionYTitle, title);

    var date = getTotalDate(timezone);
    var fontPath = './small53.ttf';

    if(title){
        if(boolPosition){
            // TEXT ON TOP
            date = title + '\n' + date;
        }else{
            // TEXT ON BOTTOM
            date = date + '\n' + title
        }
    }

    var pointSize = '8';
    if(width == '32'){
        pointSize = '16';
    }

    var twopoints = ':';
    var twoPointsImage = `-size ${width}x${height} -background transparent -fill ${color} -font ${fontPath} -pointsize ${pointSize} -gravity west caption:${twopoints}`;
    var backgroundImage = `-size ${width}x${height} gradient:${backgroundColorFirst}-${backgroundColorSecond}`;
    var textImage = `-size ${width}x${height} -background transparent -fill ${color} -font ${fontPath} -pointsize ${pointSize} -gravity center caption:${date}`;

    var args = `${backgroundImage} ( ${textImage} ) ( ${twoPointsImage} ) -layers merge -antialias png:-`.split(' ');

    console.log("INIZIO A CREARE IMMAGINE");
    return new Promise(async function(resolve, reject) {
        im.convert(args, function (err, data) {
            console.log("IMMAGINE CREATA");
            if (err) throw err;
            var img = Buffer.from(data, 'ascii');
            resolve(img);
        });
    });

}


function getTotalDate(timezone){
    const currDate = new Date();
    const date = new Date(`${currDate} ${timezone}`);
    var hour = date.getHours();

    if(hour < 10){
        hour = '0'+hour.toString();
    }else{

    }

    var minute = date.getMinutes();
    if(minute < 10){
        minute = '0'+minute.toString();
    }else{

    }

    var totalDate = hour + '\n' + minute;
    return totalDate;
}






function checkInputs(width, height,
                     timezone,
                     backgroundColorFirst, backgroundColorSecond,
                     color,
                     positionYTitle, title){

    if(!width){
        throw new Error('WIDTH parameter not inserted');
    }
    if(!height){
        throw new Error('HEIGHT parameter not inserted');
    }

    if(!timezone){
        throw new Error('Timezone parameter not inserted');
    }

    if(!timezone.includes('GMT+')){
        throw new Error('Timezone not inserted in format GMT+ ');
    }


    var reg=/^#([0-9a-f]{3}){1,2}$/i;

    if(!reg.test(backgroundColorFirst)){
        throw new Error('BackgroundColorFirst is not a valid Color');
    }

    if(!reg.test(backgroundColorSecond)){
        throw new Error('BackgroundColorSecond is not a valid Color');
    }

    if(!reg.test(color)){
        throw new Error('Color is not a valid Color');
    }



    if(isNaN(width)){
        throw new Error('Width is not a number');
    }

    if(isNaN(height)){
        throw new Error('Height is not a number');
    }
    
    var num = Number.parseInt(width);
    if(num < 0){
        throw new Error('Width is less than 0');
    }


    var num = Number.parseInt(height);
    if(num < 0){
        throw new Error('Height is less than 0');
    }

    var position;
    try{
        if(positionYTitle !== undefined) {
            position = positionYTitle.toLowerCase();
        }
    }catch(err){
        throw new Error('PositionYTitle is not a string');
    }

    var boolPosition = false;
    if(position !== undefined){
        if(position !== 'top' && position !== 'bottom'){
            throw new Error('PositionYTitle has neither bottom or top value, but ' + positionYTitle);
        }
        boolPosition = position === 'top' ? true : false;
    }

    return boolPosition;

}


async function drawClock(width, height,
                         timezone,
                         backgroundColorFirst, backgroundColorSecond,
                         color,
                         positionYTitle, title){

    if(!width){
        throw new Error('WIDTH parameter not inserted');
    }
    if(!height){
        throw new Error('HEIGHT parameter not inserted');
    }

    if(!timezone){
        throw new Error('Timezone parameter not inserted');
    }

  


    var fontPath = './Tkachevica-4px Regular.ttf';


    if(!backgroundColorFirst){
        backgroundColorFirst = '#8a2be2';
    }

    if(!backgroundColorSecond){
        backgroundColorSecond = '#0000FF';
    }

    if(!color){
        color = '#ffffff';
    }

    if(!timezone.includes('GMT+')){
        timezone = 'GMT+1';
        throw new Error('Timezone not inserted in format GMT+ ');
    }


    var reg=/^#([0-9a-f]{3}){1,2}$/i;

    if(!reg.test(backgroundColorFirst)){
        throw new Error('BackgroundColorFirst is not a valid Color');
    }

    if(!reg.test(backgroundColorSecond)){
        throw new Error('BackgroundColorSecond is not a valid Color');
    }

    if(!reg.test(color)){
        throw new Error('Color is not a valid Color');
    }



    if(isNaN(width)){
        throw new Error('Width is not a number');
    }

    if(isNaN(height)){
        throw new Error('Height is not a number');
    }

/*    if(isNaN(textSize)){
        throw new Error('TextSize is not a number');
    } */

    var num = Number.parseInt(width);
    if(num < 0){
        throw new Error('Width is less than 0');
    }


    var num = Number.parseInt(height);
    if(num < 0){
        throw new Error('Height is less than 0');
    }



    var num = Number.parseInt(textSize);
    if(num < 0){
        throw new Error('textSize is less than 0');
    }


    var position;
    try{
        if(positionYTitle !== undefined) {
            position = positionYTitle.toLowerCase();
        }
    }catch(err){
        throw new Error('PositionYTitle is not a string');
    }

    var boolPosition = false;
    if(position !== undefined){
        if(position !== 'top' && position !== 'bottom'){
            throw new Error('PositionYTitle has neither bottom or top value, but ' + positionYTitle);
        }
        boolPosition = position === 'top' ? true : false;
    }


    var offsetXText = '+0';
    var offsetYText = '+15';
    var textXonHour = '+0';
    var textYonHour = '+15';
    var textXonMinute = '+0';
    var textYonMinute = '+50';
    var textXonFirstPoint = '+20';
    var textYonFirstPoint = '-20';
    var textXonSecondPoint = '+20';
    var textYonSecondPoint = '+20';
    var textPresent = false;

    var textSize = width/1.9;

    var finalTextSize;

    if(title){
        textPresent = true;
        
        finalTextSize = textSize*0.62963;
        if(boolPosition){
            // here we have text on top
            // TEXT
            offsetXText = '+0';
            offsetYText = getNumberWithSign(height*0.05859375);

            // HOUR
            textXonHour = '+0';
            textYonHour = getNumberWithSign(height*0.3515625);

            // MINUTE
            textXonMinute = '+0';
            textYonMinute = getNumberWithSign(height*0.17578125);


            // FIRST POINT
            textXonFirstPoint = getNumberWithSign(width*0.078125);
            textYonFirstPoint = getNumberWithSign(height*0.0390625);

            // SECOND POINT
            textXonSecondPoint = getNumberWithSign(width*0.078125);
            textYonSecondPoint = getNumberWithSign(height*0.1953125);
        }else{
            // here we have text on bottom
            // TEXT
            offsetXText = '+0';
            offsetYText = getNumberWithSign(height*0.13671875);

            // HOUR
            textXonHour = '+0';
            textYonHour = getNumberWithSign(height*0.05859375);

            // MINUTE
            textXonMinute = '+0';
            textYonMinute = getNumberWithSign(height*0.44921875);

            // FIRST POINT
            textXonFirstPoint = getNumberWithSign(width*0.078125);
            textYonFirstPoint = getNumberWithSign(-height*0.21484375);

            // SECOND POINT
            textXonSecondPoint = getNumberWithSign(width*0.078125);
            textYonSecondPoint = getNumberWithSign(-height*0.05859375);
        }
    }else{
        // Here we don't have the text
        // HOUR
        textXonHour = '+0';
   //     textYonHour = getNumberWithSign(height*0.05859375);
         textYonHour = getNumberWithSign(height*0.00000375);


        // MINUTE
        textXonMinute = '+0';
  //      textYonMinute = getNumberWithSign(height*0.1953125);
       textYonMinute = getNumberWithSign(height*0.0000025);

        // FIRST POINT
        textXonFirstPoint = getNumberWithSign(width*0.078125);
        textYonFirstPoint = getNumberWithSign(-height*0.078125);

        // SECOND POINT
        textXonSecondPoint = getNumberWithSign(width*0.078125);
        textYonSecondPoint = getNumberWithSign(height*0.078125);
    }

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
    const tileSize = width*0.05859375;



    if(!finalTextSize){
        finalTextSize = textSize;
    }

    return new Promise(async function(resolve, reject) {
        var coloredTile = await drawSingleColoredTile(color, tileSize,backgroundColorFirst,
            backgroundColorSecond,width,height,textPresent,boolPosition,
            finalTextSize,color,title,
            hour, minute,
            offsetXText,offsetYText,
            textXonHour, textYonHour,
            textXonMinute, textYonMinute,
            textXonFirstPoint, textYonFirstPoint,
            textXonSecondPoint, textYonSecondPoint, fontPath);

        resolve(coloredTile);
    });




}

function getNumberWithSign(n){
    return (n<0?"":"+") + n;
}

// This tile is used to draw little squares
// Used to represent two dots on the left of the clock
async function drawSingleColoredTile(finalColor , size,
                                     firstColor,
                                     secondColor,
                                     width,
                                     height,
                                     textPresent, textPosition,
                                     fontSize,fillColor,text,
                                     hourText, minuteText,
                                     offsetXText,offsetYText,
                                     offsetXHour,offsetYHour,
                                     offsetXMinute,offsetYMinute,
                                     offsetXFirstPoint,offsetYFirstPoint,
                                     offsetXSecondPoint,offsetYSecondPoint, fontPath){
    var args = [
        '-size',
        size + 'x' + size,
        'xc:' + finalColor,
        /*        '-bordercolor',
                'black',
                '-border',
                '1', */
        'tile.png'
    ];
    return new Promise(function(resolve, reject) {
        im.convert(args, async function(err, stdout){
            if(err) console.log(err);
            var bg = await background(firstColor,
                secondColor ,
                width,
                height,
                textPresent, textPosition,
                fontSize,fillColor ,text,
                hourText, minuteText,
                offsetXText,offsetYText,
                offsetXHour,offsetYHour,
                offsetXMinute,offsetYMinute,
                offsetXFirstPoint,offsetYFirstPoint,
                offsetXSecondPoint,offsetYSecondPoint);

            resolve(bg);
        });
    });

}
function getNumberWithSign(n){
    return (n<0?"":"+") + n;
}

// This tile is used to draw little squares
// Used to represent two dots on the left of the clock
async function drawSingleColoredTile(finalColor , size,
                               firstColor,
                               secondColor,
                               width,
                               height,
                               textPresent, textPosition,
                               fontSize,fillColor,text,
                               hourText, minuteText,
                               offsetXText,offsetYText,
                               offsetXHour,offsetYHour,
                               offsetXMinute,offsetYMinute,
                               offsetXFirstPoint,offsetYFirstPoint,
                               offsetXSecondPoint,offsetYSecondPoint, fontPath){
    var args = [
        '-size',
        size + 'x' + size,
        'xc:' + finalColor,
        /*        '-bordercolor',
                'black',
                '-border',
                '1', */
        'tile.png'
    ];
    return new Promise(function(resolve, reject) {
        im.convert(args, async function(err, stdout){
            if(err) console.log(err);
            var bg = await background(firstColor,
                secondColor ,
                width,
                height,
                textPresent, textPosition,
                fontSize,fillColor ,text,
                hourText, minuteText,
                offsetXText,offsetYText,
                offsetXHour,offsetYHour,
                offsetXMinute,offsetYMinute,
                offsetXFirstPoint,offsetYFirstPoint,
                offsetXSecondPoint,offsetYSecondPoint, fontPath);
         
            resolve(bg);
        });
    });

}




// Used to create the background of the clock
// Default is gradient from #8a2be2 to #0000FF
// To create a monocolored background set @firstColor and @secondColor with same value
async function background(firstColor,
                    secondColor,
                    width,
                    height,
                    textPresent,
                    textPosition,
                    fontSize,fillColor,text,
                    hourText, minuteText,
                    offsetXText,offsetYText,
                    offsetXHour,offsetYHour,
                    offsetXMinute,offsetYMinute,
                    offsetXFirstPoint,offsetYFirstPoint,
                    offsetXSecondPoint,offsetYSecondPoint, fontPath){
    var args = [
        '-size',
        width + 'x' + height,
        'gradient:' + firstColor + '-' + secondColor,
        'final1.png'
    ];

    return new Promise(function(resolve, reject) {

        im.convert(args,async function (err, stdout) {
            if (err) console.log(err);
            if (textPresent) {
                if (textPosition) {
                    // TEXT ON TOP

                    var withTextOnTop = await writeTextOnTop(fontSize, fillColor, text,
                        hourText, minuteText,
                        offsetXText, offsetYText,
                        offsetXHour, offsetYHour,
                        offsetXMinute, offsetYMinute,
                        offsetXFirstPoint, offsetYFirstPoint,
                        offsetXSecondPoint, offsetYSecondPoint, fontPath);
                    resolve(withTextOnTop);


                } else {
                    // TEXT ON BOTTOM

                    var withTextOnBottom = await writeTextOnBottom(fontSize, fillColor, text,
                        hourText, minuteText,
                        offsetXText, offsetYText,
                        offsetXHour, offsetYHour,
                        offsetXMinute, offsetYMinute,
                        offsetXFirstPoint, offsetYFirstPoint,
                        offsetXSecondPoint, offsetYSecondPoint, fontPath);
                    resolve(withTextOnBottom);


                }
            } else {
                // TEXT NOT PRESENT


                var withHour = await writeHour(fontSize, fillColor, text,
                    hourText, minuteText,
                    offsetXText, offsetYText,
                    offsetXHour, offsetYHour,
                    offsetXMinute, offsetYMinute,
                    offsetXFirstPoint, offsetYFirstPoint,
                    offsetXSecondPoint, offsetYSecondPoint, fontPath);
                resolve(withHour);


            }
        });
    });
}

// Function used to write the text on top
// Called only if text is present
async function writeTextOnTop(fontSize,fillColor,text,
                        hourText, minuteText,
                        offsetXText,offsetYText,
                        offsetXHour,offsetYHour,
                        offsetXMinute,offsetYMinute,
                        offsetXFirstPoint,offsetYFirstPoint,
                        offsetXSecondPoint,offsetYSecondPoint, fontPath){
    var args = [
        'final1.png',
        // Font size
        '-pointsize',
        fontSize,
        '-gravity',
        'north',
        '-background',
        'transparent',
        '-font',
        //      'Calculator',
        fontPath,
        '-fill',
        fillColor,
        '-annotate',
        offsetXText + offsetYText,
        text,
        'final1.png'
    ];

    return new Promise(function(resolve, reject) {
        im.convert(args,async function(err, stdout){
            if(err) console.log(err);


            var withHour = await writeHour(fontSize ,fillColor ,text,
                hourText, minuteText,
                offsetXText,offsetYText,
                offsetXHour,offsetYHour,
                offsetXMinute,offsetYMinute,
                offsetXFirstPoint,offsetYFirstPoint,
                offsetXSecondPoint,offsetYSecondPoint, fontPath);
            resolve(withHour);



        });
    });

}

// Function used to write the text on bottom
// Called only if text is present
async function writeTextOnBottom(fontSize,fillColor,text,
                           hourText, minuteText,
                           offsetXText,offsetYText,
                           offsetXHour,offsetYHour,
                           offsetXMinute,offsetYMinute,
                           offsetXFirstPoint,offsetYFirstPoint,
                           offsetXSecondPoint,offsetYSecondPoint, fontPath){

    var args = [
        'final1.png',
        // Font size
        '-pointsize',
        fontSize,
        '-gravity',
        'south',
        '-background',
        'transparent',
        '-font',
        //      'Calculator',
        fontPath,
        '-fill',
        fillColor,
        '-annotate',
        offsetXText + offsetYText,
        text,
        'final1.png'
    ];

    return new Promise(function(resolve, reject) {
        im.convert(args,async function(err, stdout){
            if(err) console.log(err);
            var withHour = await writeHour(fontSize ,fillColor ,text,
                hourText, minuteText,
                offsetXText,offsetYText,
                offsetXHour,offsetYHour,
                offsetXMinute,offsetYMinute,
                offsetXFirstPoint,offsetYFirstPoint,
                offsetXSecondPoint,offsetYSecondPoint, fontPath);
            resolve(withHour);
        });
    });


}

// Used to write the hour no the clock
async function writeHour(fontSize ,fillColor,text,
                   hourText, minuteText,
                   offsetXText,offsetYText,
                   offsetXHour,offsetYHour,
                   offsetXMinute,offsetYMinute,
                   offsetXFirstPoint,offsetYFirstPoint,
                   offsetXSecondPoint,offsetYSecondPoint, fontPath){

    var args = [
        'final1.png',
        // Font size
        '-pointsize',
        fontSize,
        '-gravity',
        'north',
        '-background',
        'transparent',
        '-font',
        //      'Calculator',
        fontPath,
        '-fill',
        fillColor,
        '-annotate',
        offsetXHour+offsetYHour,
        hourText,
        '-quality',
        '100',
        'final1.png'
    ];

    return new Promise(function(resolve, reject) {
        im.convert(args,async function(err, stdout){
            if(err) console.log(err);
           var withMinute = await writeMinute(fontSize ,fillColor ,text,
                hourText, minuteText,
                offsetXText,offsetYText,
                offsetXHour,offsetYHour,
                offsetXMinute,offsetYMinute,
                offsetXFirstPoint,offsetYFirstPoint,
                offsetXSecondPoint,offsetYSecondPoint, fontPath);
           resolve(withMinute);
        });
    });


}

async function writeMinute(fontSize,fillColor,text,
                     hourText, minuteText,
                     offsetXText,offsetYText,
                     offsetXHour,offsetYHour,
                     offsetXMinute,offsetYMinute,
                     offsetXFirstPoint,offsetYFirstPoint,
                     offsetXSecondPoint,offsetYSecondPoint, fontPath){

    var args = [
        'final1.png',
        // Font size
        '-pointsize',
        fontSize,
        '-gravity',
        'south',
        '-background',
        'transparent',
        '-font',
        //      'Calculator',
        fontPath,
        '-fill',
        fillColor,
        '-annotate',
        offsetXMinute+offsetYMinute,
        minuteText,
        'final1.png'
    ];

    return new Promise(function(resolve, reject) {
        im.convert(args, async function(err, stdout){
            if(err) console.log(err);
            var firstSquare = await firstSquareOnLeft(offsetXFirstPoint,offsetYFirstPoint,
                offsetXSecondPoint,offsetYSecondPoint);
            resolve(firstSquare);
        });
    });


}


async function firstSquareOnLeft(offsetXFirstPoint,offsetYFirstPoint,
                           offsetXSecondPoint,offsetYSecondPoint){
    var args = [
        'final1.png',
        'tile.png',
        '-gravity',
        'west',
        '-geometry',
        offsetXFirstPoint+offsetYFirstPoint,
        '-composite',
        'final1.png'
    ];
    return new Promise(function(resolve, reject) {
        im.convert(args, async function(err, stdout){
            if(err) console.log(err);
            var secondSquare = await secondSquareOnLeft(offsetXSecondPoint,offsetYSecondPoint);
            resolve(secondSquare);
        });
    });

}

async function secondSquareOnLeft(offsetXSecondPoint,offsetYSecondPoint){
    var args = [
        'final1.png',
        'tile.png',
        '-gravity',
        'west',
        '-geometry',
        offsetXSecondPoint+offsetYSecondPoint,
        '-composite',
        'final1.png'
    ];

    return new Promise(function(resolve, reject) {
        im.convert(args,async function(err, stdout){
            if(err) console.log(err);
            var oi = await outputImage();
            resolve(oi);
        });
    });
}

async function outputImage(){

    return new Promise(function(resolve, reject) {
        fs.readFile('final1.png', function(err,data){
            if(err) throw err;
            resolve(data);
        });
    });


}