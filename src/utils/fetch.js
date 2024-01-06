import axios from "axios";

export const fetch = async (
  req,
  path,
  data = {},
  headers = {},
  params = {},
  baseUrl
) => {
  const url = baseUrl ?? "https://swapi.dev/api";
  try {
    const config = {
      method: req,
      url: url + path,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      params: params,
      data: req !== "GET" ? data : null,
      paramsSerializer: (params) => {
        return Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
