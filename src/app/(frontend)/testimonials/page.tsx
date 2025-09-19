import type { Metadata } from 'next'
import React from 'react'

export const revalidate = 600

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Claims Director',
    company: 'Premier Insurance',
    avatar: 'S',
    avatarColor: 'from-blue-500 to-blue-600',
    rating: 5,
    testimonial: "Wave reduced our estimate generation time from 3 days to 15 minutes. The accuracy is incredible and our customers are thrilled with the faster service. The AI technology has completely transformed how we handle property damage assessments.",
    metrics: {
      timeSaved: '95%',
      accuracyImprovement: '30%'
    }
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Senior Adjuster',
    company: 'Coastal Property Group',
    avatar: 'M',
    avatarColor: 'from-green-500 to-green-600',
    rating: 5,
    testimonial: "The AI accuracy is phenomenal. Wave catches details that human assessors sometimes miss, and the comprehensive reports save us hours of documentation work. Our team productivity has increased significantly.",
    metrics: {
      detectionRate: '98%',
      documentationTime: '80% faster'
    }
  },
  {
    id: 3,
    name: 'Amanda Foster',
    role: 'VP Operations',
    company: 'Nationwide Adjusters',
    avatar: 'A',
    avatarColor: 'from-purple-500 to-purple-600',
    rating: 5,
    testimonial: "Our customer satisfaction scores increased by 40% after implementing Wave. Faster estimates mean happier customers and better business relationships. The ROI has been exceptional.",
    metrics: {
      customerSatisfaction: '+40%',
      roi: '300%'
    }
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Technology Director',
    company: 'InsureTech Solutions',
    avatar: 'D',
    avatarColor: 'from-orange-500 to-orange-600',
    rating: 5,
    testimonial: "Integration was seamless and the API is robust. Wave&apos;s technology stack is impressive and their support team is outstanding. We&apos;ve processed over 10,000 assessments with 99.2% accuracy.",
    metrics: {
      apiUptime: '99.9%',
      integrationTime: '2 weeks'
    }
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Regional Manager',
    company: 'Atlantic Insurance Group',
    avatar: 'L',
    avatarColor: 'from-pink-500 to-pink-600',
    rating: 5,
    testimonial: "Wave has revolutionized our damage assessment process. The detailed reports and accurate cost estimates have improved our claim settlements and reduced disputes significantly.",
    metrics: {
      disputeReduction: '60%',
      settlementAccuracy: '95%'
    }
  },
  {
    id: 6,
    name: 'Robert Johnson',
    role: 'Chief Claims Officer',
    company: 'Secure Property Insurance',
    avatar: 'R',
    avatarColor: 'from-indigo-500 to-indigo-600',
    rating: 5,
    testimonial: "The cost savings and efficiency gains from Wave are remarkable. We&apos;ve reduced our operational costs by 35% while improving service quality. It&apos;s a game-changer for the insurance industry.",
    metrics: {
      costReduction: '35%',
      efficiencyGain: '250%'
    }
  }
]

const companyLogos = [
  'Premier Insurance',
  'Coastal Property Group', 
  'Nationwide Adjusters',
  'InsureTech Solutions',
  'Atlantic Insurance Group',
  'Secure Property Insurance'
]

export default async function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Dotted pattern background */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Customer Success Stories
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            See how Wave is transforming estimate report generation for insurance companies and property assessors worldwide.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm text-gray-500 font-medium">Trusted by:</div>
            {companyLogos.map((company, index) => (
              <div key={index} className="text-sm text-gray-400 font-medium">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">15min</div>
              <div className="text-gray-600 font-medium">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-gray-600 font-medium">Savings Generated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from industry professionals who have transformed their operations with Wave.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex text-orange-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                {/* Testimonial */}
                <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                  &ldquo;{testimonial.testimonial}&rdquo;
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(testimonial.metrics).map(([key, value], index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join hundreds of insurance companies who have transformed their estimate report generation with Wave&apos;s AI technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
              Book a Demo
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="inline-flex items-center px-10 py-5 border-2 border-gray-300 text-gray-300 font-medium rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-lg">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Customer Testimonials - Wave AI Damage Assessment',
    description: 'See how Wave is transforming estimate report generation for insurance companies and property assessors worldwide. Real success stories from industry leaders.',
  }
}


