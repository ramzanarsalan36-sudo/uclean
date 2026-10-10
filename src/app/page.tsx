'use client';

import React, { useState } from 'react';
import { CompactHero } from '@/components/CompactHero';
import { PromoTicker } from '@/components/PromoTicker';
import { ChooseServiceHorizontal } from '@/components/ChooseServiceHorizontal';
import { RateCardListSection } from '@/components/RateCardListSection';
import { HomeCareSection } from '@/components/HomeCareSection';
import { CoreLaundrySection } from '@/components/CoreLaundrySection';
import { MembershipCards } from '@/components/MembershipCards';
import { FooterStore } from '@/components/FooterStore';
import { DetailedOrderFormModal } from '@/components/DetailedOrderFormModal';
import { CrmPortal } from '@/components/CrmPortal';
import { Phone, Calendar, LayoutDashboard } from 'lucide-react';

export default function Home() {
  const [viewMode, setViewMode] = useState<'store' | 'crm'>('store');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Wash & Fold — ₹109/kg');
  const [selectedGarmentName, setSelectedGarmentName] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenOrderForm = (service: string = 'Wash & Fold — ₹109/kg', garment: string = '') => {
    setSelectedService(service);
    setSelectedGarmentName(garment);
    setIsOrderModalOpen(true);
  };

  const handleClaimMembership = (tier: string) => {
    setSelectedService(`VIP Membership Claim (${tier})`);
    setSelectedGarmentName(`VIP ${tier} Tier Package`);
    setIsOrderModalOpen(true);
  };

  const handleScrollToRateCard = () => {
    const el = document.getElementById('rate-list-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (viewMode === 'crm') {
    return <CrmPortal onBackToStore={() => setViewMode('store')} />;
  }

  return (
    <main className="app-container relative pb-16">

      {/* 1. Hero Section (Adjusted to Half Screen with Search Feature & Branding) */}
      <CompactHero
        onSearch={(q) => {
          setSearchQuery(q);
          if (q) {
            handleScrollToRateCard();
          }
        }}
        onExplore={() => {
          const el = document.getElementById('choose-service-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Promo Ticker */}
      <PromoTicker />

      {/* 2. Choose The Service You Need - Horizontal 1:1 Professional Cards */}
      <ChooseServiceHorizontal
        onSelectService={(srv, garment) => handleOpenOrderForm(srv, garment)}
        onCheckGarmentPrice={handleScrollToRateCard}
      />

      {/* 3. Third Section: Clean Rate Card List with Prominent ORDER NOW Button (Matching Screenshot 3) */}
      <RateCardListSection
        onOrderNow={(srv, item) => handleOpenOrderForm(srv, item)}
        searchFilter={searchQuery}
      />

      {/* 4. Fourth Section: Sofa & Curtain (Parda) Cleaning (Matching Screenshot 4) */}
      <HomeCareSection onOpenBooking={() => handleOpenOrderForm('Home Upholstery Care', 'Sofa & Curtain Deep Shampooing')} />

      {/* 5. Core Everyday Laundry Rates */}
      <CoreLaundrySection onOpenBooking={() => handleOpenOrderForm('Wash & Fold — ₹109/kg')} />

      {/* 6. VIP Membership Cards (Silver, Gold, Platinum In-Card Poster Styles) */}
      <MembershipCards onClaimMembership={handleClaimMembership} />

      {/* 7. Store Location & Contact Footer */}
      <FooterStore />

      {/* Sticky Bottom Quick Booking Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 bg-white/95 backdrop-blur-md border-t border-[#DECBB0] p-2.5 px-4 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
        <a
          href="tel:+917400474132"
          className="flex items-center gap-2 text-[#072618] font-bold text-xs hover:text-[#008f51]"
        >
          <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#DECBB0] flex items-center justify-center text-[#008f51]">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#4e6b5d] block">Direct Hotline</span>
            <span>74004 74132</span>
          </div>
        </a>

        <button
          onClick={() => handleOpenOrderForm('Wash & Fold — ₹109/kg')}
          className="bg-gradient-to-r from-[#008f51] to-[#05a862] hover:from-[#05a862] hover:to-[#008f51] text-white px-5 py-2.5 rounded-full font-heading font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5 text-[#ffe57f]" />
          <span>Book Free Pickup</span>
        </button>
      </div>

      {/* Comprehensive Pickup & Order Modal with Firebase & WhatsApp Dispatch */}
      <DetailedOrderFormModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedService={selectedService}
        garmentName={selectedGarmentName}
      />

    </main>
  );
}
