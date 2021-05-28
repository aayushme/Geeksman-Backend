const csv=require('csvtojson')
function importCsvData2MongoDB(filePath){
    csv()
        .fromFile(filePath)
        .then((jsonObj)=>{
            console.log(jsonObj);
            fs.unlinkSync(filePath);
        })
}
const fileuploadcontroller=(req, res) =>{
    importCsvData2MongoDB(__basedir + '/uploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
}
module.exports={fileuploadcontroller}