// このスクリプトは主要なパターンを一括で置換するための参考用です
// 実際の置換は手動で行います

const patterns = [
  // 背景色
  { from: /bg-white(?![^"]*dark:)/g, to: 'bg-white dark:bg-[#0b1220]' },
  { from: /bg-\[#fafafa\](?![^"]*dark:)/g, to: 'bg-[#fafafa] dark:bg-[#1e293b]' },
  
  // テキスト色
  { from: /text-\[#1a1a1a\](?![^"]*dark:)/g, to: 'text-[#1a1a1a] dark:text-[#f9fafb]' },
  { from: /text-\[#0a0a0a\](?![^"]*dark:)/g, to: 'text-[#0a0a0a] dark:text-[#f9fafb]' },
  { from: /text-\[#666\](?![^"]*dark:)/g, to: 'text-[#666] dark:text-[#9ca3af]' },
  { from: /text-\[#6b7280\](?![^"]*dark:)/g, to: 'text-[#6b7280] dark:text-[#9ca3af]' },
  { from: /text-\[#6a7282\](?![^"]*dark:)/g, to: 'text-[#6a7282] dark:text-[#9ca3af]' },
  
  // ボーダー
  { from: /border-\[#e5e7eb\](?![^"]*dark:)/g, to: 'border-[#e5e7eb] dark:border-[#374151]' },
];

console.log('このスクリプトは参考用です。実際の置換は手動で行ってください。');
