import PageHeader from "./../../components/PageHeader";
import Offers from "./../../components/Offers";

export const metadata = { title: "Offers | Value Mart" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="This week’s offers"
        text="Prices are valid in store while stock lasts."
      />
      <Offers heading={false} />
    </>
  );
}
