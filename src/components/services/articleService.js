import http from "./httpService";

const apiEndPoint = "http://localhost:3000/api/articles";

export async function getAllArticles() {
  let data = await http.get(apiEndPoint);
  return data;
}

export async function getArticle(id) {
  let data = await http.get(`${apiEndPoint}/${id}`);
  return data;
}
