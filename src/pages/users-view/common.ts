export type LocalUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessTokensCount: number;
  registrations: Registration[];
};

export interface Registration {
  id: string;
  application: {
    id: string;
    title: string;
  };
  createdAt: string;
  accessTokensCount: number;
}
