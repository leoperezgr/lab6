// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/business-units';

export const getBusinessUnits = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las unidades de negocio:', error);
    throw error;
  }
};

export const getBusinessUnit = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la unidad de negocio:', error);
    throw error;
  }
};

export const createBusinessUnit = async (businessUnit) => {
  try {
    const response = await axios.post(API_URL, businessUnit);
    return response.data;
  } catch (error) {
    console.error('Error al crear la unidad de negocio:', error);
    throw error;
  }
};

export const updateBusinessUnit = async (id, businessUnit) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, businessUnit);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la unidad de negocio:', error);
    throw error;
  }
};

export const deleteBusinessUnit = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la unidad de negocio:', error);
    throw error;
  }
};
