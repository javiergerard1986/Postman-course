const fs = require('fs');
var newman = require('newman'); // require newman in your project

// call newman.run to pass 'options' object and wait for callback
newman.run({
    collection: require('./col.json'),
    reporters: 'cli'
}).on('beforeRequest', function(err, args){
    if(err){
        console.error(err);
    } else {
        let fileName = Date.now() + 'request.txt';
        fs.writeFile(fileName, args.request.body.raw, function(error) {
            if(error){
                console.error(error);
            }
        });
    }
}).on('start', function(err, args){
    console.log('running a collection...');
}).on('request', function(err, args){
    let fileName = Date.now() + 'response.txt';
    if(err){
        console.error(err);
    } else {
        fs.writeFile(fileName, args.response.stream, function(error) {
            if(error){
                console.error(error);
            }
        });
    }
}).on('done', function(err, summary){
    if(err || summary.error){
        console.error('collection run encountered an error');
    }else{
        console.log('collection run completed');
    }
});