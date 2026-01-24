import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, inquiryType, budget, timeline, message } = body;

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
        <div class="label">電話番号</div>
        <div class="value">${phone || '未入力'}</div>
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

【電話番号】
${phone || '未入力'}

【ご相談内容】
${inquiryType || '未選択'}

【ご予算】
${budget || '未選択'}

【希望納期】
${timeline || '未選択'}

【ご相談内容の詳細】
${message}
    `.trim();

    // メール送信処理
    // Resendを使用する場合（環境変数 RESEND_API_KEY が必要）
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'MAXELUS <noreply@maxelustech.com>',
            to: ['info@maxelustech.com'],
            reply_to: email,
            subject: `お問い合わせ: ${name}様より`,
            html: emailBody,
            text: textBody,
          }),
        });

        if (!resendResponse.ok) {
          const errorData = await resendResponse.json();
          console.error('Resend API error:', errorData);
          throw new Error('メール送信に失敗しました');
        }

        const result = await resendResponse.json();
        console.log('Email sent successfully:', result);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // メール送信に失敗しても、フォーム送信は成功として扱う（ログに記録）
      }
    } else {
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
