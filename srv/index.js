const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const port = process.env.PORT || 3000;
const PROFILE_NAME = 'aws_apigw_path_replacer';

function getApiGwCtrl(regionId) {
  var credentials = new AWS.SharedIniFileCredentials({profile: PROFILE_NAME});
  AWS.config.update({
    region: regionId,
    credentials: credentials
  });
  var apigateway = new AWS.APIGateway({apiVersion: '2015-07-09'});
  return apigateway;
}

function isExistsTargetAWSProfile(data)
{
  // check keys
  let aws_access_key_id_check = false;
  let aws_secret_access_key_check = false;

  let lines = data.split("\n");
  let inTargetProfile = false;
  let tartgetLines = [];
  var reg = new RegExp('^\\[' + PROFILE_NAME + '\\]$', 'i');

  // push text lines into tartgetLines of target profile
  for (let i=0; i < lines.length; i++) {
    let tmp = lines[i];
    if (inTargetProfile) {
      if (tmp.match(/^\[.+\]$/)) {
        break;
      }
      else {
        tartgetLines.push(tmp);
      }
    }
    else {
      if (reg.test(tmp)) {
        inTargetProfile = true;
      }
    }
  }
  
  // keys exist check in tartgetLines
  for (let i=0; i < tartgetLines.length; i++) {
    let tmp = tartgetLines[i];
    let sp = tmp.split("=");
    if (sp.length == 2) {
      let keyname = sp[0];
      keyname = keyname.trim();
      if (keyname == "aws_access_key_id") {
        aws_access_key_id_check = true;
      }
      else if (keyname == "aws_secret_access_key") {
        aws_secret_access_key_check = true;
      }
    }
  }
  if (aws_access_key_id_check && aws_secret_access_key_check) {
    return true;
  }
  else {
    return false;
  }
}

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/', express.static('dist'));
app.get('/profile-check', (req, res) => {
  let dir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  let path = dir + "/.aws/credentials"
  try {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      }
      if (data) {
        if (isExistsTargetAWSProfile(data)) {
          res.json({
            profile: "ok"
          })
        } else {
          res.json({
            error: "Profile check ERROR: No exists profile [" + PROFILE_NAME + "] in AWS credentials file."
          })
        }
      } else {
        console.log(err);
        res.json({
          error: "Profile check ERROR: No exists AWS credentials file: " + path
        });
      }
    });
  }
  catch (err) {
    console.log(err);
    res.json({
      error: "Profile check ERROR: No exists AWS credentials file: " + path
    });
  }
});

// Call: AwsApiGateway.getRestApis()
app.get('/apiget', (req, res) => {
  let regionId = req.query.regionId;

  let apigateway = getApiGwCtrl(regionId);
  var params = {
  };
  apigateway.getRestApis(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      res.status(400);
      res.json({
        error: "invalid parameter"
      });
    }
    else {
      let itemList = [];
      console.log(data);
      for(let i=0; i < data.items.length; i++) {
        let item = data.items[i];
        itemList.push({
          id: item.id,
          name: item.name
        })
      }
      let r = {
        items: itemList
      }
      res.json(r);
    }
  });
});

// Call: AwsApiGateway.getResources()
app.get('/resources', (req, res) => {
  let regionId = req.query.regionId;
  let restApiId = req.query.restApiId;

  let apigateway = getApiGwCtrl(regionId);
  var params = {
    restApiId: restApiId
  };
  apigateway.getResources(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      let itemList = [];
      console.log(data);
      let r = data;
      res.json(r);
    }
  });
});

// Call: AwsApiGateway.updateResource()
app.put('/resources/:id', (req, res) => {
  let regionId = req.query.regionId;
  let restApiId = req.query.restApiId;
  let resourceId = req.params.id;
  let op = req.query.op;
  let path = req.query.path;
  let value = req.query.value;
  console.log(regionId);
  console.log("restApiId: " + restApiId);
  console.log(resourceId);

  let apigateway = getApiGwCtrl(regionId);
  var params = {
    restApiId: restApiId,
    resourceId: resourceId,
    patchOperations: [
      {
        // from: "",
        op: op, //"replace",
        path: path, // /pathPart,
        value: value
      }
    ]
  };
  console.log(params);
  apigateway.updateResource(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      res.status(400);
      res.json({
        error: "update error"
      });
    }
    else {
      console.log(data);
      let r = data;
      res.json({
        result: "success"
      });
    }
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})