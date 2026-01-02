import { DoctorIllustration, LabTestIllustration, TelehealthIllustration, HeartHealthIllustration } from './HealthIllustrations'

export function HealthShowcase() {
  const showcaseItems = [
    {
      illustration: DoctorIllustration,
      title: "Expert Medical Professionals",
      description: "Certified doctors and specialists available 24/7 for consultations"
    },
    {
      illustration: LabTestIllustration,
      title: "Advanced Laboratory Testing",
      description: "State-of-the-art diagnostic equipment with accurate results"
    },
    {
      illustration: TelehealthIllustration,
      title: "Telemedicine Services",
      description: "Virtual consultations from the comfort of your home"
    },
    {
      illustration: HeartHealthIllustration,
      title: "Comprehensive Health Monitoring",
      description: "Complete health tracking and preventive care solutions"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-50/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            Why Choose HealthWise?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience healthcare excellence with our comprehensive range of medical services and cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcaseItems.map((item, index) => (
            <div 
              key={index}
              className="group text-center"
            >
              <div className="mb-6 flex justify-center">
                <item.illustration 
                  size="lg" 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">50K+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">500+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">1000+</div>
              <div className="text-gray-600">Lab Tests</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}