const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ 環境変数が設定されていません。');
    console.error('NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を .env.local に設定してください。');
    process.exit(1);
  }

  // Supabase URLから接続情報を抽出
  // Supabase URL: https://xxxxx.supabase.co
  // PostgreSQL接続文字列: postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
  // パスワードはSupabaseダッシュボードのSettings > Database > Connection stringから取得する必要があります
  
  // 環境変数から直接PostgreSQL接続文字列を取得
  const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  
  if (!dbUrl) {
    console.error('❌ DATABASE_URL または SUPABASE_DB_URL が設定されていません。');
    console.error('Supabaseダッシュボードの Settings > Database > Connection string から取得してください。');
    console.error('形式: postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres');
    process.exit(1);
  }

  console.log('📡 Supabase PostgreSQLに接続中...');
  
  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ データベースに接続しました');

    // マイグレーションファイルを読み込む
    const migrationPath = path.join(__dirname, '../supabase/migrations/001_create_contacts_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('📝 マイグレーションを実行中...');
    console.log('実行するSQL:');
    console.log('---');
    console.log(migrationSQL);
    console.log('---');

    // SQLを実行
    await client.query(migrationSQL);
    
    console.log('✅ マイグレーションが正常に完了しました！');
    
    // テーブルが作成されたか確認
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'contacts'
    `);
    
    if (result.rows.length > 0) {
      console.log('✅ contactsテーブルが正常に作成されました');
    } else {
      console.log('⚠️  contactsテーブルの作成を確認できませんでした');
    }

  } catch (error) {
    console.error('❌ マイグレーション実行エラー:', error.message);
    if (error.code === '42P07') {
      console.log('ℹ️  テーブルは既に存在するようです（問題ありません）');
    } else {
      process.exit(1);
    }
  } finally {
    await client.end();
    console.log('📡 データベース接続を閉じました');
  }
}

runMigration();
