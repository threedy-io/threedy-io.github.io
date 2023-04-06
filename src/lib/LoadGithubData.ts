const BASEURL = import.meta.env.VITE_BASEURL;
const USERNAME = import.meta.env.VITE_USERNAME

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
};

export async function loadData(topic: string, amount: number) {
  const response = await fetch(
    `${BASEURL}/${USERNAME}repos?topics=${topic}&per_page=${amount}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

export async function loadAllRepos() {
  // const response = await fetch(`${BASEURL}/${BASEURL}/repos`, {
  //   headers,
  // });
  const response = await fetch(`${BASEURL}/users/${USERNAME}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

export async function loadRepoLanguage(repo: string) {
  const response = await fetch(
    `${BASEURL}/repos/${USERNAME}/${repo}/languages`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

export async function loadRepoImage(repo: string) {
  const response = await fetch(
    `${BASEURL}/repos/${USERNAME}/${repo}/contents/thumb.jpg`,
    { headers }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data.content;
}

export async function loadImageWithoutToken(repo: string): Promise<string> {
  const imgUrl = `https://raw.githubusercontent.com/${USERNAME}/${repo}/main/thumb.jpg`;
  return fetch(imgUrl)
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Network response was not ok.');
    })
    .then((blob) => {
      //convert to base64 so the response can be used the same way as with the loadRepoImage function
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      return "";
    });
}
