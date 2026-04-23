export function calcMatch(answers, club) {
  let score = 0;
  let max = 0;
  const reasons = [];

  ['interest', 'goal', 'time', 'activity'].forEach((k) => {
    const user = answers[k];
    const target = club.match[k] || [];
    if (!user) return;
    max += 25;
    if (Array.isArray(user)) {
      const hit = user.filter((x) => target.includes(x));
      const s = (hit.length / Math.max(user.length, 1)) * 25;
      score += s;
      if (hit[0]) reasons.push(`${k}:${hit[0]}`);
    } else {
      if (target.includes(user)) {
        score += 25;
        reasons.push(`${k}:${user}`);
      } else {
        score += 4;
      }
    }
  });

  score += (club.activity || 0) * 5;
  score += ((club.rating || 4) / 5) * 5;
  max += 10;

  return {
    percentage: Math.min(100, Math.round((score / max) * 100)),
    reasons: reasons.slice(0, 3),
    isRecommended: false,
  };
}

export function rankClubs(clubs, answers) {
  const list = clubs.map((c) => ({ ...c, matchInfo: calcMatch(answers, c) }));
  list.sort((a, b) => b.matchInfo.percentage - a.matchInfo.percentage);
  list.forEach((c, i) => (c.matchInfo.isRecommended = i < 3 || c.matchInfo.percentage >= 50));
  return list.sort((a, b) => {
    if (a.matchInfo.isRecommended !== b.matchInfo.isRecommended) {
      return a.matchInfo.isRecommended ? -1 : 1;
    }
    return b.matchInfo.percentage - a.matchInfo.percentage;
  });
}
