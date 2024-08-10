import apiClient from "./apiClient";
import { Voc } from "../types/voc";

export const fetchVocs = async (filters: {[key: string]: any} = {}): Promise<Voc[]> => {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get<Voc[]>(`/vocs?${params}`);
    return response.data;
}

export const fetchVocById = async (id: number): Promise<Voc> => {
    const response = await apiClient.get<Voc>(`/vocs/${id}`);
    return response.data;
}

export const createVoc = async (voc: Voc): Promise<Voc> => {
    const response = await apiClient.post<Voc>("/vocs", voc);
    return response.data;
}

export const updateVoc = async (id: number, voc: Voc): Promise<Voc> => {
    const response = await apiClient.put<Voc>(`/vocs/${id}`, voc);
    return response.data;
}

export const deleteVoc = async (id: number): Promise<void> => {
    await apiClient.delete(`/vocs/${id}`)
};