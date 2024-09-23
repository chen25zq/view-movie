"use client";

import * as React from "react";
import { useState } from "react";

import { Select, SelectItem } from "@nextui-org/select";
import { SeatSelection } from "@/components/SeatSelection";

export interface UserPageProps {
  selectUser: number;
  movie: any;
}

export function UserPage({ selectUser, movie }: UserPageProps) {
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
          {movie.map((item: any) => (
            <SelectItem key={item.id}>
              {item.title}
            </SelectItem>
          ))}
        </Select>
      </div>

      <SeatSelection selectUser={selectUser} selectMovie={selectMovie} />
    </>
  );
}
