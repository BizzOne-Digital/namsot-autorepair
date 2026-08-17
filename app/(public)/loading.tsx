import { Container } from "@/components/ui/Container";
import { Loading } from "@/components/ui/Loading";

export default function LoadingPage() {
  return (
    <section className="section-spacing">
      <Container>
        <Loading size="lg" className="py-20" />
      </Container>
    </section>
  );
}
