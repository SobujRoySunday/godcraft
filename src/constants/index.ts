import logoImage from "../../public/assets/logo.png";
import searchImage from "../../public/assets/search.png";
import playerOneImage from "../../public/assets/player-1.png";
import playerTwoImage from "../../public/assets/player-2.png";
import playerThreeImage from "../../public/assets/player-3.png";
import googleImage from "../../public/assets/google.png";
import logoutImage from "../../public/assets/logout.webp";

//TODO: Load this from a database
const contributors = [
    {
        name: 'Thor',
        image: '/assets/user.png',
        tags: ['Web Developer', 'Video Editor'],
        message: "I love this community, full of fun and happy people"
    }
]

const highlightVideos = ['/assets/highlight-1.mp4', '/assets/highlight-2.mp4', '/assets/highlight-3.mp4'];

const playerImages = [playerOneImage, playerTwoImage, playerThreeImage];

const navItems = [
    {
        name: "Store",
        href: "/store",

    },
    {
        name: "Servers",
        href: "/servers"
    },
    {
        name: "Builds",
        href: "/builds"
    },
    {
        name: "Community",
        href: "/community"
    }
]

export { 
    logoImage, 
    navItems,
    searchImage,
    highlightVideos,
    contributors,
    playerImages,
    googleImage,
    logoutImage
};