"use client";

import { useState } from "react";

// Figmaから取得した最新の画像URL
const imgImageWithFallback = "https://www.figma.com/api/mcp/asset/c678d0d4-477f-4f3c-8815-644122aa2092";
const imgImageWithFallback1 = "https://www.figma.com/api/mcp/asset/8c0d16fe-1562-4d80-907e-4c3259ba157e";
const imgImageWithFallback2 = "https://www.figma.com/api/mcp/asset/16df0ce3-9554-48b7-970a-5edd3a5c3f7e";
const imgImageWithFallback3 = "https://www.figma.com/api/mcp/asset/4cd159c1-a4b7-4f5b-a214-5c836873392c";
const imgImageWithFallback4 = "https://www.figma.com/api/mcp/asset/8f8e9e70-3980-4f7b-92f2-dfafa8f2b59a";
const imgIcon = "https://www.figma.com/api/mcp/asset/ae35f950-e91b-45f3-ba92-acde790a8a94";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/d1c2a0c8-3234-4c4a-b532-fb17505e5e72";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/f6dfe79a-b64d-4af2-8a0c-a5b322dc0149";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/32f06814-dcef-4d4c-b06b-68f6052882e7";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/5d65e048-b621-4fe5-8b6b-2b2ac1c23e22";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/50525488-38e5-4ae2-b79b-3cde80f5650b";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/1e04f505-9c6e-4588-8e43-87b138c51df0";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/ea869bf0-66ff-43e7-ae81-3e71d1418c80";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/e96c4cdd-14d8-467c-8b40-69f1ddbc2f12";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/558aefcd-c174-45e0-a83c-a49194def496";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/49b1df09-782d-4aab-803d-e30487578566";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/2fa2db47-0523-4532-a242-6341dda0b0c9";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/a9a91b7c-734a-40db-aa80-ad33792d0271";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/379cc3af-11b4-4ab1-bb4e-01a3e9870789";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/293e1da6-ac2a-4e76-9af3-4aad36587022";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/878e9922-6adf-4b77-b9c8-0af71bd521f1";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/219af2db-b1ea-437b-91ff-c138e52de2bd";

// サロンデータの型定義
interface Salon {
  name: string;
  type: string;
  rating: string;
  reviews: string;
  distance: string;
  price: string;
  image: string;
  rank?: string;
}

// 全サロンデータ
const allSalons: Salon[] = [
  { name: "HAIR SALON LUXE", type: "ヘアサロン", rating: "4.8", reviews: "(128)", distance: "0.5km", price: "¥4,000~", image: imgImageWithFallback, rank: "1位" },
  { name: "Nail Studio BRILLIANT", type: "ネイルサロン", rating: "4.9", reviews: "(256)", distance: "0.8km", price: "¥5,000~", image: imgImageWithFallback1 },
  { name: "Beauty Space AROMA", type: "トータルビューティー", rating: "4.7", reviews: "(89)", distance: "1.2km", price: "¥6,000~", image: imgImageWithFallback2 },
  { name: "Eyelash Studio GLOW", type: "まつげサロン", rating: "4.6", reviews: "(92)", distance: "0.7km", price: "¥3,500~", image: imgImageWithFallback3 },
  { name: "Esthe Salon RELAX", type: "エステサロン", rating: "4.9", reviews: "(145)", distance: "1.0km", price: "¥8,000~", image: imgImageWithFallback4 },
  { name: "Barber Shop CLASSIC", type: "理容室", rating: "4.5", reviews: "(67)", distance: "0.6km", price: "¥2,500~", image: imgImageWithFallback },
  { name: "Hair Salon STYLE", type: "ヘアサロン", rating: "4.7", reviews: "(203)", distance: "1.1km", price: "¥4,500~", image: imgImageWithFallback1 },
  { name: "Nail Art PARIS", type: "ネイルサロン", rating: "4.8", reviews: "(178)", distance: "0.9km", price: "¥5,500~", image: imgImageWithFallback2 },
  { name: "Total Beauty PREMIUM", type: "トータルビューティー", rating: "4.9", reviews: "(234)", distance: "1.3km", price: "¥7,000~", image: imgImageWithFallback3 },
  { name: "Lash Studio BEAUTY", type: "まつげサロン", rating: "4.6", reviews: "(156)", distance: "0.8km", price: "¥3,800~", image: imgImageWithFallback4 },
  { name: "Esthe Clinic SPA", type: "エステサロン", rating: "4.8", reviews: "(189)", distance: "1.4km", price: "¥9,000~", image: imgImageWithFallback },
  { name: "Barber House TRADITION", type: "理容室", rating: "4.4", reviews: "(98)", distance: "0.5km", price: "¥2,800~", image: imgImageWithFallback1 },
];

