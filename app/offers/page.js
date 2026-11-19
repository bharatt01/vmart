import PageHeader from "./../../components/PageHeader";
import Offers from "./../../components/Offers";
import OffersBoard from "../../components/Offersboard";
import SpinToWin from "../../components/Spintowin";

export const metadata = { title: "Offers | Value Mart" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="This week’s offers"
        text="Prices are valid in store while stock lasts."
      />
      <SpinToWin  />
      <OffersBoard />
      <Offers heading={false} />
    </>
  );
}
