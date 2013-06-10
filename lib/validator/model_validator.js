/*
 * jumper.js
 * Copyright(c) 2013 Ashier de Leon <ashier@gmail.com>
 *
 * Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */



"use strict";

// var fs = require('fs');

// module.exports = {

//     return function(obj, callback) {

//         console.log('Validating Models...');

//         /*

//         obj.dir: that.projectDIR,
//         obj.apps: that.installedApps

//         1. Check for installed apps and validate with directory
//         2. Apply settings to express
//             - Apply middlewares to express
//             - Apply
//         3. Check for urls
//             if there are urls
//                 - validate route with corresponding view
//                 - validate the view
//             if no urls
//                 - generate '/' route to show installation is successful

//         */


//         // ==========================================
//         // Check for installed apps
//         // ==========================================

//         var dirs = fs.readdirSync(obj.dir);
//         var length = dirs.length;
//         var availableApps = [];

//         for (var i = 0; i < length; i += 1) {
//             if (dirs[i] !== '.' && dirs[i] !== '..') {
//                 var appsLength = obj.apps.length;
//                 for (var j = 0; j < appsLength; j += 1) {
//                     if (dirs[i] == obj.apps[j]) {

//                         // ==========================================
//                         // Crawl and Validate if models.js & views.js
//                         // are available
//                         // ==========================================

//                         availableApps.push({
//                             model: obj.dir + dirs[i] + 'models',
//                             view: obj.dir + dirs[i] + 'views'
//                         });
//                     }
//                     break;
//                 }
//             }
//         }

//         return callback();
//         //return callback("Error validating models...");
//     };

// }();

