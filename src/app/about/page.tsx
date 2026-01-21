import { redirect } from 'next/navigation';

export default function AboutRedirect() {
  // 重定向到带默认语言的关于我们页面
  redirect('/cn/about');
}