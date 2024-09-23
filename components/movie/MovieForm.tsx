import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export interface MovieFormProps {
    selectedMovie?: any;
    handleSuccess: any;
    handleClose: any;
}

export const MovieForm = ({ selectedMovie, handleSuccess, handleClose }: MovieFormProps) => {
  console.log(selectedMovie, 'selectedMovie');
  
  const [movie, setMovie] = useState(selectedMovie ||{});
  
  const handleSubmit = () => {
    handleSuccess(movie);
  }

  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-400 text-black px-8 py-22 rounded shadow-lg">
          <h1 className="text-3xl font-bold mt-5">{`${selectedMovie? '编辑' : '新增'}电影`}</h1>

          <Input
            type="title"
            label="Title"
            className="max-w-sm mt-8"
            defaultValue={selectedMovie?.title}
            onValueChange={(value) => setMovie({...movie, title: value })}
          />

          <Input
            type="price"
            label="Price"
            className="max-w-sm mt-10"
            defaultValue={selectedMovie?.price}
            onValueChange={(value) => setMovie({...movie, price: Number(value) })}
          />

          <Textarea
            type="description"
            label="Description"
            className="max-w-sm mt-10"
            defaultValue={selectedMovie?.description}
            onValueChange={(value) => setMovie({...movie, description: value })}
          />

          <Button
            className="text-sm font-normal text-default-600 bg-default-100 mt-10 mb-5"
            variant="flat"
            onClick={handleSubmit}
          >
            提交
          </Button>

          <Button
            className="text-sm font-normal text-default-600 bg-default-100 ml-5"
            variant="flat"
            onClick={handleCloseModal}
          >
            关闭
          </Button>

        </div>
      </div>
    </>
  );
}