/**
 * This script should run after parcel is finished building our front end. It moves
 * the JavaScript (and maps) into a folder called `./parcel/js` for serving with
 * Cascade's server. This is so that we can ignore the HTML files that would normally
 * be served via the `express.static` middleware, allowing people to access URLs they
 * shouldn't normally be able to access (e.g. `/login.html`).
 * 
 * `express.static` serves `./parcel/js` under `/` in the web server (parcel flattens
 * the directory structure in the HTML files as well).
 */

// add spacing between parcel output and our script
console.log();

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// utility function
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

deleteFolderRecursive('./parcel/js'); // deletes the folder if it exists
fs.mkdirSync('./parcel/js');

glob('./parcel/*.js*', function(err, files) { // all js files and the maps
    if (err) throw err;
    if (!files) throw 'no files';

    files.forEach(file => {
        const newLocation = path.join('./parcel/js/' + path.basename(file));
        console.log(file + ' --> ' + newLocation);
        fs.renameSync(file, newLocation);
    });
});