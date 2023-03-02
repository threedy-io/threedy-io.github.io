import { useEffect, useState } from 'react';
import GitRepoLoader from './GitRepoLoader';
import RepoCard from './RepoCard';
import fallbackImage from '../assets/fallback.png';
import { Repo } from '../types';

type urlParams = {
  id: number;
  onDataLoaded: (repos: Repo[]) => void;
};

const GitDataLoader = (props: urlParams) => {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    const fetchGroupAndRepos = async () => {
      try {
        // Fetch group data
        const groupResponse = await fetch(
          `https://git.threedy.io/api/v4/groups/${props.id}/projects`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITLAB_TOKEN}`,
            },
          }
        );
        const groupData = await groupResponse.json();

        // Extract repo IDs from group data
        const repoIDs = groupData.map((repo: { id: number }) => repo.id);

        // Fetch repo data for each ID
        const repoResponses = await Promise.all(
          repoIDs.map((id: number) =>
            fetch(`https://git.threedy.io/api/v4/projects/${id}`, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GITLAB_TOKEN}`,
              },
            })
          )
        );
        const repoDatas = await Promise.all(
          repoResponses.map((res) => res.json())
        );

        // Construct repo details objects
        const reposWithDetails = repoDatas.map((repoData) => {
          let thumb_url = fallbackImage;
          //check if image exists. if it doesnt, use the fallback img
          fetch(`${repoData.web_url}/-/raw/master/thumb.png`, {
            method: 'HEAD',
          }).then((res) => {
            if (res.ok) {
              thumb_url = `${repoData.web_url}/-/raw/master/thumb.png`;
            }
          });

          return {
            ...repoData,
            img_url: thumb_url,
            description: repoData.description,
          };
        });

        setRepos(reposWithDetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroupAndRepos();
  }, [props.id]);

  //pass data to callback function
  useEffect(() => {
    if (repos) {
      props.onDataLoaded(repos);
    }
  }, [repos, props]);

  return <></>;
};

export default GitDataLoader;
