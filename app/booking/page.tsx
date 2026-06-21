"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Upload, CreditCard, FileText, ChevronRight, ChevronLeft, Map, Bed, User, Building,
  Bath, Utensils, BookOpen, Monitor
} from "lucide-react";
import Link from "next/link";
import { getPriceDisplay } from "@/lib/pricing";

const UK_COUNTRY = "United Kingdom";

const getAmenityIcon = (am: string) => {
  const lower = am.toLowerCase();
  if (lower.includes('kitchen')) return <Utensils className="w-3.5 h-3.5" />;
  if (lower.includes('bathroom') || lower.includes('en-suite')) return <Bath className="w-3.5 h-3.5" />;
  if (lower.includes('desk') || lower.includes('study')) return <BookOpen className="w-3.5 h-3.5" />;
  if (lower.includes('bed')) return <Bed className="w-3.5 h-3.5" />;
  return <Check className="w-3.5 h-3.5" />;
};

const steps = [
  { id: 1, name: "Space", icon: Map },
  { id: 2, name: "Details", icon: FileText },
  { id: 3, name: "Documents", icon: Upload },
  { id: 4, name: "Review", icon: Check },
  { id: 5, name: "Payment", icon: CreditCard }
];

const buildingData = [
  {
    floor: "Ground Floor",
    rooms: [
      {
        id: "101",
        name: "Premium Studio 101",
        type: "Studio",
        amenities: ["Private Kitchen", "En-suite Bathroom", "Double Bed"],
        spaces: [
          { id: "101-A", label: "Entire Studio", isOccupied: false, priceAmount: 1820 }
        ]
      },
      {
        id: "102",
        name: "Twin En-suite 102",
        type: "Shared",
        amenities: ["En-suite Bathroom", "Study Desk", "Single Bed"],
        spaces: [
          { id: "102-A", label: "Bed A", isOccupied: true, occupant: { age: 21, country: "United Kingdom", avatarColor: "bg-blue-100 text-blue-600" } },
          { id: "102-B", label: "Bed B", isOccupied: false, priceAmount: 1213 }
        ]
      }
    ]
  },
  {
    floor: "First Floor",
    rooms: [
      {
        id: "201",
        name: "Twin En-suite 201",
        type: "Shared",
        amenities: ["En-suite Bathroom", "Study Desk", "Small Double Bed"],
        spaces: [
          { id: "201-A", label: "Bed A", isOccupied: true, occupant: { age: 22, country: "Germany", avatarColor: "bg-orange-100 text-orange-600" } },
          { id: "201-B", label: "Bed B", isOccupied: true, occupant: { age: 20, country: "Spain", avatarColor: "bg-purple-100 text-purple-600" } }
        ]
      },
      {
        id: "202",
        name: "Triple En-suite 202",
        type: "Shared",
        amenities: ["En-suite Bathroom", "Shared Kitchen", "Single Bed"],
        spaces: [
          { id: "202-A", label: "Bed A", isOccupied: true, occupant: { age: 19, country: "Australia", avatarColor: "bg-green-100 text-green-600" } },
          { id: "202-B", label: "Bed B", isOccupied: false, priceAmount: 1040 },
          { id: "202-C", label: "Bed C", isOccupied: false, priceAmount: 1040 }
        ]
      }
    ]
  }
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  
  // Selection States
  const [selectedFloor, setSelectedFloor] = useState(buildingData[0].floor);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep === 1 && !selectedSpaceId) return; // Must select space
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
    else setIsComplete(true);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const activeFloorData = buildingData.find(f => f.floor === selectedFloor);

  // Helper to find selected space details
  let selectedSpaceDetails: any = null;
  let selectedRoomName = "";
  if (selectedSpaceId) {
    buildingData.forEach(f => {
      f.rooms.forEach(r => {
        const space = r.spaces.find(s => s.id === selectedSpaceId);
        if (space) {
          selectedSpaceDetails = space;
          selectedRoomName = r.name;
        }
      });
    });
  }

  const selectedPriceDisplay =
    selectedSpaceDetails?.priceAmount != null
      ? getPriceDisplay(selectedSpaceDetails.priceAmount, UK_COUNTRY)
      : null;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-semibold text-[var(--foreground)] mb-8">Complete Your Booking</h1>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-[var(--foreground)]/10">
              <motion.div 
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[var(--color-soft-gold)] transition-all duration-500"
              />
            </div>
            <div className="flex justify-between w-full">
              {steps.map(step => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    currentStep >= step.id ? "bg-[var(--color-soft-gold)] text-white" : "bg-[var(--foreground)]/10 text-[var(--foreground)]/40"
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium mt-2 ${currentStep >= step.id ? "text-[var(--foreground)]" : "text-[var(--foreground)]/40"}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[var(--foreground)]/10 min-h-[500px] flex flex-col relative">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Select Space */}
            {!isComplete && currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Building className="w-6 h-6 text-[var(--color-soft-gold)]" />
                  <h2 className="text-2xl font-serif font-bold text-[var(--foreground)]">Select Your Space</h2>
                </div>
                <p className="text-[var(--foreground)]/60 mb-8">Choose your preferred floor, room, and bed space.</p>

                {/* Floor Tabs */}
                <div className="flex gap-4 border-b border-[var(--foreground)]/10 mb-8 overflow-x-auto pb-1">
                  {buildingData.map((floor) => (
                    <button
                      key={floor.floor}
                      onClick={() => setSelectedFloor(floor.floor)}
                      className={`px-6 py-3 font-medium text-lg border-b-2 transition-all whitespace-nowrap ${
                        selectedFloor === floor.floor
                          ? "border-[var(--color-soft-gold)] text-[var(--color-soft-gold)]"
                          : "border-transparent text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80"
                      }`}
                    >
                      {floor.floor}
                    </button>
                  ))}
                </div>

                {/* Rooms List */}
                <div className="flex flex-col gap-8">
                  {activeFloorData?.rooms.map((room) => (
                    <div key={room.id} className="bg-white dark:bg-zinc-900 border border-[var(--foreground)]/10 rounded-3xl p-6 md:p-8 shadow-sm">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <div className="flex-1 pr-4">
                          <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-4">{room.name}</h3>
                          <div className="border-t border-[var(--foreground)]/10 pt-4">
                            <h4 className="text-[10px] font-bold text-[var(--foreground)]/50 uppercase tracking-widest mb-3">Room Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map(am => (
                                <span key={am} className="flex items-center gap-1.5 text-xs font-semibold bg-[var(--foreground)]/5 border border-[var(--foreground)]/5 text-[var(--foreground)]/70 px-3 py-1.5 rounded-full">
                                  {getAmenityIcon(am)} {am}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-bold px-4 py-2 bg-[var(--color-soft-gold)]/10 text-[var(--color-soft-gold)] rounded-full whitespace-nowrap">
                          {room.type}
                        </span>
                      </div>

                      <div className="border border-[var(--foreground)]/10 rounded-2xl overflow-hidden bg-[var(--background)]">
                        {room.spaces.map((space, index) => {
                          const isSelected = selectedSpaceId === space.id;
                          const isLast = index === room.spaces.length - 1;
                          
                          if (space.isOccupied) {
                            return (
                              <div key={space.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-4 bg-[var(--foreground)]/5 opacity-70 ${!isLast ? 'border-b border-[var(--foreground)]/5' : ''}`}>
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center ${space.occupant?.avatarColor}`}>
                                    <User className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-[var(--foreground)]/80 text-lg">{space.label}</h4>
                                    <p className="text-sm font-medium text-[var(--foreground)]/60">Occupied • {space.occupant?.age}y, {space.occupant?.country}</p>
                                  </div>
                                </div>
                                <div>
                                  <span className="inline-block px-4 py-2 rounded-full bg-[var(--foreground)]/10 text-[var(--foreground)]/50 text-sm font-bold cursor-not-allowed">
                                    Unavailable
                                  </span>
                                </div>
                              </div>
                            );
                          }
                          
                          const priceDisplay = space.priceAmount != null
                            ? getPriceDisplay(space.priceAmount, UK_COUNTRY)
                            : null;

                          return (
                            <div 
                              key={space.id}
                              onClick={() => setSelectedSpaceId(space.id)}
                              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-4 cursor-pointer transition-colors ${!isLast ? 'border-b border-[var(--foreground)]/5' : ''} ${isSelected ? 'bg-[var(--color-soft-gold)]/5' : 'hover:bg-[var(--foreground)]/5'}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center transition-colors ${isSelected ? 'bg-[var(--color-soft-gold)] text-white shadow-md' : 'bg-white dark:bg-zinc-800 border border-[var(--foreground)]/10 text-[var(--foreground)]/60'}`}>
                                  <Bed className="w-6 h-6" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-[var(--foreground)] text-lg">{space.label}</h4>
                                  {priceDisplay && (
                                    <p className="text-base font-bold text-[var(--foreground)]/80">
                                      {priceDisplay.amount}
                                      <span className="text-sm font-medium text-[var(--foreground)]/50"> / {priceDisplay.period}</span>
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <button className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${isSelected ? 'bg-[var(--color-soft-gold)] text-white shadow-md scale-105' : 'border border-[var(--color-soft-gold)] text-[var(--color-soft-gold)] hover:bg-[var(--color-soft-gold)] hover:text-white'}`}>
                                  {isSelected ? 'Selected' : 'Select'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Details */}
            {!isComplete && currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-2xl font-serif font-semibold mb-6 text-[var(--foreground)]">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">First Name</label>
                    <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="john.doe@example.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">Age</label>
                    <input type="number" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="e.g. 21" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">Country</label>
                    <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="e.g. United Kingdom" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Document Upload */}
            {!isComplete && currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-2xl font-serif font-semibold mb-6 text-[var(--foreground)]">Document Upload</h2>
                <p className="text-[var(--foreground)]/60 mb-6 text-sm">Please upload your ID and university offer letter to verify your student status.</p>
                <div className="border-2 border-dashed border-[var(--foreground)]/20 bg-[var(--background)] rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--color-soft-gold)] transition-colors mb-6">
                  <div className="w-16 h-16 bg-[var(--color-soft-gold)]/10 text-[var(--color-soft-gold)] rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="font-medium text-[var(--foreground)] mb-1">Click to upload or drag and drop</h4>
                  <p className="text-xs text-[var(--foreground)]/50">PDF, JPG, PNG (max 5MB)</p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {!isComplete && currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-2xl font-serif font-semibold mb-6 text-[var(--foreground)]">Review Booking</h2>
                <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--foreground)]/10 mb-6 shadow-inner">
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-[var(--foreground)]/10">
                    <div>
                      <h3 className="font-semibold text-xl text-[var(--foreground)]">{selectedRoomName}</h3>
                      <p className="text-[var(--foreground)]/60 mt-1">{selectedFloor} • {selectedSpaceDetails?.label}</p>
                    </div>
                    <div className="text-right">
                      {selectedPriceDisplay && (
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-3xl font-serif font-bold text-[var(--foreground)]">{selectedPriceDisplay.amount}</span>
                          <span className="text-base text-[var(--foreground)]/50 font-medium">/ {selectedPriceDisplay.period}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">Move in</span>
                      <span className="font-semibold text-[var(--foreground)]">01 Sep 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">Move out</span>
                      <span className="font-semibold text-[var(--foreground)]">30 Jun 2027</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">Payment plan</span>
                      <span className="font-semibold text-[var(--foreground)]">Monthly instalments</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-[var(--foreground)]/10">
                      <span className="font-bold text-[var(--foreground)] text-base">Deposit Due Now</span>
                      <span className="font-bold text-[var(--color-soft-gold)] text-lg">£500</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Payment */}
            {!isComplete && currentStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-2xl font-serif font-semibold mb-6 text-[var(--foreground)]">Payment</h2>

                <div className="bg-[var(--color-soft-gold)]/10 border border-[var(--color-soft-gold)]/30 rounded-2xl p-5 mb-8">
                  <p className="text-sm font-bold text-[var(--foreground)] mb-1">Payment plan</p>
                  <p className="text-lg font-serif font-semibold text-[var(--foreground)]">Monthly instalments</p>
                  <p className="text-sm text-[var(--foreground)]/60 mt-2">
                    UK bookings are billed monthly only. Rent is charged on the 1st of each month for the duration of your tenancy.
                  </p>
                </div>

                <div className="flex gap-4 mb-8">
                  <div className="flex-1 bg-[var(--background)] border-2 border-[var(--color-soft-gold)] rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <CreditCard className="w-5 h-5 text-[var(--color-soft-gold)]" />
                    <span className="font-medium text-[var(--foreground)]">Card</span>
                  </div>
                  <div className="flex-1 bg-[var(--background)] border border-[var(--foreground)]/10 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-[var(--color-soft-gold)]/50 transition-colors">
                    <span className="font-medium text-[var(--foreground)]">Fairexpay</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">Card Number</label>
                  <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">Expiry Date</label>
                    <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">CVC</label>
                    <input type="text" className="w-full bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-soft-gold)] transition-colors" placeholder="123" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Complete */}
            {isComplete && (
              <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-[var(--foreground)] mb-4">Booking Confirmed!</h2>
                <p className="text-[var(--foreground)]/60 mb-8 max-w-md mx-auto">Your accommodation has been successfully reserved. We've sent a confirmation email with your invoice and next steps.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                    Download Invoice
                  </button>
                  <Link href="/" className="bg-transparent border border-[var(--foreground)]/20 text-[var(--foreground)] px-8 py-3 rounded-full font-medium hover:bg-[var(--foreground)]/5 transition-colors">
                    Return to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isComplete && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-[var(--foreground)]/10 w-full">
              <button 
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 font-medium transition-colors ${currentStep === 1 ? "text-[var(--foreground)]/20 cursor-not-allowed" : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"}`}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              <button 
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedSpaceId}
                className={`px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  currentStep === 1 && !selectedSpaceId
                    ? "bg-[var(--foreground)]/10 text-[var(--foreground)]/40 cursor-not-allowed"
                    : "bg-[var(--color-soft-gold)] text-white hover:opacity-90"
                }`}
              >
                {currentStep === 5 ? "Pay Now" : "Continue"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
