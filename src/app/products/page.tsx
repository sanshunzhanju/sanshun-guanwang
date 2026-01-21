import { redirect } from 'next/navigation';

export default function ProductsRedirect() {
  // 重定向到带默认语言的产品列表页面
  redirect('/cn/products');
}