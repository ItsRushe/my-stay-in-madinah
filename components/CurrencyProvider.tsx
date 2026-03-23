"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Currency = "GBP" | "USD" | "EUR" | "SAR";

export const RATES: Record<Currency, { rate: number; symbol: string }> = {
  GBP: { rate: 1, symbol: "£" },
  USD: { rate: 1.27, symbol: "$" },
  EUR: { rate: 1.17, symbol: "€" },
  SAR: { rate: 4.76, symbol: "SAR " },
};

const CurrencyContext = createContext<any>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("SAR"); // ✅ Changed to SAR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("currency") as Currency;
    if (saved && RATES[saved]) setCurrency(saved);
  },[]);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem("currency", c);
  };

  const formatPrice = (amountGBP: number) => {
    const { rate, symbol } = RATES[currency];
    const converted = Math.round(amountGBP * rate);
    return `${symbol}${converted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, mounted, RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);