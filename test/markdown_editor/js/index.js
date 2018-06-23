var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import 'CodeMirror/mode/xml/xml';
// import 'CodeMirror/addon/edit/matchbrackets';
// import CodeMirror from 'CodeMirror';
// import marked     from 'marked';

var App = function () {
  function App(options) {
    _classCallCheck(this, App);

    this.init();
    this.addEventListeners();
  }

  _createClass(App, [{
    key: 'init',
    value: function init() {
      var input = this.input = CodeMirror.fromTextArea(document.querySelector('.js-input'), {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'text/x-markdown',
        theme: 'material'
      });

      var output = this.output = CodeMirror.fromTextArea(document.querySelector('.js-output'), {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'text/html',
        theme: 'material',
        readOnly: true
      });

      this.preview = document.querySelector('.js-preview');

      output.getWrapperElement().classList.add('CodeMirror-readonly');

      this.compile(input.getValue());
    }
  }, {
    key: 'compile',
    value: function compile(source) {
      var previewDocument = this.preview.contentDocument;
      var output = marked(source);

      previewDocument.open();
      previewDocument.write(output);
      previewDocument.close();

      this.output.setValue(output);
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      var input = this.input;

      var delay = void 0;

      input.on('change', function () {
        clearTimeout(delay);
        delay = setTimeout(function () {
          return _this.compile(input.getValue());
        }, 300);
      });
    }
  }]);

  return App;
}();

new App();