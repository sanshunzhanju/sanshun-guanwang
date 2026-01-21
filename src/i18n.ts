// next-intl 3.0.0 直接导出配置对象
const nextIntlConfig = {
  // 支持的语言
  locales: ['cn', 'en', 'jp'],
  
  // 默认语言
  defaultLocale: 'cn',
  
  // 翻译文件的路径
  messages: {
    cn: () => import('./i18n/messages/cn.json'),
    en: () => import('./i18n/messages/en.json'),
    jp: () => import('./i18n/messages/jp.json')
  }
};

export default nextIntlConfig;