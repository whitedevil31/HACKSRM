const genMsg = (username, text) => {
    return {
      username,
      text,
      createdAt: new Date().getTime(),
    };
  };
  
  module.exports = { genMsg };