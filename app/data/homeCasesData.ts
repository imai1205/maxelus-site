// ホームページの事例セクション用データ
// LPがある場合はカード全体をクリック可能にする

export interface HomeCase {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string; // 何を作ったか（1行）
  outcome?: string; // 成果/効果（短い一言）
  serviceTags?: string[]; // 関連サービス（タグ）
  hasLP: boolean; // LPが存在するか
  lpHref?: string; // LPのURL（hasLPがtrueの場合必須）
}

export const homeCasesData: HomeCase[] = [
  {
    id: 'zumen-connect',
    image: 'https://www.figma.com/api/mcp/asset/a4f37e6a-2130-4808-9dc3-92b33fb7ce6f',
    category: 'プロダクト',
    title: '図面コネクト',
    description: 'OCRで自動整理、AI類似検索で過去実績に即アクセス。図面を起点に一気通貫で管理。',
    outcome: '検索時間90%削減、見積作成時間を数時間→数分に短縮',
    serviceTags: ['図面管理', 'OCR', 'AI'],
    hasLP: true,
    lpHref: '/lp/zumen-connect',
  },
  {
    id: 'manufacturing-dx',
    image: 'https://www.figma.com/api/mcp/asset/a97c9aa5-1dca-404b-97f1-f2c77a69af4b',
    category: '製造業',
    title: '製造業向け図面・案件管理DXシステム',
    description: 'Excelでの図面管理や案件情報の手作業転記を自動化。情報の検索時間を大幅に短縮。',
    outcome: '情報検索時間の削減、更新漏れ・バージョン違いの解消',
    serviceTags: ['業務DX', '図面管理', '案件管理'],
    hasLP: false,
  },
  {
    id: 'medical-reservation',
    image: 'https://www.figma.com/api/mcp/asset/9039d5eb-93bd-427d-9fdf-937454afea3d',
    category: '医療・ヘルスケア',
    title: '医療機関向け予約・問診システム',
    description: '電話予約の対応時間を削減し、問診票の記入漏れを防止。受付業務を効率化。',
    outcome: '予約対応時間の削減、問診票の記入漏れゼロ',
    serviceTags: ['Webアプリ', '予約システム', '問診'],
    hasLP: false,
  },
];
