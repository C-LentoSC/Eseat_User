interface FareSummaryProps {
  baseFare: number;
  convenienceFee: number;
  bankCharges: number;
}

export function FareSummary({
  baseFare,
  convenienceFee,
  bankCharges,
}: FareSummaryProps) {
  const total = baseFare + convenienceFee + bankCharges;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-4">Trip Fare Summary</h3>
      <div className="space-y-5">
        <div className="flex border-t pt-2 gap-4">
          <span className="text-gray-600 flex items-center justify-center gap-3">
            Nittambuwa{" "}
            <img src="/assets/arrow.svg" alt="arrow" className="w-4 h-4" />
            Colombo
          </span>
          <span className="text-gray-600">Rs. 1374.50</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="text-gray-600">Base Fare</span>
          <span>Rs {baseFare.toFixed(2)}</span>
        </div> */}
        <div className="flex justify-between border-t pt-2">
          <span className="text-gray-600">Convenience Fee</span>
          <span>Rs {convenienceFee.toFixed(2)}</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="text-gray-600">Bank Charges</span>
          <span>Rs {bankCharges.toFixed(2)}</span>
        </div> */}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total Pay</span>
            <span>Rs {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
