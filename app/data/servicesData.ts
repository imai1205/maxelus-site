// Servicesページ用データ構造
// 3カテゴリ固定：プロダクト / アプリ開発・DX支援 / ホームページ制作

export type ServiceCategory = 'product' | 'app-dx' | 'website';

export type CtaType = 'inline' | 'lp';

export interface ServiceMetric {
  label: string;
  value: string | number;
  suffix?: string;
}

export interface ServiceDetail {
  // できること
  capabilities: string[];
  // こんな人におすすめ
  targetAudience: string[];
  // 進め方（3ステップ）
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  // 料金目安
  pricing: string;
  // よくある質問（2〜3）
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  catch: string;
  tags: string[];
  metric?: ServiceMetric;
  shortDesc: string;
  details: ServiceDetail;
  ctaType: CtaType;
  lpHref?: string; // LPがある場合のパス
  priority: number; // カテゴリ内での表示順
  special?: boolean; // 特別枠デザイン（ホームページ制作のスペシャルなど）
}

// カテゴリ名のマッピング（表示順：アプリ開発 → ホームページ → プロダクト）
export const categoryNames: Record<ServiceCategory, string> = {
  'app-dx': 'アプリ開発・DX支援',
  website: 'ホームページ制作（普通→特殊）',
  product: 'プロダクト',
};

