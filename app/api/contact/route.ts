import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, inquiryType, budget, timeline, message } = body;

    // メール本文を作成（HTML形式）
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #fff100; padding: 20px; text-align: center; }
    .content { background: #f9fafb; padding: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1a1a1a; }
    .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #fff100; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>お問い合わせがありました</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">お名前</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">会社名</div>
        <div class="value">${company || '未入力'}</div>
      </div>
      <div class="field">
        <div class="label">メールアドレス</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">ご相談内容</div>
        <div class="value">${inquiryType || '未選択'}</div>
      </div>
      <div class="field">
        <div class="label">ご予算</div>
        <div class="value">${budget || '未選択'}</div>
      </div>
      <div class="field">
        <div class="label">希望納期</div>
        <div class="value">${timeline || '未選択'}</div>
      </div>
      <div class="field">
        <div class="label">ご相談内容の詳細</div>
        <div class="value" style="white-space: pre-wrap;">${message}</div>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    // プレーンテキスト版
    const textBody = `
お問い合わせがありました。

【お名前】
${name}

【会社名】
${company || '未入力'}

【メールアドレス】
${email}

【ご相談内容】
${inquiryType || '未選択'}

【ご予算】
${budget || '未選択'}

【希望納期】
${timeline || '未選択'}

【ご相談内容の詳細】
${message}
    `.trim();

    // Supabaseに問い合わせを保存
    try {
      const supabase = createSupabaseAdminClient();
      const { error: dbError } = await supabase
        .from('contacts')
        .insert({
          name,
          company: company || null,
          email,
          inquiry_type: inquiryType || null,
          budget: budget || null,
          timeline: timeline || null,
          message,
        });

      if (dbError) {
        console.error('Supabase insert error:', dbError);
        // データベース保存に失敗しても、メール送信は続行
      } else {
        console.log('Contact saved to Supabase successfully');
      }
    } catch (dbError) {
      console.error('Error saving to Supabase:', dbError);
      // データベース保存に失敗しても、メール送信は続行
    }

    // メール送信処理
    // Resend SDKを使用
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    // #region agent log
    const envKeys = Object.keys(process.env);
    const resendKeys = envKeys.filter(k => k.includes('RESEND') || k.includes('resend'));
    const sampleEnvKeys = envKeys.slice(0, 20).join(',');
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:120',message:'RESEND_API_KEY check with env details',data:{hasKey:!!RESEND_API_KEY,keyLength:RESEND_API_KEY?.length||0,keyPrefix:RESEND_API_KEY?.substring(0,10)||'none',resendKeys:resendKeys.join(','),sampleEnvKeys,nodeEnv:process.env.NODE_ENV,hasSupabaseUrl:!!process.env.NEXT_PUBLIC_SUPABASE_URL},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    if (RESEND_API_KEY) {
      try {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:127',message:'Initializing Resend SDK',data:{keyLength:RESEND_API_KEY.length,keyPrefix:RESEND_API_KEY.substring(0,10)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        const resend = new Resend(RESEND_API_KEY);
        
        const emailPayload = {
          from: 'MAXELUS <noreply@maxelustech.com>',
          to: ['info@maxelustech.com'],
          reply_to: email,
          subject: `お問い合わせ: ${name}様より`,
          html: emailBody,
          text: textBody,
        };
        
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:137',message:'Before Resend SDK send',data:{to:emailPayload.to,from:emailPayload.from,subject:emailPayload.subject,hasHtml:!!emailPayload.html,hasText:!!emailPayload.text,htmlLength:emailPayload.html.length,textLength:emailPayload.text.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        const result = await resend.emails.send(emailPayload);
        
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:147',message:'Resend SDK response received',data:{hasData:!!result?.data,hasError:!!result?.error,emailId:result?.data?.id,errorType:result?.error?.name,errorMessage:result?.error?.message,fullResult:JSON.stringify(result).substring(0,500)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        
        if (result.error) {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:152',message:'Resend SDK error in response',data:{error:result.error,errorName:result.error.name,errorMessage:result.error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          
          console.error('Resend API error:', result.error);
          throw new Error('メール送信に失敗しました');
        }
        
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:160',message:'Email sent successfully',data:{emailId:result.data?.id,to:emailPayload.to},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        
        console.log('Email sent successfully:', result.data);
      } catch (emailError) {
        // #region agent log
        const error = emailError as Error;
        fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:165',message:'Email sending catch block',data:{errorMessage:error?.message,errorName:error?.name,errorStack:error?.stack?.substring(0,300),errorString:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        
        console.error('Email sending error:', emailError);
        // メール送信に失敗しても、フォーム送信は成功として扱う（ログに記録）
      }
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/contact/route.ts:173',message:'RESEND_API_KEY not set - using console fallback',data:{to:'info@maxelustech.com',subject:`お問い合わせ: ${name}様より`,envKeys:Object.keys(process.env).filter(k=>k.includes('RESEND')||k.includes('resend')).join(',')},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      // APIキーが設定されていない場合、コンソールに出力（開発環境用）
      console.log('=== Contact Form Submission ===');
      console.log('To: info@maxelustech.com');
      console.log('Subject: お問い合わせ: ' + name + '様より');
      console.log('Body:', textBody);
      console.log('==============================');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: '送信に失敗しました' },
      { status: 500 }
    );
  }
}
