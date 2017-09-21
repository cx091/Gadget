var ignores = fis.get('project.ignore');

ignores = ignores.concat([
    'config/**',
    'test/**',
    'output/**',
    '/static/sass/common/_header.scss',
    '/static/sass/common/_footer.scss',
    '/static/sass/common/_variables.scss'
]);

//fis.set('project.ignore', ignores);

fis.media("pub").match('*.scss', {
    parser: fis.plugin('node-sass'),
    rExt: '.css'
})

/*    .match('*.{js,scss}', {
        useHash: true
    })
    .match('::image', {
        useHash: true
    })*/
    .match('::package', {
  /*      spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '20'
        }),*/
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
    })
    .match('*.css', {
        useSprite: true
    })
    .match('{*.js}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('{*.{css,scss},*.html:css}', {
        optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('{/static/sass/common/basic.scss,/static/sass/common/common.scss}',{
        packTo:'/static/sass/lib.scss'
    })
/*     .match('{/static/sass/common/basic.scss,/static/sass/page/uokoAPP.scss}',{
     packTo:'/static/sass/page/uokoAPP.scss'
     })*/
/*    .match('{/plugin/fullScreen/js/jquery-migrate-1.2.1.min.js,/plugin/fullScreen/js/jquery.swipe-events.js,/plugin/fullScreen/js/prismjs.js,/plugin/fullScreen/js/fsvs.js,/plugin/fullScreen/js/main.js,/static/js/page/fullScreen.js}',{
        packTo:'/static/js/page/fullScreen.js'
    })
    .match('{/plugin/bootstrap/bootstrap.min.js,/static/js/common/google.analytics.js,/static/js/common/cnzz.analytics.js}',{
    packTo:'/static/js/lib2.js'
})*/
    .match('{/static/js/common/common.js,/static/js/common/js.cookie.js,/plugin/bootstrap/bootstrap.min.js,/static/js/common/google.analytics.js,/static/js/common/cnzz.analytics.js,/static/js/common/template.min.js}',{
        packTo:'/static/js/lib.js'
    });




/*fis.media("dev").match('*.scss', {
    parser: fis.plugin('node-sass'),
    rExt: '.css'
})
    .match('::package', {
        spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '20'
        })
    })
    .match('*.css', {
        useSprite: true
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    });*/

