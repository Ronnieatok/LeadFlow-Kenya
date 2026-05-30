'use client'

import { useState } from 'react'
import { CheckCircle, MessageCircle } from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      })
      
      if (!response.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">LeadFlow Kenya</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              🚀 Launch Offer: 50% Off First 3 Months
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Stop Losing Property Leads on WhatsApp
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Kenyan real estate agents are closing 30% more deals with our WhatsApp Lead Manager.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-sm text-gray-500 mb-4">Join 50+ agents already on the waitlist</p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WhatsApp number (0712345678)"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? 'Joining...' : 'Get Early Access (Free 30-Day Trial)'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You're on the list!</h3>
                <p className="text-gray-600">We'll contact you within 48 hours with early access.</p>
              </div>
            )}
            
            <p className="text-xs text-gray-500 text-center mt-4">
              ✓ No credit card required • ✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Everything You Need in One Dashboard
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'WhatsApp Integration',
                description: 'All your WhatsApp conversations in one place. No more scrolling through chats.'
              },
              {
                title: 'Auto-Responses',
                description: 'Instantly reply to common questions like "What\'s the price?" or "Is it available?"'
              },
              {
                title: 'Lead Tagging',
                description: 'Mark leads as Hot, Warm, or Cold. Filter by budget, location, property type.'
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
