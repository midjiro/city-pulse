import {
    FacebookIcon,
    FacebookMessengerShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';

export const SocialShare = ({ publication }) => {
    const currentURL = window.location.href;
    return (
        <section className="social-sharing">
            <h3>Share on social networks</h3>
            <div className="social-sharing__container">
                <FacebookMessengerShareButton url={currentURL}>
                    <FacebookIcon size={32} round />
                </FacebookMessengerShareButton>
                <TelegramShareButton url={currentURL} title={publication.title}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
                <TwitterShareButton url={currentURL} title={publication.title}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </div>
        </section>
    );
};
