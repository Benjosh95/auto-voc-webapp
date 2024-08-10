import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchVocs, fetchVocById, createVoc, updateVoc, deleteVoc } from "../api/vocApi"
import { Voc } from "../types/voc";

export const useVocs = (filters: Record<string, string> = {}) => {
    return useQuery<Voc[], Error>({
        queryKey: ["vocs", filters],
        queryFn: () => fetchVocs(filters),
    });
};

export const useVoc = (id: number) => {
    return useQuery<Voc, Error>({
        queryKey: ["voc", id],
        queryFn: () => fetchVocById(id),
    });
};

export const useCreateVoc = () => {
    return useMutation<Voc, Error, Voc>({
        mutationFn: createVoc,
    });
};

export const useUpdateVoc = () => {
    return useMutation<Voc, Error, {id: number, voc: Voc}>({
        mutationFn: ({id, voc}) => updateVoc(id, voc),
    });
};

export const useDeleteVoc = () => {
    return useMutation<void, Error, number>({
        mutationFn: (id: number) => deleteVoc(id),
    });
};