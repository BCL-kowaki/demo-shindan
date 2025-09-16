"use client";

import { useState, useEffect, useRef } from "react";
import { questions, Question } from "@/lib/questions";
import { calculateDiagnosis, DiagnosisResult } from "@/lib/diagnosis";

// APIエンドポイントURL。CDKのデプロイ時に出力されたURLに書き換えてください。
const API_ENDPOINT =
  "https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/send"; // ★★★【要設定】★★★

type Message = {
  id: number;
  sender: "bot" | "user";
  text?: string;
  options?: { text: string; handler: () => void }[];
  question?: Question;
  result?: DiagnosisResult;
  isTyping?: boolean;
  input?: "text" | "email";
  onInputSubmit?: (value: string) => void;
};

// ボットのアイコン
const BotIcon = () => (
  <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 text-2xl flex items-center justify-center shadow">
    🤖
  </div>
);

// ユーザーのアイコン
const UserIcon = () => (
  <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 text-2xl flex items-center justify-center shadow">
    👤
  </div>
);

// 最初のメッセージを生成するヘルパー関数
const createInitialMessage = (): Message[] => {
  const firstQuestion = questions[0];
  return [
    {
      id: Date.now(),
      sender: "bot",
      text: firstQuestion.text,
      question: firstQuestion,
      options: firstQuestion.options.map((opt, index) => ({
        text: opt.text,
        // 初期化時点ではハンドラを直接定義できないため、一時的に空の関数をセット
        handler: () => {},
      })),
    },
  ];
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(createInitialMessage);
  const [answers, setAnswers] = useState<
    { questionId: number; optionIndex: number; answerText: string }[]
  >([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // メッセージが増えたら一番下までスクロール
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // マウント後に正しいハンドラでメッセージを更新する
  useEffect(() => {
    setMessages((currentMessages) => {
      const firstMessage = currentMessages[0];
      if (firstMessage && firstMessage.question) {
        const questionId = firstMessage.question.id;
        return [
          {
            ...firstMessage,
            options: firstMessage.question.options.map((opt, index) => ({
              text: opt.text,
              handler: () => handleOptionSelect(questionId, index, opt.text),
            })),
          },
          ...currentMessages.slice(1),
        ];
      }
      return currentMessages;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBotMessage = (
    question: Question | null,
    text?: string,
    result?: DiagnosisResult,
    input?: "text" | "email",
    onInputSubmit?: (value: string) => void
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "bot",
        text: question ? question.text : text, // 質問がある場合は質問のテキストを優先
        question: question || undefined,
        options: question
          ? question.options.map((opt, index) => ({
              text: opt.text,
              handler: () => handleOptionSelect(question.id, index, opt.text),
            }))
          : undefined,
        result,
        input,
        onInputSubmit,
      },
    ]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text }]);
  };

  const showTypingIndicator = (duration: number, callback: () => void) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "bot", isTyping: true },
    ]);
    setTimeout(() => {
      setMessages((prev) => prev.slice(0, -1)); // タイピングインジケーターを削除
      callback();
    }, duration);
  };

  const askQuestion = (index: number) => {
    const question = questions[index];
    addBotMessage(question); // text引数を削除
  };

  const handleOptionSelect = (
    questionId: number,
    optionIndex: number,
    answerText: string
  ) => {
    // 選択肢ボタンを消す
    setMessages((prev) =>
      prev.map((msg) =>
        msg.question?.id === questionId ? { ...msg, options: [] } : msg
      )
    );

    addUserMessage(answerText);
    const newAnswers = [...answers, { questionId, optionIndex, answerText }];
    setAnswers(newAnswers);

    const nextQuestionIndex =
      questions.findIndex((q) => q.id === questionId) + 1;

    showTypingIndicator(1000, () => {
      if (nextQuestionIndex < questions.length) {
        askQuestion(nextQuestionIndex);
      } else {
        // 全問終了
        finishDiagnosis(newAnswers);
      }
    });
  };

  const finishDiagnosis = (
    finalAnswers: {
      questionId: number;
      optionIndex: number;
      answerText: string;
    }[]
  ) => {
    const result = calculateDiagnosis(finalAnswers);
    addBotMessage(null, undefined, result);

    setTimeout(() => {
      addBotMessage(
        null,
        "診断内容を管理者へ送信します。お名前を教えてください。",
        undefined,
        "text",
        (name) => {
          if (!name.trim()) {
            addBotMessage(
              null,
              "お名前が入力されていません。もう一度お名前を教えてください。",
              undefined,
              "text",
              (name) => handleNameSubmit(name)
            );
            return;
          }
          handleNameSubmit(name);
        }
      );
    }, 1500);
  };

  const handleNameSubmit = (name: string) => {
    addUserMessage(name);
    setUserName(name);
    showTypingIndicator(1000, () => {
      addBotMessage(
        null,
        "ありがとうございます。次にメールアドレスを教えてください。",
        undefined,
        "email",
        (email) => {
          handleEmailSubmit(name, email); // nameを渡す
        }
      );
    });
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addUserMessage(email);
      showTypingIndicator(1000, () => {
        addBotMessage(
          null,
          "有効なメールアドレスの形式ではありません。もう一度メールアドレスを教えてください。",
          undefined,
          "email",
          (newEmail) => {
            handleEmailSubmit(name, newEmail);
          }
        );
      });
      return;
    }

    addUserMessage(email);
    setUserEmail(email);

    showTypingIndicator(1200, async () => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "bot", text: "結果を送信中です..." },
      ]);

      const diagnosisResult = calculateDiagnosis(answers);
      const payload = {
        diagnosis: { type: diagnosisResult.type, title: diagnosisResult.title },
        name: name,
        email: email,
        answers: answers.map((a) => a.answerText),
      };

      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setMessages((prev) =>
          prev.filter((m) => m.text !== "結果を送信中です...")
        );
        addBotMessage(
          null,
          "ありがとうございました！診断結果を指定のメールアドレスに送信しました。"
        );
      } catch (error) {
        console.error("API Error:", error);
        setMessages((prev) =>
          prev.filter((m) => m.text !== "結果を送信中です...")
        );
        addBotMessage(
          null,
          "エラーが発生し、送信に失敗しました。お手数ですが、時間をおいて再度お試しください。"
        );
      }
    });
  };

  const InputField = ({
    inputType,
    onSubmit,
  }: {
    inputType: "text" | "email";
    onSubmit: (value: string) => void;
  }) => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // 空でも送信できるようにバリデーションをハンドラ側に移譲
      onSubmit(value);
      setValue(""); // 送信後にクリア
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 mt-2 w-full"
      >
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white"
          placeholder={inputType === "text" ? "お名前..." : "メールアドレス..."}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          送信
        </button>
      </form>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-sky-200 text-gray-800">
      <div className="flex-grow overflow-y-auto space-y-4 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "bot" && <BotIcon />}
            <div
              className={`max-w-md lg:max-w-lg xl:max-w-2xl flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.isTyping ? (
                <div className="talk-bubble p-3 inline-block">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              ) : msg.result ? (
                <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200 w-full">
                  <p className="text-sm font-bold text-yellow-500">診断結果</p>
                  <h2 className="text-2xl font-bold mt-1 text-gray-800">{`【${msg.result.title}】`}</h2>
                  <h3 className="text-3xl font-extrabold text-yellow-500 mt-2">
                    {msg.result.type} タイプ
                  </h3>
                  <div className="w-full h-px bg-gray-200 my-4"></div>
                  <p className="text-base leading-relaxed text-gray-700">
                    {msg.result.description}
                  </p>
                  <p className="text-right mt-4 font-bold text-lg">
                    あなたの資産は{" "}
                    <span className="text-yellow-500">
                      『{msg.result.castle}』
                    </span>
                  </p>
                </div>
              ) : (
                msg.text && (
                  <div
                    className={`px-4 py-2 ${
                      msg.sender === "bot" ? "talk-bubble" : "talk-bubble-right"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                )
              )}
              {msg.options && msg.options.length > 0 && (
                <div
                  className={`mt-3 flex flex-col items-start gap-2 w-full ${
                    msg.sender === "user" ? "items-end" : ""
                  }`}
                >
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={opt.handler}
                      className="px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-blue-50 transition-colors border border-blue-400 shadow-sm"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              )}
              {msg.input && msg.onInputSubmit && (
                <div className="mt-2 w-full max-w-sm">
                  <InputField
                    inputType={msg.input}
                    onSubmit={msg.onInputSubmit}
                  />
                </div>
              )}
            </div>
            {msg.sender === "user" && <UserIcon />}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
