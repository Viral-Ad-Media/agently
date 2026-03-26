
import React, { useState } from 'react';
import { CallRecord, CallOutcome } from '../types';

const CallLogs: React.FC<{ calls: CallRecord[]; onDownloadReport: (callId: string) => Promise<void> }> = ({ calls, onDownloadReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [error, setError] = useState('');

  const filteredCalls = calls.filter(call => {
    const matchesSearch = (call.callerName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (call.callerPhone || '').includes(searchTerm);
    const matchesFilter = filter === 'All' || call.outcome === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = async (callId: string) => {
    setError('');

    try {
      await onDownloadReport(callId);
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'Unable to download that report.');
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {error && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Call History</h2>
          <p className="text-sm text-slate-500 font-medium">Every conversation is summarized and synced back to your workspace in real time.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search by caller..." 
              className="pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-100 transition-all w-full sm:w-64"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-3 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer bg-white"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Outcomes</option>
            {Object.values(CallOutcome).map(outcome => (
              <option key={outcome} value={outcome}>{outcome}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCalls.length === 0 ? (
           <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-200 text-center flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             </div>
             <p className="text-slate-400 font-bold">No calls found matching your search.</p>
           </div>
        ) : (
          filteredCalls.map((call) => (
            <div key={call.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 hover:shadow-xl hover:border-indigo-100 transition-all group cursor-pointer" onClick={() => setSelectedCall(call)}>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`w-3 h-3 rounded-full animate-pulse ${
                    call.outcome === CallOutcome.LEAD_CAPTURED ? 'bg-emerald-500' :
                    call.outcome === CallOutcome.APPOINTMENT_BOOKED ? 'bg-indigo-500' :
                    call.outcome === CallOutcome.ESCALATED ? 'bg-amber-500' : 'bg-slate-300'
                  }`}></span>
                  <h3 className="font-black text-xl text-slate-900 tracking-tight">{call.callerName || 'Unknown Caller'}</h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">{new Date(call.timestamp).toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 group-hover:bg-indigo-50/30 transition-colors">
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                    "{call.summary}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm">
                    {Math.floor(call.duration / 60)}m {call.duration % 60}s
                  </span>
                  <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm border ${
                    call.outcome === CallOutcome.LEAD_CAPTURED ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
                    call.outcome === CallOutcome.ESCALATED ? 'text-amber-600 bg-amber-50 border-amber-100' :
                    'text-slate-500 bg-white border-slate-100'
                  }`}>
                    {call.outcome}
                  </span>
                </div>
              </div>
              
              <div className="md:w-56 flex flex-col justify-center gap-3">
                <button onClick={(event) => {
                  event.stopPropagation();
                  setSelectedCall(call);
                }} className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                  Read Transcript
                </button>
                <button onClick={(event) => {
                  event.stopPropagation();
                  void handleDownload(call.id);
                }} className="w-full bg-white text-slate-600 border-2 border-slate-100 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-indigo-100 hover:text-indigo-600 transition-all active:scale-95">
                  Download Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transcript Modal Simulation */}
      {selectedCall && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in fade-in duration-300">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-[2.5rem]">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Call Details</h3>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Caller: {selectedCall.callerPhone}</p>
                 </div>
                 <button onClick={() => setSelectedCall(null)} className="p-3 hover:bg-slate-200 rounded-2xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                 <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">AI Summary</h4>
                    <p className="text-sm font-bold text-indigo-900 leading-relaxed">{selectedCall.summary}</p>
                 </div>
                 
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Transcript</h4>
                    <div className="space-y-4">
                      {(selectedCall.transcript.length > 0
                        ? selectedCall.transcript
                        : [
                            { speaker: 'Agent', text: 'Hello! Thank you for calling. How can I help you today?' },
                            { speaker: 'Caller', text: selectedCall.summary },
                          ]).map((message, index) => {
                        const isAgent = message.speaker === 'Agent';

                        return (
                          <div key={`${message.speaker}-${index}`} className={`flex flex-col gap-1 ${isAgent ? 'items-start' : 'items-end'}`}>
                            <span className={`text-[10px] font-black uppercase ${isAgent ? 'text-indigo-600' : 'text-slate-400'}`}>
                              {message.speaker}
                            </span>
                            <p className={`px-5 py-3 rounded-2xl text-sm font-medium shadow-sm max-w-[80%] ${
                              isAgent
                                ? 'bg-indigo-50 text-indigo-900 rounded-tl-none'
                                : 'bg-slate-100 text-slate-900 rounded-tr-none'
                            }`}>
                              {message.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                 </div>
              </div>
              <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50 rounded-b-[2.5rem]">
                 <button onClick={() => void handleDownload(selectedCall.id)} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95">Download Report</button>
                 <button onClick={() => setSelectedCall(null)} className="flex-1 bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95">Close</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CallLogs;
