// 实现这个项目的构建任务
// 此项目中的构建任务主要有，将sass、js、页面模块、图片和字体、其他文件的构建
const { src, dest, parallel, series,watch } = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const data = require('./data.js')
const del = require('del')
const bs = require('browser-sync').create()

// 构建css
const taskCss = () => {
    return src('src/assets/styles/*.scss',{base:'src'})
    .pipe(plugins.sass({outputStyle:"expanded"}))
    .pipe(dest('temp'))
}
// 构建js
const taskJS = () =>{
    return src('src/assets/scripts/*.js',{base:'src'})
    .pipe(plugins.babel({presets:["@babel/preset-env"]}))
    .pipe(dest('temp'))
}
// 构建html
const taskHtml = () => {
    return src('src/*.html',{base:'src'})
    .pipe(plugins.swig({data:data,defaults: { cache: false }}))
    .pipe(dest('temp'))
}
// 构建图片
const taskImage = ()=>{
    return src('src/assets/images/**',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 构建字体
const taskFont = ()=>{
    return src('src/assets/fonts/**',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 构建public文件夹
const taskExtra = ()=>{
    return src('public/**',{base:'public'})
    .pipe(dest('dist'))
}
// 清除dist
const clean = () => {
    return del(['dist'])
}
// 启动浏览器
const serve = () => {
    watch('src/assets/styles/*.scss',taskCss)
    watch('src/assets/scripts/*.js',taskJS)
    watch('src/*.html',taskHtml)
    // watch('src/assets/images/**',taskImage)
    // watch('src/assets/fonts/**',taskFont)
    // watch('public/**',taskExtra)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ],bs.reload)
    bs.init({
        files: 'temp/**', //什么文件夹下的文件有变化会自动同步到浏览器
        server: {
            baseDir: ['temp','src','public'],
            routes: {
                "/node_modules": "./node_modules" //这里有一个疑问，老师为什么写的是node_modules
            }
        }
    })
}
const useref = () => {
    return src('temp/*.html',{base:'temp'})
    .pipe(plugins.useref({searchPath:['temp','.']}))
    .pipe(plugins.if(/\.js$/,plugins.uglify()))
    .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/,plugins.htmlmin({
        collapseWhitespace: true, //将换行进行压缩
        minifyCss: true, //将style包裹的css进行压缩
        minifyJs: true //将script包裹的js进行压缩
    })))
    .pipe(dest('dist'))
}
const complie = parallel(taskCss,taskJS,taskHtml)
const prodTask = series(clean,parallel(series(complie,useref),taskExtra,taskImage,taskFont))
const devTask = parallel(complie,serve)
module.exports = {
    clean,
    prodTask,
    devTask
}