import axios from "axios";

const apiEndPoint = "http://localhost:3000/api/articles";

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

export async function getAllArticles(request) {
  if (request === undefined) {
    source = axios.CancelToken.source();
  }
  if (request === "cancel") {
    source.cancel();
  }
  const response = await axios.get(apiEndPoint, {
    cancelToken: source.token
  });
  return response;
}
