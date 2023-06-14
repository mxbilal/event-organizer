export const fetchAction = (action) => {
  const { endpoint, payload, verb } = action;

  const result = new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: verb,
      body: payload,
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => console.log("error: ",error));
  });
  return result;
};
