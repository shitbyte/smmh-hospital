// pages/index.jsx  ── Home Page
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { QuickAccess, ServicesSection, AboutSection, DepartmentsSection } from "../components/Sections";
import { AppointmentSection, DoctorsSection, WhyUsSection, TestimonialsSection, NewsSection, ContactSection } from "../components/MoreSections";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <QuickAccess />
      <ServicesSection />
      <AboutSection />
      <DepartmentsSection />
      <AppointmentSection />
      <DoctorsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <NewsSection />
      <ContactSection />
    </Layout>
  );
}
