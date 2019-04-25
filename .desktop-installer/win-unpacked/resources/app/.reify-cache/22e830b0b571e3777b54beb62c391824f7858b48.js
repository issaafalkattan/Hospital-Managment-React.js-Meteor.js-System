"use strict";var rimraf;module.link('rimraf',{default(v){rimraf=v}},0);

/**
 * Simple wrapper for rimraf with additional retries in case of failure.
 * It is useful when something is concurrently reading the dir you want to remove.
 */
function rimrafWithRetries(...args) {
    let retries = 0;
    return new Promise((resolve, reject) => {
        function rm(...rmArgs) {
            try {
                rimraf.sync(...rmArgs);
                resolve();
            } catch (e) {
                retries += 1;
                if (retries < 5) {
                    setTimeout(() => {
                        rm(...rmArgs);
                    }, 100);
                } else {
                    reject(e);
                }
            }
        }
        rm(...args);
    });
}

module.exportDefault({
    rimrafWithRetries
});

