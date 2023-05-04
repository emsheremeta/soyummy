import { axiosInstance } from "service/API/axios";

export const fetchFavorites = () => {
  return axiosInstance.get(`/favorite/`).then(({ data }) => {
    return data;
  });
};

export const deleteFavorite = (id) => {
  return axiosInstance.delete(`/favorite/del/${id}`).then(({ data }) => {
    return data;
  });
};

export const addFavorite = (id) => {
  
  return axiosInstance.put(`/favorite/add/${id}`, {}).then(({ data }) => {
    return data;
  });
};
