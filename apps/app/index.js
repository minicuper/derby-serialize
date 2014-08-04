var derby = require('derby');
require('derby-parsing');
var beautify = require('js-beautify').js_beautify;

var app = module.exports = derby.createApp('app', __filename);

if (!derby.util.isProduction) global.app = app;

app.serverUse(module,'derby-jade');
app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.get('/', function(page){
  page.render('home');
});

app.proto.serialize = function(html){
//  console.log(html);
  app.views.register('tmp', html);
  var view = app.views.find('tmp');
  view.parse();
//  console.log(typeof view.template, view.template.serialize());
  var data = 'var t = ' + view.template.serialize();
  var js = beautify(data, { indent_size: 2, "keep_array_indentation": true });
  this.model.set('_page.out', js);
}
