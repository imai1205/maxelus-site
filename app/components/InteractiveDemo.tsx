"use client";

import { useState } from "react";

// iPhone Demo Component
export function IPhoneDemo() {
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "chat" | "settings">("home");
  const [notifications, setNotifications] = useState({
    messages: 3,
    schedule: 2,
    reports: 1,
    tasks: 8
  });

  const handleQuickAction = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: 0
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs md:text-sm text-[#4a5565] mb-3 md:mb-4 font-medium">iPhoneデモ</p>
      
      {/* iPhone Frame - Scaled down on mobile */}
      <div className="relative w-[220px] sm:w-[260px] md:w-[300px] h-[460px] sm:h-[540px] md:h-[620px] bg-[#1a1a1a] rounded-[36px] sm:rounded-[42px] md:rounded-[50px] p-[8px] md:p-[10px] shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2">
        {/* Dynamic Island */}
        <div className="absolute top-[12px] sm:top-[15px] md:top-[18px] left-1/2 -translate-x-1/2 w-[70px] sm:w-[85px] md:w-[100px] h-[20px] sm:h-[24px] md:h-[28px] bg-black rounded-full z-20" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[30px] sm:rounded-[36px] md:rounded-[42px] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-white">
            <span className="text-[10px] md:text-xs font-semibold text-black">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71s.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.75 4.6-.75s3.15.27 4.6.75v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
              </svg>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 22h20V2z"/>
              </svg>
              <div className="w-6 h-3 border border-black rounded-sm relative">
                <div className="absolute inset-[2px] bg-black rounded-[1px]" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="h-[calc(100%-120px)] overflow-y-auto">
            {activeTab === "home" && (
              <div className="animate-fade-in">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#fefce8] to-white p-5 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-[#101828] leading-tight">田中太郎さん専用の<br />アプリ</h2>
                      <p className="text-sm text-[#4a5565] mt-1">おかえりなさい。今日も頑張りましょう</p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 bg-[#f3f4f6] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      {(notifications.messages > 0) && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#fb2c36] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {notifications.messages}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#364153] mb-3">クイックアクション</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleQuickAction("messages")}
                      className="bg-white border border-[#e5e7eb] rounded-2xl p-4 text-left transition-transform active:scale-95 hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-9 h-9 bg-[#2b7fff] rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {notifications.messages > 0 && (
                          <span className="bg-[#fb2c36] text-white text-xs font-bold px-2 py-0.5 rounded-full">{notifications.messages}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#101828]">新着メッセージ</p>
                    </button>
                    
                    <button 
                      onClick={() => handleQuickAction("schedule")}
                      className="bg-white border border-[#e5e7eb] rounded-2xl p-4 text-left transition-transform active:scale-95 hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-9 h-9 bg-[#00c950] rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {notifications.schedule > 0 && (
                          <span className="bg-[#fb2c36] text-white text-xs font-bold px-2 py-0.5 rounded-full">{notifications.schedule}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#101828]">今日の予定</p>
                    </button>
                    
                    <button 
                      onClick={() => handleQuickAction("reports")}
                      className="bg-white border border-[#e5e7eb] rounded-2xl p-4 text-left transition-transform active:scale-95 hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-9 h-9 bg-[#ad46ff] rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        {notifications.reports > 0 && (
                          <span className="bg-[#fb2c36] text-white text-xs font-bold px-2 py-0.5 rounded-full">{notifications.reports}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#101828]">売上レポート</p>
                    </button>
                    
                    <button 
                      onClick={() => handleQuickAction("tasks")}
                      className="bg-white border border-[#e5e7eb] rounded-2xl p-4 text-left transition-transform active:scale-95 hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-9 h-9 bg-[#f0b100] rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        {notifications.tasks > 0 && (
                          <span className="bg-[#fb2c36] text-white text-xs font-bold px-2 py-0.5 rounded-full">{notifications.tasks}</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#101828]">完了タスク</p>
                    </button>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="p-4 pt-0">
                  <h3 className="text-sm font-bold text-[#364153] mb-3">最近のアクティビティ</h3>
                  <div className="space-y-2">
                    {[
                      { title: "案件A: デザイン完了", time: "2時間前", color: "bg-[#00c950]" },
                      { title: "案件B: レビュー待ち", time: "5時間前", color: "bg-[#f0b100]" },
                      { title: "案件C: 納品完了", time: "昨日", color: "bg-[#00c950]" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-[#e5e7eb] rounded-xl p-3 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <div className="flex-1">
                          <p className="text-sm text-[#101828]">{item.title}</p>
                          <p className="text-xs text-[#4a5565]">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "projects" && (
              <div className="p-4 animate-fade-in">
                <h2 className="text-xl font-bold text-[#101828] mb-4">案件一覧</h2>
                <div className="space-y-3">
                  {[
                    { name: "案件A", status: "進行中", progress: 75, color: "bg-[#2b7fff]" },
                    { name: "案件B", status: "レビュー中", progress: 90, color: "bg-[#f0b100]" },
                    { name: "案件C", status: "完了", progress: 100, color: "bg-[#00c950]" },
                    { name: "案件D", status: "準備中", progress: 20, color: "bg-[#6b7280]" }
                  ].map((project, i) => (
                    <div key={i} className="bg-white border border-[#e5e7eb] rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-[#101828]">{project.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${project.color} text-white`}>{project.status}</span>
                      </div>
                      <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                        <div className={`h-2 rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} />
                      </div>
                      <p className="text-xs text-[#6b7280] mt-1">{project.progress}% 完了</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "chat" && (
              <div className="p-4 animate-fade-in">
                <h2 className="text-xl font-bold text-[#101828] mb-4">チャット</h2>
                <div className="space-y-3">
                  {[
                    { name: "佐藤さん", message: "デザイン確認お願いします", time: "10:30", unread: 2 },
                    { name: "開発チーム", message: "本日のMTGは15時からです", time: "09:15", unread: 0 },
                    { name: "田中PM", message: "進捗報告ありがとうございます", time: "昨日", unread: 0 }
                  ].map((chat, i) => (
                    <div key={i} className="bg-white border border-[#e5e7eb] rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2b7fff] to-[#ad46ff] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {chat.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[#101828]">{chat.name}</span>
                          <span className="text-xs text-[#6b7280]">{chat.time}</span>
                        </div>
                        <p className="text-sm text-[#6b7280] truncate">{chat.message}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="bg-[#fb2c36] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{chat.unread}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="p-4 animate-fade-in">
                <h2 className="text-xl font-bold text-[#101828] mb-4">設定</h2>
                <div className="space-y-2">
                  {[
                    { icon: "👤", label: "プロフィール" },
                    { icon: "🔔", label: "通知設定" },
                    { icon: "🎨", label: "外観" },
                    { icon: "🔐", label: "セキュリティ" },
                    { icon: "❓", label: "ヘルプ" }
                  ].map((item, i) => (
                    <button key={i} className="w-full bg-white border border-[#e5e7eb] rounded-xl p-4 flex items-center gap-3 hover:bg-[#f9fafb] transition-colors">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-[#101828]">{item.label}</span>
                      <svg className="w-5 h-5 text-[#6b7280] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] px-2 py-2 pb-6">
            <div className="flex justify-around">
              {[
                { id: "home", icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ), label: "ホーム" },
                { id: "projects", icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ), label: "案件" },
                { id: "chat", icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ), label: "チャット" },
                { id: "settings", icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ), label: "設定" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
                    activeTab === tab.id ? "text-[#f0b100]" : "text-[#6b7280]"
                  }`}
                >
                  {tab.icon}
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}

// MacBook Demo Component
function MacBookDemo() {
  const [activeView, setActiveView] = useState<"overview" | "users" | "analytics">("overview");
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "month" | "week" | "today">("all");
  const [showModal, setShowModal] = useState(false);

  const stats = {
    all: { users: "12,482", growth: "+12.5%", active: "3,241", revenue: "¥8.4M" },
    month: { users: "8,234", growth: "+8.2%", active: "2,156", revenue: "¥5.2M" },
    week: { users: "3,421", growth: "+5.1%", active: "1,234", revenue: "¥2.1M" },
    today: { users: "842", growth: "+2.3%", active: "412", revenue: "¥0.4M" }
  };

  const currentStats = stats[selectedPeriod];

  return (
    <div className="flex flex-col items-center flex-1 w-full">
      <p className="text-xs md:text-sm text-[#4a5565] mb-3 md:mb-4 font-medium">MacBook Proデモ</p>
      
      {/* MacBook Frame */}
      <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[560px] group">
        {/* Screen bezel */}
        <div className="bg-[#1e1e1e] rounded-t-lg md:rounded-t-xl p-[6px] md:p-[8px] pt-[16px] md:pt-[24px] relative shadow-2xl group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:-translate-y-2">
          {/* Camera notch */}
          <div className="absolute top-[5px] md:top-[8px] left-1/2 -translate-x-1/2 w-2 md:w-3 h-2 md:h-3 bg-[#3a3a3a] rounded-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 md:w-1.5 h-1 md:h-1.5 bg-[#1a3a5c] rounded-full" />
          </div>
          
          {/* Screen */}
          <div className="bg-white rounded-md md:rounded-lg overflow-hidden shadow-inner">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 md:py-3 bg-[#f5f5f5] border-b border-[#e5e7eb]">
              <div className="flex gap-1 md:gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#febc2e]" />
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white border border-[#e5e7eb] rounded px-2 md:px-4 py-0.5 md:py-1 text-[10px] md:text-xs text-[#6b7280]">
                  dashboard.maxelus.app
                </div>
              </div>
            </div>
            
            {/* App Content */}
            <div className="h-[200px] sm:h-[260px] md:h-[340px] overflow-hidden">
              {/* Header */}
              <div className="p-2 md:p-4 border-b border-[#e5e7eb] bg-white">
                <div className="flex justify-between items-center mb-2 md:mb-4">
                  <h1 className="text-xs sm:text-sm md:text-lg font-bold text-[#101828]">業務ダッシュボード</h1>
                  <div className="flex gap-1 md:gap-2">
                    <button 
                      className="p-1 md:p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors"
                      onClick={() => setShowModal(true)}
                    >
                      <svg className="w-3 md:w-5 h-3 md:h-5 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setShowModal(true)}
                      className="bg-[#fdc700] text-[#101828] text-[10px] md:text-sm px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium hover:bg-[#e5b400] transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3 md:w-4 h-3 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="hidden sm:inline">新規作成</span>
                    </button>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-0.5 md:gap-1">
                  {[
                    { id: "overview", label: "概要", icon: "📊" },
                    { id: "users", label: "ユーザー", icon: "👥" },
                    { id: "analytics", label: "分析", icon: "📈" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveView(tab.id as typeof activeView)}
                      className={`px-2 md:px-4 py-1 md:py-2 text-[10px] md:text-sm rounded-lg transition-colors flex items-center gap-1 md:gap-2 ${
                        activeView === tab.id
                          ? "bg-[#fffef0] text-[#101828] font-medium border-b-2 border-[#fdc700]"
                          : "text-[#6b7280] hover:bg-[#f3f4f6]"
                      }`}
                    >
                      <span className="text-xs md:text-base">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="bg-[#f9fafb] p-2 md:p-4 h-full">
                {activeView === "overview" && (
                  <div className="animate-fade-in">
                    {/* Period Filter */}
                    <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4 flex-wrap">
                      <span className="text-[10px] md:text-sm text-[#6b7280]">📅</span>
                      {[
                        { id: "all", label: "全期間" },
                        { id: "month", label: "今月" },
                        { id: "week", label: "今週" },
                        { id: "today", label: "今日" }
                      ].map((period) => (
                        <button
                          key={period.id}
                          onClick={() => setSelectedPeriod(period.id as typeof selectedPeriod)}
                          className={`px-1.5 md:px-3 py-0.5 md:py-1.5 text-[8px] md:text-xs rounded-lg transition-colors ${
                            selectedPeriod === period.id
                              ? "bg-[#fdc700] text-[#101828] font-medium"
                              : "bg-white text-[#6b7280] hover:bg-[#f3f4f6]"
                          }`}
                        >
                          {period.label}
                        </button>
                      ))}
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3">
                      {[
                        { label: "総ユーザー数", value: currentStats.users, icon: "👥", color: "text-[#2b7fff]" },
                        { label: "成長率", value: currentStats.growth, icon: "📈", color: "text-[#00c950]" },
                        { label: "アクティブ", value: currentStats.active, icon: "⚡", color: "text-[#ad46ff]" },
                        { label: "売上", value: currentStats.revenue, icon: "💰", color: "text-[#f0b100]" }
                      ].map((stat, i) => (
                        <div key={i} className="bg-white border border-[#e5e7eb] rounded-lg md:rounded-xl p-1.5 md:p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex justify-between items-start mb-0.5 md:mb-1">
                            <span className="text-[8px] md:text-xs text-[#6b7280] truncate">{stat.label}</span>
                            <span className="text-xs md:text-lg">{stat.icon}</span>
                          </div>
                          <p className={`text-sm md:text-xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeView === "users" && (
                  <div className="animate-fade-in">
                    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                          <tr>
                            <th className="text-left p-3 font-medium text-[#6b7280]">名前</th>
                            <th className="text-left p-3 font-medium text-[#6b7280]">メール</th>
                            <th className="text-left p-3 font-medium text-[#6b7280]">ステータス</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "田中太郎", email: "tanaka@example.com", status: "アクティブ", color: "bg-[#dcfce7] text-[#166534]" },
                            { name: "佐藤花子", email: "sato@example.com", status: "アクティブ", color: "bg-[#dcfce7] text-[#166534]" },
                            { name: "鈴木一郎", email: "suzuki@example.com", status: "休止中", color: "bg-[#fef3c7] text-[#92400e]" }
                          ].map((user, i) => (
                            <tr key={i} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer">
                              <td className="p-3 font-medium text-[#101828]">{user.name}</td>
                              <td className="p-3 text-[#6b7280]">{user.email}</td>
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.color}`}>{user.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeView === "analytics" && (
                  <div className="animate-fade-in">
                    <div className="bg-white border border-[#e5e7eb] rounded-xl p-4">
                      <h3 className="text-sm font-medium text-[#101828] mb-4">月間アクセス推移</h3>
                      <div className="flex items-end gap-2 h-32">
                        {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#fdc700] to-[#fff100] rounded-t-sm hover:from-[#e5b400] hover:to-[#fdc700] transition-all cursor-pointer hover:scale-y-110 origin-bottom"
                            style={{ 
                              height: `${height}%`,
                              animation: `grow-bar 0.5s ease-out ${i * 0.05}s both`
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-[#6b7280]">
                        <span>1月</span>
                        <span>6月</span>
                        <span>12月</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* MacBook Bottom */}
        <div className="bg-[#c4c4c4] h-2 md:h-3 rounded-b-lg relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 md:w-20 h-0.5 md:h-1 bg-[#a8a8a8] rounded-b-lg" />
        </div>
        <div className="bg-[#e8e8e8] h-1.5 md:h-2 mx-8 md:mx-12 rounded-b-xl" />
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-[#101828] mb-2">新規作成</h3>
            <p className="text-sm text-[#6b7280] mb-4">これはデモUIです。実際のアプリケーションでは、ここで新しいデータを作成できます。</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-[#fdc700] text-[#101828] py-2 rounded-lg font-medium hover:bg-[#e5b400] transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Interactive Demo Component
export default function InteractiveDemo() {
  return (
    <section className="bg-white py-12 md:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Animated background elements - smaller on mobile */}
      <div className="absolute top-20 left-10 w-40 md:w-64 h-40 md:h-64 bg-[#fff100]/5 rounded-full blur-[60px] md:blur-[80px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 md:w-80 h-48 md:h-80 bg-[#fdc700]/5 rounded-full blur-[80px] md:blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Floating decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-40 right-20 w-3 h-3 bg-[#fff100]/30 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
      <div className="hidden md:block absolute bottom-40 left-16 w-2 h-2 bg-[#fdc700]/30 rounded-full animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="hidden md:block absolute top-1/2 right-32 w-4 h-4 bg-[#fff100]/20 rotate-45 animate-spin" style={{ animationDuration: "10s" }} />
      
      <div className="max-w-[1200px] mx-auto relative">
        {/* Section heading */}
        <div className="relative text-center mb-8 md:mb-16">
          <span className="absolute left-1/2 -translate-x-1/2 -top-4 md:-top-8 text-[50px] md:text-[100px] font-bold text-[#f3f4f6] opacity-40 tracking-wider pointer-events-none select-none">
            DEMO
          </span>
          <div className="relative space-y-2 md:space-y-4">
            <h2 className="text-[24px] md:text-[32px] font-bold text-[#1a1a1a] tracking-tight">
              百聞は一見にしかず
            </h2>
            <p className="text-sm md:text-lg text-[#6b7280]">
              実際に触れるデモで、完成イメージを明確に
            </p>
          </div>
        </div>
        
        {/* Demo displays */}
        <div className="relative bg-gradient-to-b from-[#fafafa] via-white to-[#fffef0] rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl md:shadow-2xl hover:shadow-3xl transition-shadow duration-500">
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#fff100]/20 via-transparent to-[#fdc700]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 justify-center items-center">
            <div className="transform hover:scale-[1.02] transition-transform duration-500">
              <IPhoneDemo />
            </div>
            <div className="transform hover:scale-[1.02] transition-transform duration-500 w-full lg:w-auto">
              <MacBookDemo />
            </div>
          </div>
          
          <p className="text-center text-xs md:text-sm text-[#6a7282] mt-6 md:mt-8 px-2">
            ※上記はインタラクティブなデモUIです。タップ/クリックして動作をお試しください。<br className="hidden sm:block" />
            実案件では要件に合わせて最適化します
          </p>
        </div>
      </div>
    </section>
  );
}
