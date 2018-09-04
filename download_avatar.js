var commInput = process.argv.slice(2);
var owner = commInput[0];
var repo = commInput[1];

if (owner === undefined || repo === undefined) {
	console.log('command line arguments are empty');
}
	else {
var request = require('request');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');
console.log('Downloading images...');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };
  request.get(options, cb);
}

getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  var resultObj = JSON.parse(result.body);
  for (var i = 0; i < resultObj.length; i++) {
  	var imgURL = resultObj[i]["avatar_url"];
  	var loginName = resultObj[i]["login"];
  	downloadImageByURL(imgURL, 'avatar_images/' + loginName + '.jpg');	
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err; 
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));               // Note 4
	   console.log('Download complete.');
}
}
