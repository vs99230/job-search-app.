import axios from "axios";

const API_URL = "https://jsearch.p.rapidapi.com/search";

export const fetchJobs = async () => {
  try {

    const response = await axios.get(API_URL, {
      params: {
        query: "internship",
        location: "india",
        page: "1",
        num_pages: "1"
      },
      headers: {
        "x-rapidapi-key": "904704eb3cmshc2e551138892107p1bd773jsn4d5afcfc6132",
        "x-rapidapi-host": "jsearch.p.rapidapi.com"
      }
    });

    return response.data.data;

  } catch (error) {

    console.log("API ERROR:", error.response?.status);

    return [];
  }
};