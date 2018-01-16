# Serverless Framework Sample

Serverless FrameworkでCognitoを使ってユーザ管理するサンプル

## 環境構築手順(とりあえず動かしたい人向け)

### 事前準備
- 設定
  - [Cognitoの設定](docs/cognitoの設定.md)
- インストール
  - [AWS CLI](https://aws.amazon.com/cli/)
  - node.js

### 1. clone or zip展開
ローカルにcloneしたプロジェクトかzipを展開して配置します。以降の作業は、カレントディレクトリを(serverless-sample)とします

### 2. npm install(初回のみでOK)

```
$ npm install -g serverless
$ npm install
```

### 3. 環境変数を設定
```
$ cp conf/config.sample.json conf/config.dev.json
```
作成したJSONを修正します
- `REGION`: リージョンを指定します
- `USER_POOL_ID`: [プールID](docs/cognitoの設定.md#プールid)を指定します
- `アプリクライアントID`: [アプリクライアントID](docs/cognitoの設定.md#アプリクライアントid)を指定します

### 4. ローカルで実行
```
$ sls offline start
```
http://localhost:3000/ で参照できます

# License

[MIT](https://opensource.org/licenses/MIT "MIT")

Copyright (c) 2017 Kazumune Katagiri
