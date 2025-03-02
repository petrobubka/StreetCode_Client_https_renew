import React from 'react';
import facebook from '@assets/images/partners/facebook.svg';
import instagram from '@assets/images/partners/instagram.svg';
import twitter from '@assets/images/partners/twitterNew.svg';
import youtube from '@assets/images/partners/youtube.svg';

import { PartnerSourceLinkCreateUpdate } from '@/models/partners/partners.model';

const LogoType = [twitter, instagram, facebook, youtube];
const PartnerLink: React.FC<{ link: PartnerSourceLinkCreateUpdate }> = ({ link }) => {
    const LogoComponent = LogoType[link.logoType];

    return (
        <a href={link.targetUrl}>
            <LogoComponent />
        </a>
    );
};

export default PartnerLink;
