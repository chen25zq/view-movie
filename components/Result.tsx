"use client";

import * as React from "react";
import { useState } from "react";

export interface ResultProps {
  seats: any;
  sellPrice: number;
}

export function Result({ seats, sellPrice }: ResultProps) {
  const len = !seats?.allSeats?.length ? 72 : 72 - seats?.allSeats?.length;
  
  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5">
        <p>剩余座位数量: { len }</p>
        <p>用户预定座位价格: { sellPrice }</p>
      </div>
    </>
  );
}
