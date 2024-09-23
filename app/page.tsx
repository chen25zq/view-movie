'use client'

import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";

import { UserPage } from "@/modules/UserPage";
import { AdminPage } from '@/modules/AdminPage';
import { initUserData, initMovieData } from "@/utils/seats";

export default function Home() {
  const [selectUser, setSelectUser] = useState(0);

  const [movie, setMovie] = useState(() => {
    const movieInfo = localStorage.getItem('movie');
    return movieInfo ? JSON.parse(movieInfo) : initMovieData; // 如果有值则解析，否则初始化为空字符串
  });

  const handleSelectUser = (e: any) => {
    setSelectUser(Number(e.target.value));
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-5">
          <Select
            label="User"
            placeholder="Select User"
            className="max-w-xs"
            onChange={handleSelectUser}
          >
            {initUserData.map((user: any) => (
              <SelectItem key={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* 管理员角色和用户橘色操作不同 */}
        { selectUser === 4 ? <AdminPage selectUser={selectUser} movie={movie} /> : <UserPage selectUser={selectUser} movie={movie} />}
            
      </div>
    </section>
  );
}
