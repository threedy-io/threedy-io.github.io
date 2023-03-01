import { useEffect, useState } from 'react';
import GitRepoLoader from './GitRepoLoader';
import { urlParams } from '../types';

const GitGroupLoader = (props: urlParams) => {
  const [groupIDs, setGroupIDs] = useState<number[] | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          `https://git.threedy.io/api/v4/groups/${props.id}/projects`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITLAB_TOKEN}`,
            },
          }
        );
        const groupData = await response.json();

        const justTheIDs = groupData.map((repo: { id: number }) => repo.id);

        setGroupIDs(Object.values(justTheIDs));
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroups();
  }, [props.id]);

  if (!groupIDs) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {groupIDs.map((groupID) => (
        <GitRepoLoader key={groupID} id={groupID} />
      ))}
    </>
  );
};

export default GitGroupLoader;
