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
  // 【Ⅰ. 戦略・目標設定】
  {
    id: 1,
    text: "問1: あなたの個人資産に「事業計画書（明確な目標と計画）」はありますか？",
    isInfoOnly: false,
    options: [
      { text: "A. 特にない。余裕資金ができたら都度考える。", points: 1 },
      { text: "B. 老後資金など、漠然とした目標はある。", points: 2 },
      { text: "C. 目標額と達成時期を具体的に設定している。", points: 3 },
      {
        text: "D. 目標達成のための具体的なアクションプランまで策定済み。",
        points: 4,
      },
    ],
  },
  {
    id: 2,
    text: "問2: 会社の「KPI」のように、資産の増減や状況をどのくらいの頻度でチェックしていますか？",
    isInfoOnly: false,
    options: [
      { text: "A. ほとんど確認しない。", points: 1 },
      { text: "B. 半年〜1年に一度程度。", points: 2 },
      { text: "C. 四半期に一度は確認している。", points: 3 },
      { text: "D. 毎月、数値をトラッキングしている。", points: 4 },
    ],
  },
  // 【Ⅱ. 現状把握・資産管理】
  {
    id: 3,
    text: "問3: 保有資産の「棚卸し（全資産のリスト化）」を最後に行ったのはいつですか？",
    isInfoOnly: false,
    options: [
      { text: "A. 行ったことがない。", points: 1 },
      { text: "B. 1年以上前。", points: 2 },
      { text: "C. 半年〜1年以内。", points: 3 },
      { text: "D. 3ヶ月以内。", points: 4 },
    ],
  },
  {
    id: 4,
    text: "問4: 会社の「貸借対照表（B/S）」のように、ご自身の総資産と負債を正確に把握していますか？",
    isInfoOnly: false,
    options: [
      { text: "A. ほとんど把握していない。", points: 1 },
      { text: "B. おおよその金額ならわかる。", points: 2 },
      { text: "C. 資産ごとのおおよその内訳まで把握している。", points: 3 },
      {
        text: "D. 資産・負債を一覧化し、純資産額を正確に把握している。",
        points: 4,
      },
    ],
  },
  {
    id: 5,
    text: "問5: あなたの資産の「主力事業（最も比率の大きい資産）」は何ですか？",
    isInfoOnly: false,
    options: [
      { text: "A. 現金・預金。", points: 1 },
      { text: "B. 自社株。", points: 2 },
      { text: "C. 不動産（自宅含む）。", points: 3 },
      { text: "D. 複数の資産に分散されている。", points: 4 },
    ],
  },
  // 【Ⅲ. リスク・コスト管理】
  {
    id: 6,
    text: "問6: 「税金」という名の固定費について、あなたの対策レベルは？",
    isInfoOnly: false,
    options: [
      { text: "A. 特に何もしていない。", points: 1 },
      { text: "B. ふるさと納税やiDeCoなどを活用している。", points: 2 },
      {
        text: "C. 顧問税理士などに相談し、基本的な対策は行っている。",
        points: 3,
      },
      {
        text: "D. 資産管理会社や信託の活用など、専門的な対策も検討・実行している。",
        points: 4,
      },
    ],
  },
  {
    id: 7,
    text: "問7: 市場の急変など、万が一の「リスク」に対して、どのような備えがありますか？",
    isInfoOnly: false,
    options: [
      { text: "A. 特に備えはない。その時に考える。", points: 1 },
      { text: "B. すぐに使える生活防衛資金を確保している。", points: 2 },
      { text: "C. 分散投資や保険などでリスクヘッジを行っている。", points: 3 },
      {
        text: "D. 資産全体でリスクシナリオを想定し、対策を講じている。",
        points: 4,
      },
    ],
  },
  // 【Ⅳ. 将来設計・事業承継】
  {
    id: 8,
    text: "問8: 会社の「M&AやIPO」のように、資産の最終的なゴールを考えたことはありますか？",
    isInfoOnly: false,
    options: [
      { text: "A. 全く考えたことがない。", points: 1 },
      { text: "B. いつか考えないといけないとは思っている。", points: 2 },
      { text: "C. 誰にどう遺すかなど、家族と話したことがある。", points: 3 },
      { text: "D. 専門家も交え、具体的な計画を検討している。", points: 4 },
    ],
  },
  {
    id: 9,
    text: "問9: 万が一の時、資産を引き継ぐための「事業承継計画（相続・贈与計画）」はありますか？",
    isInfoOnly: false,
    options: [
      { text: "A. 何も準備していない。", points: 1 },
      { text: "B. 遺言書の作成を検討している。", points: 2 },
      { text: "C. 暦年贈与などを計画的に行っている。", points: 3 },
      {
        text: "D. 生前贈与、生命保険、信託などを組み合わせた計画がある。",
        points: 4,
      },
    ],
  },
  {
    id: 10,
    text: "問10: 経営者であるあなた自身の「退職金」や「役員報酬」の受け取り方を、資産形成の一環として計画していますか？",
    isInfoOnly: false,
    options: [
      { text: "A. 特に計画していない。", points: 1 },
      { text: "B. 一般的な知識として知っている程度。", points: 2 },
      { text: "C. 顧問税理士と相談している。", points: 3 },
      {
        text: "D. 会社の成長ステージに合わせて、最適な受け取り方を計画している。",
        points: 4,
      },
    ],
  },
];
