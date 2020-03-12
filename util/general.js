const general = {};
general.CreateSessionID = () => {
  //https://gist.github.com/gordonbrander/2230317
  return '_' + Math.random().toString(36).substr(2, 9);
}
general.CreateEmailCode = () => {
  //https://gist.github.com/gordonbrander/2230317
  return '_' + Math.random().toString(36).substr(2, 5);
}


module.exports = general;