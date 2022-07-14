import { createI18n } from 'vue-i18n';
import { getUrlParameterValue } from '@/utils/commonUtil.js';
import tw from '@/i18n/zh-TW';
import cn from '@/i18n/zh-CN';
import en from '@/i18n/en';

const messages = {
    'zh-TW': tw,
    'zh-CN': cn,
    en,
};

const locale = getUrlParameterValue('lang') || navigator.language || navigator.userLanguage;
const i18n = createI18n({
    locale,
    fallbackLocale: 'zh-TW',
    messages,
});

export default i18n;
