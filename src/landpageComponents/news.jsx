import {useState} from 'react';



const NewsCard = ({ image, title, tags, content }) => {

  const [isOpen , setIsOpen] = useState(false);
  const showmore = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className="shadow-sm p-3 rounded-sm bg-white">
        <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
          <img src={image} className="w-full h-full object-cover" alt={title} />
          <button onClick={showmore} className="absolute bottom-4 right-4 bg-white/90 text-xs px-4 py-2 rounded-full font-bold">{isOpen ? "Show Less" : "Read Article"}</button>
        </div>
        <div className="flex gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase font-bold tracking-wider">{tag}</span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{title}</h3>
        {isOpen && (
          <p className="text-gray-600 mt-2">{content}</p>

        )}
        
      </div>
    </div>
  )
}

const News = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Signs of Heart Fatigue",
      tags: ['Sleep Health', 'Wellness'],
      readTime: "3 min read",
      date: "JAN 13, 2026",
      content: "Heart fatigue often manifests as persistent shortness of breath, unusual swelling in the legs, and a sudden decrease in exercise tolerance. If you feel tired even after resting, it might be time to consult your cardiologist .",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Managing Anxiety Naturally",
      tags: ["Mental Health"],
      readTime: "5 min read",
      date: "JAN 12, 2026",
      content: "Mindfulness and controlled breathing exercises are proven to lower cortisol levels. Incorporating a 10-minute walk in nature and reducing caffeine intake can also help stabilize your mood.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold bg-blue-50 px-4 py-1 rounded-full text-sm">News and Tips</span>
          <h2 className="text-4xl font-bold mt-4 mb-4">Latest Health News and Tips</h2>
          <p className="text-gray-500">Stay informed with the latest updates, expert advice, and practical tips.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {blogs.map((blog, idx) => <NewsCard key={idx} {...blog} />)}
        </div>
      </div>
    </section>
  );
};

export default News;