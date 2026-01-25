import { NextResponse } from 'next/server';

export async function GET() {
  // セキュリティのため、開発環境のみ
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const envVars = {
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
    resendKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) || 'none',
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    allResendKeys: Object.keys(process.env).filter(k => k.includes('RESEND') || k.includes('resend')),
  };

  return NextResponse.json(envVars, { status: 200 });
}
