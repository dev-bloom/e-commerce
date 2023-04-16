import { PropsWithChildren } from "react";

interface SummaryScreenProps {
  onNextStep: () => void;
}

const SummaryScreen = ({
  onNextStep,
}: PropsWithChildren<SummaryScreenProps>) => {
  return (
    <div className="summary-screen">
      <h1>Resúmen de compra</h1>
    </div>
  );
};

export default SummaryScreen;
