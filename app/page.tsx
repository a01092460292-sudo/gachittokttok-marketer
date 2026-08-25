'use client';
import { FormEvent, MouseEvent, useEffect, useState } from 'react';
type Product = { id: string; name: string; note: string; imageUrl: string; productUrl: string; tag: string };
const starterProducts: Product[] = [
  { id:'1', name:'하루를 가볍게 여는 생활템', note:'매일 손이 가는 실용적인 아이템', imageUrl:'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80', productUrl:'#', tag:'오늘의 추천' },
  { id:'2', name:'집중력을 채워주는 데스크템', note:'일하는 시간을 산뜻하게 바꿔요', imageUrl:'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80', productUrl:'#', tag:'가치픽' },
];
const profileLinks = [
  { icon:'📗', label:'스레드 무료 전자책', note:'바로 받아보기', cls:'mint' },
  { icon:'✍️', label:'스레드 운영 대행', note:'상담 신청하기', cls:'lemon' },
  { icon:'💬', label:'카카오톡 오픈채팅', note:'함께 이야기해요', cls:'peach' },
];
export default function Home() {
  const [products,setProducts]=useState<Product[]>(starterProducts); const [editing,setEditing]=useState(false); const [saved,setSaved]=useState(false);
  const [form,setForm]=useState({name:'',note:'',imageUrl:'',productUrl:'',tag:'가치픽'}); const [cursor,setCursor]=useState({x:-50,y:-50}); const [particles,setParticles]=useState<{id:number;x:number;y:number}[]>([]);
  useEffect(()=>{ const stored=localStorage.getItem('value-smart-products'); if(stored){try{setProducts(JSON.parse(stored))}catch{}} const move=(e:globalThis.MouseEvent)=>setCursor({x:e.clientX,y:e.clientY}); window.addEventListener('mousemove',move); return()=>window.removeEventListener('mousemove',move)},[]);
  const burst=(e:MouseEvent<HTMLElement>)=>{const next=Array.from({length:7},(_,i)=>({id:Date.now()+i,x:e.clientX,y:e.clientY}));setParticles(v=>[...v,...next]);setTimeout(()=>setParticles(v=>v.filter(p=>!next.some(n=>n.id===p.id))),700)};
  const addProduct=(e:FormEvent)=>{e.preventDefault();const next=[{...form,id:crypto.randomUUID()},...products];setProducts(next);localStorage.setItem('value-smart-products',JSON.stringify(next));setForm({name:'',note:'',imageUrl:'',productUrl:'',tag:'가치픽'});setSaved(true);setTimeout(()=>setSaved(false),1800)};
  const removeProduct=(id:string)=>{const next=products.filter(p=>p.id!==id);setProducts(next);localStorage.setItem('value-smart-products',JSON.stringify(next))};
  return <main onClick={burst}>
    <div className="custom-cursor" style={{transform:`translate(${cursor.x}px, ${cursor.y}px)`}}><span>똑</span></div>{particles.map((p,i)=><i key={p.id} className="particle" style={{left:p.x,top:p.y,'--angle':`${i*51}deg`} as React.CSSProperties}/>)}
    <div className="sun sun-one"/><div className="sun sun-two"/><div className="doodle one">✦</div><div className="doodle two">⌁</div><button className="edit-toggle" onClick={()=>setEditing(!editing)}>{editing?'닫기 ×':'상품 관리 +'}</button>
    <section className="profile-card"><div className="profile-mark">가치<br/>똑똑<span>!</span></div><p className="eyebrow">SMART VALUE MARKETER</p><h1>좋은 가치를<br/><em>똑똑하게</em> 전해요.</h1><p className="intro">콘텐츠와 상품의 숨은 매력을 발견하고,<br/>사람들에게 닿는 이야기로 만드는 마케터 가치똑똑입니다.</p><div className="link-stack">{profileLinks.map(l=><a key={l.label} className={`main-link ${l.cls}`} href="#"><span className="link-icon">{l.icon}</span><span><strong>{l.label}</strong><small>{l.note}</small></span><b>↗</b></a>)}</div></section>
    <section className="shop-preview"><p className="section-kicker">VALUE SHOP</p><h2>가치똑똑의 쇼핑 공간</h2><p className="section-copy">취향과 실용성을 함께 담은 상품들을 만나보세요.</p><div className="shop-grid"><a href="#"><small>NAVER</small>스마트스토어 <span>→</span></a><a href="#"><small>COUPANG</small>쿠팡 마이샵 <span>→</span></a></div></section>
    <section className="recommendations"><div className="section-head"><div><p className="section-kicker">SMART PICKS</p><h2>요즘, 이건 꼭 추천해요</h2></div><span>{products.length}개의 추천 아이템</span></div><div className="product-grid">{products.map(p=><article className="product" key={p.id}><a href={p.productUrl} target="_blank" rel="noreferrer"><div className="product-image"><img src={p.imageUrl} alt={p.name}/><span>{p.tag}</span></div><div className="product-copy"><h3>{p.name}</h3><p>{p.note}</p><b>상품 보러가기 ↗</b></div></a>{editing&&<button onClick={()=>removeProduct(p.id)}>삭제</button>}</article>)}</div></section>
    {editing&&<aside className="editor"><div className="editor-title"><div><p className="section-kicker">ITEM MANAGER</p><h2>추천 아이템 등록</h2></div><button onClick={()=>setEditing(false)}>×</button></div><form onSubmit={addProduct}><label>상품명<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="예: 아침을 깨우는 텀블러"/></label><label>한 줄 소개<input required value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="추천 이유를 짧게 적어주세요"/></label><label>상품 이미지 URL<input required type="url" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} placeholder="https://..."/></label><label>판매 상품페이지 URL<input required type="url" value={form.productUrl} onChange={e=>setForm({...form,productUrl:e.target.value})} placeholder="https://..."/></label><label>추천 태그<input value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})}/></label><button className="submit" type="submit">{saved?'등록했어요 ✓':'추천 아이템 등록하기'}</button><p>등록한 상품은 현재 기기에 저장됩니다.</p></form></aside>}
    <footer><div className="profile-mark mini">가치<br/>똑똑<span>!</span></div><p>작지만 좋은 가치가 더 멀리 닿도록.</p><small>© VALUE SMART. ALL RIGHTS RESERVED.</small></footer>
  </main>;
}
