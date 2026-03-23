"use client";
import { useCurrency } from "./CurrencyProvider";

export default function PriceDisplay({ amountGBP }: { amountGBP: number }) {
  const { formatPrice, mounted } = useCurrency();
  
  // Prevent hydration mismatch on first load
  if (!mounted) return <span className="notranslate" translate="no">£{amountGBP}</span>;
  
  return (
    <span className="notranslate" translate="no">
      {formatPrice(amountGBP)}
    </span>
  );
}