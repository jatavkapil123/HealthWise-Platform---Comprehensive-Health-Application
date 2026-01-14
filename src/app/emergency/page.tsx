'use client'

import { useState } from 'react'
import { Phone, Search, MapPin, AlertCircle, Clock, ChevronDown, ChevronUp, Activity, Truck } from 'lucide-react'
import Link from 'next/link'

interface Hospital {
  name: string
  phone: string
  type: string
  available: string
}

interface StateHospitals {
  hospitals: Hospital[]
}

type EmergencyContactsType = {
  [key: string]: StateHospitals
}

export default function EmergencyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [expandedState, setExpandedState] = useState<string | null>(null)

  const emergencyContacts: EmergencyContactsType = {
    'National Emergency Numbers': {
      hospitals: [
        { name: 'National Emergency Number', phone: '112', type: 'All Emergencies', available: '24/7' },
        { name: 'Ambulance Service', phone: '102', type: 'Medical Emergency', available: '24/7' },
        { name: 'Police Emergency', phone: '100', type: 'Police', available: '24/7' },
        { name: 'Fire Emergency', phone: '101', type: 'Fire', available: '24/7' },
        { name: 'Women Helpline', phone: '1091', type: 'Women Safety', available: '24/7' },
        { name: 'Child Helpline', phone: '1098', type: 'Child Safety', available: '24/7' },
        { name: 'Senior Citizen Helpline', phone: '14567', type: 'Senior Citizens', available: '24/7' }
      ]
    },
    'Delhi': {
      hospitals: [
        { name: 'AIIMS Delhi', phone: '011-26588500', type: 'Multi-specialty', available: '24/7' },
        { name: 'Safdarjung Hospital', phone: '011-26165060', type: 'Government Hospital', available: '24/7' },
        { name: 'Ram Manohar Lohia Hospital', phone: '011-23404242', type: 'Government Hospital', available: '24/7' },
        { name: 'GTB Hospital', phone: '011-22582000', type: 'Government Hospital', available: '24/7' },
        { name: 'Lady Hardinge Medical College', phone: '011-23408180', type: 'Women & Children', available: '24/7' }
      ]
    },
    'Maharashtra': {
      hospitals: [
        { name: 'KEM Hospital Mumbai', phone: '022-24107000', type: 'Government Hospital', available: '24/7' },
        { name: 'Sion Hospital Mumbai', phone: '022-24076381', type: 'Government Hospital', available: '24/7' },
        { name: 'JJ Hospital Mumbai', phone: '022-23735555', type: 'Government Hospital', available: '24/7' },
        { name: 'Sassoon Hospital Pune', phone: '020-26053401', type: 'Government Hospital', available: '24/7' },
        { name: 'GMCH Nagpur', phone: '0712-2721721', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Karnataka': {
      hospitals: [
        { name: 'Victoria Hospital Bangalore', phone: '080-26700301', type: 'Government Hospital', available: '24/7' },
        { name: 'Bowring Hospital Bangalore', phone: '080-25532222', type: 'Government Hospital', available: '24/7' },
        { name: 'KC General Hospital Bangalore', phone: '080-26612354', type: 'Government Hospital', available: '24/7' },
        { name: 'NIMHANS Bangalore', phone: '080-26995000', type: 'Mental Health', available: '24/7' },
        { name: 'Jayadeva Hospital Bangalore', phone: '080-22977471', type: 'Cardiac Care', available: '24/7' }
      ]
    },
    'Tamil Nadu': {
      hospitals: [
        { name: 'Rajiv Gandhi Govt Hospital Chennai', phone: '044-25952221', type: 'Government Hospital', available: '24/7' },
        { name: 'Stanley Medical College Chennai', phone: '044-25281351', type: 'Government Hospital', available: '24/7' },
        { name: 'Kilpauk Medical College Chennai', phone: '044-26442967', type: 'Government Hospital', available: '24/7' },
        { name: 'Madurai Govt Hospital', phone: '0452-2530530', type: 'Government Hospital', available: '24/7' },
        { name: 'Coimbatore Medical College', phone: '0422-2570170', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'West Bengal': {
      hospitals: [
        { name: 'SSKM Hospital Kolkata', phone: '033-22231823', type: 'Government Hospital', available: '24/7' },
        { name: 'RG Kar Medical College', phone: '033-25557656', type: 'Government Hospital', available: '24/7' },
        { name: 'Medical College Kolkata', phone: '033-22441752', type: 'Government Hospital', available: '24/7' },
        { name: 'NRS Medical College', phone: '033-22651394', type: 'Government Hospital', available: '24/7' },
        { name: 'Calcutta National Medical College', phone: '033-24363901', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Uttar Pradesh': {
      hospitals: [
        { name: 'King George Medical University Lucknow', phone: '0522-2257450', type: 'Government Hospital', available: '24/7' },
        { name: 'BRD Medical College Gorakhpur', phone: '0551-2273001', type: 'Government Hospital', available: '24/7' },
        { name: 'Lala Lajpat Rai Hospital Kanpur', phone: '0512-2556262', type: 'Government Hospital', available: '24/7' },
        { name: 'SN Medical College Agra', phone: '0562-2850060', type: 'Government Hospital', available: '24/7' },
        { name: 'IMS BHU Varanasi', phone: '0542-2369444', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Gujarat': {
      hospitals: [
        { name: 'Civil Hospital Ahmedabad', phone: '079-22680074', type: 'Government Hospital', available: '24/7' },
        { name: 'BJ Medical College Ahmedabad', phone: '079-22680074', type: 'Government Hospital', available: '24/7' },
        { name: 'SSG Hospital Vadodara', phone: '0265-2427491', type: 'Government Hospital', available: '24/7' },
        { name: 'Civil Hospital Surat', phone: '0261-2470001', type: 'Government Hospital', available: '24/7' },
        { name: 'PDU Medical College Rajkot', phone: '0281-2577445', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Rajasthan': {
      hospitals: [
        { name: 'SMS Hospital Jaipur', phone: '0141-2560291', type: 'Government Hospital', available: '24/7' },
        { name: 'JLN Hospital Ajmer', phone: '0145-2627091', type: 'Government Hospital', available: '24/7' },
        { name: 'MB Hospital Udaipur', phone: '0294-2482891', type: 'Government Hospital', available: '24/7' },
        { name: 'SN Medical College Jodhpur', phone: '0291-2512444', type: 'Government Hospital', available: '24/7' },
        { name: 'RNT Medical College Udaipur', phone: '0294-2412121', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Telangana': {
      hospitals: [
        { name: 'Gandhi Hospital Hyderabad', phone: '040-27501190', type: 'Government Hospital', available: '24/7' },
        { name: 'Osmania General Hospital', phone: '040-24600146', type: 'Government Hospital', available: '24/7' },
        { name: 'Niloufer Hospital Hyderabad', phone: '040-23300238', type: 'Women & Children', available: '24/7' },
        { name: 'Chest Hospital Hyderabad', phone: '040-24750123', type: 'Respiratory', available: '24/7' },
        { name: 'Fever Hospital Hyderabad', phone: '040-23814939', type: 'Infectious Diseases', available: '24/7' }
      ]
    },
    'Andhra Pradesh': {
      hospitals: [
        { name: 'King George Hospital Visakhapatnam', phone: '0891-2564290', type: 'Government Hospital', available: '24/7' },
        { name: 'Government General Hospital Vijayawada', phone: '0866-2474444', type: 'Government Hospital', available: '24/7' },
        { name: 'SVIMS Tirupati', phone: '0877-2287777', type: 'Government Hospital', available: '24/7' },
        { name: 'Guntur Medical College', phone: '0863-2228456', type: 'Government Hospital', available: '24/7' },
        { name: 'Rangaraya Medical College Kakinada', phone: '0884-2369999', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Kerala': {
      hospitals: [
        { name: 'Medical College Thiruvananthapuram', phone: '0471-2443152', type: 'Government Hospital', available: '24/7' },
        { name: 'Medical College Kottayam', phone: '0481-2597227', type: 'Government Hospital', available: '24/7' },
        { name: 'Medical College Kozhikode', phone: '0495-2353424', type: 'Government Hospital', available: '24/7' },
        { name: 'Medical College Thrissur', phone: '0487-2381122', type: 'Government Hospital', available: '24/7' },
        { name: 'Medical College Ernakulam', phone: '0484-2403282', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Punjab': {
      hospitals: [
        { name: 'PGIMER Chandigarh', phone: '0172-2747585', type: 'Government Hospital', available: '24/7' },
        { name: 'Government Medical College Patiala', phone: '0175-2212042', type: 'Government Hospital', available: '24/7' },
        { name: 'Guru Nanak Dev Hospital Amritsar', phone: '0183-2223181', type: 'Government Hospital', available: '24/7' },
        { name: 'Civil Hospital Ludhiana', phone: '0161-2740301', type: 'Government Hospital', available: '24/7' },
        { name: 'DMC Hospital Ludhiana', phone: '0161-2302146', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Haryana': {
      hospitals: [
        { name: 'PGIMS Rohtak', phone: '01262-211307', type: 'Government Hospital', available: '24/7' },
        { name: 'Civil Hospital Gurgaon', phone: '0124-2322001', type: 'Government Hospital', available: '24/7' },
        { name: 'BPS Medical College Sonipat', phone: '0130-2221102', type: 'Government Hospital', available: '24/7' },
        { name: 'Civil Hospital Faridabad', phone: '0129-2412345', type: 'Government Hospital', available: '24/7' },
        { name: 'Kalpana Chawla Medical College Karnal', phone: '0184-2200200', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Madhya Pradesh': {
      hospitals: [
        { name: 'Hamidia Hospital Bhopal', phone: '0755-2740381', type: 'Government Hospital', available: '24/7' },
        { name: 'MY Hospital Indore', phone: '0731-2537777', type: 'Government Hospital', available: '24/7' },
        { name: 'Gajra Raja Medical College Gwalior', phone: '0751-2423800', type: 'Government Hospital', available: '24/7' },
        { name: 'Gandhi Medical College Bhopal', phone: '0755-2672855', type: 'Government Hospital', available: '24/7' },
        { name: 'Netaji Subhash Chandra Bose Medical College Jabalpur', phone: '0761-2672102', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Bihar': {
      hospitals: [
        { name: 'PMCH Patna', phone: '0612-2300249', type: 'Government Hospital', available: '24/7' },
        { name: 'IGIMS Patna', phone: '0612-2297256', type: 'Government Hospital', available: '24/7' },
        { name: 'Nalanda Medical College Patna', phone: '0612-2670423', type: 'Government Hospital', available: '24/7' },
        { name: 'Darbhanga Medical College', phone: '06272-244444', type: 'Government Hospital', available: '24/7' },
        { name: 'Anugrah Narayan Magadh Medical College Gaya', phone: '0631-2222222', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Odisha': {
      hospitals: [
        { name: 'SCB Medical College Cuttack', phone: '0671-2322644', type: 'Government Hospital', available: '24/7' },
        { name: 'Capital Hospital Bhubaneswar', phone: '0674-2390633', type: 'Government Hospital', available: '24/7' },
        { name: 'MKCG Medical College Berhampur', phone: '0680-2222222', type: 'Government Hospital', available: '24/7' },
        { name: 'VSS Medical College Burla', phone: '0663-2430204', type: 'Government Hospital', available: '24/7' },
        { name: 'SLN Medical College Koraput', phone: '06852-250250', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Assam': {
      hospitals: [
        { name: 'Gauhati Medical College', phone: '0361-2528009', type: 'Government Hospital', available: '24/7' },
        { name: 'Silchar Medical College', phone: '03842-230009', type: 'Government Hospital', available: '24/7' },
        { name: 'Jorhat Medical College', phone: '0376-2300009', type: 'Government Hospital', available: '24/7' },
        { name: 'Tezpur Medical College', phone: '03712-230009', type: 'Government Hospital', available: '24/7' },
        { name: 'Dibrugarh Medical College', phone: '0373-2300009', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Jharkhand': {
      hospitals: [
        { name: 'RIMS Ranchi', phone: '0651-2460009', type: 'Government Hospital', available: '24/7' },
        { name: 'MGM Medical College Jamshedpur', phone: '0657-2426666', type: 'Government Hospital', available: '24/7' },
        { name: 'Patliputra Medical College Dhanbad', phone: '0326-2300009', type: 'Government Hospital', available: '24/7' },
        { name: 'Sheikh Bhikhari Medical College Hazaribagh', phone: '06546-262222', type: 'Government Hospital', available: '24/7' },
        { name: 'Palamu Medical College Daltonganj', phone: '06562-222222', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Chhattisgarh': {
      hospitals: [
        { name: 'Dr. BRAM Hospital Raipur', phone: '0771-2221111', type: 'Government Hospital', available: '24/7' },
        { name: 'Pt. JNM Medical College Raipur', phone: '0771-2574221', type: 'Government Hospital', available: '24/7' },
        { name: 'Chhattisgarh Institute of Medical Sciences Bilaspur', phone: '07752-260009', type: 'Government Hospital', available: '24/7' },
        { name: 'Late Baliram Kashyap Memorial Medical College Jagdalpur', phone: '07782-222222', type: 'Government Hospital', available: '24/7' },
        { name: 'Government Medical College Rajnandgaon', phone: '07744-222222', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Uttarakhand': {
      hospitals: [
        { name: 'AIIMS Rishikesh', phone: '0135-2462000', type: 'Government Hospital', available: '24/7' },
        { name: 'Base Hospital Dehradun', phone: '0135-2746301', type: 'Government Hospital', available: '24/7' },
        { name: 'Government Medical College Haldwani', phone: '05946-262222', type: 'Government Hospital', available: '24/7' },
        { name: 'Doon Hospital Dehradun', phone: '0135-2653400', type: 'Government Hospital', available: '24/7' },
        { name: 'District Hospital Nainital', phone: '05942-235222', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Himachal Pradesh': {
      hospitals: [
        { name: 'IGMC Shimla', phone: '0177-2652320', type: 'Government Hospital', available: '24/7' },
        { name: 'Dr. RPGMC Kangra', phone: '01892-267222', type: 'Government Hospital', available: '24/7' },
        { name: 'Zonal Hospital Dharamshala', phone: '01892-222222', type: 'Government Hospital', available: '24/7' },
        { name: 'Regional Hospital Mandi', phone: '01905-222222', type: 'Government Hospital', available: '24/7' },
        { name: 'Civil Hospital Kullu', phone: '01902-222222', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Jammu & Kashmir': {
      hospitals: [
        { name: 'SKIMS Srinagar', phone: '0194-2401013', type: 'Government Hospital', available: '24/7' },
        { name: 'Government Medical College Srinagar', phone: '0194-2503342', type: 'Government Hospital', available: '24/7' },
        { name: 'Government Medical College Jammu', phone: '0191-2585013', type: 'Government Hospital', available: '24/7' },
        { name: 'District Hospital Anantnag', phone: '01932-222222', type: 'Government Hospital', available: '24/7' },
        { name: 'District Hospital Baramulla', phone: '01954-222222', type: 'Government Hospital', available: '24/7' }
      ]
    },
    'Goa': {
      hospitals: [
        { name: 'Goa Medical College Bambolim', phone: '0832-2458700', type: 'Government Hospital', available: '24/7' },
        { name: 'District Hospital Margao', phone: '0832-2705664', type: 'Government Hospital', available: '24/7' },
        { name: 'District Hospital Mapusa', phone: '0832-2262372', type: 'Government Hospital', available: '24/7' },
        { name: 'Cottage Hospital Chicalim', phone: '0832-2527272', type: 'Government Hospital', available: '24/7' },
        { name: 'Sub District Hospital Ponda', phone: '0832-2312346', type: 'Government Hospital', available: '24/7' }
      ]
    }
  }

  const states = Object.keys(emergencyContacts).filter(state => state !== 'National Emergency Numbers')

  const filteredStates = states.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emergencyContacts[state].hospitals.some(hospital =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const toggleState = (state: string) => {
    setExpandedState(expandedState === state ? null : state)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Emergency Services</h1>
          </div>
          <p className="text-xl text-red-100">24/7 Emergency Contact Numbers - Government Hospitals Across India</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="tel:112" className="flex items-center gap-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Phone className="h-6 w-6 text-red-600" />
              <div>
                <div className="font-bold text-red-900">112</div>
                <div className="text-sm text-red-700">Emergency</div>
              </div>
            </a>
            <a href="tel:102" className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-bold text-blue-900">102</div>
                <div className="text-sm text-blue-700">Ambulance</div>
              </div>
            </a>
            <a href="tel:100" className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <AlertCircle className="h-6 w-6 text-indigo-600" />
              <div>
                <div className="font-bold text-indigo-900">100</div>
                <div className="text-sm text-indigo-700">Police</div>
              </div>
            </a>
            <a href="tel:101" className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <div>
                <div className="font-bold text-orange-900">101</div>
                <div className="text-sm text-orange-700">Fire</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by state or hospital name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* National Emergency Numbers */}
        <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            National Emergency Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts['National Emergency Numbers'].hospitals.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.phone}`}
                className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow border border-red-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.type}</p>
                  </div>
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-600 mb-1">{contact.phone}</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Clock className="h-4 w-4" />
                  {contact.available}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* State-wise Hospitals */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="h-6 w-6" />
            State-wise Government Hospitals
          </h2>

          {filteredStates.map((state) => (
            <div key={state} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleState(state)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{state}</h3>
                  <span className="text-sm text-gray-500">
                    ({emergencyContacts[state].hospitals.length} hospitals)
                  </span>
                </div>
                {expandedState === state ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedState === state && (
                <div className="px-6 pb-6 pt-2 border-t bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emergencyContacts[state].hospitals.map((hospital: Hospital, index: number) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{hospital.name}</h4>
                            <p className="text-sm text-gray-600">{hospital.type}</p>
                          </div>
                          <Activity className="h-5 w-5 text-primary-600 flex-shrink-0" />
                        </div>
                        <a
                          href={`tel:${hospital.phone}`}
                          className="flex items-center gap-2 text-lg font-bold text-primary-600 hover:text-primary-700 mb-2"
                        >
                          <Phone className="h-4 w-4" />
                          {hospital.phone}
                        </a>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Clock className="h-4 w-4" />
                          {hospital.available}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• In case of emergency, dial 112 for immediate assistance</li>
            <li>• All government hospitals provide 24/7 emergency services</li>
            <li>• Keep this page bookmarked for quick access during emergencies</li>
            <li>• Contact numbers are verified but may change - always confirm before visiting</li>
            <li>• For COVID-19 helpline, dial 1075</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
