export default ErrorHandler = (error) => {
  console.log(`Error`, error.message);
  if (error.code === "auth/email-already-in-use") {
    return `Email already in use!`;
  }
  if (error.code === "auth/email-not-found") {
    return `User Not Found!`;
  }
  if (error.code === "auth/wrong-password") {
    return `Invalid Credentials!`;
  }
};
