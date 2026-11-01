import PageHeader from "././../../components/PageHeader";
import Visit from "././../../components/Visit";

export const metadata = { title: "Contact | Value Mart" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="Contact us"
        text="Call, message us on WhatsApp, or just walk in."
      />
      <Visit />
    </>
  );
}
