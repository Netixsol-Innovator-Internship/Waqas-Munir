export const showError = (error: any) => {
  if (typeof error.response.data.message === "string") {
    return error.response.data.message;
  } else if (typeof error.response.data.message === "object") {
    return error.response.data.message[0];
  } else {
    return "Something Went Wrong!";
  }
};
