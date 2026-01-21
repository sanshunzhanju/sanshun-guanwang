import { redirect } from 'next/navigation';

export default function ProductDetailRedirect({ params }: { params: { id: string } }) {
  // 重定向到带默认语言的产品详情页面
  redirect(`/cn/products/${params.id}`);
}