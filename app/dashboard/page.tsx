"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, CreditCard, Building2, TrendingUp, Search, Bell, Settings, LogOut, ChevronRight, Download, Link as LinkIcon, Video } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20">
        <div className="p-6">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">Partner Portal</h2>
          <nav className="flex flex-col gap-2">
            {[
              { id: "overview", name: "Overview", icon: LayoutDashboard },
              { id: "bookings", name: "Bookings", icon: CreditCard },
              { id: "leads", name: "Lead Pipeline", icon: Users },
              { id: "properties", name: "Properties", icon: Building2 },
              { id: "reports", name: "Reports & Analytics", icon: TrendingUp },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? "bg-[var(--color-soft-gold)]/10 text-[var(--color-warm-brown)]" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-charcoal-black)]">Alex Morgan</p>
              <p className="text-xs text-gray-500">Sales Partner</p>
            </div>
          </div>
          <Link href="/architecture" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-2">
            <Settings className="w-4 h-4" /> System Settings
          </Link>
          <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-charcoal-black)]">Welcome back, Alex</h1>
            <p className="text-gray-500 text-sm">Here's what's happening with your bookings today.</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search bookings..." className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:border-[var(--color-soft-gold)]" />
            </div>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 relative hover:bg-gray-50">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-[var(--color-charcoal-black)] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors hidden sm:block">
              New Quotation
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Revenue", value: "£124,500", trend: "+12.5%", color: "text-green-500" },
            { label: "Active Bookings", value: "48", trend: "+4", color: "text-green-500" },
            { label: "Pending Leads", value: "12", trend: "-2", color: "text-red-500" },
            { label: "Conversion Rate", value: "24.8%", trend: "+2.1%", color: "text-green-500" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-serif font-semibold text-[var(--color-charcoal-black)]">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.color}`}>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[var(--color-charcoal-black)]">Recent Bookings</h3>
              <button className="text-sm text-[var(--color-soft-gold)] hover:underline font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Student</th>
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, name: "Sarah Jenkins", property: "The Glasshouse, London", status: "Confirmed", amount: "£14,500" },
                    { id: 2, name: "Michael Chang", property: "Aura Residence, Sydney", status: "Pending Payment", amount: "$22,000" },
                    { id: 3, name: "Emma Watson", property: "Nordic Suites, Berlin", status: "Documents Verifying", amount: "€12,800" },
                  ].map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-4 font-medium text-gray-900">{booking.name}</td>
                      <td className="px-4 py-4 text-gray-500">{booking.property}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Confirmed" ? "bg-green-100 text-green-700" :
                          booking.status === "Pending Payment" ? "bg-orange-100 text-orange-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-900">{booking.amount}</td>
                      <td className="px-4 py-4">
                        <button className="text-gray-400 hover:text-[var(--color-charcoal-black)]">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[var(--color-charcoal-black)] mb-6">Partner Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-[var(--color-soft-gold)] hover:bg-[var(--color-soft-gold)]/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">Generate Payment Link</span>
                </div>
              </button>
              <button className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-[var(--color-soft-gold)] hover:bg-[var(--color-soft-gold)]/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100">
                    <Download className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">Download Invoices</span>
                </div>
              </button>
              <button className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 hover:border-[var(--color-soft-gold)] hover:bg-[var(--color-soft-gold)]/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-100">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">Upload Property Video</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
