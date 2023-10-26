import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../services/axios-client";
import useTagsStore from "../store/tags";

export const useTags = () => {
  const queryClient = useQueryClient();
  const { setTags } = useTagsStore();
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axiosClient.get("/tags");
      return response.data;
    },
  });
  const addTag = useMutation({
    mutationFn: async (book: any) => {
      return axiosClient.post("/tags", book);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["tags"]);
    },
    onError: async () => {
      console.log("onError");
    },
  });
  const fetchTags = async () => {
    const response = await axiosClient.get("/tags");
    setTags(response.data);
  };
  return {
    tags: data || [],
    isLoading,
    addTag,
    fetchTags
  };
};
