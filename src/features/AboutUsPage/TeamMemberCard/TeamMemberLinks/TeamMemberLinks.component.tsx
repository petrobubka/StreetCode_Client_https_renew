import behance from '@assets/images/partners/behance.svg';
import facebook from '@assets/images/partners/facebook.svg';
import https from '@assets/images/partners/https.svg';
import instagram from '@assets/images/partners/instagram.svg';
import linkedin from '@assets/images/partners/linkedin.svg';
import tiktok from '@assets/images/partners/tiktok.svg';
import twitter from '@assets/images/partners/twitterNew.svg';
import youtube from '@assets/images/partners/youtube.svg';

import { TeamMemberLinkCreateUpdate } from '@/models/team/team.model';

const LogoType = [twitter, instagram, facebook, youtube, linkedin, tiktok, behance, https];
type Props = {
    link: TeamMemberLinkCreateUpdate
};
const TeamMemberLinks = ({ link }: Props) => {
    const LogoComponent = LogoType[link.logoType];

    return (
        <a href={link.targetUrl} target="_blank" rel="noreferrer">
            <LogoComponent />
        </a>
    );
};

export default TeamMemberLinks;
