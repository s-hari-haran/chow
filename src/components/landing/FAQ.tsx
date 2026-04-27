import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do guards need to install an app?",
    a: "No. GuardCheck runs in any modern mobile browser. Guards just open the link, sign in, and tap Scan — the camera permission is requested directly inside the page.",
  },
  {
    q: "How does the QR check-in prevent fraud?",
    a: "Each site has a unique QR value tied to its location in the database. The check-in only succeeds when a guard scans the QR for the site they are assigned to.",
  },
  {
    q: "Can I override attendance manually?",
    a: "Yes. Admins can mark, correct, or reverse attendance entries from the admin dashboard. Every change is timestamped for audit.",
  },
  {
    q: "How is salary calculated?",
    a: "Each guard has a configurable base monthly salary. Daily earnings are derived from working days in the month and present days, and rendered live on the salary screen.",
  },
  {
    q: "Is my data secure?",
    a: "GuardCheck uses Supabase with row-level security and role-based access, so guards only ever see their own data and admins see only their organisation.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-28">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
