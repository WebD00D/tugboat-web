export const createId = idType => {
  return `${idType}-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 16)}`;
};

export const getQueryVariable = variable => {
  const query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
