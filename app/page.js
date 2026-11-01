import Hero from "../components/Hero";
import Departments from "../components/Departments";
import Offers from "../components/Offers";
import DayAtStore from "../components/DayAtStore";
import WhyUs from "../components/WhyUs";
import Visit from "../components/Visit";
import StoreReceipts from "../components/Storereceipts";
import PromiseStack from "../components/Promisestack";
import SeasonalGuide from "../components/Seasonalguide";
import FestivalBar from "../components/Festivalbar";
import BasketCalculator from "../components/BaskterCalculator";

export default function Home() {
  return (
    <>
      <Hero />
      <FestivalBar />
      <Departments />
      <BasketCalculator />
      <Offers limit={4} />
      <StoreReceipts />
      <SeasonalGuide />
      <PromiseStack />
      <DayAtStore />
      <WhyUs />
      <Visit />
    </>
  );
}
