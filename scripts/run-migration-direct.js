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

  console.log('📝 マイグレーションを実行中...');
  console.log('実行するSQL:');
  console.log('---');
  console.log(migrationSQL);
  console.log('---');

  try {
    // SupabaseのREST APIでは直接SQLを実行できないため、
    // RPC関数を使用するか、PostgreSQL接続が必要です
    // ここでは、テーブル作成を段階的に実行します
    
    // 1. テーブルが存在するか確認
    const { data: existingTable, error: checkError } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);

    if (existingTable !== null && !checkError) {
      console.log('⚠️  contactsテーブルは既に存在します。');
      console.log('マイグレーションをスキップします。');
      return;
    }

    // SupabaseのREST APIでは直接SQLを実行できないため、
    // PostgreSQL接続文字列が必要です
    // 環境変数から取得を試みます
    const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
    
    if (!dbUrl) {
      console.error('❌ DATABASE_URL または SUPABASE_DB_URL が設定されていません。');
      console.error('');
      console.error('Supabaseダッシュボードから接続文字列を取得してください:');
      console.error('1. Supabaseダッシュボードにアクセス');
      console.error('2. Settings > Database を開く');
      console.error('3. Connection string > URI をコピー');
      console.error('4. .env.local に以下を追加:');
      console.error('   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres');
      console.error('');
      console.error('または、SupabaseダッシュボードのSQL Editorで直接実行してください:');
      console.error('1. Supabaseダッシュボード > SQL Editor を開く');
      console.error('2. 以下のSQLを実行:');
      console.error('');
      console.log(migrationSQL);
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
    }

    await client.end();

  } catch (error) {
    if (error.code === '42P07') {
      console.log('ℹ️  テーブルは既に存在するようです（問題ありません）');
    } else if (error.message.includes('Cannot find module')) {
      console.error('❌ pg モジュールが見つかりません。');
      console.error('npm install pg を実行してください。');
      process.exit(1);
    } else {
      console.error('❌ マイグレーション実行エラー:', error.message);
      console.error('');
      console.error('代替方法: SupabaseダッシュボードのSQL Editorで直接実行してください');
      process.exit(1);
    }
  }
}

runMigration();
