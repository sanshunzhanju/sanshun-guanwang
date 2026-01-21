import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 支持的语言
  locales: ['cn', 'en', 'jp'],
  
  // 默认语言
  defaultLocale: 'cn',
});

export const config = {
  // 只匹配需要国际化的路由
  matcher: ['/((?!api|_next|.*\..*).*)']
};