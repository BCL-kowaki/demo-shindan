

const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// SESクライアントを初期化します。リージョンは東京リージョンを指定します。
// 必要に応じてお使いのリージョンに変更してください。
const sesClient = new SESClient({ region: "ap-northeast-1" });

// ★★★【要設定】管理者（あなた）のメールアドレスを設定してください。
const ADMIN_EMAIL = "your-admin-email@example.com";
// ★★★【要設定】SESで検証済みの送信元メールアドレスを設定してください。
const SENDER_EMAIL = "verified-sender-email@example.com";


exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // CORS設定
  const headers = {
    "Access-Control-Allow-Origin": "*", // FIXME: 本番環境ではより厳密なドメインを指定してください
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // OPTIONSメソッドへのプリフライトリクエストに対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  try {
    const { diagnosis, name, email, answers } = JSON.parse(event.body);

    // 回答リストを整形
    const answersList = answers.map((ans, index) => `問${index + 1}: ${ans}`).join("\n");

    // メールの件名と本文を作成
    const subject = "【投資家タイプ診断】新しい回答がありました";
    const body = `
      診断結果が送信されました。

      --------------------------------
      診断日時: ${new Date().toLocaleString("ja-JP")}
      診断結果: ${diagnosis.type} (${diagnosis.title})
      お名前: ${name}
      メールアドレス: ${email}
      --------------------------------

      ▼ 回答の詳細
      ${answersList}
    `;

    // メール送信コマンドのパラメータ
    const sendEmailCommand = new SendEmailCommand({
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [ADMIN_EMAIL],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: body,
            Charset: "UTF-8",
          },
        },
      },
    });

    // メールを送信
    await sesClient.send(sendEmailCommand);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Failed to send email.", error: error.message }),
    };
  }
};
