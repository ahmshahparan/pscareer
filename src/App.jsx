import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Search, Users, DollarSign, GraduationCap, Award, TrendingUp, ArrowRight, Clock, Target, BookOpen, ChevronRight } from 'lucide-react'
import { pathwayData, getCourseById, getAllDomains, getFoundationCourses, getAdvancedCourses, getCoursePrerequisites, getNextCourses, getPathwaysByCourse } from './data/pathwayData.js'
import './App.css'

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedPathway, setSelectedPathway] = useState(null)
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeView, setActiveView] = useState('courses')

  const filteredCourses = pathwayData.courses.filter(course => {
    const matchesDomain = selectedDomain === 'all' || course.domain === selectedDomain
    const matchesSearch = searchTerm === '' || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesDomain && matchesSearch
  })

  const filteredPathways = pathwayData.pathways.filter(pathway => {
    const matchesDomain = selectedDomain === 'all' || pathway.domain === selectedDomain
    const matchesSearch = searchTerm === '' || 
      pathway.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathway.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDomain && matchesSearch
  })

  const handleCourseSelect = (courseId) => {
    const course = getCourseById(courseId)
    setSelectedCourse(course)
    setSelectedPathway(null)
  }

  const handlePathwaySelect = (pathwayId) => {
    const pathway = pathwayData.pathways.find(p => p.id === pathwayId)
    setSelectedPathway(pathway)
    setSelectedCourse(null)
  }

  const getJobOpeningsSize = (openings) => {
    if (openings > 2000) return 'large'
    if (openings > 1000) return 'medium'
    return 'small'
  }

  const CourseCard = ({ course, isHighlighted = false }) => {
    const prerequisites = getCoursePrerequisites(course.id)
    const nextCourses = getNextCourses(course.id)
    
    return (
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
          isHighlighted ? 'ring-2 ring-blue-500 bg-blue-50' : ''
        } ${course.level === 'foundation' ? 'border-blue-200' : 'border-green-200'}`}
        onClick={() => handleCourseSelect(course.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <Badge variant={course.level === 'foundation' ? 'default' : 'secondary'} className="text-xs">
              {course.level === 'foundation' ? 'Foundation' : 'Advanced'}
            </Badge>
            {course.outcomes[0] && (
              <div className={`w-2 h-2 rounded-full ${
                getJobOpeningsSize(course.outcomes[0].jobOpenings) === 'large' ? 'bg-green-500' :
                getJobOpeningsSize(course.outcomes[0].jobOpenings) === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
            )}
          </div>
          
          <div className="text-sm font-medium text-gray-900 mb-1">
            {course.code}
          </div>
          <div className="text-xs text-gray-600 mb-3 line-clamp-2">
            {course.name}
          </div>

          {prerequisites.length > 0 && (
            <div className="mb-2">
              <div className="text-xs text-gray-500 mb-1">Prerequisites:</div>
              <div className="flex flex-wrap gap-1">
                {prerequisites.map(prereq => (
                  <Badge key={prereq.id} variant="outline" className="text-xs px-1 py-0">
                    {prereq.code}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {course.outcomes[0] && (
            <div className="text-xs text-gray-600">
              <div className="font-medium">{course.outcomes[0].role}</div>
              <div className="text-gray-500">{course.outcomes[0].level} • {course.outcomes[0].salaryRange}</div>
            </div>
          )}

          {nextCourses.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="text-xs text-green-600 flex items-center">
                <ArrowRight className="w-3 h-3 mr-1" />
                Leads to {nextCourses.length} advanced course{nextCourses.length > 1 ? 's' : ''}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const PathwayCard = ({ pathway, isHighlighted = false }) => (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
        isHighlighted ? 'ring-2 ring-purple-500 bg-purple-50' : ''
      }`}
      onClick={() => handlePathwaySelect(pathway.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {pathway.courses.length} Course{pathway.courses.length > 1 ? 's' : ''}
          </Badge>
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="text-sm font-medium text-gray-900 mb-1">
          {pathway.name}
        </div>
        <div className="text-xs text-gray-600 mb-3">
          {pathway.description}
        </div>

        <div className="space-y-2">
          <div className="text-xs text-gray-500">
            Duration: {pathway.totalDuration}
          </div>
          <div className="text-xs text-gray-500">
            Domain: {pathway.domain}
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Career Progression</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Per Scholas Career Pathway</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore course progressions and career advancement opportunities. 
            Discover how foundation courses lead to advanced training and professional roles.
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses, pathways, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {getAllDomains().map(domain => (
                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedDomain('all')
              setSearchTerm('')
              setSelectedCourse(null)
              setSelectedPathway(null)
            }}
          >
            Clear Filters
          </Button>
        </div>

        {/* View Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="courses">Individual Courses</TabsTrigger>
            <TabsTrigger value="pathways">Career Pathways</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Tabs value={activeView} onValueChange={setActiveView}>
                <TabsContent value="courses">
                  <h2 className="text-2xl font-bold mb-6">Per Scholas Courses</h2>
                  
                  {/* Foundation Courses */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Foundation Courses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredCourses.filter(course => course.level === 'foundation').map(course => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          isHighlighted={selectedCourse?.id === course.id}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Advanced Courses */}
                  {filteredCourses.filter(course => course.level === 'advanced').length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Advanced Courses
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredCourses.filter(course => course.level === 'advanced').map(course => (
                          <CourseCard 
                            key={course.id} 
                            course={course} 
                            isHighlighted={selectedCourse?.id === course.id}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pathways">
                  <h2 className="text-2xl font-bold mb-6">Career Pathways</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPathways.map(pathway => (
                      <PathwayCard 
                        key={pathway.id} 
                        pathway={pathway} 
                        isHighlighted={selectedPathway?.id === pathway.id}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1">
            {selectedCourse ? (
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{selectedCourse.name}</h2>
                  <Badge variant={selectedCourse.level === 'foundation' ? 'default' : 'secondary'}>
                    {selectedCourse.level === 'foundation' ? 'Foundation' : 'Advanced'}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-6">{selectedCourse.description}</p>

                {/* Prerequisites */}
                {selectedCourse.prerequisites.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Prerequisites</h3>
                    <div className="space-y-2">
                      {getCoursePrerequisites(selectedCourse.id).map(prereq => (
                        <div key={prereq.id} className="flex items-center p-2 bg-yellow-50 rounded-lg">
                          <GraduationCap className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-sm font-medium">{prereq.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Preparation */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Technical Preparation</h3>
                  <div className="space-y-1">
                    {selectedCourse.techPrep.map((skill, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Outcomes */}
                {selectedCourse.outcomes[0] && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Career Outcome</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-medium text-green-900 mb-1">
                        {selectedCourse.outcomes[0].role}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {selectedCourse.outcomes[0].level} Level
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Salary Range</div>
                          <div className="font-medium">{selectedCourse.outcomes[0].salaryRange}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Job Openings</div>
                          <div className="font-medium">{selectedCourse.outcomes[0].jobOpenings?.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                {getNextCourses(selectedCourse.id).length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Next Steps
                    </h3>
                    <div className="space-y-2">
                      {getNextCourses(selectedCourse.id).map(nextCourse => (
                        <div 
                          key={nextCourse.id} 
                          className="flex items-center p-2 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100"
                          onClick={() => handleCourseSelect(nextCourse.id)}
                        >
                          <Target className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium">{nextCourse.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills & Certifications */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Key Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.skills.slice(0, 6).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Recommended Certifications
                    </h3>
                    <div className="space-y-1">
                      {selectedCourse.certifications.slice(0, 3).map((cert, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedPathway ? (
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">{selectedPathway.name}</h2>
                <p className="text-gray-600 mb-6">{selectedPathway.description}</p>

                {/* Pathway Overview */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                    <div className="text-sm font-medium text-blue-900">Duration</div>
                    <div className="text-xs text-gray-600">{selectedPathway.totalDuration}</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <BookOpen className="w-5 h-5 mx-auto text-green-600 mb-1" />
                    <div className="text-sm font-medium text-green-900">Courses</div>
                    <div className="text-xs text-gray-600">{selectedPathway.courses.length} Total</div>
                  </div>
                </div>

                {/* Career Progression */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Career Progression</h3>
                  <div className="space-y-3">
                    {selectedPathway.progression.map((step, index) => {
                      const course = getCourseById(step.courseId)
                      return (
                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{course?.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {step.role} • {step.level} Level
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Duration: {step.duration}
                              {step.salaryIncrease && ` • Salary increase: ${step.salaryIncrease}`}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Career Outlook */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Career Outlook</h3>
                  <p className="text-sm text-gray-700">{selectedPathway.careerOutlook}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center sticky top-6">
                <div className="text-gray-400 mb-4">
                  <Users className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Explore Career Pathways</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Select a course or pathway to explore detailed information about prerequisites, 
                  career outcomes, and progression opportunities.
                </p>
                <div className="text-left space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    Foundation courses (no prerequisites)
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Advanced courses (require prerequisites)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

