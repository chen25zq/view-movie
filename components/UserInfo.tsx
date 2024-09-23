"use client";

import * as React from "react";
import { Card, CardBody } from "@nextui-org/card";

export interface UserInfoProps {
  user: any;
  selectUser: number;
}

export function UserInfo({ user, selectUser }: UserInfoProps) {
  
  const currentUser = user.filter(item => item.id === selectUser)[0];

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5">
        <Card>
          <CardBody>
            <p>用户名称：{currentUser?.name}</p>
            <p>用户剩余金额：{currentUser?.amount}</p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
