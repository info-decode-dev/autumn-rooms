import InfoPageLayout from "@/components/InfoPageLayout";

export default function FaqPage() {
  return (
    <InfoPageLayout title="FAQ" description="Answers to common questions about booking with Autumn Rooms.">
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">What is included in the rent?</h2>
          <p>Rent typically includes Wi-Fi, electricity, water, and gas. Each property page lists exactly what is covered.</p>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">Can international students book?</h2>
          <p>Yes. International students are welcome and may need a guarantor depending on the destination.</p>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">What is the cancellation policy?</h2>
          <p>Many properties offer No Visa, No Pay and No Place, No Pay policies. Terms vary by property.</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
