import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { EditIcon } from "./EditIcon";
import { MovieForm } from "./MovieForm";
import { DeleteIcon } from "./DeleteIcon";

export interface MovieTableProps {
  movies: any[];
  setMovies: any;
}

export const MovieTable = ({ movies, setMovies }: MovieTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSuccess = (values: any) => {
    const currentUserIndex = movies.findIndex(item => item.id === values.id);
    console.log("handleSuccess", currentUserIndex);
    
    if (currentUserIndex > -1) {
      movies[currentUserIndex] = values; // 更新电影信息
      setMovies([...movies]); // 更新电影信息
    }
    setIsOpen(false);
  }

  const handleUpdateMovie = (movie: any) => () => {
    setSelectedMovie(movie);
    setIsOpen(true);
  }

  const handleRemoveMovie = (movie: any) => () => {
    const filteredMovies = movies.filter(item => item.id !== movie.id);
    console.log(filteredMovies, "handleRemoveMovie");
    setMovies([...filteredMovies]);
  }

  const columns = [
    {name: "电影名称", uid: "title"},
    {name: "电影票价", uid: "price"},
    {name: "电影简介", uid: "description"},
    {name: "操作", uid: "actions"},
  ];

  const renderCell = React.useCallback((movie, columnKey) => {
    const cellValue = movie[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-600">{movie.title}</p>
          </div>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-600">{movie.price}</p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-600">{movie.description}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
              <EditIcon onClick={handleUpdateMovie(movie)}/>
            </span>

            <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
              {movie.id > 3 && <DeleteIcon onClick={handleRemoveMovie(movie)}/>}
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={movies}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      { isOpen && (<MovieForm selectedMovie={selectedMovie} handleSuccess={handleSuccess} handleClose={() => setIsOpen(false)} />)}
    </>
  );
}
