import { useState } from "react";
import { TBook } from "../types/book";
import axiosClient from "../services/axios-client";
import useBooksStore from "../store/books";

// type UseItemsReturnType = [
//   items: any,
//   {
//     addItem: (data: any) => void;
//     deleteItem: (itemId: string) => void;
//     fetchBooks: () => void;
//   }
// ];

export function useItems() {
  const { books, setBooks } = useBooksStore();
  const fetchBooks = async () => {
    const response = await axiosClient.get("/books");
    setBooks(response.data);
    console.log("fetchbookssss");
  };
  const addItem = async (book: any) => {
    await axiosClient.post("/books", book);
    await fetchBooks();
  };

  const editItem = async (id: string, book: any) => {
    await axiosClient.patch(`/books/${id}`, book);
    await fetchBooks();
  };

  const deleteItem = async (item: any) => {
    await axiosClient.delete(`/books/${item.id}`);
    await fetchBooks();
  };

  return { books, addItem, deleteItem,editItem, fetchBooks };
}
