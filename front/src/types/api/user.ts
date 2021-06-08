// サインアップ
export type SingUpParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export type SingInParams = {
  email: string;
  password: string;
}

// ユーザー
export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  image?: string;
  profile?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}