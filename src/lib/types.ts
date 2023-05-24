export type Repository = {
    html_url: string;
    name: string;
    description: string;
    thumbnail: string;
    topics: string[];
    updated_at: any;
  };

  export type LanguageData = {
    [language: string]: number;
  }

  export type LanguageBar = {
    language: string;
    amount: number;
    percentage: number;
    previousPercentage: number;
  }