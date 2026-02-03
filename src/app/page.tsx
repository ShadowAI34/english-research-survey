"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [style, setStyle] = useState("");
  const [subPreference, setSubPreference] = useState("");
  const [challenges, setChallenges] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (style && !subPreference) {
      alert("Please select a specific preference (e.g., Videos, Podcasts)");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("responses")
      .insert([
        { 
          learning_style: style, 
          sub_preference: subPreference, 
          challenges: challenges 
        }
      ]);

    if (error) {
      alert("Error saving data: " + error.message);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-12">
      
      {}
      <div className="mb-4 px-4 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-200">
        Research Purposes Only
      </div>

      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8 border-2 border-emerald-500 transition-all">
        
        {!submitted ? (
          <>
            <header className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-slate-800">
                Learning Preferences Study
              </h1>
              <p className="text-slate-500 mt-2">
                Please answer honestly :D
              </p>
            </header>
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              
              {}
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2 font-sans">1</span>
                  Which method helps you retain information best?
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                    <input 
                      type="radio" 
                      id="visual" 
                      name="style" 
                      onChange={() => { setStyle("visual"); setSubPreference(""); }} 
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      required 
                    />
                    <label htmlFor="visual" className="ml-3 text-slate-700 font-medium cursor-pointer flex-1">Visual (Reading, Charts, Videos)</label>
                  </div>
                  <div className="flex items-center p-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                    <input 
                      type="radio" 
                      id="auditory" 
                      name="style" 
                      onChange={() => { setStyle("auditory"); setSubPreference(""); }} 
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="auditory" className="ml-3 text-slate-700 font-medium cursor-pointer flex-1">Auditory (Listening to lectures, Podcasts)</label>
                  </div>
                </div>

                {}
                {style && (
                  <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-3">
                      Please specify your preference:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(style === "visual" ? ["Videos", "Books", "Images"] : ["Podcasts", "Lectures", "Audiobooks"]).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSubPreference(opt)}
                          className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                            subPreference === opt 
                            ? "bg-emerald-600 text-white shadow-md scale-105" 
                            : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Question 2: Challenges */}
              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
                  <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2 font-sans">2</span>
                  What are the biggest challenges you face when learning?
                </h2>
                <textarea 
                  rows={4}
                  required
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="e.g. Difficulty focusing, lack of resources..."
                  className="w-full p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none transition text-slate-800"
                />
              </section>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl hover:bg-emerald-700 shadow-lg transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Submit My Response"}
              </button>
            </form>
          </>
        ) : (
          /* Thank You Window */
          <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
            <img 
              src="https://media.tenor.com/bDmyKRMnKMcAAAAM/like-cat.gif" 
              alt="Thumbs up cat" 
              className="mx-auto rounded-lg shadow-md mb-6"
            />
            <h2 className="text-3xl font-serif font-bold text-slate-800">Thank You!</h2>
            <p className="text-slate-600 mt-4 text-lg">
              Your response has been recorded for our research.
            </p>
            <button 
              onClick={() => { setSubmitted(false); setStyle(""); setChallenges(""); }}
              className="mt-8 text-emerald-600 hover:underline text-sm font-medium"
            >
              Submit another response
            </button>
          </div>
        )}

        <footer className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400 font-medium tracking-wide">
            Created by <span className="text-emerald-600 font-bold">10-Magbanua</span>
          </p>
        </footer>
      </div>
    </main>
  );
}