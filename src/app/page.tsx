"use client";
import { useState } from "react";

export default function AdCopyPage() {
  const [product, setProduct] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [platform, setPlatform] = useState("Social Media");
  const [goal, setGoal] = useState("Drive conversions");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!product.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, targetAudience, platform, goal }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-300 mb-2">AI Ad Copy</h1>
        <p className="text-slate-400 mb-8">Generate high-converting advertising copy across platforms</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-orange-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Product / Service *</label>
              <textarea value={product} onChange={e => setProduct(e.target.value)} rows={3}
                placeholder="Describe your product or service..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Target Audience</label>
              <input value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="Who are you targeting?"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500">
                {["Social Media","Google Ads","Facebook","Instagram","LinkedIn","TikTok","Display Ads"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Campaign Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500">
                {["Drive conversions","Brand awareness","Lead generation","App installs","Retargeting"].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-orange-800 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Generating..." : "Generate Ad Copy"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-orange-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-orange-300 mb-4">Ad Variations</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">{output}</pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">Ad copy will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
