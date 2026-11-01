import PageHeader from "@/components/PageHeader";
import WhyUs from "@/components/WhyUs";

export const metadata = { title: "About | Value Mart" };

export default function Page() {
  return (
    <>
      <PageHeader title="About Value Mart" />
      <section className="bg-mist">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {/* Replace with your real story: who started the store, when, and why. */}
          <p className="text-lg leading-relaxed text-brand-ink/80">
            Value Mart started as a simple idea: a grocery store that feels like the big
            supermarkets for choice and price, but is small enough to know its customers by name.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-brand-ink/80">
            We stock the things a family needs every week, keep prices clearly marked, and
            stay open from morning to late evening so you can shop when it suits you.
          </p>
        </div>
      </section>
      <WhyUs />
    </>
  );
}
