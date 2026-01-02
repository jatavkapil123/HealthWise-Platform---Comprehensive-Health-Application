import Link from 'next/link'
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const footerSections = [
    {
      title: 'Our Services',
      links: [
        { name: 'Lab Tests at Home', href: '/lab-tests' },
        { name: 'Full Body Checkup', href: '/full-body-checkup' },
        { name: 'Online Doctor Consultation', href: '/consult-doctor' },
        { name: 'Health Packages', href: '/health-packages' },
        { name: 'Radiology Tests', href: '/radiology' },
      ]
    },
    {
      title: 'Health Tests',
      links: [
        { name: 'Blood Tests', href: '/blood-tests' },
        { name: 'Diabetes Tests', href: '/diabetes-tests' },
        { name: 'Thyroid Tests', href: '/thyroid-tests' },
        { name: 'Heart Health', href: '/heart-health' },
        { name: 'Women Health', href: '/women-health' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Book a Test', href: '/book-test' },
        { name: 'Track Your Order', href: '/track-order' },
        { name: 'Download Reports', href: '/reports' },
        { name: 'Contact Us', href: '/contact' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About HealthWise', href: '/about' },
        { name: 'Our Labs', href: '/labs' },
        { name: 'Quality Assurance', href: '/quality' },
        { name: 'Careers', href: '/careers' },
        { name: 'Partner with Us', href: '/partners' },
      ]
    }
  ]

  return (
    <footer className="bg-primary-900 text-white relative overflow-hidden">
      <div className="container relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <Heart className="h-10 w-10 text-white group-hover:text-primary-200 transition-colors" />
                </div>
                <span className="text-2xl font-bold text-white">
                  HealthWise
                </span>
              </Link>
              
              <p className="text-primary-200 mb-6 leading-relaxed">
                Your trusted healthcare partner providing comprehensive diagnostic services, online consultations, and personalized health solutions.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-lg font-semibold mb-6 text-white">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-secondary-300 hover:text-primary-300 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Section */}
        <div className="border-t border-secondary-700/50 py-8">
          <div className="bg-gradient-to-r from-red-600/10 to-red-600/10 rounded-2xl p-6 border border-red-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">24/7 Emergency Support</h4>
                  <p className="text-secondary-300 text-sm">Immediate medical assistance when you need it most</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:911" className="bg-white hover:bg-secondary-50 text-secondary-700 border border-secondary-300 px-4 py-2 rounded-xl font-medium transition-colors">
                  Call 911
                </a>
                <a href="tel:+1-800-HEALTH" className="bg-gradient-to-r from-red-600 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-bold transition-colors">
                  +1-800-HEALTH
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-secondary-700/50 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <p className="font-medium text-white">Phone Support</p>
                <p className="text-secondary-300 text-sm">+1-800-HEALTHWISE</p>
                <p className="text-secondary-400 text-xs">Mon-Fri 8AM-8PM EST</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <p className="font-medium text-white">Email Support</p>
                <p className="text-secondary-300 text-sm">support@healthwise.com</p>
                <p className="text-secondary-400 text-xs">Response within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <p className="font-medium text-white">Headquarters</p>
                <p className="text-secondary-300 text-sm">123 Health Innovation Blvd</p>
                <p className="text-secondary-400 text-xs">Medical District, CA 90210</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700/50 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-secondary-400 text-sm">
                © 2024 HealthWise Platform. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-secondary-500">
                <span>Made with ❤️ for better health</span>
                <span>•</span>
                <span>Serving 50+ countries</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-secondary-400 hover:text-primary-300 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-secondary-400 hover:text-primary-300 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-secondary-400 hover:text-primary-300 text-sm transition-colors duration-200">
                Accessibility
              </Link>
              <Link href="/cookies" className="text-secondary-400 hover:text-primary-300 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}