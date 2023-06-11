import enUSLocale from '@/i18n/locales/en-US';
import { UseTranslationOptions, useTranslation } from 'react-i18next';

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never;

type LocaleKeys = DotNestedKeys<typeof enUSLocale>;

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    t: (key: LocaleKeys, options?: UseTranslationOptions) =>
      t(key, options ?? {}),
    i18n,
  };
};

export default useAppTranslation;
