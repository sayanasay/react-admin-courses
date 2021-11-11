import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authorsList/";

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveAuthor(author) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(authorId) {
  return fetch(baseUrl + authorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
