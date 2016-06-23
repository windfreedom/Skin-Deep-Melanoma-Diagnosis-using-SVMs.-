const DIAGNOSIS_TEXT  = {
  "Melanoma": ["Unfortunately, the image you submitted is indicative of Melanoma. You should see a doctor immediately for an examination.", "In America, over 75,000 cases of Melanoma are diagnosed every year and more than 10,000 die from the disease. Thankfully, immediate screening and treatment can usually cure Melanoma.", "We hope that this is a misdiagnosis. To protect yourself from Melanoma, always be sure to be cognizant of UV levels outside and wear sunscreen or adequate clothing on those days. Also avoid tanning beds, as they increase the chances of Melanoma."],
  "Benign": ["Luckily, our algorithms indicate that this growth is likely to be benign. However, the only way to be sure is to get a biopsy and seek the advice of a trained medical professional.", "In America, over 75,000 cases of Melanoma are diagnosed every year and more than 10,000 die from the disease. Thankfully, immediate screening and treatment can usually cure Melanoma.", "To protect yourself from Melanoma, always be sure to be cognizant of UV levels outside and wear sunscreen or adequate clothing on those days. Also avoid tanning beds, as they increase the chances of Melanoma."],
  "Waiting": ["We're still waiting on our Machine Learning algorithm to work its magic. Hold tight and check in a minute!"],
  "Error": ["Sorry! It looks like something went wrong. Please email patrick@patrickpan.com and let us know!"]
}

var express = require('express');
var router = express.Router();
var generate = require("adjective-adjective-animal");
var fs = require('fs')
var path = require('path')

router.post('/submit', (req, res) => {
  var image = req.body.image.replace(/^.+base64,/, "");
  var type = req.body.image.slice(0,100).match(/^.+image\/([^;]+)/i);
  var ftype = type[1]
  var x = Number(req.body.x).toFixed(0)
  var y = Number(req.body.y).toFixed(0)
  var w = (Number(req.body.w) * 100 / (100 - x)).toFixed(0)
  var h = (Number(req.body.h) * 100 / (100 - y)).toFixed(0)
  console.log(x, y, w, h)

  if(image == undefined) res.status(400).end();

  generate(1).then((generated) => {
    var fname = generated+ "." + ftype;
    fs.writeFile(path.join("images/", `raw_${fname}`), image, 'base64', () => {
      require('child_process').execSync(`convert ${path.join("images/", `raw_${fname}`)} -chop ${x}\%x${y}% -crop ${w}\%x${h}\%+0+0 ${path.join("images/", fname)} && rm images/raw_*`);
      analyze(fname);
      res.json({
        token: generated
      }).end()
    })
  })
})

router.get('/results', (req, res) => {
  var token = req.query.token.trim();
  var fname = token.split(" ").map(x => x.toLowerCase()).join("-")+".jpeg";
  var diagnosis = retrieve(fname);
  console.log(fname);
  console.log(diagnosis)
  var text = DIAGNOSIS_TEXT[diagnosis]
  fs.readFile(`images/${fname}`, (err, data)  => {
    console.log(data)
    var image = "data:image/jpeg;base64," + data.toString('base64');
    console.log(image);
    res.json({
      token: token,
      image: image,
      diagnosis: diagnosis,
      text: text
    }).end();
  })
})



var analyze = function(fname) {
  require('child_process').exec(`python python/analyze.py images/${fname}`, (err, out) => {
    if(err !== null) {
      record(fname, "Error")
    } else {
      record(fname, "Waiting")
      console.log(out)

    }
  });
}

var record = function(fname, result) {
  fs.writeFile(`results/${fname}.txt`, result);
}

var retrieve = function(fname) {
  return fs.readFileSync(`results/${fname}.txt`, 'utf8');
}



module.exports = router;
