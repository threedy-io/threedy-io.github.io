import type { Repository, LanguageData } from './types';

const BASEURL = import.meta.env.VITE_BASEURL;
const USERNAME = import.meta.env.VITE_USERNAME
const BRANCH_NAME = import.meta.env.VITE_BRANCHNAME

export async function loadAllRepos() {
  const response = await fetch(`${BASEURL}/users/${USERNAME}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data:Repository[] = await response.json();
  return data;
}

//currently unused, but might be useful in the future
export async function loadRepoLanguage(repo: string) {
  const response = await fetch(
    `${BASEURL}/repos/${USERNAME}/${repo}/languages`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data:LanguageData = await response.json();
  return data;
}

export async function loadImageWithoutToken(repo: string): Promise<string> {
  const imgUrl = `https://raw.githubusercontent.com/${USERNAME}/${repo}/${BRANCH_NAME}/thumb.jpg`;

  try {
    const response = await fetch(imgUrl);
    if (response.ok) {
      return imgUrl;
    } else {
      throw new Error('Network response was not ok. The repository might not contain a thumb.jpg');
    }
  } catch (error) {
    console.error('Error:', error);
    return "error";
  }
}

