import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '가치똑똑 | 좋은 가치를 똑똑하게',
  description: '콘텐츠와 상품의 숨은 매력을 사람들에게 닿는 이야기로 만드는 가치똑똑 마케터',
  openGraph: { title: '가치똑똑 | 좋은 가치를 똑똑하게', description: '좋은 가치가 더 멀리 닿도록, 가치똑똑 마케터', images: ['/og.png'], locale: 'ko_KR', type: 'website' },
  twitter: { card: 'summary_large_image', title: '가치똑똑', description: '좋은 가치를 똑똑하게 전해요.', images: ['/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body>{children}</body></html>; }
