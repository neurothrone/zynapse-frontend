import Layout from "../../components/layout/Layout";

const EventsPage = () => {
  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 primary-text">Events</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Stay updated with the latest gaming tournaments, conventions, and virtual meetups in the cyberpunk gaming community.
        </p>
      </div>

      <div className="space-y-8">
        {/* Placeholder event cards */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 hover:border-accent transition-colors">
            <div className="md:flex">
              <div className="md:w-1/3 h-48 md:h-auto bg-slate-700 animate-pulse"></div>
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Cyberpunk Event {item}</h3>
                  <span className="bg-accent text-white text-xs font-bold rounded-full py-1 px-3">
                    {new Date(2023, 5 + item, 15).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">
                  Join us for an exciting event featuring the latest in cyberpunk gaming. Network with developers, compete in tournaments, and get exclusive previews of upcoming titles.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Virtual Event</span>
                </div>
                <button className="btn-primary text-sm py-1 px-4">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default EventsPage;
