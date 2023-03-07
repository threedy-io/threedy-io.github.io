export type Repo = {
  id: number;
  name: string;
  description: string;
  web_url: string;
  img_url: string;
};

export type urlParams = {
  id: number;
  onDataLoaded: (repos: Repo[]) => void;
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};
