const { createClient } = require('@supabase/supabase-js');
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

  console.log('📡 Supabaseに接続中...');
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // マイグレーションファイルを読み込む
  const migrationPath = path.join(__dirname, '../supabase/migrations/001_create_contacts_table.sql');
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

  console.log('📝 マイグレーションSQL:');
  console.log('---');
  console.log(migrationSQL);
  console.log('---');

  try {
    // テーブルが存在するか確認
    const { data: existingTable, error: checkError } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);

    if (existingTable !== null && !checkError) {
      console.log('✅ contactsテーブルは既に存在します。');
      console.log('マイグレーションをスキップします。');
      return;
    }

    // SupabaseのREST APIでは直接SQLを実行できないため、
    // PostgreSQL接続が必要です
    // 環境変数から接続文字列を取得
    const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
    
    if (!dbUrl) {
      console.error('❌ DATABASE_URL または SUPABASE_DB_URL が設定されていません。');
      console.error('');
      console.error('以下のいずれかの方法でマイグレーションを実行してください:');
      console.error('');
      console.error('【方法1】SupabaseダッシュボードのSQL Editorで実行（推奨）');
      console.error('1. Supabaseダッシュボードにアクセス');
      console.error('2. SQL Editor を開く');
      console.error('3. 以下のSQLをコピー＆ペーストして実行:');
      console.error('');
      console.log(migrationSQL);
      console.error('');
      console.error('【方法2】環境変数にDATABASE_URLを設定');
      console.error('1. Supabaseダッシュボード > Settings > Database を開く');
      console.error('2. Connection string > URI をコピー');
      console.error('3. .env.local に以下を追加:');
      console.error('   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres');
      console.error('4. npm run migrate を再実行');
      process.exit(1);
    }

    // PostgreSQL接続を使用してSQLを実行
    const { Client } = require('pg');
    const client = new Client({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false
      }
    });

    await client.connect();
    console.log('✅ PostgreSQLに接続しました');

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
      
      // RLSポリシーも確認
      const policyResult = await client.query(`
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'contacts'
      `);
      
      if (policyResult.rows.length > 0) {
        console.log(`✅ RLSポリシーが ${policyResult.rows.length} 件設定されました`);
      }
    }

    await client.end();
    console.log('📡 データベース接続を閉じました');

  } catch (error) {
    if (error.code === '42P07') {
      console.log('ℹ️  テーブルは既に存在するようです（問題ありません）');
    } else if (error.message.includes('Cannot find module')) {
      console.error('❌ pg モジュールが見つかりません。');
      console.error('npm install pg を実行してください。');
      process.exit(1);
    } else if (error.message.includes('password authentication failed')) {
      console.error('❌ データベース認証に失敗しました。');
      console.error('DATABASE_URL のパスワードが正しいか確認してください。');
      console.error('');
      console.error('SupabaseダッシュボードのSQL Editorで直接実行することをお勧めします:');
      console.error('1. Supabaseダッシュボード > SQL Editor を開く');
      console.error('2. 以下のSQLを実行:');
      console.error('');
      console.log(migrationSQL);
      process.exit(1);
    } else {
      console.error('❌ マイグレーション実行エラー:', error.message);
      console.error('');
      console.error('SupabaseダッシュボードのSQL Editorで直接実行してください:');
      console.error('1. Supabaseダッシュボード > SQL Editor を開く');
      console.error('2. 以下のSQLを実行:');
      console.error('');
      console.log(migrationSQL);
      process.exit(1);
    }
  }
}

runMigration();
