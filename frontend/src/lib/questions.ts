
export type Option = {
  text: string;
  points: number;
};

export type Question = {
  id: number;
  text: string;
  options: Option[];
  isInfoOnly: boolean; // trueの場合、ポイント計算に含めない
};

export const questions: Question[] = [
  {
    id: 1,
    text: "あなたの年代をお聞かせください。",
    isInfoOnly: true,
    options: [
      { text: "30代以下", points: 0 },
      { text: "40代", points: 0 },
      { text: "50代", points: 0 },
      { text: "60代以上", points: 0 },
    ],
  },
  {
    id: 2,
    text: "あなたの現在の職業に最も近いものは？",
    isInfoOnly: true,
    options: [
      { text: "会社員", points: 0 },
      { text: "会社役員", points: 0 },
      { text: "個人事業主（フリーランス含む）", points: 0 },
      { text: "その他", points: 0 },
    ],
  },
  {
    id: 3,
    text: "あなたが資産（余裕資金）を投資に回す最大の目的は何ですか？",
    isInfoOnly: false,
    options: [
      { text: "長期的な資産の『保全』のため", points: 1 },
      { text: "次世代への『承継』のため", points: 2 },
      { text: "『第二の収益源』を確立するため", points: 3 },
      { text: "『爆発的リターン』を狙うため", points: 4 },
    ],
  },
  {
    id: 4,
    text: "あなたのポートフォリオ全体で、1年間に20%の価値が下落した場合、どう行動しますか？",
    isInfoOnly: false,
    options: [
      { text: "より安全な資産への比率を高める", points: 1 },
      { text: "何もせず静観する", points: 2 },
      { text: "絶好の機会と捉え、追加投資を検討する", points: 3 },
      { text: "別の成長分野へ資金を移すことを考える", points: 4 },
    ],
  },
  {
    id: 5,
    text: "新しい投資先を決めるとき、あなたが最も信頼する情報源は何ですか？",
    isInfoOnly: false,
    options: [
      { text: "公表されているデータや分析レポート", points: 1 },
      { text: "信頼する友人や投資のプロからの情報", points: 2 },
      { text: "影響力のあるメディアやSNSの情報", points: 3 },
      { text: "自らの調査と将来のビジョンを信じる", points: 4 },
    ],
  },
  {
    id: 6,
    text: "あなたの理想のポートフォリオ構成に最も近いものはどれですか？",
    isInfoOnly: false,
    options: [
      { text: "国債や高配当株中心の安定型ポートフォリオ", points: 1 },
      { text: "インデックスファンド中心のバランス型", points: 2 },
      { text: "特定テーマ（AI, 環境など）への特化型", points: 3 },
      { text: "未公開株や不動産などオルタナティブ資産も重視", points: 4 },
    ],
  },
  {
    id: 7,
    text: "あなたの本業や専門知識と、投資活動の関係性をどう考えていますか？",
    isInfoOnly: false,
    options: [
      { text: "全くの別物として切り離して考えている", points: 1 },
      { text: "本業の知見が活かせるシナジーのある分野に投資する", points: 3 }, // 例外的な配点
      { text: "あくまで趣味や社会勉強の一環と捉えている", points: 2 }, // 例外的な配点
      { text: "投資から得た知見を本業のスキルアップに活かしたい", points: 4 },
    ],
  },
  {
    id: 8,
    text: "あなたにとって「最高の投資」とは、どのような結果をもたらすものですか？",
    isInfoOnly: false,
    options: [
      { text: "安定した配当や利息（インカムゲイン）", points: 1 },
      { text: "社会や環境に良いインパクトを与えること", points: 2 }, // 例外的な配点
      { text: "市場平均を大きく上回るリターン", points: 3 }, // 例外的な配点
      { text: "資産価値が10倍以上になる（テンバガー）", points: 4 }, // 例外的な配点
    ],
  },
  {
    id: 9,
    text: "投資における「失敗」を、あなたはどう定義しますか？",
    isInfoOnly: false,
    options: [
      { text: "1円でも元本が割れてしまうこと", points: 1 },
      { text: "市場全体の平均リターンに負けてしまうこと", points: 2 },
      { text: "自らの信念や倫理観に反する投資をしてしまうこと", points: 3 },
      { text: "挑戦しなかったことこそが最大の失敗である", points: 4 },
    ],
  },
  {
    id: 10,
    text: "あなたの投資の時間軸と、最終的なゴールに最も近いものは？",
    isInfoOnly: false,
    options: [
      { text: "20年以上先の老後の生活資金を盤石にすること", points: 1 },
      { text: "自分の代で使い切らず、子や孫の代まで資産を承継すること", points: 2 },
      { text: "3〜5年程度で一定の成果を求め、戦略を常に見直すこと", points: 3 },
      { text: "時間軸は意識しない。面白いと思えるものに投資し続けること", points: 4 },
    ],
  },
];
