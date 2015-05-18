// Gulp dependencies
var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower = require('gulp-bower');

//Configuration
var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

//Bower dependencies: Run "gulp bower-install"
gulp.task('bower-install', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

//Font awesome install: Run "gulp fonts-install"
gulp.task('fonts-install', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

//Minify css: Run "gulp build-css"
gulp.task('build-css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css')); 
});

//Watch *.scss files and re-run the task.
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['build-css']); 
});

//Default task
  gulp.task('default', ['bower-install', 'fonts-install', 'build-css']);
