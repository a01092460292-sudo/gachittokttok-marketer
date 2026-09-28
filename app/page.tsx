'use client';

import { MouseEvent, useEffect, useState } from 'react';

const accountOptions = ['개인 브랜딩·전문가 계정','강의·컨설팅·서비스 계정','매장·지역 기반 사업 계정','쇼핑몰·제품 판매 계정','회사·브랜드 계정','아직 계정을 준비 중이에요','기타'];
const statusOptions = ['아직 시작 전이에요','시작했지만 운영 방향을 잡지 못했어요','직접 운영 중이지만 꾸준히 올리기 어려워요','꾸준히 올리지만 성과가 아쉬워요','전문가의 도움이나 대행을 알아보고 있어요'];
const challengeOptions = ['어떤 주제로 글을 써야 할지 모르겠어요','내 브랜드에 맞는 문체와 방향을 잡기 어려워요','꾸준히 작성할 시간이나 인력이 부족해요','조회수와 팔로워가 잘 늘지 않아요','반응은 있지만 문의·상담으로 연결되지 않아요','스레드를 어떻게 활용해야 할지 전반적으로 모르겠어요'];
const helpOptions = ['전자책을 보고 직접 운영해보고 싶어요','내 계정에 맞는 방향을 간단히 진단 받고 싶어요','콘텐츠 주제와 운영 전략을 함께 설계하고 싶어요','글 작성이나 운영의 일부를 맡기고 싶어요','스레드 운영 전체를 맡기는 대행 상담을 받고 싶어요','아직 잘 모르겠어요'];

type SurveyAnswers = { threadsId:string; account:string[]; status:string[]; challenge:string[]; help:string[]; concern:string; consent:boolean };
const initialSurvey: SurveyAnswers = { threadsId:'', account:[], status:[], challenge:[], help:[], concern:'', consent:false };

const benefits = [
  ['01','브랜드 인지도 상승','잠재 고객에게 브랜드의 가치와 전문성을 자연스럽게 알립니다.'],
  ['02','진짜 고객과 소통','일방적인 홍보보다 고객이 반응하고 대화하는 콘텐츠를 만듭니다.'],
  ['03','꾸준한 성장','한 번의 노출이 아니라 오래 이어지는 운영 흐름을 설계합니다.'],
  ['04','비즈니스에 집중','기획과 운영의 부담을 줄여 본업에 집중할 시간을 만듭니다.'],
];
const cases = [
  ['브랜드·전문가 계정','전문성이 어렵게 느껴지지 않도록 고객의 언어로 콘텐츠 주제와 문체를 정리합니다.'],
  ['매장·서비스 사업','지역과 서비스의 강점을 발견해 방문과 상담으로 이어지는 이야기 흐름을 만듭니다.'],
  ['온라인 쇼핑몰','제품 설명을 넘어 고객이 관심을 가져야 할 이유와 활용 장면을 콘텐츠로 연결합니다.'],
];
const faqs = [
  ['어떤 업종이 스레드 마케팅에 잘 맞나요?','전문가, 서비스업, 매장, 온라인 쇼핑몰처럼 신뢰와 꾸준한 소통이 중요한 사업에 특히 잘 맞습니다.'],
  ['콘텐츠를 전부 맡길 수도 있나요?','계정 진단과 방향 설계부터 주제 기획, 글 작성, 운영 대행까지 필요한 범위를 협의할 수 있습니다.'],
  ['무료 전자책은 어떻게 받을 수 있나요?','간단한 신청폼을 작성하면 완료 화면에서 무료 전자책을 바로 확인할 수 있습니다.'],
];

