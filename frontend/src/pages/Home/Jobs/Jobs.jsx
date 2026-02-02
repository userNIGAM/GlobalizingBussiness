import React, { useState } from 'react';
import { 
  Clock, 
  AlertCircle, 
  Mail, 
  Bell, 
  Rocket, 
  Users,
  TrendingUp,
  CheckCircle 
} from 'lucide-react';

export default function Jobs() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-purple-600" />,
      title: "AI-Powered Job Matching",
      description: "Intelligent algorithms that match your skills with perfect opportunities"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Direct Company Connections",
      description: "Connect directly with hiring managers and recruiters"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Career Growth Tools",
      description: "Resume builder, interview prep, and skill assessment"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-yellow-600" />,
      title: "Application Tracker",
      description: "Track all your applications in one place"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-6">
            <Rocket size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Something <span className="text-purple-600">Amazing</span> is Coming
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the next-generation job portal to transform how you find and land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Coming Soon Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Clock size={40} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 animate-ping w-6 h-6 bg-purple-400 rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Launching Soon
            </h2>
            
            <p className="text-gray-600 text-center mb-8">
              We're putting the finishing touches on an incredible job search experience. 
              Be the first to know when we launch!
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Days", value: "14" },
                { label: "Hours", value: "23" },
                { label: "Minutes", value: "45" },
                { label: "Seconds", value: "12" }
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-br from-purple-100 to-blue-100 py-4 rounded-xl mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Notification Form */}
            <div className="space-y-4">
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    You're on the list! 🎉
                  </h3>
                  <p className="text-green-700">
                    We'll notify you as soon as we launch. Get ready for an amazing experience!
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Join 2,500+ professionals who have already signed up for early access.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        isLoading
                          ? 'bg-purple-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      } text-white flex items-center justify-center`}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Bell className="w-5 h-5 mr-2" />
                          Notify Me on Launch
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-8 text-gray-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2,500+</div>
                  <div className="text-sm">Early Signups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm">Expected Jobs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features Preview */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left">
              What to Expect
            </h3>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-blue-200 text-sm">HR Director at TechCorp</div>
                </div>
              </div>
              <p className="italic text-blue-100">
                "We've been eagerly awaiting this platform. The features preview shows 
                it's going to revolutionize how companies find top talent."
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h3>
          <p className="text-gray-600 mb-8">
            Contact our team at{" "}
            <a href="mailto:hello@jobportal.com" className="text-purple-600 hover:text-purple-700 font-medium">
              hello@jobportal.com
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              Follow on Twitter
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              Join our LinkedIn
            </button>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
              Read our Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}