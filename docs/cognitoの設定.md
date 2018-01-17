# cognitoの設定

## 1. ユーザプールを作成
### プール名
任意の値で構いません
![1](https://user-images.githubusercontent.com/1412761/34933588-bf5d64a8-fa1a-11e7-995f-5f40a1511a64.png)

### 属性
`Eメールアドレスおよび電話番号`を選択し、`Eメールアドレスを許可`を選択します
![2](https://user-images.githubusercontent.com/1412761/34933593-c4c26bc8-fa1a-11e7-9775-6d99bced82ea.png)

### ポリシー
パスワードのポリシーを設定してください
![3](https://user-images.githubusercontent.com/1412761/34933601-cbecbca0-fa1a-11e7-8d45-2265ce96dbf4.png)

### MFAの設定
`オフ`を選択しました。Eメールの検証を要求します。
![4](https://user-images.githubusercontent.com/1412761/34933607-cf7aa094-fa1a-11e7-9dc0-9917a3d2ec28.png)

### メッセージのカスタマイズ
任意の値で構いません
![5](https://user-images.githubusercontent.com/1412761/34933613-d5275b36-fa1a-11e7-8386-e24a7eb0e210.png)

### タグ
任意の値で構いません
![6](https://user-images.githubusercontent.com/1412761/34933615-d933c480-fa1a-11e7-8fd6-94267caed0d2.png)

### デバイス
`いいえ`を選択しました
![7](https://user-images.githubusercontent.com/1412761/34933616-dc504ecc-fa1a-11e7-9062-f75b0694686e.png)


### アプリクライアント
Webブラウザから呼び出すので、`クライアントシークレットを作成する`のチェックボックスは外れていることを確認してください。`アプリクライアントの作成`ボタンをクリックした後、`次のステップ`ボタンをクリックします
![8](https://user-images.githubusercontent.com/1412761/34933619-df684916-fa1a-11e7-9622-d7e89993972d.png)

### トリガー
何も設定していません
![9](https://user-images.githubusercontent.com/1412761/34933622-e2b2c81c-fa1a-11e7-9acf-50f22ba3c929.png)

### 確認
`プールの作成`ボタンをクリックするとユーザプールが作成されます
![10](https://user-images.githubusercontent.com/1412761/34933624-e6cb230e-fa1a-11e7-924b-65732f7e1e05.png)

## 2. 各種IDを確認
フェデレーティッドアイデンティティの作成に必要なのでメモしておきます。

### プールID
プールARNもここに記載してあります
![11](https://user-images.githubusercontent.com/1412761/34933631-ea2d8e9c-fa1a-11e7-9762-e9b04c0e242f.png)

### アプリクライアントID
![12](https://user-images.githubusercontent.com/1412761/34933638-ee417f70-fa1a-11e7-988b-8c24e3ba22c5.png)

## 3. フェデレーティッドアイデンティティを作成
### IDプール
認証プロバイダーに`Cognito`を選択し、ユーザープールIDとアプリクライアントIDを設定します
![13](https://user-images.githubusercontent.com/1412761/34933642-f349132a-fa1a-11e7-8995-df145ba5b9a8.png)

### IAMロールの作成
`許可`ボタンをクリックすることでフェデレーティッドアイデンティティが作成されます
![14](https://user-images.githubusercontent.com/1412761/34933647-f8a73310-fa1a-11e7-9581-f5fce973bc8c.png)

### フェデレーティッドアイデンティティID
IDプール - ダッシュボード の右上にある `IDプールの編集` リンクから確認できます
![15](https://user-images.githubusercontent.com/1412761/34969680-55a4cdfa-fab3-11e7-9a2a-65ca48167f70.png)
