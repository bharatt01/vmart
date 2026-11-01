import PageHeader from ".././../components/PageHeader";
import Departments from ".././../components/Departments";

export const metadata = { title: "Departments | Value Mart" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="Departments"
        text="Everything we stock, grouped the way you shop."
      />
      <Departments heading={false} />
    </>
  );
}
