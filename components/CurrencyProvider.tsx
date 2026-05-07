"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Currency = "SAR" | "GBP" | "USD" | "EUR";

export const RATES: Record<Currency, { rate: number; symbol: string }> = {
  SAR: { rate: 1,     symbol: "SAR " },
  GBP: { rate: 0.2,   symbol: "£" },
  USD: { rate: 0.267, symbol: "$" },
  EUR: { rate: 0.234, symbol: "€" },
};

const CurrencyContext = createContext<any>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("SAR");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("currency") as Currency;
    if (saved && RATES[saved]) setCurrency(saved);
  }, []);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem("currency", c);
  };

  const formatPrice = (amountSAR: number) => {
    const { rate, symbol } = RATES[currency];
    const converted = Math.round(amountSAR * rate);
    return `${symbol}${converted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, mounted, RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
