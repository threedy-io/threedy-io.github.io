import { useEffect, useState } from 'react';
import fallbackImage from '../assets/fallback.png';
import { Repo } from '../types';

import type { urlParams } from '../types';

const API_URL = import.meta.env.VITE_API_BASEURL;

const GitDataLoader = (props: urlParams) => {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    const fetchGroupAndRepos = async () => {
      try {
        // Fetch group data
        const groupResponse = await fetch(
          `${API_URL}groups/${props.id}/projects`,
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
            fetch(`${API_URL}projects/${id}`, {
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
        const reposWithDetails = await Promise.all(
          repoDatas.map(async (repoData) => {
            let thumb_url = '';

            try {
              const response = await fetch(
                `${API_URL}projects/${repoData.id}/repository/files/thumb.jpg/raw?ref=master`,
                {
                  headers: {
                    Authorization: `Bearer ${
                      import.meta.env.VITE_GITLAB_TOKEN
                    }`,
                  },
                }
              );

              if (response.ok) {
                const thumbBlob = await response.blob();

                thumb_url = URL.createObjectURL(thumbBlob);
              } else {
                thumb_url = fallbackImage;
              }
            } catch (error) {
              console.error(error);
              thumb_url = fallbackImage;
            }

            return {
              ...repoData,
              img_url: thumb_url,
              description: repoData.description,
            };
          })
        );

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
