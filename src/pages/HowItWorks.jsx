import React from 'react';
import {
  Users,
  Sparkles,
  Lightbulb,
  Factory,
  CheckCircle,
  ArrowRight,
  User,
  GraduationCap,
  Building2,
  Landmark,
  MessageCircle,
  AlertCircle,
  Zap,
  Target
} from 'lucide-react';

export const HowItWorks = ({ setActivePage }) => {
  const steps = [
    {
      number: 1,
      title: "You Report the Problem",
      description: "You see a problem in your community - dirty water, broken roads, no electricity, or anything else. You simply report it on ECHELON using your voice or by typing. You can also take photos!",
      who: "Citizens, Panchayats, NGOs, Government",
      icon: <AlertCircle className="w-8 h-8 text-orange-500" />,
      color: "orange"
    },
    {
      number: 2,
      title: "Computer Understands It",
      description: "Our smart computer system (called AI) reads your problem and understands what type it is. It automatically finds the right college students and professors who can help solve it.",
      who: "AI System does this automatically",
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      color: "yellow"
    },
    {
      number: 3,
      title: "Students Build a Solution",
      description: "Smart college students from IIT, NIT, and other top colleges create a working solution - like a machine, device, or system - that can solve your problem. They get rewards for this!",
      who: "University Students & Professors",
      icon: <Lightbulb className="w-8 h-8 text-blue-500" />,
      color: "blue"
    },
    {
      number: 4,
      title: "Companies Make Many Units",
      description: "Big companies like Tata, Mahindra, or L&T take the student's idea and make many copies of it in their factories. This way, everyone in your area can benefit from the solution!",
      who: "Companies & Industries",
      icon: <Factory className="w-8 h-8 text-purple-500" />,
      color: "purple"
    },
    {
      number: 5,
      title: "Government Installs It",
      description: "The government buys the solution and installs it in your village or town. The problem is solved! You can give feedback and tell us if it worked well.",
      who: "Government & You",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            How ECHELON Works
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            A simple way to solve community problems with help from students, companies, and government
          </p>
        </div>

        {/* Simple Flowchart */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
            The Simple 5-Step Process
          </h2>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-6">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    {step.icon}
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                      <p className="text-sm text-indigo-600 font-medium mt-1">{step.who}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow (except last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Who Can Use Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* For Citizens */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">For Citizens</h3>
            </div>
            <p className="text-slate-600 mb-4">
              You face a problem in your area? Just tell us!
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Use your voice or type in any language</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Take photos with your phone</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Track your problem in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Earn points and rewards</span>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">For Students</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Build real solutions and earn money!
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Work on real community problems</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Get paid internships at top companies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Earn ₹30,000-70,000 in stipends</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">Build your resume with real projects</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Simple Examples */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Real Examples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Target className="w-10 h-10 text-yellow-300 mb-3" />
              <h4 className="font-bold text-lg mb-2">Water Problem</h4>
              <p className="text-sm text-white/90">
                Village had dirty water with fluoride. Students built a solar-powered filter. Now everyone has clean water!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Target className="w-10 h-10 text-yellow-300 mb-3" />
              <h4 className="font-bold text-lg mb-2">Road Problem</h4>
              <p className="text-sm text-white/90">
                Highway had dangerous potholes. Students created special mix to fix roads quickly. Saved many lives!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Target className="w-10 h-10 text-yellow-300 mb-3" />
              <h4 className="font-bold text-lg mb-2">Crop Problem</h4>
              <p className="text-sm text-white/90">
                Farmers' vegetables were spoiling. Students built low-cost cold storage. Now farmers earn more money!
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => setActivePage('submit-problem')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <Zap className="w-6 h-6" />
            <span>Report Your Problem Now</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-sm text-slate-500 mt-4">
            It's free and takes only 2 minutes!
          </p>
        </div>
      </div>
    </div>
  );
};
