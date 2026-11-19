import PageHeader from ".././../components/PageHeader";
import Departments from ".././../components/Departments";
import DepartmentsAisles from "../../components/Departmentsaisles";

export const metadata = { title: "Categories | Value Mart" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="Categories"
        text="Everything we stock, grouped the way you shop."
      />
      <DepartmentsAisles />
      <Departments heading={false} />
    </>
  );
}
