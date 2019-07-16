const fs = require('fs').promises;
/*
All of your functions must return a promise!
*/
/**
 * Resets the database (does not touch added files)
 */
function reset() {
  const andrew = fs.writeFile(
    './andrew.json',
    JSON.stringify({
      firstname: 'Andrew',
      lastname: 'Maney',
      email: 'amaney@talentpath.com',
    })
  );
  const scott = fs.writeFile(
    './scott.json',
    JSON.stringify({
      firstname: 'Scott',
      lastname: 'Roberts',
      email: 'sroberts@talentpath.com',
      username: 'scoot',
    })
  );
  const post = fs.writeFile(
    './post.json',
    JSON.stringify({
      title: 'Async/Await lesson',
      description: 'How to write asynchronous JavaScript',
      date: 'July 15, 2019',
    })
  );
  const log = fs.writeFile('./log.txt', '');
  return Promise.all([andrew, scott, post, log]);
}
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
async function doesFileExists(fileName){
  const names = await fs.readdir('./');
  const filteredJsonFiles = names.filter(name =>  name === (fileName));
  return filteredJsonFiles.length === 0 ? false: true
}
async function get(file, key) {
  try{
   const data = await fs.readFile(file,'utf-8');
   const keyValue = JSON.parse(data);
   const value = keyValue[key];
   if(!value) return log(`Error: ${key} invalid key on ${file}`);
   return log(`Got ${value} from ${file}`);
  }catch{
    log(`Error with your input ${file}`);
  }
}

/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */
async function set(file, key, value) {
  if(!doesFileExists(file))
    return log(`Set ${file} does not exists`)
  try{
    const data = await fs.readFile(file,'utf-8');
    const plus = JSON.parse(data);
    plus[key] = value;
    const result = await fs.writeFile(file,JSON.stringify(plus));
    return log(`Set ${value} for ${key} in ${file}`);
  }catch{
    log(`Error with setting ${value} for ${key} on ${file}`);
  }
}

/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */
// TODO:Error Checking
async function remove(file, key) {

  if(!await doesFileExists(file)){
    return await log(`Error: ${file} does not exists`)
  }
  try{
    const data = await fs.readFile(file,'utf-8');
    const plus = JSON.parse(data);
    delete plus[key]
    const result = await fs.writeFile(file,JSON.stringify(plus));
    return log(`Remove ${key} in ${file}`);
  }catch(err){
    log(`Error with removing ${key} on ${file}`);
  }
}

/**
 * Deletes file.
 * Gracefully errors if the file does not exist.
 * @param {string} file
 */
async function deleteFile(file) {
  if(!await doesFileExists(file)){
    return await log(`Error: ${file} does not exists`)
  }
  try{ 
    await fs.unlink(file);
    return log(`Deleted ${file}`)
  }catch(err){
    log(`Error with deleting file ${file}`);
  }
  
}

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */
async function createFile(file) {
  if(await doesFileExists(file)){
    return log(`File ${file} already exists`);
  }
  try{
    const data = await fs.writeFile(file,"{}");
    return log(`Created file ${file}`);
  }catch(err){
    log(`Error with creating file ${file}`);
  }
}

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
async function mergeData() {
  // Read all 
  const fileNames = await fs.readdir("./");

  // Filter files for .json and exclude node files
  const filteredJsonFiles = fileNames.filter(name => name.includes('.json') && name !== "package.json" && name !== "package-lock.json");

  // Read all files
  const data = filteredJsonFiles.map((value)=>{
    return fs.readFile(value,"utf-8");
  })
  // Process all data
  const allPromises = Promise.all(data);

  await allPromises.then(async (dataArray) => {
    // Get data out of dataArray
    const jsonBody = dataArray.map((data,index)=>{
      return "\n\t" + filteredJsonFiles[index].slice(0,-5) + ": " + data;
    })
    // Add ending brackets
    const jsonObject = "{" + jsonBody + "\n}";
    // Print to file
    const result = await fs.writeFile('mergeData.json',jsonObject);
    return log(`ALL JSON FILES ARE MERGED`)
  })
  .catch(err=>console.log(err));
}

/**
 * Takes two files and logs all the properties as a list without duplicates
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *  union('scott.json', 'andrew.json')
 *  // ['firstname', 'lastname', 'email', 'username']
 */
async function union(fileA, fileB) {
  // Read in files
  const file1 = await fs.readFile(fileA,'utf-8');
  const file2 = await fs.readFile(fileB,'utf-8');
  // Figure out to compare keys
  console.log("file 1", file1)
  console.log("file 2", file2)

}

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
function difference(fileA, fileB) {

}

module.exports = {
  get,
  reset,
  set,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  intersect,
  difference,
};
