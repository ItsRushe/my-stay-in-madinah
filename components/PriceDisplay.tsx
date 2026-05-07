"use client";
import { useCurrency } from "./CurrencyProvider";

export default function PriceDisplay({ amountSAR }: { amountSAR: number }) {
  const { formatPrice, mounted } = useCurrency();

  if (!mounted) return <span className="notranslate" translate="no">SAR {amountSAR}</span>;

  return (
    <span className="notranslate" translate="no">
      {formatPrice(amountSAR)}
    </span>
  );
}
