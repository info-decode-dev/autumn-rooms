import countriesData from "@/data/countries.json";

const UK_COUNTRY_NAMES = new Set(["United Kingdom", "UK"]);

export type PaymentFrequency = "monthly" | "weekly";

type CountryConfig = {
  code: string;
  name: string;
  currencySymbol: string;
  paymentFrequency?: PaymentFrequency;
};

export function getCountryConfig(country: string): CountryConfig | undefined {
  return countriesData.find(
    (c) => c.name === country || c.code === country
  ) as CountryConfig | undefined;
}

export function getPaymentFrequency(country: string): PaymentFrequency {
  const config = getCountryConfig(country);
  if (config?.paymentFrequency) return config.paymentFrequency;
  return UK_COUNTRY_NAMES.has(country) ? "monthly" : "weekly";
}

export function getBillingPeriodLabel(country: string): string {
  return getPaymentFrequency(country) === "monthly" ? "month" : "week";
}

export function getCurrencySymbol(country: string): string {
  return getCountryConfig(country)?.currencySymbol ?? "£";
}

export function formatPriceAmount(amount: number, country: string): string {
  return `${getCurrencySymbol(country)}${amount.toLocaleString("en-GB")}`;
}

export function getPriceDisplay(amount: number, country: string) {
  return {
    amount: formatPriceAmount(amount, country),
    period: getBillingPeriodLabel(country),
  };
}

export function weeklyToMonthly(weeklyAmount: number): number {
  return Math.round((weeklyAmount * 52) / 12);
}
