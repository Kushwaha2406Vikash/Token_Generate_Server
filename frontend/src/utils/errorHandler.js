export function getApiError(err) {
  if (!err.response) {
    return "Server not reachable";
  }

  const { status, data } = err.response;


  if (status === 422 && Array.isArray(data.detail)) {
    return data.detail.map(e => e.msg).join(", ");
  }


  if (typeof data.detail === "string") {
    return data.detail;
  }

  return "Something went wrong";
}
