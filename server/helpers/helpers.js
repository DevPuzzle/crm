/* 
  checks if user is authenticated and throws and error if not
*/
exports.checkAuth = (isAuth) => {
  if(!isAuth) {
    const error = new Error('Not Authenticated[checkAuth]!');
    error.code = 401;
    throw error;
  }
}