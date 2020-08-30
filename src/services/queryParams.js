import queryString from "query-string";

export default function getQueryParams(queryStr) {
  return queryString.parse(queryStr);
}
