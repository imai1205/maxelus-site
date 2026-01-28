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
    image: '/cases/zumen-connect-home.png',
    category: 'プロダクト',
    title: '図面コネクト',
    description: 'OCRで自動整理、AI類似検索で過去実績に即アクセス。図面を起点に一気通貫で管理。',
    outcome: '検索時間90%削減、見積作成時間を数時間→数分に短縮',
    serviceTags: ['図面管理', 'OCR', 'AI'],
    hasLP: true,
    lpHref: '/lp/zumen-connect',
  },
  {
    id: 'eyelash-salon-lp',
    image: 'https://www.figma.com/api/mcp/asset/5a2485c4-a1e9-48b0-983a-1111d3da2430',
    category: 'ホームページ',
    title: 'ホームページの事例',
    description: 'まつげサロン向けの予約管理アプリ・システム開発。顧客管理、予約管理、スタッフ管理、売上管理まで一元化。',
    outcome: '予約管理の効率化、顧客満足度向上',
    serviceTags: ['ホームページ', '予約管理', 'サロン'],
    hasLP: true,
    lpHref: '/lp/eyelash-salon',
  },
  {
    id: 'full-order-app',
    image: '/cases/nail.png',
    category: 'アプリ開発',
    title: 'オーダーメイドアプリ開発',
    description: '完全オーダーメイドで、お客様のビジネスに最適化されたアプリを開発。',
    outcome: '業務効率化、顧客満足度向上',
    serviceTags: ['アプリ開発', 'オーダーメイド', '業務効率化'],
    hasLP: true,
    lpHref: '/lp/full-order-app-development',
  },
];
