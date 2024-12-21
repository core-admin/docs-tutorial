import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { User } from '@clerk/nextjs/server';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserName(user: User) {
  let name: string | undefined;

  // console.log('user.fullName', user.fullName);
  // if (user.fullName) {
  //   name = user.fullName;
  // } else if

  if (user.firstName && user.lastName) {
    // 判断是否包含英文字符
    const hasEnglish = (str: string) => /[a-zA-Z]/.test(str);
    const needSpace = hasEnglish(user.firstName) || hasEnglish(user.lastName);

    name = needSpace
      ? `${user.firstName} ${user.lastName}` // 英文名用空格分隔
      : `${user.firstName}${user.lastName}`; // 中文名直接拼接
  } else {
    name = user.username || user.primaryEmailAddress?.emailAddress;
  }
  return name || '匿名用户';
}
