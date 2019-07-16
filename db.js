const fs = require('fs').promises;
/*
All of your functions must return a promise!
*/

/* 
Every function should be logged with a timestamp.
If the function logs data, then put that data into the log
ex after running get('user.json', 'email'):
  sroberts@talentpath.com 1563221866619

If the function just completes an operation, then mention that
ex after running delete('user.json'):
  user.json succesfully delete 1563221866619

Errors should also be logged (preferably in a human-readable format)
*/

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */
function log(value){
  return fs.appendFile('log.txt',`${value} ${Date.now()}\n`);
}

async function get(file, key) {
  /*
   return fs.readFile(file,'utf-8').then(data => {
     const parsed = JSON.parse(data);
     const value = parsed[key];
     return log(`Got ${value} from ${file}`);
   }).catch(err => log(`Error no such file: ${file}`))
    */
   try{
   const data = await fs.readFile(file,'utf-8');
   const keyValue = JSON.parse(data);
   return log(`Got ${keyValue[key]} from ${file}`)
  }catch{
 
  }
}

/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */
async function set(file, key, value) {
 const data = await fs.readFile(file,'utf-8');
 const plus = JSON.parse(data);
 plus[key] = value;
 const result = await fs.writeFile(file,JSON.stringify(plus));
 return log(`Set ${value} for ${key} in ${file}`);
}

/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */
async function remove(file, key) {
 const data = await fs.readFile(file,'utf-8');
 const plus = JSON.parse(data);
 plus[key] = "";
 const result = await fs.writeFile(file,JSON.stringify(plus));
 return log(`Set ${value} for ${key} in ${file}`);
}

/**
 * Deletes file.
 * Gracefully errors if the file does not exist.
 * @param {string} file
 */
function deleteFile(file) {

}

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */
function createFile(file) {}

/**
 * Merges all data into a mega object and logs it.
 * Each object key should be the filename (without the .json) and the value should be the contents
 * ex:
 *  {
 *  user: {
 *      "firstname": "Scott",
 *      "lastname": "Roberts",
 *      "email": "sroberts@talentpath.com",
 *      "username": "scoot"
 *    },
 *  post: {
 *      "title": "Async/Await lesson",
 *      "description": "How to write asynchronous JavaScript",
 *      "date": "July 15, 2019"
 *    }
 * }
 */
function mergeData() {}

/**
 * Takes two files and logs all the properties as a list without duplicates
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *  union('scott.json', 'andrew.json')
 *  // ['firstname', 'lastname', 'email', 'username']
 */
function union(fileA, fileB) {}

/**
 * Takes two files and logs all the properties that both objects share
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    intersect('scott.json', 'andrew.json')
 *    // ['firstname', 'lastname', 'email']
 */
function intersect(fileA, fileB) {}

/**
 * Takes two files and logs all properties that are different between the two objects
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    difference('scott.json', 'andrew.json')
 *    // ['username']
 */
function difference(fileA, fileB) {}

module.exports = {
  get,
  set,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  intersect,
  difference,
};
