"use strict";module.export({findNewestFileOrDirectory:()=>findNewestFileOrDirectory,rimrafPromisfied:()=>rimrafPromisfied,removePaths:()=>removePaths,ioOperationWithRetries:()=>ioOperationWithRetries,batchIoOperationWithRetries:()=>batchIoOperationWithRetries});var fs;module.link('fs-plus',{default(v){fs=v}},0);var shelljs;module.link('shelljs',{default(v){shelljs=v}},1);var rimraf;module.link('rimraf',{default(v){rimraf=v}},2);var fsExtra;module.link('fs-extra',{default(v){fsExtra=v}},3);




/**
 * Traverses the local storage directory looking for the last modified local storage file.
 *
 * @returns {{latestPort: number, files: Array}}
 */
function findNewestFileOrDirectory(path, condition = () => true) {
    let maxMTime = 0;
    const returnValue = { entries: [], newest: null };

    if (fs.existsSync(path)) {
        const files = shelljs.ls('-l', path);
        returnValue.entries = files;
        files.forEach((file) => {
            if (condition(file) && file.mtime.getTime() > maxMTime) {
                maxMTime = file.mtime.getTime();
                returnValue.newest = file.name;
            }
        });
    }
    return returnValue;
}

function rimrafPromisfied(path) {
    return new Promise((resolve, reject) => {
        rimraf(path, {}, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function removePaths(paths = [], deleteFunction) {
    const rimrafPromises = [];
    paths.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
            rimrafPromises.push(deleteFunction(filePath));
        } else {
            rimrafPromises.push(Promise.resolve());
        }
    });
    return Promise.all(rimrafPromises);
}

/**
 * Simple wrapper for copy/move with additional retries in case of failure.
 * It is useful when something is concurrently accessing the files you want to modify.
 */
function ioOperationWithRetries(operation, maxRetries = 5, delayMs = 100, ...args) {
    let retries = 0;
    return new Promise((resolve, reject) => {
        function io() {
            fsExtra[operation](...args)
                .then(() => {
                    resolve(true);
                })
                .catch((err) => {
                    retries += 1;
                    if (retries <= maxRetries) {
                        setTimeout(() => {
                            io(operation, ...args);
                        }, delayMs);
                    } else {
                        reject(err);
                    }
                });
        }
        io(operation, ...args);
    });
}

function batchIoOperationWithRetries(
    operation, maxRetries, delayMs, operationFunction, operationArgs = []
) {
    const ioPromises = [];
    operationArgs.forEach((args) => {
        ioPromises.push(operationFunction(operation, maxRetries, delayMs, ...args));
    });
    return Promise.all(ioPromises);
}