// サービスデータ
export const servicesData: Service[] = [
  // ========== プロダクト ==========
  {
    id: 'zumen-connect',
    category: 'product',
    title: '図面コネクト',
    catch: '図面が「資産」になる。検索できる図面管理。',
    tags: ['図面管理', 'OCR', 'AI', '製造業', '検索'],
    metric: {
      label: '検索時間',
      value: '90%',
      suffix: '削減',
    },
    shortDesc: 'アップロードした図面をOCRで読み取り、AIで項目整理。図番・会社・材質などで探せる状態にして、現場のムダを削減します。',
    details: {
      capabilities: [
        '図面のOCR読み取り（PDF/画像対応）',
        'AIによる項目自動抽出（図番・会社名・材質・寸法など）',
        '類似図面検索（過去の図面から類似を発見）',
        '案件管理との連携（図面と案件を紐付け）',
        'モバイル対応（現場でスマホから検索可能）',
      ],
      targetAudience: [
        '図面管理がバラバラで探すのに時間がかかる',
        '過去の図面を活用したいが検索ができない',
        'Excelやフォルダ管理から脱却したい',
        '図面と案件を一元管理したい',
      ],
      process: [
        {
          step: 1,
          title: '無料相談・デモ提示',
          description: '現状の課題をヒアリングし、触れるデモで完成イメージを共有します。',
        },
        {
          step: 2,
          title: '設計・開発',
          description: '既存図面の取り込み方法を設計し、検索機能を実装します。',
        },
        {
          step: 3,
          title: '運用開始・サポート',
          description: '導入後も使い方のサポートや機能追加に対応します。',
        },
      ],
      pricing: '30万円〜（図面数・機能要件により変動）',
      faq: [
        {
          question: '既存の図面データは取り込めますか？',
          answer: 'はい、PDFや画像形式の図面を一括でアップロードできます。OCRで自動的にテキスト化し、検索可能な状態にします。',
        },
        {
          question: '類似図面検索はどの程度正確ですか？',
          answer: 'AI技術により、図面の形状や構造から類似度を判定します。精度は約85%以上で、さらに改善を続けています。',
        },
      ],
    },
    ctaType: 'lp',
    lpHref: '/lp/zumen-connect',
    priority: 1,
  },
  {
    id: 'sales-management',
    category: 'product',
    title: '販売管理',
    catch: '見積→受注→工程→納品→請求まで、つながる。',
    tags: ['販売管理', '受発注', '在庫', '製造業', 'スマホ対応'],
    metric: {
      label: '二重入力',
      value: '0',
      suffix: '回',
    },
    shortDesc: 'Excel運用を卒業し、進捗・履歴・原価の見える化へ。PC＋スマホ（iPhoneデモ）で「現場が更新できる」運用にします。',
    details: {
      capabilities: [
        '見積書・受注書の作成・管理',
        '工程管理（手配→加工→納品の進捗追跡）',
        '在庫管理・原価計算',
        '請求書の自動生成',
        'モバイル対応（現場から更新可能）',
      ],
      targetAudience: [
        'Excelで見積・受注を管理している',
        '進捗状況が把握しづらい',
        '二重入力が発生している',
        '原価計算が手作業で時間がかかる',
      ],
      process: [
        {
          step: 1,
          title: '業務フロー整理',
          description: '現状の業務フローをヒアリングし、最適なシステム設計を提案します。',
        },
        {
          step: 2,
          title: '開発・導入',
          description: '御社の業務に合わせたシステムを開発し、段階的に導入します。',
        },
        {
          step: 3,
          title: '運用サポート',
          description: '使い方のサポートや機能追加に対応し、継続的に改善します。',
        },
      ],
      pricing: '50万円〜（機能要件・ユーザー数により変動）',
      faq: [
        {
          question: '既存のExcelデータは移行できますか？',
          answer: 'はい、既存のExcelデータをインポートして移行できます。過去の見積・受注データもそのまま活用できます。',
        },
        {
          question: 'スマホからどの程度操作できますか？',
          answer: '見積・受注の確認、進捗更新、在庫確認など、主要な機能をスマホから操作できます。',
        },
      ],
    },
    ctaType: 'inline',
    priority: 2,
  },
  {
    id: 'simulation-3d',
    category: 'product',
    title: 'シミュレーション',
    catch: '3D可視化で、設計から製造まで見える化。',
    tags: ['3D', '可視化', 'シミュレーション', '製造業'],
    metric: {
      label: '設計ミス',
      value: '70%',
      suffix: '削減',
    },
    shortDesc: '3Dモデルを使った可視化・シミュレーションで、設計段階での問題を早期発見。製造工程の最適化を支援します。',
    details: {
      capabilities: [
        '3Dモデルの作成・編集',
        '可視化・シミュレーション',
        '設計検証（干渉チェックなど）',
        '製造工程の可視化',
        'Webブラウザで閲覧可能',
      ],
      targetAudience: [
        '設計段階での問題を早期発見したい',
        '3Dモデルを活用したいがツールが複雑',
        '製造工程を可視化したい',
        '顧客への説明資料として使いたい',
      ],
      process: [
        {
          step: 1,
          title: '要件定義・デモ提示',
          description: 'どのような可視化が必要かヒアリングし、デモで完成イメージを共有します。',
        },
        {
          step: 2,
          title: '3Dモデル作成・実装',
          description: '既存の図面やデータから3Dモデルを作成し、可視化機能を実装します。',
        },
        {
          step: 3,
          title: '納品・サポート',
          description: 'システムを納品し、使い方のサポートや機能追加に対応します。',
        },
      ],
      pricing: '40万円〜（3Dモデルの複雑さ・機能要件により変動）',
      faq: [
        {
          question: '既存のCADデータは使えますか？',
          answer: 'はい、主要なCAD形式（STEP、IGES、STLなど）に対応しています。既存データをそのまま活用できます。',
        },
        {
          question: 'Webブラウザでどの程度の性能が出ますか？',
          answer: '最新のWebGL技術により、高品質な3D表示が可能です。スマホからも快適に閲覧できます。',
        },
      ],
    },
    ctaType: 'inline',
    priority: 3,
  },

  // ========== アプリ開発・DX支援 ==========
  {
    id: 'full-order-app-development',
    category: 'app-dx',
    title: '完全オーダーメイドアプリ開発',
    catch: '完全オーダーメイドで課題を解決するWEB・アプリ制作',
    tags: ['完全オーダー', 'アプリ開発', 'Web開発', 'UI/UX', '伴走型'],
    metric: {
      label: '開発期間',
      value: '30〜50%',
      suffix: '短縮',
    },
    shortDesc: 'ユーザーに使われる、成果につながるプロダクトを企画から運用まで伴走してお届けします。完全オーダーメイドで、お客様のビジネス課題に合わせた最適なソリューションを提供します。',
    details: {
      capabilities: [
        '完全オーダーメイドのアプリ・Web開発',
        'UXリサーチに基づく設計',
        'AI活用による開発スピード向上',
        'セキュリティ・パフォーマンス最適化',
        '運用・改善まで見据えた設計',
        '透明性の高いコミュニケーション',
        '分析ダッシュボード（データ可視化・BI）',
      ],
      targetAudience: [
        'アイデアはあるが要件が固まらない',
        '今のアプリが評価が低すぎる',
        '開発コストが高く本当に頼んでいいか不安',
        '完全オーダーメイドのアプリ・Webサービスを作りたい',
        '企画から運用まで一貫してサポートしてほしい',
      ],
      process: [
        {
          step: 1,
          title: 'ヒアリング',
          description: 'ビジネス課題・目標をじっくりお伺いし、最適な解決策を提案します。',
        },
        {
          step: 2,
          title: 'ユーザー調査',
          description: 'ターゲットユーザーのニーズを分析し、ペルソナ・カスタマージャーニーを設計',
        },
        {
          step: 3,
          title: '要件定義・設計',
          description: '機能要件・画面設計を明確化し、技術スタック・アーキテクチャを決定',
        },
        {
          step: 4,
          title: 'UI/UXデザイン',
          description: 'ワイヤーフレーム→デザインモックアップ→プロトタイプで検証',
        },
        {
          step: 5,
          title: '開発・テスト',
          description: 'アジャイル開発で週次デモ。自動テスト・セキュリティ診断を実施',
        },
        {
          step: 6,
          title: 'リリース・運用改善',
          description: 'リリース後もデータ分析し、継続的な改善提案とサポートを実施',
        },
      ],
      pricing: 'プロジェクト規模により異なりますが、一般的なスマホアプリで2〜4ヶ月、Webサービスで1.5〜3ヶ月（AI活用により従来より30〜50%の期間短縮を実現）',
      faq: [
        {
          question: '完全オーダーメイドとは具体的にどういうことですか？',
          answer: 'テンプレートではなく、お客様のビジネス課題に合わせた完全カスタム設計を行います。企画から運用まで一貫してサポートし、成果から逆算した開発を実施します。',
        },
        {
          question: '開発期間はどの程度かかりますか？',
          answer: 'プロジェクト規模により異なりますが、一般的なスマホアプリで2〜4ヶ月、Webサービスで1.5〜3ヶ月です。AI活用により従来より30〜50%の期間短縮を実現しています。',
        },
        {
          question: '既存システムとの連携は可能ですか？',
          answer: 'はい、可能です。既存のSaaSやシステムとのAPI連携も対応しています。',
        },
      ],
    },
    ctaType: 'lp',
    lpHref: '/lp/full-order-app-development',
    priority: 0,
  },
  {
    id: 'business-dx-design',
    category: 'app-dx',
    title: '業務DX設計',
    catch: '業務の「型」を見つけて、システム化の道筋を。',
    tags: ['DX設計', '業務分析', 'システム設計', 'ワークフロー', 'AI', 'API連携', 'クラウド'],
    shortDesc: '現状の業務を分析し、システム化できる部分を特定。AI機能組込み、API連携、クラウド運用設計まで含めた最適なシステム設計を提案します。',
    details: {
      capabilities: [
        '業務フローの分析・可視化',
        'システム化可能な領域の特定',
        '最適なシステム設計の提案',
        'ROI試算・効果測定',
        '段階的な導入計画の策定',
        'AI機能の組込み（文書の要約・分類、画像・動画分析、検索機能強化、チャットボットなど）',
        '既存システムとのAPI連携（Slack、Google Workspace、会計ソフトなど）',
        'ワークフローの自動化',
        'クラウドインフラの設計・構築（AWS/GCP/Azure）',
        'セキュリティ対策・コスト最適化',
        '監視・アラート設定',
      ],
      targetAudience: [
        '業務をシステム化したいが何から始めればいいかわからない',
        '現状の業務フローを整理したい',
        'システム化の効果を試算したい',
        '段階的な導入計画が欲しい',
        'AI機能を業務に組み込みたい',
        '複数のシステム間で二重入力が発生している',
        '既存システムとの連携を実現したい',
        'クラウドへの移行を検討している',
        'セキュリティ対策を強化したい',
        '運用コストを削減したい',
      ],
      process: [
        {
          step: 1,
          title: '現状ヒアリング',
          description: '業務フローを詳しくヒアリングし、課題や改善点を整理します。',
        },
        {
          step: 2,
          title: '設計・提案',
          description: 'システム化の設計を提案し、ROI試算や導入計画を提示します。',
        },
        {
          step: 3,
          title: '実装・運用',
          description: '提案した設計に基づいてシステムを実装し、運用サポートを行います。',
        },
      ],
      pricing: '20万円〜（業務の複雑さ・機能要件により変動。AI機能組込み、API連携、クラウド運用設計を含む場合は追加費用）',
      faq: [
        {
          question: 'どの程度の期間で設計が完了しますか？',
          answer: '業務の規模によりますが、通常は2〜4週間程度で設計・提案まで完了します。',
        },
        {
          question: '設計だけ依頼することもできますか？',
          answer: 'はい、設計のみのご依頼も可能です。後から実装を依頼することもできます。',
        },
      ],
    },
    ctaType: 'lp',
    lpHref: '/lp/business-dx-design',
    priority: 1,
  },
  {
    id: 'ai-coding-education',
    category: 'app-dx',
    title: 'AIコーディング教育',
    catch: '知識0から始める。かんたんすぎる！プログラミング×AI',
    tags: ['AI', 'プログラミング', '教育', 'GAS', 'Python'],
    metric: {
      label: '学習時間',
      value: '大幅',
      suffix: '短縮',
    },
    shortDesc: 'AIとの対話のみで、欲しいツールをサクサク作れる時代へ。プログラミング未経験でも、AIを活用した開発スキルを習得できます。',
    details: {
      capabilities: [
        'AIコーディング基礎（プロンプトエンジニアリング）',
        '実践的AI開発ワークフロー',
        '業務効率化ツールの自作',
        'GAS/Pythonでの実践演習',
        '最新AIツールの活用方法',
      ],
      targetAudience: [
        'プログラミング未経験だが業務効率化したい',
        'AIを活用した開発スキルを身につけたい',
        '繰り返しの無駄な業務に時間を奪われている',
        'もっと仕事を効率化してクリエイティブな業務に時間を使いたい',
      ],
      process: [
        {
          step: 1,
          title: '無料相談・カウンセリング',
          description: 'あなたの学習目標や現在のスキルレベルをヒアリングし、最適な学習プランを提案します。',
        },
        {
          step: 2,
          title: 'カリキュラム開始',
          description: '個別指導と実践演習を通じて、AIコーディングスキルを段階的に習得します。',
        },
        {
          step: 3,
          title: 'プロジェクト実践',
          description: '実際の開発プロジェクトを想定した演習で、実践力を養います。',
        },
      ],
      pricing: '無料講座あり（LINE友だち追加で視聴可能）',
      faq: [
        {
          question: 'プログラミング未経験でも受講できますか？',
          answer: 'はい、可能です。知識0から始められるカリキュラムとなっており、基礎から丁寧に指導しますのでご安心ください。',
        },
        {
          question: 'どのようなAIツールを使用しますか？',
          answer: '主にChatGPTやGitHub Copilotなどの最新AIツールを使用します。AIとの対話のみでツールを作成できる方法を学びます。',
        },
      ],
    },
    ctaType: 'lp',
    lpHref: '/lp/ai-coding-education',
    priority: 1,
  },

  // ========== ホームページ制作 ==========
  {
    id: 'website-basic',
    category: 'website',
    title: 'ベーシック',
    catch: 'WordPress（SWELL等）/ Wix。シンプルに。',
    tags: ['WordPress', 'Wix', 'コーポレートサイト', 'CMS'],
    shortDesc: 'シンプルな企業サイトから、WordPressやWixを使った制作まで対応。コストを抑えつつ、必要な機能を実装します。',
    details: {
      capabilities: [
        'WordPressサイトの制作（SWELL等のテーマ対応）',
        'Wixサイトの制作',
        'レスポンシブデザイン',
        'SEO対策',
        'お問い合わせフォーム',
      ],
      targetAudience: [
        'シンプルな企業サイトが欲しい',
        'コストを抑えたい',
        '自分で更新したい',
        'WordPressやWixで十分',
      ],
      process: [
        {
          step: 1,
          title: '要件定義・デザイン',
          description: 'サイトの要件を整理し、デザインを作成します。',
        },
        {
          step: 2,
          title: '制作・実装',
          description: 'WordPressやWixでサイトを制作し、必要な機能を実装します。',
        },
        {
          step: 3,
          title: '納品・サポート',
          description: 'サイトを納品し、使い方のサポートや更新方法を説明します。',
        },
      ],
      pricing: '15万円〜（ページ数・機能要件により変動）',
      faq: [
        {
          question: 'WordPressとWix、どちらがおすすめですか？',
          answer: '更新頻度や予算、必要な機能により異なります。詳しくは無料相談でご提案させていただきます。',
        },
        {
          question: '自分で更新できますか？',
          answer: 'はい、WordPressやWixは管理画面から簡単に更新できます。使い方のサポートも行います。',
        },
      ],
    },
    ctaType: 'inline',
    priority: 1,
  },
  {
    id: 'website-special',
    category: 'website',
    title: 'スペシャル',
    catch: 'WordPressではできない体験型Web。導線設計・SEO・計測機能も盛り込み。',
    tags: ['3D', 'インタラクティブ', 'アニメーション', '体験型', '導線設計', 'SEO', '計測'],
    metric: {
      label: '印象',
      value: '10倍',
      suffix: '向上',
    },
    shortDesc: '3Dモデル、インタラクティブアニメーション、iPhoneデモなど、WordPressでは実現できない「体験型」のWebサイトを制作。導線設計・SEO対策・計測機能も組み込み、成果につながるサイトに。',
    details: {
      capabilities: [
        '3Dモデルの組み込み・操作',
        'インタラクティブアニメーション',
        'iPhoneデモの組み込み（実際に操作可能）',
        'パララックススクロール',
        'カスタムCMS（更新しやすい設計）',
        '導線設計（ユーザーの行動を最適化）',
        'SEO対策（検索順位向上）',
        '計測機能（Google Analytics、ヒートマップなど）',
        'A/Bテスト',
        'コンバージョン最適化',
      ],
      targetAudience: [
        '他社と差をつけたい',
        '印象に残るサイトが欲しい',
        'WordPressでは物足りない',
        '体験型のサイトを作りたい',
        'サイトからの問い合わせを増やしたい',
        '検索順位を上げたい',
        'ユーザーの行動を分析したい',
        '成果につながるサイトが欲しい',
      ],
      process: [
        {
          step: 1,
          title: 'コンセプト設計・デモ',
          description: 'どのような体験を作るか設計し、デモで完成イメージを共有します。',
        },
        {
          step: 2,
          title: '制作・実装',
          description: '3Dやアニメーションを実装し、体験型のサイトを制作します。',
        },
        {
          step: 3,
          title: '納品・サポート',
          description: 'サイトを納品し、使い方のサポートや機能追加に対応します。',
        },
      ],
      pricing: '50万円〜（機能の複雑さにより変動）',
      faq: [
        {
          question: '3Dモデルは自分で追加できますか？',
          answer: 'CMSから3Dモデルをアップロードできる機能も実装可能です。詳しくは無料相談でご提案させていただきます。',
        },
        {
          question: 'スマホでも快適に動作しますか？',
          answer: 'はい、最新のWeb技術により、スマホでも快適に動作します。ただし、3Dなどの重い機能は軽量化を心がけています。',
        },
        {
          question: 'SEO対策はどの程度効果がありますか？',
          answer: 'キーワードや競合状況により異なりますが、適切な対策により検索順位の向上が期待できます。',
        },
        {
          question: '計測データはどのように見られますか？',
          answer: 'Google Analyticsやヒートマップツールのダッシュボードから、リアルタイムで確認できます。',
        },
      ],
    },
    ctaType: 'lp',
    lpHref: '/lp/interactive-web-3d',
    priority: 3,
    special: true, // 特別枠デザイン
  },
];

// カテゴリごとにサービスを取得
export function getServicesByCategory(category: ServiceCategory): Service[] {
  return servicesData
    .filter(s => s.category === category)
    .sort((a, b) => a.priority - b.priority);
}

// 全カテゴリのサービスを取得
export function getAllServices(): Service[] {
  return servicesData.sort((a, b) => {
    // カテゴリ順：product → app-dx → website
    const categoryOrder: Record<ServiceCategory, number> = {
      product: 1,
      'app-dx': 2,
      website: 3,
    };
    if (categoryOrder[a.category] !== categoryOrder[b.category]) {
      return categoryOrder[a.category] - categoryOrder[b.category];
    }
    return a.priority - b.priority;
  });
}

// IDでサービスを取得
export function getServiceById(id: string): Service | undefined {
  return servicesData.find(s => s.id === id);
}
