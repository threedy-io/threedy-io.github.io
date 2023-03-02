import { Repo } from '../types';
import RepoCard from './RepoCard';

type Props = {
  repos: Repo[] | null;
};

const RepoCards = ({ repos }: Props) => {
  if (!repos) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {repos.map((repo) => (
        <RepoCard
          name={repo.name}
          description={repo.description}
          key={repo.id}
          web_url={repo.web_url}
          img_url={repo.img_url}
        />
      ))}
    </>
  );
};

export default RepoCards;
