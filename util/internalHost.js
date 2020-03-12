const os = require('os');
const interfaces = os.networkInterfaces();

module.exports = callback = () => {
  const allInt = [];
  for(let key in interfaces){
    allInt.push(...interfaces[key]);
  }
  filteredInt = allInt.filter(int => !int.internal && int.family === 'IPv4');
  filteredInt.forEach((int) => {
    console.log('listening on', int.address);
  });
}