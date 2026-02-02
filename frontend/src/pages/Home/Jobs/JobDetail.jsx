// components/JobDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jobs } from "../../data/jobsData.js";
import ApplicationForm from "./ApplicationForm";
import { 
  Bookmark, 
  Share2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  GraduationCap, 
  Briefcase,
  ExternalLink,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  Download,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  Globe,
  Phone,
  Mail,
  Map
} from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showShareModal, setShowShareModal] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const jobImages = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  ];

  const companyReviews = [
    { id: 1, name: "Alex Johnson", role: "Software Engineer", rating: 4.8, comment: "Great work culture and growth opportunities.", date: "2 months ago" },
    { id: 2, name: "Sarah Chen", role: "Product Manager", rating: 4.5, comment: "Innovative projects and supportive team.", date: "1 month ago" },
    { id: 3, name: "Michael Brown", role: "Data Scientist", rating: 4.2, comment: "Competitive benefits and flexible hours.", date: "3 weeks ago" }
  ];

  useEffect(() => {
    const foundJob = jobs.find(job => job.id === parseInt(id));
    if (!foundJob) return;

    setJob(foundJob);
    setIsBookmarked(localStorage.getItem(`bookmarked_${id}`) === 'true');
    setIsSaved(localStorage.getItem(`saved_${id}`) === 'true');
    
    // Simulate view count
    const storedViews = parseInt(localStorage.getItem(`views_${id}`) || '0');
    setViewCount(storedViews + 1);
    localStorage.setItem(`views_${id}`, (storedViews + 1).toString());

    // Find similar jobs
    const similar = jobs
      .filter(j => 
        j.id !== foundJob.id && 
        (j.company === foundJob.company || 
         j.type === foundJob.type || 
         j.location === foundJob.location ||
         j.requirements.some(req => foundJob.requirements.includes(req)))
      )
      .slice(0, 3);
    
    setSimilarJobs(similar);
  }, [id]);

  const handleBookmark = () => {
    const newBookmarked = !isBookmarked;
    setIsBookmarked(newBookmarked);
    localStorage.setItem(`bookmarked_${id}`, newBookmarked.toString());
  };

  const handleSaveJob = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);
    localStorage.setItem(`saved_${id}`, newSaved.toString());
    
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (newSaved) {
      if (!savedJobs.includes(id)) {
        savedJobs.push(id);
      }
    } else {
      const index = savedJobs.indexOf(id);
      if (index > -1) {
        savedJobs.splice(index, 1);
      }
    }
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  };

  const handleShare = () => {
    setShowShareModal(true);
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job opening: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % jobImages.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev - 1 + jobImages.length) % jobImages.length);
  };

  const handleQuickApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleSaveForLater = () => {
    handleSaveJob();
    alert("Job saved to your profile!");
  };

  const handleReportJob = () => {
    setShowReportModal(true);
  };

  const submitReport = () => {
    // In a real app, send report to backend
    console.log("Report submitted:", { jobId: id, reason: reportReason });
    setShowReportModal(false);
    setReportReason("");
    alert("Thank you for reporting. We'll review this job listing.");
  };

  const navigateToSimilarJob = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to job listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-blue-600 flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Jobs
        </Link>
      </nav>

      {/* Image Carousel */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-96 group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${jobImages[imageIndex]})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
        
        <button 
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <button 
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                🔥 Urgent Hiring
              </span>
              <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-sm">
                {job.type}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                {job.company}
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-1" />
                {job.salary}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Job Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{viewCount}</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-sm text-gray-600">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.2</div>
                <div className="text-sm text-gray-600">Company Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Open Positions</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleQuickApply}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Apply Now
            </button>
            <button
              onClick={handleSaveForLater}
              className={`px-6 py-3 font-medium rounded-xl transition-colors flex items-center ${
                isSaved 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`w-5 h-5 mr-2 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save for Later'}
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Print
            </button>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: "description", label: "Description", icon: "📝" },
                { id: "requirements", label: "Requirements", icon: "🎯" },
                { id: "responsibilities", label: "Responsibilities", icon: "✅" },
                { id: "benefits", label: "Benefits", icon: "💰" },
                { id: "company", label: "Company", icon: "🏢" },
                { id: "reviews", label: "Reviews", icon: "⭐" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-3 text-lg">About This Role</h4>
                    <p className="text-blue-800">
                      Join our dynamic team in a role that offers tremendous growth opportunities. 
                      You'll be working with cutting-edge technologies and collaborating with 
                      industry experts to deliver exceptional results.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "requirements" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.requirements.map((req, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-yellow-50 rounded-xl">
                  <h4 className="font-bold text-yellow-900 mb-3">Preferred Qualifications</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Award className="w-4 h-4 mr-3 text-yellow-600" />
                      <span className="text-yellow-800">Master's degree in related field</span>
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-3 text-yellow-600" />
                      <span className="text-yellow-800">Experience in Agile/Scrum methodologies</span>
                    </li>
                    <li className="flex items-center">
                      <Globe className="w-4 h-4 mr-3 text-yellow-600" />
                      <span className="text-yellow-800">International work experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "responsibilities" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Responsibilities</h3>
                {job.responsibilities ? (
                  <div className="space-y-4">
                    {job.responsibilities.map((resp, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                          <span className="text-blue-600 font-semibold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700">{resp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No specific responsibilities listed.</p>
                )}
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Benefits & Perks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: "💰", title: "Competitive Salary", desc: "Above market average compensation" },
                    { icon: "🏥", title: "Health Insurance", desc: "Comprehensive medical coverage" },
                    { icon: "📈", title: "Stock Options", desc: "Equity in a growing company" },
                    { icon: "🎓", title: "Learning Budget", desc: "$2,000 annual learning budget" },
                    { icon: "🏖️", title: "Unlimited PTO", desc: "Flexible time off policy" },
                    { icon: "🏠", title: "Remote Work", desc: "Work from anywhere options" },
                    { icon: "🍕", title: "Meals & Snacks", desc: "Catered meals daily" },
                    { icon: "👶", title: "Parental Leave", desc: "16 weeks paid leave" },
                    { icon: "💪", title: "Gym Membership", desc: "Fully paid gym access" }
                  ].map((benefit, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="text-3xl mb-4">{benefit.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "company" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">About {job.company}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {job.company} is a leading technology company dedicated to innovation and excellence. 
                    We foster a collaborative environment where creativity and technical expertise come together 
                    to solve complex challenges and deliver outstanding results to our clients worldwide.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-blue-700">Employees</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">2010</div>
                    <div className="text-sm text-green-700">Founded</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">25+</div>
                    <div className="text-sm text-purple-700">Countries</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">100M+</div>
                    <div className="text-sm text-orange-700">Users</div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Globe className="w-5 h-5 mr-3 text-gray-400" />
                      <span>www.{job.company.toLowerCase().replace(/\s/g, '')}.com</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-5 h-5 mr-3 text-gray-400" />
                      <span>careers@{job.company.toLowerCase().replace(/\s/g, '')}.com</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-5 h-5 mr-3 text-gray-400" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Map className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Company Reviews</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-lg font-semibold">4.2/5.0</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {companyReviews.map((review) => (
                    <div key={review.id} className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-gray-600 text-sm">{review.role}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(review.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">Similar Jobs You Might Like</h3>
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  View all →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarJobs.map((similarJob) => (
                  <div
                    key={similarJob.id}
                    className="group p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => navigateToSimilarJob(similarJob.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {similarJob.title}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">{similarJob.company}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{similarJob.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{similarJob.type}</span>
                      </div>
                      <div className="text-green-700 font-medium text-sm">
                        {similarJob.salary}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {similarJob.requirements.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Apply Card */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-gray-900 mb-4">Ready to Apply?</h3>
            <p className="text-gray-600 text-sm mb-6">
              Submit your application now and get priority consideration.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleQuickApply}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
              <button
                onClick={handleSaveForLater}
                className="w-full px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Save for Later
              </button>
            </div>
          </div>

          {/* Job Insights */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Job Insights
            </h3>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Competition Level</span>
                  <span className="font-semibold text-gray-900">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-semibold text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Avg. Time to Hire</span>
                  <span className="font-semibold text-gray-900">14 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Urgency</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                  🔥 High Demand
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-6">Application Timeline</h3>
            <div className="space-y-6 relative">
              {[
                { stage: "Application Review", time: "1-3 days", active: true, icon: "📄" },
                { stage: "Screening Call", time: "Within 1 week", active: false, icon: "📞" },
                { stage: "Technical Interview", time: "1-2 weeks", active: false, icon: "💻" },
                { stage: "Final Interview", time: "2-3 weeks", active: false, icon: "🤝" },
                { stage: "Offer", time: "3-4 weeks", active: false, icon: "🎉" },
              ].map((step, index, array) => (
                <div key={index} className="relative flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    {index < array.length - 1 && (
                      <div className="absolute h-8 w-0.5 bg-gray-200 top-10"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="font-medium text-gray-900">{step.stage}</div>
                    <div className="text-sm text-gray-500">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div id="application-form">
            <ApplicationForm 
              jobTitle={job.title} 
              company={job.company}
              isApplying={isApplying}
              setIsApplying={setIsApplying}
            />
          </div>

          {/* Report Job Button */}
          <div className="text-center">
            <button
              onClick={handleReportJob}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              ⚠️ Report this job listing
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Share this job</h3>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { icon: "📧", label: "Email", color: "bg-gray-100 hover:bg-gray-200" },
                { icon: "💬", label: "WhatsApp", color: "bg-green-100 hover:bg-green-200" },
                { icon: "💼", label: "LinkedIn", color: "bg-blue-100 hover:bg-blue-200" },
                { icon: "🐦", label: "Twitter", color: "bg-sky-100 hover:bg-sky-200" },
              ].map((platform, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all hover:scale-105 ${platform.color}`}
                  onClick={copyToClipboard}
                >
                  <span className="text-2xl mb-2">{platform.icon}</span>
                  <span className="text-sm font-medium">{platform.label}</span>
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Copy
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Report Job Listing</h3>
            <p className="text-gray-600 mb-6">
              Please let us know why you're reporting this job listing.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="space-y-3">
                {[
                  "Inaccurate information",
                  "Job is no longer available",
                  "Suspicious activity",
                  "Discriminatory content",
                  "Spam or misleading",
                  "Other"
                ].map((reason) => (
                  <label key={reason} className="flex items-center">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
              
              {reportReason === "Other" && (
                <textarea
                  placeholder="Please specify..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setReportReason(e.target.value)}
                />
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={submitReport}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                disabled={!reportReason}
              >
                Submit Report
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;