import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ReviewsPage from "@/pages/ReviewsPage";
import BeforeAfterPage from "@/pages/BeforeAfterPage";
import ServicesPage from "@/pages/ServicesPage";
import ServicePage from "@/pages/ServicePage";
import ServiceAreasPage from "@/pages/ServiceAreasPage";
import CityPage from "@/pages/CityPage";
import DealershipsFleetPage from "@/pages/DealershipsFleetPage";
import LearnPDRPage from "@/pages/LearnPDRPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/before-after" element={<BeforeAfterPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="/service-areas" element={<ServiceAreasPage />} />
                <Route path="/service-areas/:slug" element={<CityPage />} />
                <Route path="/dealerships-fleet" element={<DealershipsFleetPage />} />
                <Route path="/learn-pdr" element={<LearnPDRPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