export default function Home() {
  const [cursor,setCursor]=useState({x:-50,y:-50});
  const [particles,setParticles]=useState<{id:number;x:number;y:number}[]>([]);
  const [menuOpen,setMenuOpen]=useState(false);
  const [surveyOpen,setSurveyOpen]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const [surveyError,setSurveyError]=useState('');
  const [survey,setSurvey]=useState<SurveyAnswers>(initialSurvey);

  useEffect(()=>{ const move=(e:globalThis.MouseEvent)=>setCursor({x:e.clientX,y:e.clientY}); window.addEventListener('mousemove',move); return()=>window.removeEventListener('mousemove',move)},[]);
  const burst=(e:MouseEvent<HTMLElement>)=>{const next=Array.from({length:7},(_,i)=>({id:Date.now()+i,x:e.clientX,y:e.clientY}));setParticles(v=>[...v,...next]);setTimeout(()=>setParticles(v=>v.filter(p=>!next.some(n=>n.id===p.id))),700)};
  const toggleChoice=(field:'account'|'status'|'challenge'|'help',value:string)=>setSurvey(current=>{const values=current[field];if(values.includes(value))return {...current,[field]:values.filter(item=>item!==value)};if(values.length>=2)return current;return {...current,[field]:[...values,value]}});
  const closeSurvey=()=>{setSurveyOpen(false);setSurveyError('');if(submitted){setSubmitted(false);setSurvey(initialSurvey)}};
  const openSurvey=()=>{setMenuOpen(false);setSurveyOpen(true)};
  const submitSurvey=async(e:React.FormEvent)=>{e.preventDefault();if(!survey.threadsId.trim()||!survey.account.length||!survey.status.length||!survey.challenge.length||!survey.help.length||!survey.consent){setSurveyError('필수 문항과 개인정보 수집·이용 동의를 확인해주세요.');return}setSurveyError('');setSubmitting(true);try{const body=new URLSearchParams();body.append('entry.1267348126',survey.threadsId.trim());survey.account.forEach(v=>body.append('entry.900249498',v));survey.status.forEach(v=>body.append('entry.1428476225',v));survey.challenge.forEach(v=>body.append('entry.2119475648',v));survey.help.forEach(v=>body.append('entry.908624512',v));body.append('entry.1131922935',survey.concern.trim());body.append('entry.2098307844','개인정보 수집 및 이용에 동의합니다.');body.append('fvv','1');body.append('pageHistory','0');await fetch('https://docs.google.com/forms/d/e/1FAIpQLSf83Rty4uNcxTWTUiHIi6YAbkNM7_7qGvoqKxmx92uT69yhLA/formResponse',{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body});setSubmitted(true)}catch{setSurveyError('제출 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.')}finally{setSubmitting(false)}};
  const closeMenu=()=>setMenuOpen(false);

  return <main onClick={burst}>
    <div className="custom-cursor" style={{transform:`translate(${cursor.x}px, ${cursor.y}px)`}}><span>똑</span></div>
    {particles.map((p,i)=><i key={p.id} className="particle" style={{left:p.x,top:p.y,'--angle':`${i*51}deg`} as React.CSSProperties}/>)}

    <header className="site-header">
      <a className="brand" href="#home" onClick={closeMenu}><strong>가치똑똑</strong><span>MARKETER</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="메뉴 열기" onClick={()=>setMenuOpen(v=>!v)}><span/><span/></button>
      <nav className={menuOpen?'open':''} aria-label="주요 메뉴">
        <a href="#home" onClick={closeMenu}>홈</a><a href="#threads" onClick={closeMenu}>스레드 마케팅</a><a href="#cases" onClick={closeMenu}>성공 사례</a><button type="button" onClick={openSurvey}>무료 전자책</button><a href="#faq" onClick={closeMenu}>자주 묻는 질문</a><a href="#store" onClick={closeMenu}>온라인스토어</a>
      </nav>
      <button className="header-cta" type="button" onClick={openSurvey}>무료 전자책 받기 <span>→</span></button>
    </header>

    <section className="hero" id="home"><div className="hero-inner">
      <div className="hero-copy"><p className="eyebrow">GOOD VALUE, SMART CONTENT</p><h1>좋은 가치를 발견해,<br/><em>선택받는 브랜드</em>로 만듭니다.</h1><p className="hero-description">약 12년의 홈쇼핑 채널 운영 경험을 바탕으로<br/>브랜드의 강점을 고객이 반응하는 콘텐츠와<br/>실제 선택으로 연결합니다.</p><div className="hero-actions"><button className="button dark" type="button" onClick={openSurvey}>스레드 무료 전자책 받기 <span>→</span></button><a className="button line" href="https://open.kakao.com/me/gachi_toktok" target="_blank" rel="noreferrer">상담 문의하기</a></div></div>
      <div className="hero-visual" aria-label="가치똑똑 브랜드 메시지"><img src="/og.png" alt="가치똑똑, 좋은 가치를 똑똑하게 전해요"/><div className="visual-note"><span>VALUE</span><strong>콘텐츠에서<br/>선택까지.</strong></div></div>
    </div></section>

    <section className="benefit-strip" aria-label="가치똑똑의 강점">{benefits.map(([number,title,text])=><article key={number}><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</section>

    <section className="section threads" id="threads"><div className="section-heading"><p className="eyebrow">THREADS MARKETING</p><h2>스레드로,<br/>당신의 사업이 더 많은<br/>사람에게 닿도록</h2></div><div className="threads-body"><p>가치똑똑은 눈에 띄는 문구만 만들지 않습니다. 브랜드와 상품의 본질을 발견하고, 잠재 고객이 이해하고 신뢰할 수 있는 언어로 바꿉니다.</p><ol><li><span>01</span>브랜드의 목소리와 핵심 메시지 정리</li><li><span>02</span>고객이 반응하는 콘텐츠 주제 설계</li><li><span>03</span>꾸준한 운영을 위한 콘텐츠 흐름 구축</li><li><span>04</span>관심을 문의와 구매로 연결</li></ol><a className="text-link" href="https://blog.naver.com/twobinsliving/224342440500" target="_blank" rel="noreferrer">스레드 마케팅 대행 자세히 보기 <span>→</span></a></div></section>

    <section className="section cases" id="cases"><div className="section-heading wide"><p className="eyebrow">SELECTED APPROACH</p><h2>사업에 맞는 언어와<br/>운영 방향을 함께 찾습니다</h2><p>업종은 달라도 고객이 선택하는 과정에는 이유가 있습니다.</p></div><div className="case-grid">{cases.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="ebook-band"><div><p className="eyebrow">FREE E-BOOK</p><h2>스레드 운영이 막막하다면,<br/>무료 전자책부터 시작해보세요.</h2></div><button className="button light" type="button" onClick={openSurvey}>무료 전자책 받기 <span>→</span></button></section>

    <section className="section faq" id="faq"><div className="section-heading"><p className="eyebrow">FAQ</p><h2>자주 묻는 질문</h2></div><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary><span>0{i+1}</span>{q}<b>＋</b></summary><p>{a}</p></details>)}</div></section>

    <section className="section store" id="store"><div className="section-heading wide"><p className="eyebrow">ONLINE STORE</p><h2>가치똑똑이 운영하는<br/>온라인 스토어</h2><p>직접 운영하며 확인한 고객의 선택과 온라인 판매의 흐름을 경험합니다.</p></div><div className="store-links"><a href="https://smartstore.naver.com/dynaliving" target="_blank" rel="noreferrer"><small>NAVER</small><strong>스마트스토어</strong><span>↗</span></a><a href="https://shop.coupang.com/dynaliving?platform=p" target="_blank" rel="noreferrer"><small>COUPANG</small><strong>쿠팡 마이샵</strong><span>↗</span></a><a href="https://litt.ly/gachi_toktok" target="_blank" rel="noreferrer"><small>LITT.LY</small><strong>추천 아이템 전체보기</strong><span>↗</span></a></div></section>

    <section className="closing"><p className="eyebrow">LET&apos;S GROW TOGETHER</p><h2>좋은 가치가 더 멀리 닿도록,<br/>가치똑똑이 함께합니다.</h2><div><button className="button light" type="button" onClick={openSurvey}>무료 전자책 받기 <span>→</span></button><a className="button ghost" href="https://open.kakao.com/me/gachi_toktok" target="_blank" rel="noreferrer">상담 문의하기</a></div></section>
    <footer><a className="brand" href="#home"><strong>가치똑똑</strong><span>MARKETER</span></a><p>다이나 콘텐츠 마케팅 회사</p><small>© VALUE SMART. ALL RIGHTS RESERVED.</small></footer>

    {surveyOpen&&<SurveyModal submitted={submitted} submitting={submitting} surveyError={surveyError} survey={survey} setSurvey={setSurvey} closeSurvey={closeSurvey} toggleChoice={toggleChoice} submitSurvey={submitSurvey}/>}
  </main>;
}

function SurveyModal({submitted,submitting,surveyError,survey,setSurvey,closeSurvey,toggleChoice,submitSurvey}:{submitted:boolean;submitting:boolean;surveyError:string;survey:SurveyAnswers;setSurvey:React.Dispatch<React.SetStateAction<SurveyAnswers>>;closeSurvey:()=>void;toggleChoice:(field:'account'|'status'|'challenge'|'help',value:string)=>void;submitSurvey:(e:React.FormEvent)=>Promise<void>}){return <div className="survey-overlay" role="dialog" aria-modal="true" aria-labelledby="survey-title" onClick={e=>e.stopPropagation()}><div className="survey-shell"><button className="survey-close" onClick={closeSurvey} aria-label="신청 화면 닫기">×</button>{submitted?<section className="survey-complete"><div className="complete-icon">✓</div><p className="section-kicker">THANK YOU</p><h2 id="survey-title">신청이 완료됐어요!</h2><p>작성해주신 내용을 보고 도움이 될 만한 운영 팁이 있다면 스레드 DM으로 짧게 안내 드릴게요.</p><div className="complete-note"><p>빠른 상담을 원하시면 DM으로 <strong>“전자책 신청했어요”</strong>라고 보내주세요.</p></div><a className="ebook-button" href="https://app.notion.com/p/gachi-toktok-ebook/3bbadc431d3380e4a848d5f466747ff2?v=2ebdb0e27e4d4fb8bb354e27c62829af&source=copy_link" target="_blank" rel="noreferrer">무료 전자책 확인하기 ↗</a></section>:<form className="survey-form" onSubmit={submitSurvey}><header><p className="section-kicker">FREE E-BOOK</p><h2 id="survey-title">스레드 무료 전자책 신청</h2><p>지금 운영 상황에 맞는 내용을 안내해드리기 위해 간단한 질문을 드릴게요.<br/>약 40초면 완료되며, 신청 후 전자책을 바로 확인할 수 있습니다.</p></header><SurveyText number="1" title="스레드 아이디를 알려주세요" required value={survey.threadsId} onChange={value=>setSurvey({...survey,threadsId:value})} placeholder="@mybrand" help="작성해주신 아이디로 필요한 경우에만 운영 팁이나 상담 안내를 드립니다."/><SurveyChoices number="2" title="어떤 계정을 운영하고 계신가요?" options={accountOptions} selected={survey.account} onToggle={value=>toggleChoice('account',value)}/><SurveyChoices number="3" title="현재 스레드 운영 상태는 어떤가요?" options={statusOptions} selected={survey.status} onToggle={value=>toggleChoice('status',value)}/><SurveyChoices number="4" title="지금 가장 막히는 부분은 무엇인가요?" options={challengeOptions} selected={survey.challenge} onToggle={value=>toggleChoice('challenge',value)}/><SurveyChoices number="5" title="현재 가장 필요한 도움은 무엇인가요?" options={helpOptions} selected={survey.help} onToggle={value=>toggleChoice('help',value)}/><SurveyText number="6" title="현재 고민을 한 줄로 알려주세요" value={survey.concern} onChange={value=>setSurvey({...survey,concern:value})} placeholder="매일 글을 쓸 시간이 없어요" help="예시: 조회수는 나오는데 문의가 없어요."/><section className="privacy-box"><h3>개인정보 수집·이용 동의</h3><p>입력한 정보는 전자책 제공과 스레드 운영·상담 안내 목적으로만 사용됩니다.</p><ul><li>수집 항목: 스레드 아이디, 계정 및 운영 관련 답변</li><li>이용 목적: 전자책 제공, 맞춤 안내 및 상담 응대</li><li>동의를 거부할 수 있으나 전자책 및 상담 안내가 제한될 수 있습니다.</li></ul><label className="consent-check"><input type="checkbox" checked={survey.consent} onChange={e=>setSurvey({...survey,consent:e.target.checked})}/><span>개인정보 수집 및 이용에 동의합니다.</span></label></section>{surveyError&&<p className="survey-error" role="alert">{surveyError}</p>}<button className="survey-submit" type="submit" disabled={submitting}>{submitting?'제출하고 있어요…':'제출하기'}</button></form>}</div></div>}
function SurveyText({number,title,required=false,value,onChange,placeholder,help}:{number:string;title:string;required?:boolean;value:string;onChange:(value:string)=>void;placeholder:string;help:string}){return <fieldset className="survey-question"><legend><span>{number}</span>{title}</legend><p className="question-meta">{required?'필수':'선택'} · 단답형</p><input required={required} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/><small>{help}</small></fieldset>}
function SurveyChoices({number,title,options,selected,onToggle}:{number:string;title:string;options:string[];selected:string[];onToggle:(value:string)=>void}){return <fieldset className="survey-question"><legend><span>{number}</span>{title}</legend><p className="question-meta">필수 · 2개까지 선택 가능</p><div className="choice-grid">{options.map(option=><label key={option} className={selected.includes(option)?'selected':''}><input type="checkbox" checked={selected.includes(option)} disabled={!selected.includes(option)&&selected.length>=2} onChange={()=>onToggle(option)}/><span>{option}</span></label>)}</div></fieldset>}
