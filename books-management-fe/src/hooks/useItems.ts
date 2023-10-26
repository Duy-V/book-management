import { useState } from "react";
import { TBook } from "../types/book";
import axiosClient from "../services/axios-client";
import useBooksStore from "../store/books";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useItems() {
  const { setBooks } = useBooksStore();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axiosClient.get("/books");
      return response.data;
    },
  });
  const addItem = useMutation({
    mutationFn: async (book: any) => {
      return axiosClient.post("/books", book);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["books"]);
    },
    onError: async () => {
      console.log("onError");
    },
  });
  const fetchBooks = async () => {
    const response = await axiosClient.get("/books");
    setBooks(response.data);
  };

  const editItem = useMutation({
    mutationFn: async ({
      bookId,
      convertValues,
    }: {
      bookId: string;
      convertValues: TBook;
    }) => {
      return axiosClient.patch(`/books/${bookId}`, convertValues);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["books"]);
    },
    onError: async () => {
      console.log("onError");
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (book: TBook) => {
      return axiosClient.delete(`/books/${book.id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  return {
    books: data || [],
    isLoading,
    addItem,
    deleteItem,
    editItem,
    fetchBooks,
  };
}
