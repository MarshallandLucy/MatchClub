import { useMemo, useState } from 'react';
import { clubs, categories, survey } from './data/clubs';
import { rankClubs, calcMatch } from './lib/recommendation';
import './styles.css';

const useLS = (key, init) => {
  const [v, setV] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; }
  });
  const set = (next) => {
    setV((prev) => {
      const nv = typeof next === 'function' ? next(prev) : next;
      localStorage.setItem(key, JSON.stringify(nv));
      return nv;
    });
  };
  return [v, set];
};

export default function App() {
  const [step, setStep] = useLS('step', 'profile');
  const [profile, setProfile] = useLS('profile', { name: '', class: '', phone: '', intro: '' });
  const [answers, setAnswers] = useLS('answers', {});
  const [tag, setTag] = useLS('tag', 'recommended');
  const [submitted, setSubmitted] = useLS('submitted', []);
  const [openClub, setOpenClub] = useState(null);
  const [showSubs, setShowSubs] = useState(false);

  const ranked = useMemo(() => rankClubs(clubs, answers), [answers]);
  const displayed = useMemo(() => {
    if (tag === 'recommended') return ranked.filter((c) => c.matchInfo.isRecommended).slice(0, 3);
    if (tag === 'all') return ranked;
    return ranked.filter((c) => c.tag === tag);
  }, [ranked, tag]);

  const subs = useMemo(() => {
    const all = JSON.parse(localStorage.getItem('intentSubmissions') || '[]');
    return all.filter((x) => x.userName === profile.name);
  }, [profile.name, submitted]);

  const submitIntent = (club) => {
    if (!profile.name || !profile.class) return alert('请先填写姓名和班级');
    if (submitted.includes(club.id)) return alert('你已经投递过了');
    const rec = { clubId: club.id, clubName: club.name, userName: profile.name, timestamp: new Date().toISOString(), matchScore: calcMatch(answers, club).percentage };
    const all = JSON.parse(localStorage.getItem('intentSubmissions') || '[]');
    all.push(rec);
    localStorage.setItem('intentSubmissions', JSON.stringify(all));
    setSubmitted((p) => [...p, club.id]);
    alert('投递成功');
    setOpenClub(null);
  };

  return (
    <div className="page">
      <header className="top">
        <h1>Marshall's MatchClub</h1>
        <p>智能匹配 · 精准推荐</p>
      </header>

      <div className="steps">{['profile', 'survey', 'clubs'].map((s, i) => <span key={s} className={step === s ? 'on' : ''}>{i + 1}</span>)}</div>

      {step === 'profile' && (
        <section className="card">
          <h2>完善个人信息</h2>
          <input placeholder="姓名*" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input placeholder="班级*" value={profile.class} onChange={(e) => setProfile({ ...profile, class: e.target.value })} />
          <input placeholder="手机号" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          <textarea placeholder="一句话介绍自己" value={profile.intro} onChange={(e) => setProfile({ ...profile, intro: e.target.value })} />
          <button onClick={() => { if (!profile.name || !profile.class) return alert('姓名和班级必填'); setStep('survey'); }}>保存并继续</button>
        </section>
      )}

      {step === 'survey' && <Survey answers={answers} setAnswers={setAnswers} onBack={() => setStep('profile')} onDone={() => setStep('clubs')} />}

      {step === 'clubs' && (
        <section>
          <div className="row">
            <button onClick={() => setStep('survey')}>返回</button>
            <button onClick={() => setShowSubs(true)}>已投递({subs.length})</button>
          </div>
          <div className="tags">{categories.map((c) => <button key={c.id} className={tag===c.id?'on':''} onClick={() => setTag(c.id)}>{c.name}</button>)}</div>
          <div className="grid">{displayed.map((club) => (
            <article className="club" key={club.id} onClick={() => setOpenClub(club)}>
              <div className="club-head"><span>{club.logo}</span><div><h3>{club.name}</h3><p>{club.slogan}</p></div></div>
              <div className="meta"><span>{club.tagName}</span><span>{club.rating}⭐</span><span>{club.members}人</span><span>招新{club.recruiting}</span></div>
              {club.matchInfo.isRecommended && <div className="rec">推荐 {club.matchInfo.percentage}%</div>}
            </article>
          ))}</div>
        </section>
      )}

      {openClub && (
        <div className="modal" onClick={() => setOpenClub(null)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>{openClub.logo} {openClub.name}</h3>
            <p>{openClub.description}</p>
            <ul>{openClub.activities.map((x) => <li key={x}>{x}</li>)}</ul>
            <p>匹配度：{calcMatch(answers, openClub).percentage}%</p>
            <div className="row"><button onClick={() => setOpenClub(null)}>关闭</button><button onClick={() => submitIntent(openClub)} disabled={submitted.includes(openClub.id)}>一键投递</button></div>
          </div>
        </div>
      )}

      {showSubs && (
        <div className="modal" onClick={() => setShowSubs(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>已投递记录</h3>
            {subs.length === 0 ? <p>暂无记录</p> : subs.map((s, i) => <div key={i} className="sub" onClick={() => setOpenClub(clubs.find((c) => c.id === s.clubId))}>{s.clubName} · {new Date(s.timestamp).toLocaleString('zh-CN')} · {s.matchScore}%</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

function Survey({ answers, setAnswers, onBack, onDone }) {
  const [idx, setIdx] = useState(0);
  const q = survey[idx];
  const val = answers[q.key] || (q.multi ? [] : '');
  const can = q.multi ? val.length > 0 : Boolean(val);

  const toggle = (opt) => {
    if (!q.multi) return setAnswers({ ...answers, [q.key]: opt });
    const list = val.includes(opt) ? val.filter((x) => x !== opt) : [...val, opt];
    setAnswers({ ...answers, [q.key]: list });
  };

  return (
    <section className="card">
      <h2>匹配问卷 {idx + 1}/{survey.length}</h2>
      <h3>{q.title}</h3>
      <div className="opts">
        {q.options.map((o) => (
          <button key={o} className={q.multi ? (val.includes(o) ? 'on' : '') : (val === o ? 'on' : '')} onClick={() => toggle(o)}>{o}</button>
        ))}
      </div>
      <div className="row">
        <button onClick={() => idx === 0 ? onBack() : setIdx(idx - 1)}>上一步</button>
        <button disabled={!can} onClick={() => idx === survey.length - 1 ? onDone() : setIdx(idx + 1)}>{idx === survey.length - 1 ? '完成问卷' : '下一步'}</button>
      </div>
    </section>
  );
}
