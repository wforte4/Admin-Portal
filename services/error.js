import { AxiosError } from "axios";

export const ErrorResponse = {
  error: "All good"
}

export function catchAxiosError(err) {
  // Setting the request didn't work -- most likely an axios problem
  console.log("Error", err.message);
  let message = "Something happened in setting up the request that triggered an Error";

  if (err.response) {
    // This will execute if http.status range = 200 > [x] > 300
    console.log(err.response.data.message);
    console.log(err.response.status);
    message = err.response.data.message;
  } else if (err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(err.request);
    message = "No Response from the golang server...";
  }
  return { error: message };
}
