import apiClient from "./apiClient";

export interface Voc {
    id: number;
    english: string;
    german: string;
}

export const fetchVocs = async (): Promise<Voc[]> => {
    const response = await apiClient.get<Voc[]>("/vocs");
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