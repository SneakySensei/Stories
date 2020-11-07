export interface userIdentity {
  email: string;
  name: string;
  picture: string;
  iat: number;
  exp: number;
  iss: string;
}

export interface redisUserSchema {
  email: string;
  id: string;
  role: "seeker" | "supporter";
  "suicide-prevention": boolean;
  "relationship-advice": boolean;
  "family-issues": boolean;
  "substance-abuse": boolean;
  "gender-sexual-identity": boolean;
  "anxious-depressive-thoughts": boolean;
  "academic-issues": boolean;
}

export enum database {
  "seekers" = 1,
  "supporters" = 2,
  "banned-users" = 3,
}
