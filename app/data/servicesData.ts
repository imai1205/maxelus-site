// 統合サービスマスタ
// /services 一覧・/services/[slug] 詳細・sitemap はすべてこのファイルから読む。
// 識別子は slug に一本化 (詳細ページの URL と一致させる)。

export type ServiceCategory = "web-creation" | "efficiency" | "products";

export interface ServiceMetric {
  label: string;
  value: string | number;
  suffix?: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

// 一覧の詳細パネル用 (固定ラベル: できること / こんな人におすすめ / 進め方 / 料金目安)
export interface ServiceDetail {
  capabilities: string[];
  targetAudience: string[];
  process: ServiceProcessStep[];
  pricing: string;
}

// 詳細ページ (/services/[slug]) 用
export interface ServicePageContent {
  lead: string;
  features?: Array<{ title: string; description: string }>;
  // 業務 DX 設計: 「ズレ」訴求 (旧トップ Challenge セクションから移設)
  beforeAfter?: Array<{ before: string; after: string }>;
  // 完全オーダーメイド: 詳細プロセス 6 ステップ (旧トップから移設した営業資産)
  detailedProcess?: ServiceProcessStep[];
  screens?: Array<{ src: string; alt: string }>;
  benefits?: string[];
  targetIndustries?: string[];
  pricing?: string;
  // casesData.ts の事例 id (関連事例として詳細ページに表示)
  relatedCaseIds?: string[];
}

export interface Service {
  slug: string;
  category: ServiceCategory;
  title: string;
  catch: string;
  tags: string[];
  metric?: ServiceMetric;
  shortDesc: string;
  details: ServiceDetail;
  page: ServicePageContent;
  lpHref?: string;
  priority: number; // カテゴリ内での表示順
}

// 3 本柱カテゴリ (表示順: web-creation → efficiency → products)
export const categoryNames: Record<ServiceCategory, string> = {
  "web-creation": "Web制作・LP制作 / Webアプリ開発",
  efficiency: "業務効率化支援",
  products: "自社プロダクト",
};

export const categoryOrder: ServiceCategory[] = [
  "web-creation",
  "efficiency",
  "products",
];

export const servicesData: Service[] = [
  // ========== Web制作・LP制作 / Webアプリ開発 ==========
  {
    slug: "full-order-app-development",
    category: "web-creation",
    title: "完全オーダーメイドアプリ開発",
    catch: "完全オーダーメイドで課題を解決するWEB・アプリ制作",
    tags: ["完全オーダー", "アプリ開発", "Web開発", "iPhoneアプリ", "伴走型"],
    metric: {
      label: "開発期間",
      value: "30〜50%",
      suffix: "短縮",
    },
    shortDesc:
      "既存のSaaSでは足りない、御社専用のWebアプリ・iPhoneアプリを企画から運用まで伴走して開発。MVP（最小機能）から始めて、徐々に拡張できる設計で進めます。",
    details: {
      capabilities: [
        "完全オーダーメイドのアプリ・Web開発",
        "業務Webアプリ開発（MVPから段階的に拡張）",
        "iPhone/iPadアプリ開発（Swift/SwiftUI、ストア申請まで対応）",
        "UXリサーチに基づく設計",
        "AI活用による開発スピード向上",
        "既存システム・SaaSとのAPI連携",
        "セキュリティ・パフォーマンス最適化",
        "運用・改善まで見据えた設計",
      ],
      targetAudience: [
        "アイデアはあるが要件が固まらない",
        "既存のSaaSが業務に合わず我慢して使っている",
        "完全オーダーメイドのアプリ・Webサービスを作りたい",
        "iPhoneアプリを企画から申請まで任せたい",
        "企画から運用まで一貫してサポートしてほしい",
      ],
      process: [
        {
          step: 1,
          title: "ヒアリング・デモ提示",
          description:
            "ビジネス課題・目標をお伺いし、打ち合わせ後すぐに触れるデモで完成イメージを共有します。",
        },
        {
          step: 2,
          title: "設計・開発",
          description:
            "要件・画面設計を確定し、アジャイル開発で週次デモを見ながら進めます。",
        },
        {
          step: 3,
          title: "リリース・運用改善",
          description:
            "リリース後もデータを分析し、継続的な改善提案とサポートを実施します。",
        },
      ],
      pricing:
        "プロジェクト規模により異なります。一般的なスマホアプリで2〜4ヶ月、Webサービスで1.5〜3ヶ月（AI活用により従来より30〜50%の期間短縮を実現）",
    },
    page: {
      lead: "受託開発は「相談して、一緒に作っていくもの」。既存のSaaSでは足りない御社専用の仕組みを、企画から運用まで伴走して開発します。業務Webアプリ、Webサービス、iPhoneアプリまで、MVP（最小機能）から始めて事業に合わせて拡張できる設計で進めます。",
      features: [
        {
          title: "業務に100%フィット",
          description:
            "既存SaaSに合わせる必要なし。御社のフローに完全対応したアプリを開発します。",
        },
        {
          title: "MVPから始めてスケール",
          description:
            "最小機能でスタートし、使いながら改善。無駄な開発コストを削減します。",
        },
        {
          title: "打ち合わせ後すぐにデモが出る",
          description:
            "AI活用の開発スタイルにより、初回打ち合わせ後すぐに触れるデモを提示。認識のズレを早期になくします。",
        },
        {
          title: "iPhoneアプリも企画から申請まで",
          description:
            "Swift/SwiftUIでのネイティブ開発に対応。カメラ・GPS・通知など端末機能を活かし、App Storeへの申請まで一括で対応します。",
        },
        {
          title: "データ連携・API対応",
          description:
            "既存システムやSaaSとの連携もOK。データの二重入力を排除します。",
        },
      ],
      detailedProcess: [
        {
          step: 1,
          title: "ヒアリング",
          description:
            "ビジネス課題・目標をじっくりお伺いし、最適な解決策を提案します。",
        },
        {
          step: 2,
          title: "ユーザー調査",
          description:
            "ターゲットユーザーのニーズを分析し、ペルソナ・カスタマージャーニーを設計します。",
        },
        {
          step: 3,
          title: "要件定義・設計",
          description:
            "機能要件・画面設計を明確化し、技術スタック・アーキテクチャを決定します。",
        },
        {
          step: 4,
          title: "UI/UXデザイン",
          description:
            "ワイヤーフレーム→デザインモックアップ→プロトタイプで検証します。",
        },
        {
          step: 5,
          title: "開発・テスト",
          description:
            "アジャイル開発で週次デモ。自動テスト・セキュリティ診断を実施します。",
        },
        {
          step: 6,
          title: "リリース・運用改善",
          description:
            "リリース後もデータ分析し、継続的な改善提案とサポートを実施します。",
        },
      ],
      benefits: [
        "業務フローに完全フィット",
        "段階的な拡張が可能",
        "既存システムと連携",
        "セキュリティ重視の設計",
        "運用サポート付き",
      ],
      targetIndustries: ["全業種"],
      relatedCaseIds: ["case-saas-1", "case-retail-1", "case-medical-1"],
    },
    lpHref: "/lp/full-order-app-development",
    priority: 0,
  },
  {
    slug: "website",
    category: "web-creation",
    title: "ホームページ制作",
    catch: "事業が伝わり、成果につながるサイトを。",
    tags: ["HP制作", "コーポレートサイト", "LP制作", "CMS", "SEO"],
    shortDesc:
      "シンプルな企業サイトからオリジナルデザインのサイト・LPまで、目的と予算に合わせて制作。導線設計・SEO・計測まで含めて、公開後に成果につながるサイトに仕上げます。",
    details: {
      capabilities: [
        "コーポレートサイト・LPの制作",
        "WordPress（SWELL等）/ Wixでの制作",
        "オリジナルデザインのサイト制作",
        "レスポンシブデザイン",
        "導線設計・SEO対策・アクセス計測",
        "お問い合わせフォーム",
        "自分で更新できるCMS設計（microCMS対応）",
      ],
      targetAudience: [
        "会社の顔となるサイトを整えたい",
        "コストを抑えてまず公開したい",
        "自分で更新できるサイトにしたい",
        "サイトからの問い合わせを増やしたい",
      ],
      process: [
        {
          step: 1,
          title: "要件定義・デザイン",
          description: "サイトの目的と要件を整理し、構成とデザインを作成します。",
        },
        {
          step: 2,
          title: "制作・実装",
          description:
            "目的・予算に合った手段（WordPress/Wix/オリジナル実装）でサイトを制作します。",
        },
        {
          step: 3,
          title: "納品・サポート",
          description:
            "サイトを納品し、更新方法の説明や公開後の改善サポートを行います。",
        },
      ],
      pricing: "15万円〜（構成・デザイン・機能要件により変動）",
    },
    page: {
      lead: "ホームページは作って終わりではなく、事業を伝えて成果につなげる仕組みです。シンプルな企業サイトからオリジナルデザインのサイト・LPまで、目的と予算に合わせた最適な作り方を提案し、導線設計・SEO・計測まで含めて仕上げます。",
      features: [
        {
          title: "目的から逆算した構成設計",
          description:
            "「誰に何を伝えて、どう行動してほしいか」から構成と導線を設計します。",
        },
        {
          title: "自分で更新できる設計",
          description:
            "WordPressやmicroCMS対応で、お知らせや実績はエンジニアなしで更新可能にします。",
        },
        {
          title: "SEO・表示速度も重視",
          description:
            "見た目だけでなく、検索順位や読み込み速度も最適化します。",
        },
      ],
      benefits: [
        "事業が正しく伝わるデザイン",
        "自分で更新できる",
        "SEO対策済み",
        "高速表示",
        "スマホ完全対応",
      ],
      targetIndustries: ["全業種"],
      relatedCaseIds: ["case-beauty-1", "case-content-1"],
    },
    priority: 1,
  },

  // ========== 業務効率化支援 ==========
  {
    slug: "business-dx-design",
    category: "efficiency",
    title: "業務DX設計",
    catch: "業務の「型」を見つけて、システム化の道筋を。",
    tags: [
      "DX設計",
      "業務分析",
      "システム設計",
      "ワークフロー",
      "AI",
      "API連携",
      "クラウド",
    ],
    shortDesc:
      "現状の業務を分析し、システム化できる部分を特定。AI機能組込み、API連携、クラウド運用設計まで含めた最適なシステム設計を提案します。",
    details: {
      capabilities: [
        "業務フローの分析・可視化",
        "システム化可能な領域の特定",
        "最適なシステム設計の提案",
        "ROI試算・効果測定",
        "段階的な導入計画の策定",
        "AI機能の組込み（文書の要約・分類、画像・動画分析、検索機能強化、チャットボットなど）",
        "既存システムとのAPI連携（Slack、Google Workspace、会計ソフトなど）",
        "ワークフローの自動化",
        "クラウドインフラの設計・構築（AWS/GCP/Azure）",
        "セキュリティ対策・コスト最適化",
      ],
      targetAudience: [
        "業務をシステム化したいが何から始めればいいかわからない",
        "現状の業務フローを整理したい",
        "AI機能を業務に組み込みたい",
        "複数のシステム間で二重入力が発生している",
        "既存システムとの連携を実現したい",
        "運用コストを削減したい",
      ],
      process: [
        {
          step: 1,
          title: "現状ヒアリング",
          description:
            "業務フローを詳しくヒアリングし、課題や改善点を整理します。",
        },
        {
          step: 2,
          title: "設計・提案",
          description:
            "システム化の設計を提案し、ROI試算や導入計画を提示します。",
        },
        {
          step: 3,
          title: "実装・運用",
          description:
            "提案した設計に基づいてシステムを実装し、運用サポートを行います。",
        },
      ],
      pricing:
        "20万円〜（業務の複雑さ・機能要件により変動。AI機能組込み、API連携、クラウド運用設計を含む場合は追加費用）",
    },
    page: {
      lead: "課題の多くは、ツールが足りないことではなく、ツールと業務の「ズレ」から起きます。現状の業務フローを分析してズレの正体を特定し、システム化の道筋を設計。AI組込みやAPI連携、クラウド運用まで含めて、現場で使われ続ける仕組みに落とし込みます。",
      beforeAfter: [
        { before: "仕様が固まらない", after: "触れるデモで合意" },
        { before: "途中で手戻りが出る", after: "設計確定→開発" },
        { before: "追加費用が怖い", after: "予算と範囲が明確" },
      ],
      features: [
        {
          title: "業務フローの可視化から始める",
          description:
            "いきなり開発せず、現状の業務を分析してシステム化すべき領域を特定します。",
        },
        {
          title: "AI・API連携で手作業を減らす",
          description:
            "文書処理や検索のAI化、既存システム間のAPI連携で、二重入力と属人化を解消します。",
        },
        {
          title: "段階導入でリスクを抑える",
          description:
            "ROI試算と導入計画をセットで提示。小さく始めて効果を確認しながら広げます。",
        },
      ],
      benefits: [
        "手作業・二重入力の削減",
        "属人化の解消",
        "業務フローの見える化",
        "段階的に導入できる",
        "運用コストの最適化",
      ],
      targetIndustries: ["全業種"],
      relatedCaseIds: ["case-saas-3", "case-retail-3"],
    },
    lpHref: "/lp/business-dx-design",
    priority: 0,
  },

  // ========== 自社プロダクト ==========
  {
    slug: "zumen-connect",
    category: "products",
    title: "図面コネクト",
    catch: "図面が「資産」になる。検索できる図面管理。",
    tags: ["図面管理", "OCR", "AI", "製造業", "検索"],
    metric: {
      label: "検索時間",
      value: "90%",
      suffix: "削減",
    },
    shortDesc:
      "アップロードした図面をOCRで読み取り、AIで項目整理。図番・会社・材質などで探せる状態にして、現場のムダを削減します。",
    details: {
      capabilities: [
        "図面のOCR読み取り（PDF/画像対応）",
        "AIによる項目自動抽出（図番・会社名・材質・寸法など）",
        "類似図面検索（過去の図面から類似を発見）",
        "案件管理との連携（図面と案件を紐付け）",
        "モバイル対応（現場でスマホから検索可能）",
      ],
      targetAudience: [
        "図面管理がバラバラで探すのに時間がかかる",
        "過去の図面を活用したいが検索ができない",
        "Excelやフォルダ管理から脱却したい",
        "図面と案件を一元管理したい",
      ],
      process: [
        {
          step: 1,
          title: "無料相談・デモ提示",
          description:
            "現状の課題をヒアリングし、触れるデモで完成イメージを共有します。",
        },
        {
          step: 2,
          title: "設計・導入",
          description:
            "既存図面の取り込み方法を設計し、検索できる状態にして導入します。",
        },
        {
          step: 3,
          title: "運用開始・サポート",
          description: "導入後も使い方のサポートや機能追加に対応します。",
        },
      ],
      pricing: "30万円〜（図面数・機能要件により変動）",
    },
    page: {
      lead: "図面・関連資料・見積を、探す時間ゼロへ。アップロードした図面をOCRで読み取り、AIが図番・会社名・材質などの項目を自動抽出。フォルダを掘らなくても、欲しい図面に一瞬でたどり着ける製造業向けの図面管理プロダクトです。",
      features: [
        {
          title: "OCR読み取りで図面をデータ化",
          description:
            "PDF・画像形式の図面を一括アップロード。OCRで自動的にテキスト化し、検索可能な状態にします。",
        },
        {
          title: "AIによる項目自動抽出",
          description:
            "図番・会社名・材質・寸法などの項目をAIが自動で抽出。手入力の手間なく整理されます。",
        },
        {
          title: "類似図面検索",
          description:
            "図面の形状や構造から類似度を判定し、過去の似た図面を発見。見積・設計の再利用が進みます。",
        },
        {
          title: "案件・見積との紐付け",
          description:
            "図面と案件・見積を一元管理。「あの案件の図面どれだっけ」をなくします。",
        },
      ],
      screens: [
        { src: "/cases/zumen-connect-home.png", alt: "図面コネクト ホーム画面" },
        { src: "/cases/zumen-connect-search.png", alt: "図面コネクト 検索画面" },
        { src: "/cases/zumen-connect-detail.png", alt: "図面コネクト 図面詳細画面" },
      ],
      benefits: [
        "図面を探す時間を90%削減",
        "過去図面の再利用で見積スピード向上",
        "Excel・フォルダ管理からの脱却",
        "現場からスマホで検索可能",
      ],
      targetIndustries: ["製造業", "機械加工", "板金加工", "部品商社"],
      pricing: "30万円〜（図面数・機能要件により変動）",
      relatedCaseIds: ["case-manufacturing-1"],
    },
    lpHref: "/lp/zumen-connect",
    priority: 0,
  },
  {
    slug: "sales-management",
    category: "products",
    title: "販売管理",
    catch: "見積→受注→工程→納品→請求まで、つながる。",
    tags: ["販売管理", "受発注", "在庫", "製造業", "スマホ対応"],
    metric: {
      label: "二重入力",
      value: "0",
      suffix: "回",
    },
    shortDesc:
      "Excel運用を卒業し、進捗・履歴・原価の見える化へ。PC＋スマホで「現場が更新できる」運用にします。",
    details: {
      capabilities: [
        "見積書・受注書の作成・管理",
        "工程管理（手配→加工→納品の進捗追跡）",
        "在庫管理・原価計算",
        "請求書の自動生成",
        "モバイル対応（現場から更新可能）",
      ],
      targetAudience: [
        "Excelで見積・受注を管理している",
        "進捗状況が把握しづらい",
        "二重入力が発生している",
        "原価計算が手作業で時間がかかる",
      ],
      process: [
        {
          step: 1,
          title: "業務フロー整理",
          description:
            "現状の業務フローをヒアリングし、最適なシステム設計を提案します。",
        },
        {
          step: 2,
          title: "開発・導入",
          description:
            "御社の業務に合わせたシステムを開発し、段階的に導入します。",
        },
        {
          step: 3,
          title: "運用サポート",
          description:
            "使い方のサポートや機能追加に対応し、継続的に改善します。",
        },
      ],
      pricing: "50万円〜（機能要件・ユーザー数により変動）",
    },
    page: {
      lead: "見積・受注・工程・納品・請求がバラバラのExcelで管理されていると、二重入力とミスが生まれます。販売管理は、製造業の業務フローを一気通貫でつなぎ、進捗・履歴・原価を見える化する自社プロダクトです。",
      features: [
        {
          title: "見積から請求まで一気通貫",
          description:
            "バラバラだった業務フローを一つのシステムで管理。二重入力がなくなり、ミスも削減します。",
        },
        {
          title: "進捗・履歴・原価の見える化",
          description:
            "リアルタイムで進捗を把握。過去の履歴も検索可能で、原価計算も自動化します。",
        },
        {
          title: "PC＋スマホで現場対応",
          description:
            "事務所でも現場でも更新可能。スマホからサッと確認・入力できます。",
        },
      ],
      benefits: [
        "Excel管理からの脱却",
        "二重入力ゼロ",
        "リアルタイム進捗把握",
        "どこからでもアクセス可能",
        "データ資産の蓄積",
      ],
      targetIndustries: ["製造業", "機械加工", "板金加工", "部品商社"],
      pricing: "50万円〜（機能要件・ユーザー数により変動）",
      relatedCaseIds: ["case-manufacturing-2"],
    },
    priority: 1,
  },
  {
    slug: "simulation-3d",
    category: "products",
    title: "シミュレーション",
    catch: "3D可視化で、設計から製造まで見える化。",
    tags: ["3D", "可視化", "シミュレーション", "製造業"],
    metric: {
      label: "設計ミス",
      value: "70%",
      suffix: "削減",
    },
    shortDesc:
      "3Dモデルを使った可視化・シミュレーションで、設計段階での問題を早期発見。製造工程の最適化を支援します。",
    details: {
      capabilities: [
        "3Dモデルの作成・編集",
        "可視化・シミュレーション",
        "設計検証（干渉チェックなど）",
        "製造工程の可視化",
        "Webブラウザで閲覧可能",
      ],
      targetAudience: [
        "設計段階での問題を早期発見したい",
        "3Dモデルを活用したいがツールが複雑",
        "製造工程を可視化したい",
        "顧客への説明資料として使いたい",
      ],
      process: [
        {
          step: 1,
          title: "要件定義・デモ提示",
          description:
            "どのような可視化が必要かヒアリングし、デモで完成イメージを共有します。",
        },
        {
          step: 2,
          title: "3Dモデル作成・実装",
          description:
            "既存の図面やデータから3Dモデルを作成し、可視化機能を実装します。",
        },
        {
          step: 3,
          title: "納品・サポート",
          description:
            "システムを納品し、使い方のサポートや機能追加に対応します。",
        },
      ],
      pricing: "40万円〜（3Dモデルの複雑さ・機能要件により変動）",
    },
    page: {
      lead: "設計の問題は、製造が始まってから見つかるほど高くつきます。シミュレーションは、3Dモデルによる可視化・検証で設計段階の問題を早期発見し、製造工程の最適化まで支援するプロダクトです。Webブラウザだけで閲覧でき、専用ソフトは不要です。",
      features: [
        {
          title: "既存CADデータをそのまま活用",
          description:
            "主要なCAD形式（STEP、IGES、STLなど）に対応。既存データから3Dモデルを作成します。",
        },
        {
          title: "設計検証で問題を早期発見",
          description:
            "干渉チェックなどの設計検証で、製造前に問題を発見。手戻りコストを削減します。",
        },
        {
          title: "Webブラウザで誰でも閲覧",
          description:
            "専用ソフト不要で、スマホからも快適に閲覧可能。顧客への説明資料としても使えます。",
        },
      ],
      benefits: [
        "設計ミスを70%削減",
        "製造前に問題を発見できる",
        "顧客説明がスムーズに",
        "専用ソフト不要で共有が簡単",
      ],
      targetIndustries: ["製造業", "機械設計", "建築"],
      pricing: "40万円〜（3Dモデルの複雑さ・機能要件により変動）",
      relatedCaseIds: ["case-manufacturing-3"],
    },
    priority: 2,
  },
];

// カテゴリごとにサービスを取得 (priority 昇順)
export function getServicesByCategory(category: ServiceCategory): Service[] {
  return servicesData
    .filter((s) => s.category === category)
    .sort((a, b) => a.priority - b.priority);
}

// slug でサービスを取得
export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((s) => s.slug === slug);
}

// 全サービスをカテゴリ順 → priority 順で取得
export function getSortedServices(): Service[] {
  return [...servicesData].sort((a, b) => {
    if (a.category !== b.category) {
      return (
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      );
    }
    return a.priority - b.priority;
  });
}
