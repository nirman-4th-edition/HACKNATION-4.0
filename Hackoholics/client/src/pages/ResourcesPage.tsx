import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Code, Users, FileText, Filter, Play, FileText as Document, ExternalLink, Brain, Calculator, Database, Globe, Terminal, Briefcase } from 'lucide-react';

// Resource type definition
type Resource = {
  id: string;
  title: string;
  description: string;
  category: 'aptitude' | 'technical' | 'interview' | 'resume' | 'algorithms' | 'system-design' | 'database' | 'web-dev' | 'soft-skills';
  type: 'pdf' | 'article' | 'video' | 'practice';
  link: string;
  thumbnail?: string;
};

// Sample resources data
const resources: Resource[] = [
  {
    id: '1',
    title: 'Master Aptitude Tests',
    description: 'Comprehensive guide to crack quantitative aptitude tests with practice problems and shortcuts.',
    category: 'aptitude',
    type: 'pdf',
    link: 'https://aptitude-test.com/free-aptitude-test/mixed-aptitude-test/',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: 'Data Structures & Algorithms',
    description: 'In-depth tutorial covering essential DSA concepts for technical interviews with real interview questions.',
    category: 'algorithms',
    type: 'video',
    link: 'https://www.youtube.com/embed/8hly31xKli0',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    title: 'Interview Success Guide',
    description: 'Expert tips and common questions for technical interviews with mock interview scenarios.',
    category: 'interview',
    type: 'article',
    link: 'https://www.indeed.com/career-advice/interviewing/successful-interview',
    thumbnail: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '4',
    title: 'Resume Writing Workshop',
    description: 'Learn how to craft an impressive technical resume that stands out with real examples.',
    category: 'resume',
    type: 'video',
    link: 'https://www.youtube.com/embed/y8YH0Qbu5h4',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '5',
    title: 'System Design Fundamentals',
    description: 'Learn how to design scalable systems with real-world examples from tech giants.',
    category: 'system-design',
    type: 'video',
    link: 'https://www.youtube.com/embed/xpDnVSmNFX0',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '6',
    title: 'SQL Interview Questions',
    description: 'Comprehensive guide to database concepts and SQL queries frequently asked in interviews.',
    category: 'database',
    type: 'practice',
    link: 'https://www.w3schools.com/quiztest/quiztest.asp?qtest=SQL',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '7',
    title: 'Modern Web Development',
    description: 'Master modern web technologies including React, Node.js, and cloud services.',
    category: 'web-dev',
    type: 'article',
    link: 'https://example.com/web-dev-guide',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '8',
    title: 'Logical Reasoning Practice',
    description: 'Extensive practice set for logical reasoning with detailed explanations.',
    category: 'aptitude',
    type: 'practice',
    link: 'https://www.thinkinglsat.com/lsat/sample-questions',
    thumbnail: 'https://images.unsplash.com/photo-1616628188502-413f2fe78e27?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '9',
    title: 'Communication Skills',
    description: 'Improve your soft skills and learn effective communication for workplace success.',
    category: 'soft-skills',
    type: 'video',
    link: 'https://www.youtube.com/embed/RfFbA5uHqqw',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '10',
    title: 'Advanced Algorithm Patterns',
    description: 'Master common algorithm patterns with practice problems from top tech companies.',
    category: 'algorithms',
    type: 'pdf',
    link: 'https://cs.lmu.edu/~ray/notes/algpatterns/',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '11',
    title: 'System Design Case Studies',
    description: 'Real-world system design case studies from Netflix, Uber, and more.',
    category: 'system-design',
    type: 'article',
    link: 'https://emilycampbell.co/info/case-study-design-systems/',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '12',
    title: 'Mock Technical Interviews',
    description: 'Practice with recorded mock interviews covering various technical topics.',
    category: 'interview',
    type: 'video',
    link: 'https://www.youtube.com/embed/1qw5ITr3k9E',
    thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=400'
  }
];

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'aptitude':
      return <Calculator className="w-5 h-5" />;
    case 'technical':
      return <Code className="w-5 h-5" />;
    case 'interview':
      return <Users className="w-5 h-5" />;
    case 'resume':
      return <FileText className="w-5 h-5" />;
    case 'algorithms':
      return <Brain className="w-5 h-5" />;
    case 'system-design':
      return <Terminal className="w-5 h-5" />;
    case 'database':
      return <Database className="w-5 h-5" />;
    case 'web-dev':
      return <Globe className="w-5 h-5" />;
    case 'soft-skills':
      return <Briefcase className="w-5 h-5" />;
    default:
      return null;
  }
};

const TypeBadge = ({ type }: { type: string }) => {
  const colors = {
    pdf: 'bg-red-100 text-red-800',
    article: 'bg-blue-100 text-blue-800',
    video: 'bg-green-100 text-green-800',
    practice: 'bg-purple-100 text-purple-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type as keyof typeof colors]}`}>
      {type.toUpperCase()}
    </span>
  );
};

function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);

  useEffect(() => {
    const filtered = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Placement Resources</h1>
          <p className="mt-2 text-gray-600">Comprehensive learning materials to help you ace your placements</p>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="aptitude">Aptitude</option>
                <option value="algorithms">Algorithms</option>
                <option value="system-design">System Design</option>
                <option value="database">Database</option>
                <option value="web-dev">Web Development</option>
                <option value="interview">Interview Prep</option>
                <option value="soft-skills">Soft Skills</option>
                <option value="resume">Resume</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Document className="w-5 h-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="practice">Practice</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <TypeBadge type={resource.type} />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CategoryIcon category={resource.category} />
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {resource.category.replace('-', ' ')}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                {resource.type === 'video' ? (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      src={resource.link}
                      title={resource.title}
                      className="w-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <span>Access Resource</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ResourcesPage;