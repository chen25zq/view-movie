'use client'

import { useState, useEffect } from "react";
import { initMovieData } from "@/utils/seats";
import { MovieTable } from "@/components/movie/MovieTable"
import { Button } from "@nextui-org/button";
import { MovieForm } from "@/components/movie/MovieForm";

export default function Movie() {
  const [openMovieForm, setOpenMovieForm] = useState(false);

  const [movie, setMovie] = useState(() => {
    const movieInfo = localStorage.getItem('movie');
    return movieInfo ? JSON.parse(movieInfo) : initMovieData; // 如果有值则解析，否则初始化为空字符串
  });

  useEffect(() => {
    localStorage.setItem('movie', JSON.stringify(movie));
  }, [movie]);

  const handleOpenMovieForm = () => {
    setOpenMovieForm(true);
  }

  const handleSuccess = (newMovie: any) => {
    // 新增电影 id 最大值加 1
    const maxId = movie.length == 0 ? 0 : movie.reduce((max, obj) => {
        return obj.id > max ? obj.id : max;
    }, movie[0].id);
    const movieTemp = {
      id: maxId + 1,
      title: newMovie.title,
      price: newMovie.price,
      description: newMovie.description,
    }
    setMovie([...movie, movieTemp]);
    setOpenMovieForm(false);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <Button
          color="primary"
          className="text-sm font-normal text-default-600 mb-5"
          variant="flat"
          onClick={handleOpenMovieForm}
        >
          创建新电影
        </Button>
        
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-5">
          <MovieTable movies={movie} setMovies={setMovie} />
        </div>

      </div>

      { openMovieForm && (<MovieForm handleSuccess={handleSuccess} handleClose={() => setOpenMovieForm(false)} />)}

    </section>
  );
}
