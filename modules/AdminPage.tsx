"use client";

import * as React from "react";
import { useState } from "react";
import { Link } from "@nextui-org/link";

import { Select, SelectItem } from "@nextui-org/select";
import { SeatSelection } from "@/components/SeatSelection";

export interface AdminPageProps {
  selectUser: number;
  movie: any;
}

export function AdminPage({ selectUser, movie }: AdminPageProps) {
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

      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-8">
        <Link
          className="flex items-center gap-1 text-current"
          href="/admin"
          title="用户管理"
        >
          <p className="text-primary">用户管理</p>
        </Link>

        <Link
          className="flex items-center gap-1 text-current"
          href="/movie"
          title="电影管理"
        >
          <p className="text-primary">电影管理</p>
        </Link>
      </div>

      <SeatSelection selectUser={selectUser} selectMovie={selectMovie} />
    </>
  );
}
