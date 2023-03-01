import { useEffect, useState } from 'react';
import RepoCard from './RepoCard';
import fallbackImage from '../assets/fallback.png';
import { Repo } from '../types';

type urlParams = {
  id: number;
};

const GitRepoLoader = (props: urlParams) => {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://git.threedy.io/api/v4/projects/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITLAB_TOKEN}`,
            },
          }
        );
        const repoData = await response.json();
        let thumb_url = fallbackImage;
        //check if image exists. if it doesnt, use the fallback img
        fetch(`${repoData.web_url}/-/raw/master/thumb.png`, {
          method: 'HEAD',
        }).then((res) => {
          if (res.ok) {
            thumb_url = `${repoData.web_url}/-/raw/master/thumb.png`;
          }
        });

        const repoWithDetails = {
          ...repoData,
          img_url: thumb_url,
          description: repoData.description,
        };
        setRepos([repoWithDetails]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, [props.id]);

  if (!repos) {
    return <div>Loading repository...</div>;
  }

  return (
    <>
      {repos.map((repo) => (
        <RepoCard
          name={repo.name}
          description={repo.description}
          key={repo.id}
          web_url={repo.web_url}
          img_url={repo.img_url ?? fallbackImage}
        />
      ))}
    </>
  );
};

export default GitRepoLoader;
