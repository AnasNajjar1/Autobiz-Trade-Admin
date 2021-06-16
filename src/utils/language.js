import { t, TranslateInstance } from "autobiz-translate";
import { stage } from "./getStage";
export let locale = "fr";

export const i18nProvider = () => ({
  translate: t,
  changeLocale: async (newlocale) => {
    locale = newlocale;
    await TranslateInstance.init("trade-admin", locale, stage);
    return locale;
  },
  getLocale: () => locale,
});
