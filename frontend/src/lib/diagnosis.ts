
import { questions, Option } from './questions';

export type DiagnosisResult = {
  type: string;
  title: string;
  description: string;
  castle: string;
};

export const calculateDiagnosis = (answers: { questionId: number; optionIndex: number }[]): DiagnosisResult => {
  let totalPoints = 0;
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && !question.isInfoOnly) {
      const selectedOption = question.options[answer.optionIndex];
      if (selectedOption) {
        totalPoints += selectedOption.points;
      }
    }
  });

  if (totalPoints >= 8 && totalPoints <= 11) {
    return {
      type: "徳川家康",
      title: "鉄壁の価値投資家",
      description: "あなたは、短期的な市場の熱狂に惑わされず、資産の真の価値を見抜く力を持つ投資家です。派手さはありませんが、その忍耐強い戦略は複利の力を最大限に活かし、数十年単位で盤石な資産を築き上げます。「鳴かぬなら鳴くまで待とう」の精神で、最適な時が来るまで静かに待ち、好機を逃しません。ウォーレン・バフェットが説く「バイ・アンド・ホールド」の真髄を、あなたは感覚的に理解しているのかもしれません。",
      castle: "江戸城"
    };
  } else if (totalPoints >= 12 && totalPoints <= 15) {
    return {
      type: "武田信玄",
      title: "緻密な分散投資家",
      description: "あなたは、戦の勝敗をデータと規律によって支配する、優れた戦略家タイプの投資家です。「風林火山」の旗印のごとく、市場が静かな時には動かず、動くべき時には迅速に、しかし常に計算されたリスクの範囲で行動します。感情的な判断を排し、徹底した分散投資とリスク管理で「負けない投資」を実践することで、着実に勝利を積み重ねていくでしょう。",
      castle: "武田の騎馬軍団"
    };
  } else if (totalPoints >= 16 && totalPoints <= 19) {
    return {
      type: "上杉謙信",
      title: "信念の理念投資家",
      description: "あなたは、単なる利益の追求だけを目的としない、高潔な精神を持つ投資家です。自らが掲げる「義」や信念に基づき、社会的に意義のある企業や、未来を応援したいと思える活動に資金を投じます。市場のノイズや短期的な利益には惑わされず、自らの価値観を投資判断の根幹に据えるため、長期的に満足度の高い資産形成ができるでしょう。",
      castle: "謙信公"
    };
  } else if (totalPoints >= 20 && totalPoints <= 23) {
    return {
      type: "豊臣秀吉",
      title: "時流の機会投資家",
      description: "あなたは、人の心と市場の「空気」を読む天才的な才能を持つ投資家です。一介の農民から天下人にまで上り詰めたように、誰も気づかないような僅かな変化から大きなチャンスを見出し、機を見るに敏な判断で資産を築きます。その柔軟な思考は、停滞した市場でも利益を生み出すでしょう。",
      castle: "一夜城"
    };
  } else if (totalPoints >= 24 && totalPoints <= 27) {
    return {
      type: "伊達政宗",
      title: "先見の国際投資家",
      description: "あなたは、常に時代の半歩先を読み、まだ誰も見向きもしないフロンティアに可能性を見出す投資家です。その洗練された感性と情報感度は、国内の常識に縛られません。新興国市場、最先端技術、新たなアセットクラス…あなたが「面白い」と感じたものこそが、次代のスタンダードになる可能性を秘めています。",
      castle: "世界"
    };
  } else { // 28 to 32
    return {
      type: "織田信長",
      title: "革新の成長投資家",
      description: "あなたは、古い常識や前例を破壊し、全く新しい価値を創造することに喜びを見出す、天性の革命家です。「天下布武」を掲げたように、あなたの投資は既存の秩序を塗り替えるほどのポテンシャルを秘めています。破壊的イノベーションを起こすであろう数少ない企業に資産を集中させ、常識外れのハイリターンを狙います。その道は大きなリスクを伴いますが、世界を変えるのは、いつの時代もあなたのようなビジョナリーなのです。",
      castle: "天下布武"
    };
  }
};
