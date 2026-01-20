// サービスデータ構造（microCMS移行対応）
// 後でmicroCMSに移行する際、同じ構造で移植可能

export interface Service {
  title: string;           // 表示名
  slug: string;            // URL用
  catch: string;           // 1行キャッチ
  summary: string;         // 2〜3行説明
  tags: string[];          // 絞り込み用
  primaryCtaLabel: string; // 例：LPを見る / 詳細を見る
  externalUrl?: string;    // あれば外部へ、なければ内部詳細へ
  order: number;           // 並び順：売りたい順
  icon?: string;           // アイコン（SVG path or emoji）
  // 詳細ページ用（内部詳細の場合）
  detailContent?: {
    heroImage?: string;
    features?: { title: string; description: string; icon?: string }[];
    targetIndustries?: string[];
    screenshots?: { src: string; alt: string }[];
    benefits?: string[];
    pricing?: string;
    faq?: { question: string; answer: string }[];
  };
}

export const services: Service[] = [
  {
    title: "図面コネクト",
    slug: "zumen-connect",
    catch: "図面が『資産』になる。検索できる図面管理。",
    summary: "アップロードした図面をOCRで読み取り、AIで項目整理。図番・会社・材質などで探せる状態にして、現場のムダを削減します。",
    tags: ["図面管理", "OCR", "AI", "製造業", "検索"],
    primaryCtaLabel: "図面コネクトLPを見る",
    externalUrl: "https://zumen-connect.example.com", // 外部LP
    order: 1,
    icon: "document"
  },
  {
    title: "製造業向け 販売管理ソフト",
    slug: "sales-management",
    catch: "見積→受注→手配→納品→請求まで、つながる。",
    summary: "Excel運用を卒業し、進捗・履歴・原価の見える化へ。PC＋スマホ（iPhoneデモ）で『現場が更新できる』運用にします。",
    tags: ["販売管理", "受発注", "在庫", "製造業", "スマホ対応"],
    primaryCtaLabel: "概要を見る",
    order: 2,
    icon: "chart",
    detailContent: {
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
      features: [
        {
          title: "見積から請求まで一気通貫",
          description: "バラバラだった業務フローを一つのシステムで管理。二重入力がなくなり、ミスも削減。",
          icon: "link"
        },
        {
          title: "進捗・履歴・原価の見える化",
          description: "リアルタイムで進捗を把握。過去の履歴も検索可能で、原価計算も自動化。",
          icon: "eye"
        },
        {
          title: "PC＋スマホで現場対応",
          description: "事務所でも現場でも更新可能。iPhoneからサッと確認・入力できます。",
          icon: "mobile"
        }
      ],
      targetIndustries: ["製造業", "機械加工", "板金加工", "部品商社"],
      benefits: [
        "Excel管理からの脱却",
        "二重入力ゼロ",
        "リアルタイム進捗把握",
        "どこからでもアクセス可能",
        "データ資産の蓄積"
      ]
    }
  },
  {
    title: "業務Webアプリ開発",
    slug: "web-app-development",
    catch: "あなたの業務に合わせた『専用アプリ』を作ります。",
    summary: "既存のSaaSでは足りない、御社専用の業務アプリを開発。最初はMVP（最小機能）から始めて、徐々に拡張できる設計で進めます。",
    tags: ["Webアプリ", "業務システム", "MVP", "カスタム開発"],
    primaryCtaLabel: "詳細を見る",
    order: 3,
    icon: "code",
    detailContent: {
      heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80",
      features: [
        {
          title: "業務に100%フィット",
          description: "既存SaaSに合わせる必要なし。御社のフローに完全対応したアプリを開発。",
          icon: "puzzle"
        },
        {
          title: "MVPから始めてスケール",
          description: "最小機能でスタートし、使いながら改善。無駄な開発コストを削減。",
          icon: "rocket"
        },
        {
          title: "データ連携・API対応",
          description: "既存システムやSaaSとの連携もOK。データの二重入力を排除します。",
          icon: "link"
        }
      ],
      targetIndustries: ["全業種"],
      benefits: [
        "業務フローに完全フィット",
        "段階的な拡張が可能",
        "既存システムと連携",
        "セキュリティ重視の設計",
        "運用サポート付き"
      ]
    }
  },
  {
    title: "ホームページ制作",
    slug: "website-development",
    catch: "普通のHPも、尖った表現も。印象に残るサイトを。",
    summary: "シンプルな企業サイトから、3D/アニメーションを使った先進的な表現まで対応。WordPressでは難しい体験を作ります。",
    tags: ["HP制作", "3D", "アニメーション", "CMS", "コーポレート"],
    primaryCtaLabel: "詳細を見る",
    order: 4,
    icon: "globe",
    detailContent: {
      heroImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1920&q=80",
      features: [
        {
          title: "WordPressでは出せない表現",
          description: "3Dモデル、インタラクティブアニメーション、iPhoneデモなど、印象に残る体験を作ります。",
          icon: "sparkles"
        },
        {
          title: "自分で更新できる設計",
          description: "microCMS対応で、ブログや実績はエンジニアなしで更新可能。",
          icon: "edit"
        },
        {
          title: "SEO・表示速度も重視",
          description: "見た目だけでなく、検索順位や読み込み速度も最適化します。",
          icon: "lightning"
        }
      ],
      targetIndustries: ["全業種"],
      benefits: [
        "他社と差がつくデザイン",
        "自分で更新できる",
        "SEO対策済み",
        "高速表示",
        "スマホ完全対応"
      ]
    }
  },
  {
    title: "iPhoneアプリ開発",
    slug: "iphone-app",
    catch: "あなたのアイデアをアプリに。Web連携もまとめて対応。",
    summary: "iPhone/iPadアプリの企画から開発、ストア申請までワンストップ。業務アプリや顧客向けアプリなど、幅広く対応します。",
    tags: ["iOS", "iPhone", "Swift", "アプリ開発", "ストア申請"],
    primaryCtaLabel: "詳細を見る",
    order: 5,
    icon: "mobile",
    detailContent: {
      heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80",
      features: [
        {
          title: "企画から申請までワンストップ",
          description: "アイデア相談から、開発、App Storeへの申請まで一括でお任せいただけます。",
          icon: "check"
        },
        {
          title: "Webシステムと連携",
          description: "業務システムやWebアプリとのデータ連携もスムーズに実装します。",
          icon: "link"
        },
        {
          title: "ネイティブ性能を活かす",
          description: "Swift/SwiftUIでネイティブ開発。カメラ、GPS、通知など端末機能をフル活用。",
          icon: "cpu"
        }
      ],
      targetIndustries: ["全業種"],
      benefits: [
        "ワンストップ対応",
        "Webシステムと連携可能",
        "ネイティブ開発で高性能",
        "ストア申請サポート",
        "保守・アップデート対応"
      ]
    }
  }
];

// タグ一覧を取得（フィルタリング用）
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  services.forEach(service => {
    service.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// サービスをslugで取得
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

// 並び順でソート
export function getSortedServices(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}
