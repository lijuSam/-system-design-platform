import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SystemCraft Pro | The Interactive System Design Academy for Tech Professionals',
  description: 'Master high-scale distributed system design, real-world case studies (Netflix, Uber, WhatsApp, Stripe), interactive architecture simulations, latency visualizers, and staff engineering deep dives.',
  keywords: [
    'System Design',
    'Distributed Systems',
    'Software Architecture',
    'Staff Engineer',
    'Tech Interview Preparation',
    'High Availability',
    'Microservices',
    'Database Sharding',
    'Consistent Hashing'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
