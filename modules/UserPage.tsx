"use client";

import * as React from "react";
import { useState } from "react";

import { Select, SelectItem } from "@nextui-org/select";
import { SeatSelection } from "@/components/SeatSelection";

import { initMovieData } from "@/utils/seats";

export interface UserPageProps {
  selectUser: number;
}

export function UserPage({ selectUser }: UserPageProps) {
  const [selectMovie, setSelectMovie] = useState(0);

  const handleSelectMovie = (e: any) => {
    setSelectMovie(Number(e.target.value));
  };

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select
          label="Pick a Movie"
          placeholder="Select Movie"
          className="max-w-xs"
          onChange={handleSelectMovie}
        >
          {initMovieData.map((movie: any) => (
            <SelectItem key={movie.id}>
              {movie.title}
            </SelectItem>
          ))}
        </Select>
      </div>

      <SeatSelection selectUser={selectUser} selectMovie={selectMovie} />
    </>
  );
}
