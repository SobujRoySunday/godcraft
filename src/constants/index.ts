import logoImage from "../../public/assets/logo.png";
import searchImage from "../../public/assets/search.png";
import playerOneImage from "../../public/assets/player-1.png";
import playerTwoImage from "../../public/assets/player-2.png";
import playerThreeImage from "../../public/assets/player-3.png";

const highlightVideos = ['/assets/highlight-1.mp4', '/assets/highlight-2.mp4', '/assets/highlight-3.mp4'];

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

// TODO: Club player images to one export

export { 
    logoImage, 
    navItems,
    searchImage,
    playerOneImage,
    playerTwoImage,
    playerThreeImage,
    highlightVideos
};