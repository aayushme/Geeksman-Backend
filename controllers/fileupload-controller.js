const fs=require('fs')
const csv=require('csvtojson')
const Question=require('../models/Question')
//parses the csv file to json data and pushes into the db
function importCsvData2MongoDB(filePath){
    csv()
        .fromFile(filePath)
        .then((jsonObj)=>{
            console.log(jsonObj);
            
            // let questions=jsonObj.map((obj)=>{
            //     return {question:}
            // })

            fs.unlinkSync(filePath);
        })
}
//takes the path of the csv file and sends to the parser
const fileuploadcontroller=(req, res) =>{
    console.log(req.file)
    importCsvData2MongoDB('./public/csvuploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
}
module.exports={fileuploadcontroller}