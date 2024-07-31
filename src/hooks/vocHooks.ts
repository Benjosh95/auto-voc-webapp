import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchVocs, fetchVocById, createVoc, Voc, updateVoc, deleteVoc } from "../api/vocApi"

export const useVocs = () => {
    return useQuery<Voc[], Error>({
        queryKey: ["vocs"],
        queryFn: fetchVocs,
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