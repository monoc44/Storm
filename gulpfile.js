var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT: 8000,
            DB_KEYSPACE: 'dev',
            DB_HOSTS: '127.0.0.1'
        },
        ignore: ['./node_modules/**']
    });
    //.on('restart', function () {
    //    console.log("[GULP] restarting...");
    //})
});

