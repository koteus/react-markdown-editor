'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var debounce = require('lodash.debounce');
var Markdown = require('react-markdown');

var supportsLocalStorage = checkLocalStorageSupport();
var initialSource = getInitialSource();

var App = React.createClass({
    onChange: function(e) {
        this.setState({ source: e.target.value });
        this.storeSource(e.target.value);
    },

    storeSource: supportsLocalStorage ? debounce(function(src) {
        localStorage.markdownSource = src || initialSource;
    }, 250) : function() {},

    render: function() {
        return (
            <div className="app">
                <textarea
                    className="editor"
                    defaultValue={initialSource}
                    onChange={this.onChange}
                />

                <Markdown
                    className="preview"
                    source={this.state ? this.state.source : initialSource}
                    escapeHtml
                />
            </div>
        );
    }
});

ReactDom.render(<App />, document.getElementById('root'));

// --------------------------------------------------------
// Helper functions

function checkLocalStorageSupport() {
    var mod = 'test';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    }
    catch (e) {
        return false;
    }
}

function getInitialSource() {
    return (supportsLocalStorage && localStorage.markdownSource) || [
        '# react-markdown-editor', '',
        'Start typing here...',
        '',
    ].join('\n');
}
