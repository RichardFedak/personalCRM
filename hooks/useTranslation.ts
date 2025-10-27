import type { Translations } from '@/locales/types';
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t: translate, i18n } = useI18nTranslation();

  // Create a proxy that provides nested object access with TypeScript support
  const createNestedProxy = (prefix = ''): any => {
    return new Proxy({} as any, {
      get(target, prop: string) {
        const fullKey = prefix ? `${prefix}.${prop}` : prop;
        
        // Check if this could be a nested object
        const translation = translate(fullKey, { returnObjects: true });
        
        if (typeof translation === 'object' && translation !== null) {
          // Return another proxy for nested access
          return createNestedProxy(fullKey);
        }
        
        // Return the actual translation string
        return translate(fullKey);
      }
    });
  };

  const t = createNestedProxy() as Translations;

  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage,
    isRTL: false,
    // Keep the old string-based function for backward compatibility
    translate: (key: string) => translate(key),
  };
};

export default useTranslation;