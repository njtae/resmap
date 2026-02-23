import { useState, useEffect } from "react";
import axios from "axios";
import { Search, MapPin, Star, Database, Cloud, RefreshCw } from "lucide-react";
function App() {
  const [keyword, setKeyword] = useState("Bang Sue");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  const fetchRestaurants = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/restaurants?keyword=${searchQuery}`,
      );
      setRestaurants(res.data.data);
      setSource(res.data.source);
    } catch (err) {
      console.error("Connection Error", err);
      alert(
        "เชื่อมต่อ Backend ไม่ได้! อย่าลืมรัน php artisan serve ที่โฟลเดอร์ backend นะครับ",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurants("Bang Sue");
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white sticky top-0 z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600  p-1.5 rounded-lg shadow-blue-200 shadow-lg">
              <MapPin className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              ResMap
            </span>
          </div>
        </div>
      </nav>
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 shadow-inner"></div>
        </div>
        <div className="relative z-10 py-30 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">
              Find popular restaurants
            </h1>

            <div className="flex gap-2 p-2 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 focus-within:ring-4 focus-within:ring-blue-400/30 transition-all shadow-2xl">
              <div className="pl-3 flex items-center">
                <Search className="text-slate-400" size={22} />
              </div>
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-lg font-medium text-slate-800"
                placeholder="กรอกชื่อเขต เช่น Bang Sue"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && fetchRestaurants(keyword)
                }
              />
              <button
                onClick={() => fetchRestaurants(keyword)}
                className="bg-blue-800 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              Search results: {keyword}
            </h2>
            <p className="text-slate-500">
              Found a restaurant {restaurants.length} places in this area
            </p>
          </div>
          {source && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold shadow-sm transition-all ${
                source === "database_cache"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {source === "database_cache" ? (
                <Database size={16} />
              ) : (
                <RefreshCw size={16} className="animate-spin" />
              )}
              {source === "database_cache" ? "DATABASE CACHE" : "NEW API DATA"}
            </div>
          )}
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl h-64 animate-pulse border border-slate-100 shadow-sm"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-15">
            {restaurants.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-40 bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <MapPin
                    className="text-slate-300 group-hover:text-blue-300 transition-colors"
                    size={56}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-slate-800 leading-tight h-12">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-700 px-2 py-1 rounded-lg text-xs font-black">
                      <Star size={14} fill="currentColor" />
                      {item.rating}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 flex items-start gap-2 italic">
                    <MapPin size={16} className="shrink-0 text-blue-500" />
                    {item.address}
                  </p>
                  <button className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-md active:scale-95">
                    See store details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-gray-700 text-center py-5 border-t border-slate-200 text-white text-xs font-medium">
        DEVELOPED BY NATCHAPON JONGSATHAPORNPUN (TAE) &copy; 2026 RESMAP
      </footer>
    </div>
  );
}
export default App;