import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ContactUsProps = {
  name: string;
  companyName: string;
  siteUrl: string;
  supportEmail: string;
  supportPhone?: string;
};

export function ContactUs(props: ContactUsProps) {
  const { name, companyName, siteUrl, supportEmail, supportPhone } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>We got your message</Preview>
        <Body className="bg-gray-100 font-sans py-[60px]">
          <Container className="bg-white max-w-[500px] mx-auto px-[48px] py-[56px]">
            <Heading className="text-[28px] font-bold text-black mb-[12px] tracking-tight">
              Thanks, {name}
            </Heading>

            <Text className="text-[16px] text-gray-600 mb-[32px] leading-[24px]">
              We received your message and will get back to you within 24 hours.
            </Text>

            <Section className="border-l-[3px] border-black pl-[20px] mb-[40px]">
              <Text className="text-[14px] font-medium text-black mb-[8px] uppercase tracking-[1px]">
                What's next
              </Text>
              <Text className="text-[15px] text-gray-700 mb-[8px] leading-[22px]">
                Our team reviews your inquiry
              </Text>
              <Text className="text-[15px] text-gray-700 mb-[8px] leading-[22px]">
                We prepare a detailed response
              </Text>
              <Text className="text-[15px] text-gray-700 mb-0 leading-[22px]">
                You'll hear from us soon
              </Text>
            </Section>

            <Text className="text-[14px] text-gray-500 mb-[40px] leading-[20px]">
              Need immediate help? Reply to this email
              {supportPhone ? ` or call us at ${supportPhone}` : ""}
            </Text>

            <Text className="text-[15px] text-black font-medium mb-[4px]">
              The {companyName} Team
            </Text>
            <Text className="text-[14px] text-gray-600 mb-[48px]">{companyName}</Text>

            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-400 text-center m-0">
                <Link href={siteUrl} className="text-gray-400 no-underline">
                  {siteUrl.replace(/^https?:\/\//, "")}
                </Link>{" "}
                •
                <Link
                  href={`mailto:${supportEmail}`}
                  className="text-gray-400 no-underline ml-[8px]"
                >
                  {supportEmail}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ContactUs.PreviewProps = {
  name: "Sarah",
  subject: "product demo request",
  companyName: "Astraq Cyber Defence",
  siteUrl: "https://astraqcyberdefence.com",
  supportEmail: "hello@astraqcyberdefence.com",
  supportPhone: "(+44) 0000 000000",
};

export default ContactUs;
