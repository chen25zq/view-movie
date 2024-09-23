import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export interface NewUserModalProps {
    handleSuccess: any;
    handleClose: any;
}

export const NewUserModal = ({ handleSuccess, handleClose }: NewUserModalProps) => {
  const [user, setUser] = useState({});
  
  const handleSubmit = () => {
    handleSuccess(user);
  }

  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-400 text-black px-24 py-22 rounded shadow-lg">
          <h1 className="text-3xl font-bold mt-5">新增用户</h1>

          <Input
            type="name"
            label="Name"
            className="max-w-xs mt-8"
            onValueChange={(value) => setUser({...user, name: value })}
          />

          <Input
            type="amount"
            label="Amount"
            className="max-w-xs mt-10"
            onValueChange={(value) => setUser({...user, amount: Number(value) })}
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