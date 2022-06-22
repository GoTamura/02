const browserSync = require('browser-sync').create();
const asciidoctor = require('@asciidoctor/core')();
const asciidoctorReveiljs = require('@asciidoctor/reveal.js');

asciidoctorReveiljs.register();

browserSync.watch(['*.adoc', '*.css'], function(event, file) {
    if (event === 'change') {
        console.log(`${file} changed. start converting...`);
        asciidoctor.convertFile('index.adoc', {safe: 'safe', backend: 'revealjs'});
        console.log(`reloading`);
        browserSync.reload('index.html');
    }
});

browserSync.init({
    server: './',
    localOnly: true,
    open: 'local',
    ui: false,
    notify: false,
}, function(err, _) {
    if (err) {
        console.error(err);
        return;
    }
});