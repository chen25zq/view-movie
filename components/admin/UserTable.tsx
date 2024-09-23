import React, { useState, useEffect } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { EditIcon } from "./EditIcon";
import { UserModal } from "./UserModal";

export interface UserTableProps {
  users: any[];
  setUser: any;
}

export const UserTable = ({ users, setUser }: UserTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSuccess = (values: any) => {
    const currentUserIndex = users.findIndex(item => item.id === values.id);
    console.log("handleSuccess", currentUserIndex);
    
    if (currentUserIndex > -1) {
      users[currentUserIndex] = values; // 更新用户信息
      setUser([...users]); // 更新用户信息
    }
    setIsOpen(false);
  }

  const handleUpdateUser = (user: any) => () => {
    setSelectedUser(user);
    setIsOpen(true);
  }

  const columns = [
    {name: "用户名称", uid: "name"},
    {name: "用户金额", uid: "amount"},
    {name: "操作", uid: "actions"},
  ];

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-600">{user.name}</p>
          </div>
        );
      case "amount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-600">{user.amount}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
              <EditIcon onClick={handleUpdateUser(user)}/>
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
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      { isOpen && (<UserModal selectedUser={selectedUser} handleSuccess={handleSuccess} handleClose={() => setIsOpen(false)} />)}
    </>
  );
}
