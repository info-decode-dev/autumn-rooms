import InfoPageLayout from "@/components/InfoPageLayout";

export default function HowItWorksPage() {
  return (
    <InfoPageLayout
      title="How it Works"
      description="Book your student accommodation in a few simple steps."
    >
      <p>Browse properties by destination, compare rooms, and complete your booking online.</p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Search by city, university, or country.</li>
        <li>Choose your room and review what's included.</li>
        <li>Upload documents and confirm your booking.</li>
        <li>Pay securely and receive your confirmation.</li>
      </ol>
    </InfoPageLayout>
  );
}
