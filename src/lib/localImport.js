/**

this script is the basis of an import for new licences


**/

fs=require('fs');

const inFile='TBC'
const outFile='log.csv'

fs.truncate(outFile, 0, function(){console.log('done')})
var currentLine=0;
var cols=[];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(inFile)
});

lineReader.on('line', function (line) {

  var lineOut="";

  if(currentLine > 0){
    //current line as string is in variable 'line'

    //build correct data structure from csv file to match licence structure in DB


    //push to API


    //log output
    console.log(outline)
    fs.appendFile(outFile, outline, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
} else {

    //line 0
    cols=line.toString().split('"').join('').split(' ').join('').split(',')
  console.log(cols)
}

  currentLine++;

});
