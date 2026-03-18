'use client'
import { useState } from 'react'
const platforms = [{v:'general',l:'General'},{v:'google',l:'Google Ads'},{v:'facebook',l:'Facebook'},{v:'instagram',l:'Instagram'}]
export default function Home() {
  const [product, setProduct] = useState('')
  const [platform, setPlatform] = useState('general')
  const [ads, setAds] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const generate = async () => {
    if (!product.trim()) { setError('Enter product'); return }
    setIsLoading(true); setError('')
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ product, platform }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setAds(data.ads)
    } catch (e: any) { setError(e.message) } finally { setIsLoading(false) }
  }
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10"><div className="max-w-3xl mx-auto px-4 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"><svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg></div><div><h1 className="text-xl font-semibold text-white">AI Ad Copy</h1><p className="text-xs text-slate-400">Generate ads</p></div></div></div></header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-surface rounded-xl p-6 border border-white/5 space-y-4 mb-6">
          <div><label className="block text-sm font-medium text-slate-300 mb-2">Platform</label><select value={platform} onChange={e=>setPlatform(e.target.value)} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">{platforms.map(p=><option key={p.v} value={p.v}>{p.l}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-slate-300 mb-2">Product/Service</label><textarea value={product} onChange={e=>setProduct(e.target.value)} placeholder="Describe your product..." className="w-full h-28 bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white resize-none"/></div>
          <button onClick={generate} disabled={isLoading} className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg font-medium">{isLoading ? 'Generating...' : 'Generate Ads'}</button>
          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">{error}</div>}
        </div>
        {ads && <div className="bg-surface rounded-xl p-6 border border-white/5"><h3 className="text-lg font-semibold text-white mb-4">Ad Copy</h3><pre className="whitespace-pre-wrap text-sm text-slate-300">{ads}</pre></div>}
      </main>
      <footer className="border-t border-white/10 mt-12"><div className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-slate-500">AI Ad Copy • Powered by DeepSeek</div></footer>
    </div>
  )
}