export default function SalonReservationAppMockup() {
  const [activeCategory, setActiveCategory] = useState<string>("すべて");
  const [activeNav, setActiveNav] = useState<string>("探す");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // カテゴリーでフィルタリング
  const filteredSalons = activeCategory === "すべて" 
    ? allSalons 
    : allSalons.filter(salon => salon.type === activeCategory);
  
  // カレンダー用の日付生成
  const getCalendarDays = () => {
    const today = new Date();
    const days: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };
  
  const calendarDays = getCalendarDays();
  
  // 日付フォーマット
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    return { month, day, weekday };
  };

  return (
    <div className="relative w-full max-w-[984px] h-auto min-h-[460px] md:min-h-[610px] mx-auto px-4 md:px-0" data-name="Container21" data-node-id="47:4981">
      {/* iPhone Container */}
      <div className="relative md:absolute h-[610px] md:left-0 md:top-0 w-[280px] mx-auto md:mx-0 scale-75 md:scale-100 origin-center" data-name="Container9" data-node-id="47:4982">
        <div className="absolute h-[24px] left-[114.88px] top-[583.8px] w-[49.825px]" data-name="Paragraph" data-node-id="47:4983">
          <p className="absolute font-['Arimo',sans-serif] font-normal leading-[20px] left-0 text-[#4a5565] text-[12px] top-[0.2px]" data-node-id="47:4984">
            iPhone
          </p>
        </div>
        <div className="absolute bg-[#101828] h-[570px] left-0 rounded-[40px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] top-0 w-[280px]" data-name="IPhoneFrame" data-node-id="47:4985">
          <div className="absolute bg-black h-[546px] left-[12px] overflow-hidden rounded-[32px] top-[12px] w-[256px]" data-name="Container4" data-node-id="47:4986">
            <div className="absolute bg-white h-[546px] left-0 overflow-hidden top-0 w-[256px]" data-name="MobileApp" data-node-id="47:4987">
              <div className="absolute flex flex-col items-start left-0 overflow-y-auto scrollbar-hide top-0 w-[256px]" data-name="Container" data-node-id="47:4988" style={{ height: '477.7px', maxHeight: '477.7px' }}>
                <div className="bg-gradient-to-b from-[#fdf2f8] h-[1232.925px] relative shrink-0 to-[#f9fafb] via-white w-full" data-name="Home" data-node-id="47:4989">
                  {/* Status Bar */}
                  <div className="absolute bg-gradient-to-r flex items-center justify-between from-[#f6339a] h-[24px] left-0 px-[8px] to-[#ad46ff] top-0 w-[256px]" data-name="StatusBar" data-node-id="47:4989-1">
                    <div className="flex gap-[4px] items-center">
                      <span className="text-white text-[9px] font-bold">9:41</span>
                    </div>
                    <div className="flex gap-[3px] items-center">
                      <div className="w-[14px] h-[8px] border border-white rounded-sm">
                        <div className="w-[10px] h-[6px] bg-white rounded-sm m-[1px]" />
                      </div>
                      <div className="w-[14px] h-[8px] border border-white rounded-sm">
                        <div className="w-[2px] h-[2px] bg-white rounded-full m-[3px]" />
                      </div>
                    </div>
                  </div>
                  {/* Header */}
                  <div className="absolute bg-gradient-to-r flex flex-col from-[#f6339a] h-[100px] items-start left-0 pt-[4px] px-[8px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] to-[#ad46ff] top-[24px] w-[256px] z-10" data-name="Header" data-node-id="47:4990">
                    <div className="flex flex-col gap-[4px] h-[76px] items-start relative shrink-0 w-full" data-name="Container" data-node-id="47:4991">
                      <div className="flex gap-[3px] h-[18px] items-center relative shrink-0 w-full" data-name="Container" data-node-id="47:4992">
                        <div className="relative shrink-0 w-[12px] h-[12px]" data-name="Icon" data-node-id="47:4993">
                          <img alt="" className="block max-w-none w-full h-full" src={imgIcon} />
                        </div>
                        <div className="h-[18px] relative shrink-0 w-[55px]" data-name="Heading 1" data-node-id="47:4999">
                          <p className="absolute font-['Arimo',sans-serif] font-bold leading-[16px] left-0 text-[11px] text-white top-[-0.5px] whitespace-nowrap" data-node-id="47:5000">
                            サロン予約
                          </p>
                        </div>
                      </div>
                      <div className="bg-white flex gap-[4px] h-[30px] items-center px-[8px] relative rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors" data-name="Container" data-node-id="47:5001">
                        <div className="relative shrink-0 w-[12px] h-[12px]" data-name="Icon" data-node-id="47:5002">
                          <img alt="" className="block max-w-none w-full h-full" src={imgIcon1} />
                        </div>
                        <div className="flex-1 h-[12px] min-h-px min-w-px relative" data-name="Text" data-node-id="47:5005">
                          <p className="flex-1 font-['Arimo',sans-serif] font-normal leading-[10px] min-h-px min-w-px relative text-[#6a7282] text-[9px] whitespace-nowrap" data-node-id="47:5006">
                            エリア・日時・条件で検索
                          </p>
                        </div>
                        <div className="bg-[#fce7f3] relative rounded-full shrink-0 w-[18px] h-[18px] cursor-pointer hover:bg-[#fbd1e8] transition-colors" data-name="Container" data-node-id="47:5007">
                          <div className="flex items-center justify-center relative w-full h-full">
                            <div className="relative shrink-0 w-[9px] h-[9px]" data-name="Icon" data-node-id="47:5008">
                              <img alt="" className="block max-w-none w-full h-full" src={imgIcon2} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[3px] h-[20px] items-start relative shrink-0 w-full" data-name="Container" data-node-id="47:5018">
                        <button 
                          onClick={() => {}}
                          className="bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-[50px] hover:bg-[rgba(255,255,255,0.3)] transition-colors cursor-pointer" 
                          data-name="Button" 
                          data-node-id="47:5019"
                        >
                          <div className="flex gap-[2px] items-center pl-[8px] relative w-full h-full">
                            <div className="relative shrink-0 w-[8px] h-[8px]" data-name="Icon" data-node-id="47:5020">
                              <img alt="" className="block max-w-none w-full h-full" src={imgIcon3} />
                            </div>
                            <div className="h-[12px] relative shrink-0 w-[20px]" data-name="Text" data-node-id="47:5023">
                              <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" data-node-id="47:5024">
                                エリア
                              </p>
                            </div>
                          </div>
                        </button>
                        <button 
                          onClick={() => {}}
                          className="bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-[46px] hover:bg-[rgba(255,255,255,0.3)] transition-colors cursor-pointer" 
                          data-name="Button" 
                          data-node-id="47:5025"
                        >
                          <div className="flex gap-[2px] items-center px-[8px] relative w-full h-full">
                            <div className="relative shrink-0 w-[8px] h-[8px]" data-name="Icon" data-node-id="47:5026">
                              <img alt="" className="block max-w-none w-full h-full" src={imgIcon4} />
                            </div>
                            <div className="flex-1 h-[12px] min-h-px min-w-px relative" data-name="Text" data-node-id="47:5031">
                              <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" data-node-id="47:5032">
                                日時
                              </p>
                            </div>
                          </div>
                        </button>
                        <button 
                          onClick={() => {}}
                          className="bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-[46px] hover:bg-[rgba(255,255,255,0.3)] transition-colors cursor-pointer" 
                          data-name="Button" 
                          data-node-id="47:5033"
                        >
                          <div className="flex gap-[2px] items-center px-[8px] relative w-full h-full">
                            <div className="relative shrink-0 w-[8px] h-[8px]" data-name="Icon" data-node-id="47:5034">
                              <img alt="" className="block max-w-none w-full h-full" src={imgIcon5} />
                            </div>
                            <div className="flex-1 h-[12px] min-h-px min-w-px relative" data-name="Text" data-node-id="47:5037">
                              <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" data-node-id="47:5038">
                                人気
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Content Section */}
                  <div className="absolute flex flex-col gap-[10px] items-start left-0 pt-[6px] px-[6px] pb-[60px] top-[124px] w-[256px] z-0" data-name="Container" data-node-id="47:5039">
                    {activeNav === "予約" ? (
                      /* 予約ページ */
                      <div className="flex flex-col gap-[12px] items-start w-full">
                        <div className="flex h-[20px] items-center relative shrink-0 w-full">
                          <p className="font-['Arimo',sans-serif] font-bold leading-[16px] text-[#0a0a0a] text-[12px] whitespace-nowrap">
                            予約日を選択
                          </p>
                        </div>
                        {/* カレンダー */}
                        <div className="flex flex-col gap-[8px] w-full">
                          <div className="grid grid-cols-7 gap-[4px] w-full">
                            {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                              <div key={index} className="flex items-center justify-center h-[16px]">
                                <p className="font-['Arimo',sans-serif] font-bold leading-[12px] text-[#4a5565] text-[8px]">
                                  {day}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-[4px] w-full">
                            {calendarDays.map((date, index) => {
                              const { month, day, weekday } = formatDate(date);
                              const isSelected = selectedDate && 
                                selectedDate.getDate() === date.getDate() && 
                                selectedDate.getMonth() === date.getMonth();
                              const isToday = date.getDate() === new Date().getDate() && 
                                date.getMonth() === new Date().getMonth();
                              
                              return (
                                <button
                                  key={index}
                                  onClick={() => setSelectedDate(date)}
                                  className={`flex flex-col gap-[1px] items-center justify-center h-[50px] rounded-[8px] w-[32px] transition-all cursor-pointer ${
                                    isSelected 
                                      ? 'bg-gradient-to-br from-[#f6339a] to-[#ad46ff] shadow-[0px_4px_6px_0px_rgba(246,51,154,0.3)]' 
                                      : isToday
                                      ? 'bg-[#fce7f3] border border-[#f6339a]'
                                      : 'bg-white hover:bg-[#f9fafb] border border-[#e5e7eb]'
                                  }`}
                                >
                                  <p className={`font-['Arimo',sans-serif] font-bold leading-[10px] text-[7px] ${
                                    isSelected ? 'text-white' : isToday ? 'text-[#f6339a]' : 'text-[#4a5565]'
                                  }`}>
                                    {month}/{day}
                                  </p>
                                  <p className={`font-['Arimo',sans-serif] font-normal leading-[9px] text-[6px] ${
                                    isSelected ? 'text-white' : 'text-[#99a1af]'
                                  }`}>
                                    {weekday}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        {selectedDate && (
                          <div className="bg-gradient-to-r from-[#fce7f3] to-[#f3e8ff] rounded-[10px] p-[8px] w-full">
                            <p className="font-['Arimo',sans-serif] font-bold leading-[12px] text-[#f6339a] text-[9px]">
                              選択日: {formatDate(selectedDate).month}月{formatDate(selectedDate).day}日({formatDate(selectedDate).weekday})
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                    {/* カテゴリから探す */}
                    <div className="flex flex-col gap-[5px] h-[120px] items-start relative shrink-0 w-full" data-name="Section" data-node-id="47:5040">
                      <div className="flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="47:5041">
                        <div className="h-[16px] relative shrink-0 w-[70px]" data-name="Heading 2" data-node-id="47:5042">
                          <p className="absolute font-['Arimo',sans-serif] font-bold leading-[14px] left-0 text-[#0a0a0a] text-[11px] top-[-0.5px] whitespace-nowrap" data-node-id="47:5043">
                            カテゴリから探す
                          </p>
                        </div>
                        <div className="bg-gradient-to-r flex-1 from-[#fccee8] h-[1.5px] min-h-px min-w-px rounded-full to-transparent" data-name="Container" data-node-id="47:5044" />
                      </div>
                      <div className="flex flex-wrap gap-[5px] w-full" data-name="Container" data-node-id="47:5045">
                        {[
                          { category: "すべて", emoji: "✨" },
                          { category: "ヘアサロン", emoji: "✂️" },
                          { category: "ネイルサロン", emoji: "💅" },
                          { category: "まつげサロン", emoji: "👁️" },
                          { category: "エステサロン", emoji: "🌸" },
                          { category: "理容室", emoji: "💈" },
                          { category: "トータルビューティー", emoji: "✨" },
                        ].map((item, index) => {
                          const isActive = activeCategory === item.category;
                          return (
                            <button
                              key={item.category}
                              onClick={() => setActiveCategory(item.category)}
                              className={`bg-white flex flex-col gap-[2px] h-[50px] items-center justify-center rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] w-[74px] hover:scale-105 transition-transform cursor-pointer ${isActive ? 'ring-2 ring-[#f6339a]' : ''}`}
                              data-name="Button" 
                              data-node-id={`47:${5046 + index}`}
                            >
                              <div className="flex h-[20px] items-center justify-center relative shrink-0 w-full" data-name="Container">
                                <p className="font-['Arimo',sans-serif] font-normal leading-[20px] relative text-[#0a0a0a] text-[18px] text-center">
                                  {item.emoji}
                                </p>
                              </div>
                              <div className="h-[10px] relative shrink-0 w-full" data-name="Container">
                                <p className="absolute font-['Arimo',sans-serif] font-bold leading-[9px] left-[50%] text-[#0a0a0a] text-[7px] text-center top-[-0.3px] translate-x-[-50%] whitespace-nowrap">
                                  {item.category}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* おすすめセクション */}
                    <div className="h-[120px] overflow-hidden relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full cursor-pointer hover:scale-[1.02] transition-transform" data-name="Section" data-node-id="47:5076" style={{ backgroundImage: "linear-gradient(149.21430654430822deg, rgb(246, 51, 154) 0%, rgb(173, 70, 255) 50%, rgb(97, 95, 255) 100%)" }}>
                      <div className="absolute bg-[rgba(0,0,0,0.1)] h-[120px] left-0 top-0 w-[240px]" data-name="Container" data-node-id="47:5077" />
                      <div className="absolute h-[120px] left-0 top-0 w-[240px]" data-name="Container" data-node-id="47:5078">
                        <div className="absolute flex gap-[4px] h-[18px] items-center left-[12px] top-[12px] w-[216px]" data-name="Container" data-node-id="47:5079">
                          <div className="bg-[rgba(255,255,255,0.2)] relative rounded-full shrink-0 w-[18px] h-[18px]" data-name="Container" data-node-id="47:5080">
                            <div className="flex items-center justify-center relative w-full h-full">
                              <div className="relative shrink-0 w-[10px] h-[10px]" data-name="Icon" data-node-id="47:5081">
                                <img alt="" className="block max-w-none w-full h-full" src={imgIcon5} />
                              </div>
                            </div>
                          </div>
                          <div className="h-[14px] relative shrink-0 w-[65px]" data-name="Text" data-node-id="47:5084">
                            <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[10px] text-white whitespace-nowrap" data-node-id="47:5085">
                              今週のおすすめ
                            </p>
                          </div>
                        </div>
                        <div className="absolute h-[18px] left-[12px] top-[34px] w-[216px]" data-name="Heading 3" data-node-id="47:5086">
                          <p className="absolute font-['Arimo',sans-serif] font-bold leading-[16px] left-0 text-[13px] text-white top-[-1px] whitespace-nowrap" data-node-id="47:5087">
                            新規限定クーポン配信中
                          </p>
                        </div>
                        <div className="absolute h-[12px] left-[12px] top-[56px] w-[216px]" data-name="Paragraph" data-node-id="47:5088">
                          <p className="absolute font-['Arimo',sans-serif] font-normal leading-[11px] left-0 text-[9px] text-[rgba(255,255,255,0.9)] top-[-0.5px] whitespace-nowrap" data-node-id="47:5089">
                            人気サロンが最大30%OFF
                          </p>
                        </div>
                        <div className="absolute bg-white flex h-[24px] items-center left-[12px] px-[10px] rounded-full shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[84px] w-[80px] hover:bg-gray-50 transition-colors cursor-pointer" data-name="Container" data-node-id="47:5090">
                          <p className="font-['Arimo',sans-serif] font-bold leading-[14px] relative shrink-0 text-[#e60076] text-[10px] whitespace-nowrap" data-node-id="47:5091">
                            詳細を見る →
                          </p>
                        </div>
                      </div>
                      <div className="absolute bg-[rgba(255,255,255,0.1)] blur-[40px] left-[184px] rounded-full w-[96px] h-[96px] top-[86.99px]" data-name="Container" data-node-id="47:5092" />
                      <div className="absolute bg-[rgba(255,255,255,0.1)] blur-[40px] left-[-40px] rounded-full w-[96px] h-[96px] top-[-40px]" data-name="Container" data-node-id="47:5093" />
                    </div>
                    {/* 人気のサロンセクション */}
                    <div className="flex flex-col gap-[6px] h-[300px] items-start relative shrink-0 w-full" data-name="Section" data-node-id="47:5094">
                      <div className="flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="47:5095">
                        <div className="h-[28px] relative shrink-0 w-[65px]" data-name="Container" data-node-id="47:5096">
                          <div className="flex flex-col gap-[1.5px] items-start relative w-full h-full">
                            <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 2" data-node-id="47:5097">
                              <p className="absolute font-['Arimo',sans-serif] font-bold leading-[14px] left-0 text-[#0a0a0a] text-[12px] top-[-0.5px] whitespace-nowrap" data-node-id="47:5098">
                                人気のサロン
                              </p>
                            </div>
                            <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph" data-node-id="47:5099">
                              <p className="absolute font-['Arimo',sans-serif] font-normal leading-[11px] left-0 text-[#4a5565] text-[9px] top-[-0.3px] whitespace-nowrap" data-node-id="47:5100">
                                今週の注目サロン
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* サロンカード */}
                      <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container" data-node-id="47:5105">
                        {filteredSalons.map((salon, index) => (
                          <div key={index} className="bg-white h-[80px] overflow-hidden relative rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-full cursor-pointer hover:shadow-lg transition-shadow" data-name="Container" data-node-id={`47:${5106 + index}`}>
                            <div className="absolute h-[80px] left-[80px] top-0 w-[160px]" data-name="Container">
                              <div className="absolute flex h-[14px] items-start left-[6px] top-[6px] w-[150px]" data-name="Heading 3">
                                <p className="flex-1 font-['Arimo',sans-serif] font-bold leading-[12px] min-h-px min-w-px relative text-[#0a0a0a] text-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                  {salon.name}
                                </p>
                              </div>
                              <div className="absolute h-[12px] left-[6px] top-[20px] w-[150px]" data-name="Paragraph">
                                <p className="absolute font-['Arimo',sans-serif] font-normal leading-[11px] left-0 text-[#4a5565] text-[9px] top-[-0.5px] whitespace-nowrap">
                                  {salon.type}
                                </p>
                              </div>
                              <div className="absolute flex gap-[6px] h-[12px] items-center left-[6px] top-[36px] w-[150px]" data-name="Container">
                                <div className="h-[12px] relative shrink-0 w-[45px]" data-name="Container">
                                  <div className="flex gap-[1.5px] items-center relative w-full h-full">
                                    <p className="font-['Arimo',sans-serif] font-bold leading-[10px] relative shrink-0 text-[#fdc700] text-[10px]">★</p>
                                    <p className="font-['Arimo',sans-serif] font-bold leading-[10px] relative shrink-0 text-[#0a0a0a] text-[10px]">{salon.rating}</p>
                                    <p className="font-['Arimo',sans-serif] font-normal leading-[9px] relative shrink-0 text-[#99a1af] text-[8px]">{salon.reviews}</p>
                                  </div>
                                </div>
                                <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[#d1d5dc] text-[10px]">|</p>
                                <p className="font-['Arimo',sans-serif] font-normal leading-[9px] relative shrink-0 text-[#4a5565] text-[8px]">{salon.distance}</p>
                              </div>
                              <div className="absolute h-[16px] left-[6px] top-[54px] w-[150px]" data-name="Container">
                                <div className="absolute bg-[#dcfce7] flex h-[16px] items-center left-0 px-[6px] py-[1px] rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-0 w-[55px]" data-name="Badge">
                                  <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[#008236] text-[8px] whitespace-nowrap">本日空き◎</p>
                                </div>
                                <div className="absolute bg-[#f3f4f6] flex h-[16px] items-center left-[58px] px-[6px] py-[1px] rounded-full top-0 w-[45px]" data-name="Badge">
                                  <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[#364153] text-[8px] whitespace-nowrap">{salon.price}</p>
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 w-[80px] h-[80px] top-0" data-name="Container">
                              <div className="absolute left-0 w-[80px] h-[80px] top-0" data-name="ImageWithFallback">
                                <img alt={salon.name} className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src={salon.image} />
                              </div>
                              {salon.rank && (
                                <div className="absolute bg-gradient-to-r flex from-[#fdc700] gap-[1.5px] h-[16px] items-center left-[3px] pl-[5px] rounded-full shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] to-[#ff6900] top-[3px] w-[30px]" data-name="Container">
                                  <div className="relative shrink-0 w-[7px] h-[7px]" data-name="Icon">
                                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon6} />
                                  </div>
                                  <div className="h-[12px] relative shrink-0 w-[12px]" data-name="Text">
                                    <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[8px] text-white">{salon.rank}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    </>
                    )}
                  </div>
                </div>
              </div>
              {/* Navigation */}
              <div className="absolute bg-[rgba(255,255,255,0.95)] border-[#e5e7eb] border-solid border-t-[0.8px] flex flex-col h-[52px] items-start left-0 pt-[4px] px-[4px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] top-[477.7px] w-[256px]" data-name="Navigation" data-node-id="47:5260">
                <div className="flex h-[44px] items-center justify-between px-[2px] relative shrink-0 w-full" data-name="Container" data-node-id="47:5261">
                  {[
                    { nav: "探す", icon: imgIcon7 },
                    { nav: "予約", icon: imgIcon8 },
                    { nav: "人気", icon: imgIcon9 },
                    { nav: "マイ", icon: imgIcon10 },
                  ].map((item, index) => {
                    const isActive = activeNav === item.nav;
                    return (
                      <button
                        key={item.nav}
                        onClick={() => setActiveNav(item.nav)}
                        className="h-[44px] relative shrink-0 w-[38px] cursor-pointer" 
                        data-name="Button" 
                        data-node-id={`47:${5262 + index}`}
                      >
                        <div className="flex flex-col gap-[1px] items-center py-[2px] relative w-full h-full">
                          <div 
                            className={`flex-1 min-h-px min-w-px relative rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] w-[24px] ${isActive ? 'bg-gradient-to-br from-[#f6339a] to-[#ad46ff]' : 'bg-[#f3f4f6]'}`}
                            data-name="Container"
                          >
                            <div className="flex items-center justify-center relative w-full h-full">
                              <div className="relative shrink-0 w-[12px] h-[12px]" data-name="Icon">
                                <img alt="" className="block max-w-none w-full h-full" src={item.icon} />
                              </div>
                            </div>
                          </div>
                          <div className="h-[10px] relative shrink-0 w-[12px]" data-name="Text">
                            <p className={`font-['Arimo',sans-serif] font-bold leading-[9px] relative shrink-0 text-[7px] text-center whitespace-nowrap ${isActive ? 'text-[#f6339a]' : 'text-[#4a5565]'}`}>
                              {item.nav}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* iPhone Notch */}
            <div className="absolute bg-black h-[28px] left-[68px] rounded-bl-[20px] rounded-br-[20px] top-0 w-[120px]" data-name="Container3" data-node-id="47:5292">
              <div className="absolute bg-[#1e2939] h-[5px] left-[35px] rounded-full top-[8px] w-[50px]" data-name="Container1" data-node-id="47:5293" />
              <div className="absolute bg-[#364153] border-[#4a5565] border-[0.8px] border-solid left-[20px] rounded-full w-[10px] h-[10px] top-[7px]" data-name="Container2" data-node-id="47:5294" />
            </div>
          </div>
        </div>
      </div>

      {/* MacBook Container */}
      <div className="absolute h-[483px] left-[344px] top-[63.5px] w-[640px] hidden md:block" data-name="Container20" data-node-id="47:5299">
        <div className="absolute h-[24px] left-[286.08px] top-[456.8px] w-[66.7px]" data-name="Paragraph2" data-node-id="47:5300">
          <p className="absolute font-['Arimo',sans-serif] font-normal leading-[20px] left-0 text-[#4a5565] text-[12px] top-[0.2px]" data-node-id="47:5301">
            MacBook
          </p>
        </div>
        <div className="absolute h-[435px] left-0 top-0 w-[640px]" data-name="MacBookFrame" data-node-id="47:5302">
          <div className="absolute h-[435px] left-0 top-0 w-[640px]" data-name="Container18" data-node-id="47:5303">
            <div className="absolute bg-[#1e2939] flex flex-col h-[415px] items-start left-0 pt-[8px] px-[8px] rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] top-0 w-[640px]" data-name="Container13" data-node-id="47:5304">
              <div className="bg-black h-[399px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Container12" data-node-id="47:5305">
                <div className="absolute bg-white flex h-[375px] items-start left-[12px] overflow-hidden top-[12px] w-[600px]" data-name="DesktopApp" data-node-id="47:5306">
                  {/* Sidebar */}
                  <div className="bg-gradient-to-b from-[#f6339a] h-[375px] relative shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 to-[#9810fa] w-[48px]" data-name="Sidebar" data-node-id="47:5307">
                    {[
                      { nav: "探す", icon: imgIcon11, top: 8 },
                      { nav: "予約", icon: imgIcon12, top: 52 },
                      { nav: "人気", icon: imgIcon13, top: 96 },
                      { nav: "マイ", icon: imgIcon14, top: 140 },
                    ].map((item, index) => {
                      const isActive = activeNav === item.nav;
                      return (
                        <button
                          key={item.nav}
                          onClick={() => setActiveNav(item.nav)}
                          className={`absolute flex flex-col gap-[1.5px] items-center justify-center left-[6px] rounded-[12px] w-[36px] h-[36px] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer ${isActive ? 'bg-[rgba(255,255,255,0.2)]' : ''}`}
                          style={{ top: `${item.top}px` }}
                          data-name="Button"
                        >
                          <div className="relative shrink-0 w-[14px] h-[14px]">
                            <img alt="" className="block max-w-none w-full h-full" src={item.icon} />
                          </div>
                          <div className="h-[10px] relative shrink-0 w-[14px]">
                            <p className="font-['Arimo',sans-serif] font-normal leading-[9px] relative shrink-0 text-[7px] text-center text-white whitespace-nowrap">
                              {item.nav}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {/* Main Content Area */}
                  <div className="flex-1 h-[375px] min-h-px min-w-px relative" data-name="Container" data-node-id="47:5334">
                    <div className="flex flex-col items-start overflow-hidden relative rounded-[inherit] w-full h-full">
                      <div className="bg-gradient-to-b from-[#fdf2f8] h-[1232.925px] relative shrink-0 to-[#f9fafb] via-white w-full" data-name="Home" data-node-id="47:5335">
                        {/* Desktop Header */}
                        <div className="absolute bg-gradient-to-r flex flex-col from-[#f6339a] h-[100px] items-start left-0 pt-[8px] px-[24px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] to-[#ad46ff] top-0 w-[552px] z-10" data-name="Header" data-node-id="47:5336">
                          <div className="flex flex-col gap-[4px] h-[76px] items-start relative shrink-0 w-full" data-name="Container" data-node-id="47:5337">
                            <div className="flex gap-[4px] h-[18px] items-center relative shrink-0 w-full" data-name="Container" data-node-id="47:5338">
                              <div className="relative shrink-0 w-[12px] h-[12px]" data-name="Icon" data-node-id="47:5339">
                                <img alt="" className="block max-w-none w-full h-full" src={imgIcon15} />
                              </div>
                              <div className="h-[18px] relative shrink-0 w-[55px]" data-name="Heading 1" data-node-id="47:5345">
                                <p className="absolute font-['Arimo',sans-serif] font-bold leading-[16px] left-0 text-[11px] text-white top-[-0.5px] whitespace-nowrap" data-node-id="47:5346">
                                  サロン予約
                                </p>
                              </div>
                            </div>
                            <div className="bg-white flex gap-[4px] h-[30px] items-center px-[8px] relative rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors" data-name="Container" data-node-id="47:5347">
                              <div className="relative shrink-0 w-[12px] h-[12px]" data-name="Icon" data-node-id="47:5348">
                                <img alt="" className="block max-w-none w-full h-full" src={imgIcon16} />
                              </div>
                              <div className="flex-1 h-[12px] min-h-px min-w-px relative" data-name="Text" data-node-id="47:5351">
                                <p className="flex-1 font-['Arimo',sans-serif] font-normal leading-[10px] min-h-px min-w-px relative text-[#6a7282] text-[9px] whitespace-nowrap" data-node-id="47:5352">
                                  エリア・日時・条件で検索
                                </p>
                              </div>
                              <div className="bg-[#fce7f3] relative rounded-full shrink-0 w-[18px] h-[18px] cursor-pointer hover:bg-[#fbd1e8] transition-colors" data-name="Container" data-node-id="47:5353">
                                <div className="flex items-center justify-center relative w-full h-full">
                                  <div className="relative shrink-0 w-[9px] h-[9px]" data-name="Icon" data-node-id="47:5354">
                                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon2} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-[3px] h-[20px] items-start relative shrink-0 w-full" data-name="Container" data-node-id="47:5364">
                              <button className="bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-[50px] hover:bg-[rgba(255,255,255,0.3)] transition-colors cursor-pointer" data-name="Button" data-node-id="47:5365">
                                <div className="flex gap-[2px] items-center pl-[8px] relative w-full h-full">
                                  <div className="relative shrink-0 w-[8px] h-[8px]" data-name="Icon" data-node-id="47:5366">
                                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon3} />
                                  </div>
                                  <div className="h-[12px] relative shrink-0 w-[20px]" data-name="Text" data-node-id="47:5369">
                                    <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" data-node-id="47:5370">
                                      エリア
                                    </p>
                                  </div>
                                </div>
                              </button>
                              <button className="bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-[46px] hover:bg-[rgba(255,255,255,0.3)] transition-colors cursor-pointer" data-name="Button" data-node-id="47:5371">
                                <div className="flex gap-[2px] items-center px-[8px] relative w-full h-full">
                                  <div className="relative shrink-0 w-[8px] h-[8px]" data-name="Icon" data-node-id="47:5372">
                                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon4} />
                                  </div>
                                  <div className="flex-1 h-[12px] min-h-px min-w-px relative" data-name="Text" data-node-id="47:5377">
                                    <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" data-node-id="47:5378">
                                      日時
                                    </p>
                                  </div>
                                </div>
                              </button>
                              <button className="bg-[rgba(255,255,255,0.2)] h-[20px] relative rounded-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-[46px] hover:bg-[rgba(255,255,255,0.3)] transition-colors cursor-pointer" data-name="Button" data-node-id="47:5379">
                                <div className="flex gap-[2px] items-center px-[8px] relative w-full h-full">
                                  <div className="relative shrink-0 w-[8px] h-[8px]" data-name="Icon" data-node-id="47:5380">
                                    <img alt="" className="block max-w-none w-full h-full" src={imgIcon5} />
                                  </div>
                                  <div className="flex-1 h-[12px] min-h-px min-w-px relative" data-name="Text" data-node-id="47:5383">
                                    <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[9px] text-center text-white whitespace-nowrap" data-node-id="47:5384">
                                      人気
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Desktop Content - カテゴリと人気のサロンを横並び */}
                        <div className="absolute flex gap-[10px] items-start left-[24px] pt-[6px] px-[6px] top-[100px] w-[528px] overflow-y-auto scrollbar-hide z-0" data-name="Container" data-node-id="47:5385" style={{ maxHeight: '275px' }}>
                          {activeNav === "予約" ? (
                            /* 予約ページ */
                            <div className="flex flex-col gap-[16px] items-start w-full">
                              <div className="flex h-[20px] items-center relative shrink-0 w-full">
                                <p className="font-['Arimo',sans-serif] font-bold leading-[16px] text-[#0a0a0a] text-[14px] whitespace-nowrap">
                                  予約日を選択
                                </p>
                              </div>
                              {/* カレンダー */}
                              <div className="flex flex-col gap-[12px] w-full">
                                <div className="grid grid-cols-7 gap-[6px] w-full">
                                  {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                                    <div key={index} className="flex items-center justify-center h-[20px]">
                                      <p className="font-['Arimo',sans-serif] font-bold leading-[14px] text-[#4a5565] text-[10px]">
                                        {day}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex flex-wrap gap-[6px] w-full">
                                  {calendarDays.map((date, index) => {
                                    const { month, day, weekday } = formatDate(date);
                                    const isSelected = selectedDate && 
                                      selectedDate.getDate() === date.getDate() && 
                                      selectedDate.getMonth() === date.getMonth();
                                    const isToday = date.getDate() === new Date().getDate() && 
                                      date.getMonth() === new Date().getMonth();
                                    
                                    return (
                                      <button
                                        key={index}
                                        onClick={() => setSelectedDate(date)}
                                        className={`flex flex-col gap-[2px] items-center justify-center h-[70px] rounded-[10px] w-[60px] transition-all cursor-pointer ${
                                          isSelected 
                                            ? 'bg-gradient-to-br from-[#f6339a] to-[#ad46ff] shadow-[0px_4px_6px_0px_rgba(246,51,154,0.3)]' 
                                            : isToday
                                            ? 'bg-[#fce7f3] border border-[#f6339a]'
                                            : 'bg-white hover:bg-[#f9fafb] border border-[#e5e7eb]'
                                        }`}
                                      >
                                        <p className={`font-['Arimo',sans-serif] font-bold leading-[12px] text-[9px] ${
                                          isSelected ? 'text-white' : isToday ? 'text-[#f6339a]' : 'text-[#4a5565]'
                                        }`}>
                                          {month}/{day}
                                        </p>
                                        <p className={`font-['Arimo',sans-serif] font-normal leading-[10px] text-[8px] ${
                                          isSelected ? 'text-white' : 'text-[#99a1af]'
                                        }`}>
                                          {weekday}
                                        </p>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              {selectedDate && (
                                <div className="bg-gradient-to-r from-[#fce7f3] to-[#f3e8ff] rounded-[12px] p-[12px] w-full">
                                  <p className="font-['Arimo',sans-serif] font-bold leading-[14px] text-[#f6339a] text-[11px]">
                                    選択日: {formatDate(selectedDate).month}月{formatDate(selectedDate).day}日({formatDate(selectedDate).weekday})
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <>
                          {/* 左側: カテゴリセクション */}
                          <div className="flex flex-col gap-[8px] w-[240px] shrink-0" data-name="LeftColumn">
                            <div className="flex flex-col gap-[5px] h-[120px] items-start relative shrink-0 w-full" data-name="Section" data-node-id="47:5386">
                              <div className="flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="47:5387">
                                <div className="h-[16px] relative shrink-0 w-[70px]" data-name="Heading 2" data-node-id="47:5388">
                                  <p className="absolute font-['Arimo',sans-serif] font-bold leading-[14px] left-0 text-[#0a0a0a] text-[11px] top-[-0.5px] whitespace-nowrap" data-node-id="47:5389">
                                    カテゴリから探す
                                  </p>
                                </div>
                                <div className="bg-gradient-to-r flex-1 from-[#fccee8] h-[1.5px] min-h-px min-w-px rounded-full to-transparent" data-name="Container" data-node-id="47:5390" />
                              </div>
                              <div className="flex flex-wrap gap-[5px] w-full" data-name="Container" data-node-id="47:5391">
                                {[
                                  { category: "すべて", emoji: "✨" },
                                  { category: "ヘアサロン", emoji: "✂️" },
                                  { category: "ネイルサロン", emoji: "💅" },
                                  { category: "まつげサロン", emoji: "👁️" },
                                  { category: "エステサロン", emoji: "🌸" },
                                  { category: "理容室", emoji: "💈" },
                                  { category: "トータルビューティー", emoji: "✨" },
                                ].map((item, index) => {
                                  const isActive = activeCategory === item.category;
                                  return (
                                    <button
                                      key={item.category}
                                      onClick={() => setActiveCategory(item.category)}
                                      className={`bg-white flex flex-col gap-[2px] h-[50px] items-center justify-center rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] w-[74px] hover:scale-105 transition-transform cursor-pointer ${isActive ? 'ring-2 ring-[#f6339a]' : ''}`}
                                      data-name="Button" 
                                      data-node-id={`47:${5392 + index}`}
                                    >
                                      <div className="flex h-[20px] items-center justify-center relative shrink-0 w-full" data-name="Container">
                                        <p className="font-['Arimo',sans-serif] font-normal leading-[20px] relative text-[#0a0a0a] text-[18px] text-center">
                                          {item.emoji}
                                        </p>
                                      </div>
                                      <div className="h-[10px] relative shrink-0 w-full" data-name="Container">
                                        <p className="absolute font-['Arimo',sans-serif] font-bold leading-[9px] left-[50%] text-[#0a0a0a] text-[7px] text-center top-[-0.3px] translate-x-[-50%] whitespace-nowrap">
                                          {item.category}
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                            {/* おすすめセクション */}
                            <div className="h-[120px] overflow-hidden relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full cursor-pointer hover:scale-[1.02] transition-transform" data-name="Section" data-node-id="47:5422" style={{ backgroundImage: "linear-gradient(161.68599395584494deg, rgb(246, 51, 154) 0%, rgb(173, 70, 255) 50%, rgb(97, 95, 255) 100%)" }}>
                              <div className="absolute bg-[rgba(0,0,0,0.1)] h-[120px] left-0 top-0 w-[228px]" data-name="Container" data-node-id="47:5423" />
                              <div className="absolute h-[120px] left-0 top-0 w-[228px]" data-name="Container" data-node-id="47:5424">
                                <div className="absolute flex gap-[4px] h-[18px] items-center left-[12px] top-[12px] w-[204px]" data-name="Container" data-node-id="47:5425">
                                  <div className="bg-[rgba(255,255,255,0.2)] relative rounded-full shrink-0 w-[18px] h-[18px]" data-name="Container" data-node-id="47:5426">
                                    <div className="flex items-center justify-center relative w-full h-full">
                                      <div className="relative shrink-0 w-[10px] h-[10px]" data-name="Icon" data-node-id="47:5427">
                                        <img alt="" className="block max-w-none w-full h-full" src={imgIcon5} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="h-[14px] relative shrink-0 w-[65px]" data-name="Text" data-node-id="47:5430">
                                    <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[10px] text-white whitespace-nowrap" data-node-id="47:5431">
                                      今週のおすすめ
                                    </p>
                                  </div>
                                </div>
                                <div className="absolute h-[18px] left-[12px] top-[34px] w-[204px]" data-name="Heading 3" data-node-id="47:5432">
                                  <p className="absolute font-['Arimo',sans-serif] font-bold leading-[16px] left-0 text-[13px] text-white top-[-1px] whitespace-nowrap" data-node-id="47:5433">
                                    新規限定クーポン配信中
                                  </p>
                                </div>
                                <div className="absolute h-[12px] left-[12px] top-[56px] w-[204px]" data-name="Paragraph" data-node-id="47:5434">
                                  <p className="absolute font-['Arimo',sans-serif] font-normal leading-[11px] left-0 text-[9px] text-[rgba(255,255,255,0.9)] top-[-0.5px] whitespace-nowrap" data-node-id="47:5435">
                                    人気サロンが最大30%OFF
                                  </p>
                                </div>
                                <div className="absolute bg-white flex h-[24px] items-center left-[12px] px-[10px] rounded-full shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[84px] w-[80px] hover:bg-gray-50 transition-colors cursor-pointer" data-name="Container" data-node-id="47:5436">
                                  <p className="font-['Arimo',sans-serif] font-bold leading-[14px] relative shrink-0 text-[#e60076] text-[10px] whitespace-nowrap" data-node-id="47:5437">
                                    詳細を見る →
                                  </p>
                                </div>
                              </div>
                              <div className="absolute bg-[rgba(255,255,255,0.1)] blur-[40px] left-[184px] rounded-full w-[96px] h-[96px] top-[86.99px]" data-name="Container" data-node-id="47:5438" />
                              <div className="absolute bg-[rgba(255,255,255,0.1)] blur-[40px] left-[-40px] rounded-full w-[96px] h-[96px] top-[-40px]" data-name="Container" data-node-id="47:5439" />
                            </div>
                          </div>
                          {/* 右側: 人気のサロンセクション */}
                          <div className="flex flex-col gap-[6px] w-[276px] shrink-0" data-name="RightColumn">
                            <div className="flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="47:5441">
                              <div className="h-[28px] relative shrink-0 w-[65px]" data-name="Container" data-node-id="47:5442">
                                <div className="flex flex-col gap-[1.5px] items-start relative w-full h-full">
                                  <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 2" data-node-id="47:5443">
                                    <p className="absolute font-['Arimo',sans-serif] font-bold leading-[14px] left-0 text-[#0a0a0a] text-[12px] top-[-0.5px] whitespace-nowrap" data-node-id="47:5444">
                                      人気のサロン
                                    </p>
                                  </div>
                                  <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph" data-node-id="47:5445">
                                    <p className="absolute font-['Arimo',sans-serif] font-normal leading-[11px] left-0 text-[#4a5565] text-[9px] top-[-0.3px] whitespace-nowrap" data-node-id="47:5446">
                                      今週の注目サロン
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* サロンカード */}
                            <div className="flex flex-col gap-[6px] items-start relative shrink-0 w-full overflow-y-auto scrollbar-hide" data-name="Container" data-node-id="47:5451" style={{ maxHeight: '260px' }}>
                              {filteredSalons.map((salon, index) => (
                                <div key={index} className="bg-white h-[80px] overflow-hidden relative rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-full cursor-pointer hover:shadow-lg transition-shadow" data-name="Container" data-node-id={`47:${5452 + index}`}>
                                  <div className="absolute h-[80px] left-[80px] top-0 w-[192px]" data-name="Container">
                                    <div className="absolute flex h-[14px] items-start left-[6px] top-[6px] w-[186px]" data-name="Heading 3">
                                      <p className="flex-1 font-['Arimo',sans-serif] font-bold leading-[12px] min-h-px min-w-px relative text-[#0a0a0a] text-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                        {salon.name}
                                      </p>
                                    </div>
                                    <div className="absolute h-[12px] left-[6px] top-[20px] w-[186px]" data-name="Paragraph">
                                      <p className="absolute font-['Arimo',sans-serif] font-normal leading-[11px] left-0 text-[#4a5565] text-[9px] top-[-0.5px] whitespace-nowrap">
                                        {salon.type}
                                      </p>
                                    </div>
                                    <div className="absolute flex gap-[6px] h-[12px] items-center left-[6px] top-[36px] w-[186px]" data-name="Container">
                                      <div className="h-[12px] relative shrink-0 w-[45px]" data-name="Container">
                                        <div className="flex gap-[1.5px] items-center relative w-full h-full">
                                          <p className="font-['Arimo',sans-serif] font-bold leading-[10px] relative shrink-0 text-[#fdc700] text-[10px]">★</p>
                                          <p className="font-['Arimo',sans-serif] font-bold leading-[10px] relative shrink-0 text-[#0a0a0a] text-[10px]">{salon.rating}</p>
                                          <p className="font-['Arimo',sans-serif] font-normal leading-[9px] relative shrink-0 text-[#99a1af] text-[8px]">{salon.reviews}</p>
                                        </div>
                                      </div>
                                      <p className="font-['Arimo',sans-serif] font-normal leading-[10px] relative shrink-0 text-[#d1d5dc] text-[10px]">|</p>
                                      <p className="font-['Arimo',sans-serif] font-normal leading-[9px] relative shrink-0 text-[#4a5565] text-[8px]">{salon.distance}</p>
                                    </div>
                                    <div className="absolute h-[16px] left-[6px] top-[54px] w-[186px]" data-name="Container">
                                      <div className="absolute bg-[#dcfce7] flex h-[16px] items-center left-0 px-[6px] py-[1px] rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-0 w-[55px]" data-name="Badge">
                                        <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[#008236] text-[8px] whitespace-nowrap">本日空き◎</p>
                                      </div>
                                      <div className="absolute bg-[#f3f4f6] flex h-[16px] items-center left-[58px] px-[6px] py-[1px] rounded-full top-0 w-[45px]" data-name="Badge">
                                        <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[#364153] text-[8px] whitespace-nowrap">{salon.price}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="absolute left-0 w-[80px] h-[80px] top-0" data-name="Container">
                                    <div className="absolute left-0 w-[80px] h-[80px] top-0" data-name="ImageWithFallback">
                                      <img alt={salon.name} className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src={salon.image} />
                                    </div>
                                    {salon.rank && (
                                      <div className="absolute bg-gradient-to-r flex from-[#fdc700] gap-[1.5px] h-[16px] items-center left-[3px] pl-[5px] rounded-full shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] to-[#ff6900] top-[3px] w-[30px]" data-name="Container">
                                        <div className="relative shrink-0 w-[7px] h-[7px]" data-name="Icon">
                                          <img alt="" className="block max-w-none w-full h-full" src={imgIcon6} />
                                        </div>
                                        <div className="h-[12px] relative shrink-0 w-[12px]" data-name="Text">
                                          <p className="font-['Arimo',sans-serif] font-bold leading-[12px] relative shrink-0 text-[8px] text-white">{salon.rank}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bg-[#364153] border-[#4a5565] border-[0.8px] border-solid left-[309px] rounded-full w-[6px] h-[6px] top-[6px]" data-name="Container11" data-node-id="47:5606" />
              </div>
            </div>
            {/* MacBook Base */}
            <div className="absolute h-[20px] left-0 top-[415px] w-[640px]" data-name="Container17" data-node-id="47:5607">
              <div className="absolute bg-[#364153] h-[4px] left-0 top-0 w-[640px]" data-name="Container14" data-node-id="47:5608" />
              <div className="absolute bg-gradient-to-b flex flex-col from-[#d1d5dc] h-[16px] items-start left-0 pt-[11px] px-[260px] rounded-bl-[8px] rounded-br-[8px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] to-[#99a1af] top-[4px] w-[640px]" data-name="Container16" data-node-id="47:5609">
                <div className="bg-[#6a7282] h-[2px] opacity-50 rounded-full shrink-0 w-full" data-name="Container15" data-node-id="47:5610" />
              </div>
            </div>
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.2)] blur-[12px] h-[8px] left-[10px] rounded-full top-[435px] w-[620px]" data-name="Container19" data-node-id="47:5611" />
        </div>
      </div>
    </div>
  );
}
