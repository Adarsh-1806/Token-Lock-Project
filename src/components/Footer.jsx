import React from "react";
export default function Footer() {
  const footerdata = {
    text: "Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenSea.",
    searchPlaceholder: "Your email address",
    aboutBrand:
      "The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital .",
    twitterUrl: "",
    youtubeUrl: "",
    discordUrl: "",
    instagramUrl: "",
    emailUrl: "",
    copyRight: "© 2018 - 2022 Ozone Networks, Inc",
  };
  return (
    <div className="container-fluid footer bg-primary">
      <hr className="mb-5" />
      <div className="row">
        <div className="col-lg-4 col-md-12 company">
          <img src={footerdata.logo} alt="brand-logo" className="brand-logo" />
          <a href="/" className="title cursor-pointer">
            <h3>OpenSea</h3>
          </a>
          <p className="about">{footerdata.aboutBrand}</p>
        </div>
        <div className="col-lg-2 col-md-3 col">
          <h5 className="title">Markerplace</h5>

          <li className="cursor-pointer my-2">Art</li>
          <li className="cursor-pointer my-2">Photography</li>
          <li className="cursor-pointer my-2">Sports</li>
          <li className="cursor-pointer my-2">Virtual World</li>
          <li className="cursor-pointer my-2">Music</li>
          <li className="cursor-pointer my-2">Utility</li>
        </div>
        <div className="col-lg-2 col-md-3 col">
          <h5 className="title">My Account</h5>

          <li className="cursor-pointer my-2">Profile</li>
          <li className="cursor-pointer my-2">Favorites</li>
          <li className="cursor-pointer my-2">Watchlist</li>
          <li className="cursor-pointer my-2">My Collections</li>
          <li className="cursor-pointer my-2">Settings</li>
        </div>
        <div className="col-lg-2 col-md-3 col">
          <h5 className="title">Resources</h5>

          <li className="cursor-pointer my-2">Help Center</li>
          <li className="cursor-pointer my-2">Platform Status</li>
          <li className="cursor-pointer my-2">Partners</li>
          <li className="cursor-pointer my-2">Gas-Free Marketplace</li>
          <li className="cursor-pointer my-2">Taxes</li>
          <li className="cursor-pointer my-2">Blog</li>
          <li className="cursor-pointer my-2">Docs</li>
          <li className="cursor-pointer my-2">Newsletter</li>
        </div>
        <div className="col-lg-2 col-md-3 col">
          <h5 className="title">Company</h5>

          <li className="cursor-pointer my-2">About</li>
          <li className="cursor-pointer my-2">Careers</li>
          <li className="cursor-pointer my-2">Ventures</li>
          <li className="cursor-pointer my-2">Grants</li>
        </div>
      </div>
      <hr className="mt-5" />

      <a href="/" className="copy-right">
        {footerdata.copyRight}
      </a>
    </div>
  );
}
