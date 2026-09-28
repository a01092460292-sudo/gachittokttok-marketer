import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '다이나 마케터 | 스레드로 사업을 더 멀리',
  description: '스레드를 통해 사업의 가치를 알리고 잠재 고객과 연결되는 실질적인 성과를 만드는 다이나 마케터',
  openGraph: { title: '다이나 마케터 | 스레드로 사업을 더 멀리', description: '스레드로 당신의 사업이 더 많은 사람에게 닿도록 돕습니다.', images: ['/og.png'], locale: 'ko_KR', type: 'website' },
  twitter: { card: 'summary_large_image', title: '다이나 마케터', description: '스레드로 당신의 사업이 더 많은 사람에게 닿도록 돕습니다.', images: ['/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body>{children}</body></html>; }
