import { questions, Option } from "./questions";

export type DiagnosisResult = {
  type: string;
  title: string;
  description: string;
  nextAction: string;
};

export const calculateDiagnosis = (
  answers: { questionId: number; optionIndex: number }[]
): DiagnosisResult => {
  let totalPoints = 0;
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question && !question.isInfoOnly) {
      const selectedOption = question.options[answer.optionIndex];
      if (selectedOption) {
        totalPoints += selectedOption.points;
      }
    }
  });

  if (totalPoints >= 10 && totalPoints <= 17) {
    return {
      type: "Aタイプ：要精密検査レベル",
      title: "あなたの資産管理は「創業期」の段階です。",
      description:
        "日々の経営に注力するあまり、個人資産の戦略設計が後回しになっている可能性があります。まずは会社の経営と同じように、ご自身の資産にも「事業計画書」を作るところから始めましょう。\n\n**優先課題: 目標設定と現状把握**",
      nextAction: "「保有資産の棚卸し」を行い、資産の全体像を把握すること。",
    };
  } else if (totalPoints >= 18 && totalPoints <= 25) {
    return {
      type: "Bタイプ：経過観察レベル",
      title: "あなたの資産管理は「成長期」に入っています。",
      description:
        "基本的な目標や現状の把握はできていますが、事業の成長と共に資産も複雑化し、潜在的なリスクや税金の課題が見過ごされているかもしれません。会社の成長に合わせて管理部門を強化するように、資産管理の「リスク・コスト管理」体制を強化すべき時期です。\n\n**優先課題: リスク管理と税金対策**",
      nextAction:
        "「税金という名の固定費」を正確に把握し、専門家へ相談すること。",
    };
  } else if (totalPoints >= 26 && totalPoints <= 33) {
    return {
      type: "Cタイプ：良好レベル",
      title: "あなたの資産管理は「安定期」にあります。",
      description:
        "現状把握とリスク管理の意識は高く、資産は順調に成長しているでしょう。しかし、会社の経営に「終わり」がないように、資産管理にも完成はありません。次のステージとして、万が一の事態や次世代への継承を見据えた、長期的な「将来設計」に目を向けることが重要です。\n\n**優先課題: 事業承継と相続対策**",
      nextAction: "「事業承継計画」を具体的に検討し、家族と共有すること。",
    };
  } else {
    // 34 to 40
    return {
      type: "Dタイプ：優良レベル",
      title: "あなたの資産管理は「次世代経営」の視点を持つ「優良」な状態です。",
      description:
        "明確な戦略のもと、リスク管理や将来設計まで高いレベルで実践できています。今後も最新の税制や経済状況に合わせて計画を最適化し続けることで、あなたの資産は会社と同様に、世代を超えて価値を生み出す存在となるでしょう。\n\n**優先課題: 計画の定期的な見直しと最適化**",
      nextAction: "最新の情報に基づき、専門家と定期的なレビューを行うこと。",
    };
  }
};
