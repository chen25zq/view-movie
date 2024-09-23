'use client'

import { useState, useEffect } from "react";
import { initUserData } from "@/utils/seats";
import { UserTable } from "@/components/admin/UserTable"
import { Button } from "@nextui-org/button";
import { NewUserModal } from "@/components/admin/NewUserModal";

export default function Admin() {
  const [openNewUser, setOpenNewUser] = useState(false);

  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('user');
    return userInfo ? JSON.parse(userInfo) : initUserData; // 如果有值则解析，否则初始化为空字符串
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleOpenNewUser = () => {
    setOpenNewUser(true);
  }

  const handleSuccess = (newUser: any) => {
    const userTemp = {
      id: user.length + 1,
      name: newUser.name,
      amount: newUser.amount,
      tickets: []
    }
    setUser([...user, userTemp]);
    setOpenNewUser(false);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <Button
          color="primary"
          className="text-sm font-normal text-default-600 mb-5"
          variant="flat"
          onClick={handleOpenNewUser}
        >
          创建新用户
        </Button>
        
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-5">
          <UserTable users={user} setUser={setUser} />
        </div>

      </div>

      { openNewUser && (<NewUserModal handleSuccess={handleSuccess} handleClose={() => setOpenNewUser(false)} />)}

    </section>
  );
}
