import { Repo } from '../types';
import fallbackImage from '../assets/fallback.png';

const RepoCard = (props: Repo) => {
  return (
    <a href={props.web_url}>
      <div className='repo-card'>
        <img src={props.img_url} />
        <span className='repo-card-description'>
          <h2>{props.name}</h2>
          <span>{props.description}</span>
        </span>
      </div>
    </a>
  );
};
RepoCard.defaultProps = {
  id: 0,
  img_url: fallbackImage,
  description: ' ',
};

export default RepoCard;
