
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { RestApi, LambdaIntegration, Cors } from 'aws-cdk-lib/aws-apigateway';
import { PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda関数がSESを利用するためのIAMロールを作成
    const lambdaRole = new Role(this, 'LambdaSESRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        // 基本的なLambda実行ポリシー
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // SESのEメール送信権限をロールに付与
    lambdaRole.addToPolicy(new PolicyStatement({
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*'], // 本番環境ではリソースをより厳密に指定することが望ましい
    }));

    // Node.js Lambda関数を定義
    const sendDiagnosisResultFn = new NodejsFunction(this, 'SendDiagnosisResultFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../../lambda/send-diagnosis-result.js'),
      role: lambdaRole, // 作成したIAMロールをアタッチ
      timeout: cdk.Duration.seconds(10),
      bundling: {
        externalModules: ['@aws-sdk/client-ses'], // AWS SDKはLambdaランタイムに含まれているためバンドルしない
      },
    });

    // API Gateway REST APIを作成
    const api = new RestApi(this, 'DiagnosisApi', {
      restApiName: 'Investment Shogun Diagnosis API',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS, // FIXME: 本番環境ではフロントエンドのドメインに限定してください
        allowMethods: ['POST', 'OPTIONS'],
        allowHeaders: ['Content-Type'],
      },
    });

    // APIのルートにリソースを追加 (例: /send)
    const sendResource = api.root.addResource('send');

    // POSTメソッドとLambda関数を統合
    sendResource.addMethod('POST', new LambdaIntegration(sendDiagnosisResultFn));

    // API GatewayのエンドポイントURLを出力
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
    });
  }
}
