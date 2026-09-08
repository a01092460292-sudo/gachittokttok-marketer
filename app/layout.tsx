import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '가치똑똑 | 선택받는 브랜드를 만드는 마케터',
  description: '약 12년의 홈쇼핑 경험을 스레드 콘텐츠와 온라인 판매로 연결하는 실행형 마케터, 가치똑똑',
  openGraph: { title: '가치똑똑 | 선택받는 브랜드를 만드는 마케터', description: '좋은 가치를 발견해 고객이 반응하는 콘텐츠와 실제 선택으로 연결합니다.', images: ['/og.png'], locale: 'ko_KR', type: 'website' },
  twitter: { card: 'summary_large_image', title: '가치똑똑', description: '홈쇼핑에서 배운 선택받는 법을 스레드 콘텐츠와 온라인 판매에 연결합니다.', images: ['/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body>{children}</body></html>; }
