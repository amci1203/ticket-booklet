import $ from 'jquery';

export default function SocialMediaButtons () {
    const
        smButtons = $('#social-media-buttons'),
        smToggles = $('.social-media-toggle');

    function toggleSocialMediaButtons () {
        smButtons.toggleClass('visible');
    }

    return (function () {
        smToggles.click(toggleSocialMediaButtons);
        return { toggleSocialMediaButtons }
    })()
}
